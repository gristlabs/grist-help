#!/usr/bin/env python3
"""
Generates markdown from doc-comments of functions listed in the passed-in modules, and inserts it
between special tokens in the given markdown file.
"""

import argparse
import doctest
import importlib
import inspect
import itertools
import os.path
import re
import sys

_token_replace_re = re.compile(
  r'(?P<begin><!-- BEGIN mkpydocs (?P<type>table|docs) -->)' +
  r'(?P<discard>.*)' +
  r'(?P<end><!-- END mkpydocs (?P=type) -->)', re.S)
_unimplemented_re = re.compile(r'raise NotImplemented')

def get_category(modname):
  if modname == 'prevnext':
    return 'Cumulative'
  return modname.title()

class DocItem(object):
  def __init__(self, obj, modname=None, doc=None):
    # obj is the object (e.g. a function or a class) to be documented.
    #if isinstance(obj, property):
    #  obj = obj.fget
    self.modname = modname or obj.__module__.rsplit('.', 1)[-1]
    self.obj = obj
    self.doc = doc or inspect.getdoc(obj)
    attrs, self.doc = self.get_doc_attrs(self.doc)
    if not obj and not ('Usage' in attrs and 'Name' in attrs):
      raise Exception("_DOC_EXTRA comments in %s must include 'Name:' and 'Usage:' keys" % modname)
    try:
      source = inspect.getsource(obj)
    except Exception:
      source = ''
    self.usage = attrs['Usage'] if 'Usage' in attrs else self.format_sig(obj)
    self.is_unimplemented = bool(_unimplemented_re.search(source))
    self.names = attrs['Name'].split(',') if 'Name' in attrs else [obj.__name__]
    # mkdocs lowercases anchor names, so use lower case of the function name.
    self.anchor = make_unique_anchor(re.sub(r'\W+', '_', self.names[0].lower()))

    # For "category" use the title-cased name of the module that the function came from.
    self.category = get_category(self.modname)

    # Use this chance to check that @unimplemented decorator (used for autocomplete) is correct.
    if self.is_unimplemented != getattr(obj, 'unimplemented', False):
      raise Exception("Function %s.%s @unimplemented marker is wrong" %
          (self.modname, self.names[0]))

  def expand(self):
    yield self
    if isinstance(self.obj, type):
      if hasattr(self.obj, '_DOC_EXTRA'):
        for doc in self.obj._DOC_EXTRA:
          yield DocItem(None, modname=self.modname, doc=inspect.cleandoc(doc))
      for name, f in inspect.getmembers(self.obj):
        if not name.startswith("_") and f.__doc__:
          yield DocItem(f, modname=self.modname)

  @classmethod
  def format_sig(cls, obj):
    """Format the signature line of the function."""
    if inspect.isfunction(obj):
      *prefix, name = obj.__qualname__.split(".")
      bolded_qualname = ".".join([*prefix, f"__{name}__"])
      return f"{bolded_qualname}{inspect.signature(obj)}"
    else:
      assert inspect.isclass(obj)
      return f"class __{obj.__name__}__"

  @classmethod
  def get_doc_attrs(cls, doc):
    attrs = {}
    if doc:
      lines = doc.splitlines(True)
      for i, line in enumerate(lines):
        if ':' not in line:
          doc = ''.join(lines[i:]).strip()
          break
        name, value = line.split(':', 1)
        attrs[name.strip()] = value.strip()
    return attrs, doc

  def format_doc(self):
    """Format the passed-in doc-comment, returning an array of lines."""
    if not self.doc:
      return []
    parser = doctest.DocTestParser()
    parts = parser.parse(self.doc)   # Alternating doctest.Examples and strings.
    output = []
    for part in parts:
      if isinstance(part, doctest.Example):
        output.append("```python")
        source = part.source.split("# doctest:", 1)[0]    # Remove special doctest: comments
        output.append('>>> ' + source.strip())
        output.append(part.want.strip())
        output.append("```")
      elif part.strip().startswith('More tests:'):
        # Stop processing doc-comment after we encounter a 'More tests:' line.
        break
      else:
        output.append(part)
    return output

  def format_name_link(self):
    css_class = 'class="unimplemented"' if self.is_unimplemented else ""
    return ' or '.join('<a %s href="#%s">%s</a>' % (css_class, self.anchor, n) for n in self.names)


