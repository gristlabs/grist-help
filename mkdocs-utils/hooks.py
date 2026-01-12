# Mkdocs hooks adapted from the fastapi project
# License: MIT
# Source: https://github.com/tiangolo/fastapi/blob/master/scripts/mkdocs_hooks.py
# Original Author: Sebastián Ramírez and contributors

import glob
import time
from mkdocs.structure import StructureItem
import yaml
import urllib.parse
from functools import lru_cache
from pathlib import Path
from textwrap import indent
from typing import Any, List, cast

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import File, Files
from mkdocs.structure.pages import Page
from mkdocs.structure.nav import Navigation, Section
from mkdocs.utils.yaml import yaml_load

non_translated_sections = [] # Add the sections that are not translated here
build_mode = 'prod'
build_timestamp = None


MISSING_TRANSLATION_FILENAME = "MISSING-TRANSLATION.md"
MACHINE_TRANSLATION_FILENAME = "MACHINE-TRANSLATION.md"

def _get_warning_file_content(docs_dir: str, filename: str):
  warning_file_path = Path(docs_dir).parent / filename
  wanrning_content = warning_file_path.read_text(encoding="utf-8")
  return "!!!warning\n\n" + indent(wanrning_content, "    ")

@lru_cache
def _get_issue_url_for_translation_commitment():
  template_path = Path(__file__).parent.parent / ".github/ISSUE_TEMPLATE/10-help-translating.yml"
  template = template_path.read_text(encoding="utf-8")
  parsedTemplate = yaml.safe_load(template)
  uriEncodedTitle = urllib.parse.quote_plus(parsedTemplate['title'])
  uriEncodedTemplate = urllib.parse.quote_plus(template_path.name)
  return "https://github.com/gristlabs/grist-help/issues/new?template=%s&title=%s" % (uriEncodedTemplate, uriEncodedTitle)

@lru_cache
def get_missing_translation_content(docs_dir: str) -> str:
  content = _get_warning_file_content(docs_dir, MISSING_TRANSLATION_FILENAME)
  return content.replace('__ISSUE_URL__', _get_issue_url_for_translation_commitment())

@lru_cache
def get_automated_translation_content(docs_dir: str) -> str:
  content = _get_warning_file_content(docs_dir, MACHINE_TRANSLATION_FILENAME)
  return content.replace('__ISSUE_URL__', _get_issue_url_for_translation_commitment())


class EnFile(File):
  pass


def resolve_file(*, item: str, files: Files, config: MkDocsConfig) -> None:
  item_path = Path(config.docs_dir) / item
  if not item_path.is_file():
    en_src_dir = (Path(config.docs_dir) / "../../en/docs").resolve()
    potential_path = en_src_dir / item
    if potential_path.is_file():
      files.append(
        EnFile(
          path=item,
          src_dir=str(en_src_dir),
          dest_dir=config.site_dir,
          use_directory_urls=config.use_directory_urls,
        )
      )


def resolve_files(*, items: List[Any], files: Files, config: MkDocsConfig) -> None:
  for item in items:
    if isinstance(item, str):
      resolve_file(item=item, files=files, config=config)
    elif isinstance(item, dict):
      assert len(item) == 1
      values = list(item.values())
      if not values:
        continue
      if isinstance(values[0], str):
        resolve_file(item=values[0], files=files, config=config)
      elif isinstance(values[0], list):
        resolve_files(items=values[0], files=files, config=config)
      else:
        raise ValueError(f"Unexpected value: {values}")

def get_images_relative_paths(docs_dir: str) -> List[str]:
  en_docs_path = (Path(docs_dir) / "../../en/docs").resolve()
  images = glob.glob(f"{en_docs_path}/images/**/*", recursive=True)
  examples_images = glob.glob(f"{en_docs_path}/examples/images/**/*", recursive=True)
  all_images = images + examples_images
  return list(map(lambda i: str(Path(i).relative_to(en_docs_path)), all_images))

def get_unlocalized_assets_relative_paths(docs_dir: str) -> List[str]:
  en_docs_path = (Path(docs_dir) / "../../en/docs").resolve()
  unlocalized_assets = glob.glob(f"{en_docs_path}/unlocalized-assets/**/*", recursive=True)
  return list(map(lambda i: str(Path(i).relative_to(en_docs_path)), unlocalized_assets))

def on_files(files: Files, *, config: MkDocsConfig) -> Files:

  # We circumvent the fact that the config.nav object is not available anymore
  # due to the removal made by mkdocs-awesome-pages-plugin.
  #
  # So we read the config file again to get the nav object.
  with open(config.config_file_path, 'rb') as f:
    untouched_config = yaml_load(f)
    resolve_files(items=untouched_config['nav'] or [], files=files, config=config)

  images = get_images_relative_paths(config.docs_dir)
  unlocalized_assets = get_unlocalized_assets_relative_paths(config.docs_dir)

  resolve_files(items=images, files=files, config=config)
  resolve_files(items=unlocalized_assets, files=files, config=config)
  if "logo" in config.extra:
    resolve_file(item=config.extra["logo"], files=files, config=config)
  if "favicon" in config.theme:
    resolve_file(item=config.theme["favicon"], files=files, config=config)
  resolve_files(items=config.extra_css, files=files, config=config)
  resolve_files(items=config.extra_javascript, files=files, config=config)
  return files

def on_nav(nav: Navigation, config: MkDocsConfig, files: Files) -> Navigation:
  # Read the sections-translations file:
  translated_sections_file_path = Path(config.docs_dir).parent / "sections-translations.yml"
  translated_sections = yaml_load(translated_sections_file_path.read_text(encoding="utf-8"))

  # Change only the section titles recursively, leave the pages as they are
  def change_section_titles(item: StructureItem):
    if not isinstance(item, Section):
      return
    section = cast(Section, item)
     # Save the original title so that it's available in templates when needed
    section.en_title = section.title
    section.title = translated_sections.get(section.title, section.title)
    for child in section.children:
      change_section_titles(child)

  for item in nav.items:
    change_section_titles(item)

  return nav

def _inject_warning(markdown: str, warning: str, page: Page):
  for excluded_section in non_translated_sections:
    if page.file.src_path.startswith(excluded_section):
      return markdown
  return f"<div data-search-exclude markdown='block'>{warning}\n\n{markdown}</div>"

def on_page_markdown(
  markdown: str, *, page: Page, config: MkDocsConfig, **_: Any
) -> str:
  docs_dir=Path(config.docs_dir)
  if isinstance(page.file, EnFile):
    return _inject_warning(markdown=markdown, page=page, warning=get_missing_translation_content(config.docs_dir))
  elif docs_dir.parent.name != 'en' and (docs_dir.parent / MACHINE_TRANSLATION_FILENAME).exists():
    return _inject_warning(markdown=markdown, page=page, warning=get_automated_translation_content(config.docs_dir))

  return markdown

def on_startup(*, command, dirty):
  global build_mode, build_timestamp
  build_mode = 'prod' if command in ['build', 'gh-deploy'] else 'dev'
  build_timestamp = str(int(time.time()))

def on_page_context(context, page, config, nav):
  context['build_mode'] = build_mode
  context['build_timestamp'] = build_timestamp
  return context
