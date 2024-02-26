# Mkdocs hooks adapted from the fastapi project
# License: MIT
# Source: https://github.com/tiangolo/fastapi/blob/master/scripts/mkdocs_hooks.py
# Original Author: Sebastián Ramírez and contributors

import glob
from functools import lru_cache
from pathlib import Path
from typing import Any, List, Union

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import File, Files
from mkdocs.structure.nav import Link, Navigation, Section
from mkdocs.structure.pages import Page
from mkdocs.utils.yaml import yaml_load

non_translated_sections = [] # Add the sections that are not translated here


@lru_cache
def get_missing_translation_content(docs_dir: str) -> str:
  docs_dir_path = Path(docs_dir)
  missing_translation_path = docs_dir_path.parent.parent / "missing-translation.md"
  return missing_translation_path.read_text(encoding="utf-8")


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


def on_page_markdown(
  markdown: str, *, page: Page, config: MkDocsConfig, **_: Any
) -> str:
  if isinstance(page.file, EnFile):
    for excluded_section in non_translated_sections:
      if page.file.src_path.startswith(excluded_section):
        return markdown
    missing_translation_content = get_missing_translation_content(config.docs_dir)
    header = ""
    body = markdown
    if markdown.startswith("#"):
      header, _, body = markdown.partition("\n\n")
    return f"{header}\n\n{missing_translation_content}\n\n{body}"
  return markdown
