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

    # Check for the changes section
    if ! grep -q '^\s*Changes :' "$file"; then
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
# Function to read changelog
read_changelog() {
    local file="$1"

    # Check if the file exists
    if [[ ! -f $file ]]; then
        echo "Changelog file not found!"
        return 1
    fi

    # Read and process the changelog file
    while IFS= read -r line; do
        # Use regex to match the changelog entries
        if [[ $line =~ ^([0-9]+)\.\ (.*) ]]; then
            echo "${BASH_REMATCH[2]}"  # Output the change description
        fi
    done < "$file"
}

# Call the format check function
check_format "$CHANGELOG_FILE"

# Call the function
read_changelog "$CHANGELOG_FILE"