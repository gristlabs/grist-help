#!./env/bin/python

# Python script adapted from the fastapi project to manage translations
# License: MIT
# Source: https://github.com/tiangolo/fastapi/blob/master/scripts/docs.py
# Original Author: Sebastián Ramírez and contributors

import json
import logging
import os
import shutil
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler
from multiprocessing import Pool
from pathlib import Path
from typing import Any, Dict, List, Optional, Union
from textwrap import dedent

import mkdocs.commands.build
import mkdocs.commands.serve
import mkdocs.config
import mkdocs.utils
import typer
import yaml

logging.basicConfig(level=logging.INFO)

app = typer.Typer()

mkdocs_config_name = "mkdocs.yml"

docs_folder_name = "help"
docs_path = Path("help")
en_docs_path = Path("help/en")
alternate_langs_config_path: Path = Path("mkdocs-alternate-langs.yml")
site_path = Path("site").absolute()
build_site_path = Path("site_build").absolute()


def language_docs_dir(lang: str) -> Path:
  return docs_path / lang / "docs"


def get_missing_translation_snippet() -> str:
  missing_translation_file_path = (Path(__file__).parent / "help/missing-translation.md")
  return missing_translation_file_path.read_text(encoding="utf-8")


def get_mkdocs_yaml_for_lang(lang: str) -> str:
  return dedent(f"""
  INHERIT: ../../mkdocs.yml
  docs_dir: './docs'
  theme:
   custom_dir: ../../overrides
   language: {lang}
  """).lstrip()


def get_alternate_langs_config() -> Dict[str, Any]:
  return mkdocs.utils.yaml_load(alternate_langs_config_path.read_text(encoding="utf-8"))


def get_lang_paths() -> List[Path]:
  return sorted(docs_path.iterdir())


def lang_callback(lang: Optional[str]) -> Union[str, None]:
  if lang is None:
    return None
  lang = lang.lower()
  return lang


def complete_existing_lang(incomplete: str):
  lang_path: Path
  for lang_path in get_lang_paths():
    if lang_path.is_dir() and lang_path.name.startswith(incomplete):
      yield lang_path.name


@app.command()
def new_lang(lang: str = typer.Argument(..., callback=lang_callback)):
  """
  Generate a new docs translation directory for the language LANG.
  """
  new_path: Path = docs_path / lang
  if new_path.exists():
    typer.echo(f"The language was already created: {lang}")
    raise typer.Abort()
  new_path.mkdir()
  new_config_path: Path = Path(new_path) / mkdocs_config_name
  new_config_path.write_text(get_mkdocs_yaml_for_lang(lang), encoding="utf-8")
  new_config_docs_path: Path = language_docs_dir(lang)
  new_config_docs_path.mkdir()

  en_index_path: Path = language_docs_dir('en') / "index.md"
  new_index_path: Path = new_config_docs_path / "index.md"
  en_index_content = en_index_path.read_text(encoding="utf-8")
  new_index_content = f"{get_missing_translation_snippet()}\n\n{en_index_content}"
  new_index_path.write_text(new_index_content, encoding="utf-8")

  # Create the images directory
  images_dir = new_config_docs_path / "images"
  images_dir.mkdir()
  (images_dir / ".gitkeep").touch()

  typer.secho(f"Successfully initialized: {new_path}", color=typer.colors.GREEN)
  update_languages()


@app.command()
def build_lang(
  lang: str = typer.Argument(
    ..., callback=lang_callback, autocompletion=complete_existing_lang
  ),
) -> None:
  """
  Build the docs for a language.
  """
  lang_path: Path = docs_path / lang
  if not lang_path.is_dir():
    typer.echo(f"The language translation doesn't seem to exist yet: {lang}")
    raise typer.Abort()
  typer.echo(f"Building docs for: {lang}")
  build_site_dist_path = build_site_path / lang
  if lang == "en":
    dist_path = site_path
    # Don't remove en dist_path as it might already contain other languages.
    # When running build_all(), that function already removes site_path.
    # All this is only relevant locally, on GitHub Actions all this is done through
    # artifacts and multiple workflows, so it doesn't matter if directories are
    # removed or not.
  else:
    dist_path = site_path / lang
    shutil.rmtree(dist_path, ignore_errors=True)
  current_dir = os.getcwd()
  os.chdir(lang_path)
  shutil.rmtree(build_site_dist_path, ignore_errors=True)
  subprocess.run(["mkdocs", "build", "--site-dir", build_site_dist_path], check=True)
  shutil.copytree(build_site_dist_path, dist_path, dirs_exist_ok=True)
  os.chdir(current_dir)
  typer.secho(f"Successfully built docs for: {lang}", color=typer.colors.GREEN)