anchors = set()

def make_unique_anchor(anchor):
  if anchor in anchors:
    for i in range(2, 10):
      a = "{}_{}".format(anchor, i)
      if a not in anchors:
        anchor = a
        break
    else:
      raise Exception("Can't make unique anchor for #{}".format(anchor))
  anchors.add(anchor)
  return anchor

def get_table_text(docitems):
  # Create the table listing all functions.
  output = []
  output.append("| Category | Functions |")
  output.append("| --- | --- |")
  # Sort by category (mainly to keep a single section for lookups)
  docitems.sort(key=lambda d: d.category)
  # Sort again to move the "Grist" section to be first.
  docitems.sort(key=lambda d: d.category != "Grist")
  for category, items in itertools.groupby(docitems, lambda d: d.category):
    name_list = [d.format_name_link() for d in items]
    output.append("| %s | %s |" % (category, ', '.join(name_list)))
  return '\n'.join(output)

def get_doc_text(docitems):
  # Create the per-category sections with collapsed function in each.
  output = []
  for category, items in itertools.groupby(docitems, lambda d: d.category):
    output.append('### ' + category)
    for d in items:
      css_class = 'class="unimplemented"' if d.is_unimplemented else ""
      output.append('<details id="%s" markdown><summary %s>' % (d.anchor, css_class))
      output.append('#### %s' % d.names[0])
      output.append('<code>%s</code>' % (d.usage,))
      output.append('<a class="headerlink" href="#%s" title="Permanent link">#</a>' % d.anchor)
      output.append('</summary>')
      output.extend(d.format_doc())
      if d.is_unimplemented:
        output.append('\n<span class="grist-tip">Note</span>' +
                      'This function is not currently implemented in Grist.')
      output.append('</details>')
  return "\n".join(output)


def gen_doc_spec(module):
  # Collect the list of __all__ objects in the given module, grouping and sorting them by the
  # module name in which they were defined.
  docs = {}
  for name in module.__all__:
    obj = getattr(module, name)
    modname = obj.__module__.rsplit('.', 1)[-1]
    docs.setdefault(modname, []).append(obj)
  return sorted((modname, objs) for modname, objs in docs.items())


def main():
  parser = argparse.ArgumentParser(
    description=
    """Convert doc comments for functions in the given module to markdown,
    and include into the given markdown file between the two lines containing
    these special markers:
      <!-- BEGIN mkpydocs <table|docs> {mod_name} -->
      ... everything in between will get overwritten ...
      <!-- END mkpydocs <table|docs> {mod_name} -->
    """
  )
  parser.add_argument("grist_checkout_dir", help="Root directory of grist repository")
  parser.add_argument("modules", help="Comma-separated list of module names")
  parser.add_argument("outpath", help="Path to the .md file to update")
  args = parser.parse_args()

  rootdir = os.path.join(args.grist_checkout_dir, "sandbox")
  sys.path.insert(0, os.path.join(rootdir, "grist"))
  sys.path.append(os.path.join(rootdir, "thirdparty"))

  # maps module_name to the pair (table_text, doc_text).
  docitems = []
  for module_name in args.modules.split(','):
    print("mkpydocs processing %r" % module_name)
    mod = importlib.import_module(module_name)
    # DOCS is a list of (mod_name, [obj_names...]) pairs. If omitted, we generate it from the
    # modules __all__ variable.
    docs = mod.DOCS if hasattr(mod, 'DOCS') else gen_doc_spec(mod)
    for modname, objs in docs:
      for obj in objs:
        docitems.extend(DocItem(obj, modname=modname).expand())

  table_text, doc_text = get_table_text(docitems), get_doc_text(docitems)

  with open(args.outpath, "r") as f:
    full_text = f.read()

  if not _token_replace_re.search(full_text):
    sys.stderr.write("Output file does not have valid replacement tokens\n")
    sys.exit(1)

  def replace_token(m):
    repl_text = table_text if m.group('type') == 'table' else doc_text
    return m.group('begin') + '\n' + repl_text + '\n' + m.group('end')
  new_text = _token_replace_re.sub(replace_token, full_text)

  with open(args.outpath, "w") as f:
    f.write(new_text)
    f.close()


if __name__ == "__main__":
  main()
