# Extract the overall % Lines coverage from the 'All files' line (8th column)
test_output=$(npm run test)  # Ensure you run the tests and capture the output
coverage=$(echo "$test_output" | awk '/All files/ {print $8}' | tr -d ' ')

# Check if coverage was found and is numeric (handles decimals)
if ! [[ "$coverage" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
  echo "Error: Could not find coverage information or it is not a valid number."
  exit 1
fi

# Extract the integer part of the coverage
coverage_int=${coverage%%.*}  # This removes everything after the decimal point

# Check if coverage is below 95% using integer comparison
if (( coverage_int < 95 )); then
  echo "Error: Code coverage is below 95%. Actual coverage: ${coverage_int}%."
  exit 1
fi

echo "Code coverage is ${coverage_int}%. Test passed."