@app.command()
def build_all() -> None:
  """
  Build mkdocs site for en, and then build each language inside, end result is located
  at directory ./site/ with each language inside.
  """
  update_languages()
  shutil.rmtree(site_path, ignore_errors=True)
  langs = [lang.name for lang in get_lang_paths() if lang.is_dir()]
  cpu_count = os.cpu_count() or 1
  process_pool_size = cpu_count * 4
  typer.echo(f"Using process pool size: {process_pool_size}")
  with Pool(process_pool_size) as p:
    p.map(build_lang, langs)


@app.command()
def update_languages() -> None:
  """
  Update the mkdocs.yml file Languages section including all the available languages.
  """
  update_config()


@app.command()
def serve() -> None:
  """
  A quick server to preview a built site with translations.

  For development, prefer the command live (or just mkdocs serve).

  This is here only to preview a site with translations already built.

  Make sure you run the build-all command first.
  """
  typer.echo("Warning: this is a very simple server.")
  typer.echo("For development, use the command live instead.")
  typer.echo("This is here only to preview a site with translations already built.")
  typer.echo("Make sure you run the build-all command first.")
  os.chdir("site")
  server_address = ("", 8000)
  server = HTTPServer(server_address, SimpleHTTPRequestHandler)
  typer.echo("Serving at: http://127.0.0.1:8000")
  server.serve_forever()


@app.command()
def live(
  lang: str = typer.Argument(
    None, callback=lang_callback, autocompletion=complete_existing_lang
  ),
) -> None:
  """
  Serve with livereload a docs site for a specific language.

  This only shows the actual translated files, not the placeholders created with
  build-all.

  Takes an optional LANG argument with the name of the language to serve, by default
  en.
  """
  # Enable line numbers during local development to make it easier to highlight
  os.environ["LINENUMS"] = "true"
  if lang is None:
    lang = "en"
  lang_path: Path = docs_path / lang
  os.chdir(lang_path)
  mkdocs.commands.serve.serve(dev_addr="127.0.0.1:8000")


def get_updated_config_content() -> Dict[str, Any]:
  config = get_alternate_langs_config()
  languages = [{"en": "/"}]
  new_alternate: List[Dict[str, str]] = []
  # Language names sourced from https://quickref.me/iso-639-1
  # Contributors may wish to update or change these, e.g. to fix capitalization.
  language_names_path = Path(__file__).parent / docs_folder_name / "language_names.yml"
  local_language_names: Dict[str, str] = mkdocs.utils.yaml_load(
    language_names_path.read_text(encoding="utf-8")
  )
  for lang_path in get_lang_paths():
    if lang_path.name == "en" or not lang_path.is_dir():
      continue
    code = lang_path.name
    languages.append({code: f"/{code}/"})
  for lang_dict in languages:
    code = list(lang_dict.keys())[0]
    url = lang_dict[code]
    if code not in local_language_names:
      print(
        f"Missing language name for: {code}, "
        f"update it in {docs_folder_name}/language_names.yml"
      )
      raise typer.Abort()
    use_name = f"{code} - {local_language_names[code]}"
    new_alternate.append({"link": url, "name": use_name})
  config["extra"]["alternate"] = new_alternate
  return config


def update_config() -> None:
  config = get_updated_config_content()
  alternate_langs_config_path.write_text(
    "# WARNING: this file is auto-generated by ./docs.py\n" +
    yaml.dump(config, sort_keys=False, width=200, allow_unicode=True),
    encoding="utf-8",
  )


@app.command()
def verify_config() -> None:
  """
  Verify main mkdocs.yml content to make sure it uses the latest language names.
  """
  typer.echo("Verifying mkdocs-alternate-lang.yml")
  config = get_alternate_langs_config()
  print(config)
  updated_config = get_updated_config_content()
  print(updated_config)
  if config != updated_config:
    typer.secho(
      f"./mkdocs-alternate-lang.yml outdated from {docs_folder_name}/language_names.yml, "
      "update language_names.yml and run "
      "python ./docs.py update-languages",
      color=typer.colors.RED,
    )
    raise typer.Abort()
  typer.echo("Valid mkdocs-alternate-lang.yml ✅")


@app.command()
def langs_json():
  langs = []
  for lang_path in get_lang_paths():
    if lang_path.is_dir():
      langs.append(lang_path.name)
  print(json.dumps(langs))


if __name__ == "__main__":
  app()
