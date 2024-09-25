#!/bin/bash

# File name
CHANGELOG_FILE="CHANGELOG.md"

# Function to check the format
check_format() {
    local file="$1"

    # Print the content of the file for debugging
    echo "Content of the file:"
    cat -n "$file"  # Added line numbers for better visibility
    echo

    # Check for the version line (allow leading spaces)
    if ! grep -qE '^\s*# Version [0-9]+\.[0-9]+\.[0-9]+\s*' "$file"; then
        echo "Error: Version line does not match the format '# Version X.Y.Z'."
        return 1
    fi

    # Check for the changes section
    if ! grep -q '^\s*## Changes :' "$file"; then
        echo "Error: Changes section not found or does not match '## Changes :'."
        return 1
    fi

    # Check for the list items
    if ! grep -q '^\s*[0-9]\+\.\s\+.*' "$file"; then
        echo "Error: No changes listed in the format '1. Description'."
        return 1
    fi

    echo "Format is correct."
    return 0
}

# Call the format check function
check_format "$CHANGELOG_FILE"
