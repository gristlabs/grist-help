# Mkdocs hooks adapted from the fastapi project
# License: MIT
# Source: https://github.com/tiangolo/fastapi/blob/master/scripts/mkdocs_hooks.py
# Original Author: Sebastián Ramírez and contributors

import glob
from functools import lru_cache
from pathlib import Path
from textwrap import indent
from typing import Any, List

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import File, Files
from mkdocs.structure.pages import Page
from mkdocs.utils.yaml import yaml_load

non_translated_sections = [] # Add the sections that are not translated here


MISSING_TRANSLATION_FILENAME = "MISSING-TRANSLATION.md"
MACHINE_TRANSLATION_FILENAME = "MACHINE-TRANSLATION.md"

def _get_warning_file_content(docs_dir: str, filename: str):
  missing_translation_file_path = Path(docs_dir).parent / filename
  missing_translation_content = missing_translation_file_path.read_text(encoding="utf-8")
  return "!!!warning\n\n" + indent(missing_translation_content, "    ")

@lru_cache
def get_missing_translation_content(docs_dir: str) -> str:
  return _get_warning_file_content(docs_dir, MISSING_TRANSLATION_FILENAME)

@lru_cache
def get_automated_translation_content(docs_dir: str) -> str:
  return _get_warning_file_content(docs_dir, MACHINE_TRANSLATION_FILENAME)


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
  return list(map(lambda i: str(Path(i).relative_to(en_docs_path)), images))

def on_files(files: Files, *, config: MkDocsConfig) -> Files:

  # We circumvent the fact that the config.nav object is not available anymore
  # due to the removal made by mkdocs-awesome-pages-plugin.
  #
  # So we read the config file again to get the nav object.
  with open(config.config_file_path, 'rb') as f:
    untouched_config = yaml_load(f)
    resolve_files(items=untouched_config['nav'] or [], files=files, config=config)

  images = get_images_relative_paths(config.docs_dir)

  resolve_files(items=images, files=files, config=config)
  if "logo" in config.extra:
    resolve_file(item=config.extra["logo"], files=files, config=config)
  if "favicon" in config.theme:
    resolve_file(item=config.theme["favicon"], files=files, config=config)
  resolve_files(items=config.extra_css, files=files, config=config)
  resolve_files(items=config.extra_javascript, files=files, config=config)
  return files

def _inject_warning(markdown: str, warning: str, page: Page):
  for excluded_section in non_translated_sections:
    if page.file.src_path.startswith(excluded_section):
      return markdown
  missing_translation_content = warning
  header = ""
  body = markdown
  if markdown.startswith("#"):
    header, _, body = markdown.partition("\n\n")
  return f"{header}\n\n{missing_translation_content}\n\n{body}"

def on_page_markdown(
  markdown: str, *, page: Page, config: MkDocsConfig, **_: Any
) -> str:
  docs_dir=Path(config.docs_dir)
  if isinstance(page.file, EnFile):
    return _inject_warning(markdown=markdown, page=page, warning=get_missing_translation_content(config.docs_dir))
  elif docs_dir.parent.name != 'en' and (docs_dir.parent / MACHINE_TRANSLATION_FILENAME).exists():
    return _inject_warning(markdown=markdown, page=page, warning=get_automated_translation_content(config.docs_dir))

  return markdown
