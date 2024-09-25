#!/bin/bash

# Path to CHANGELOG.md
CHANGELOG_FILE="CHANGELOG.md"

# Check if the changelog file exists
if [ ! -f "$CHANGELOG_FILE" ]; then
  echo "❌ Error: CHANGELOG.md file not found!"
  exit 1
fi

# Read the changelog file
content=$(cat "$CHANGELOG_FILE")

# Regular expressions to validate the format
version_regex="^# Version [0-9]\+\.[0-9]\+\.[0-9]\+"
changes_header_regex="^## Changes :"
changes_list_regex="^[0-9]\+\. .\+"

# Split the file by version headers to check each section
sections=$(echo "$content" | awk '/^# Version/{split("",a);a[++i]=$0;next}{a[i]=a[i] RS $0}END{for (i in a) print a[i]}')

section_count=1

# Loop through each section and check the format
echo "$sections" | while IFS= read -r section; do
  echo "Checking section $section_count..."

  # Check if the section has a valid version header
  if ! echo "$section" | grep -qE "$version_regex"; then
    echo "❌ Error in section $section_count: Missing or incorrect version header. Expected format: '# Version x.x.x'"
    exit 1
  fi

  # Check if the section has a valid '## Changes :' header
  if ! echo "$section" | grep -qE "$changes_header_regex"; then
    echo "❌ Error in section $section_count: Missing or incorrect '## Changes :' header."
    exit 1
  fi

  # Check if the section contains a valid list of changes
  if ! echo "$section" | grep -qE "$changes_list_regex"; then
    echo "❌ Error in section $section_count: No numbered changes list found. Expected format: '1. xxx', '2. xxx', etc."
    exit 1
  fi

  section_count=$((section_count + 1))
done

echo "✅ CHANGELOG.md format check complete."
