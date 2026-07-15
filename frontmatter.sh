# Sourced by build scripts that regenerate documentation pages.

# Copy the leading YAML frontmatter of $1 (if any) to the top of $2, in place.
# mkdocs uses the frontmatter title for nav labels; regeneration drops it otherwise.
prepend_frontmatter() {
  local front
  front=$(awk 'NR==1 && $0!="---"{exit} NR>1 && $0=="---"{exit} {print}' "$1")
  if [[ -n "$front" ]]; then
    printf '%s\n---\n\n' "$front" | cat - "$2" > "$2.tmp" && mv "$2.tmp" "$2"
  fi
}
