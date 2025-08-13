#!/bin/bash
# .github/scripts/validate-pr-title.sh
# Validates PR title contains a Jira key when targeting develop branch

set -e

echo "PR Title: $PR_TITLE"
echo "Base branch: $BASE_REF"

# Check Jira key for all branches except main and staging
if [[ "$BASE_REF" == "main" || "$BASE_REF" == "staging" ]]; then
    echo "ℹ️ Skipping Jira key check for base branch $BASE_REF"
else
    if [[ ! "$PR_TITLE" =~ [A-Z]{2,}-[0-9]+ ]]; then
        echo "ERROR: PR title does not contain a valid Jira key (e.g. ABC-123)"
        exit 1
    fi
    echo "✅ Valid Jira key found in PR title"
fi

echo "PR title validation passed"