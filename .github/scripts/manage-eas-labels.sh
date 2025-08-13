#!/bin/bash
# .github/scripts/manage-eas-labels.sh
# Manages EAS labels for preview and production builds

set -e

# Determine the appropriate EAS label based on base branch
case "$BASE_REF" in
    "develop")
        LABEL="eas-preview"
        ;;
    "main")
        LABEL="eas-production"
        ;;
    *)
        echo "No EAS label management needed for branch: $BASE_REF"
        exit 0
        ;;
esac

echo "Managing EAS labels for base branch: $BASE_REF"
echo "Target label: $LABEL"

# GitHub API base URL
API_URL="https://api.github.com/repos/$REPO/issues/$PR_NUMBER/labels"

# Function to call GitHub API
github_api() {
    local method="$1"
    local url="$2"
    local data="$3"
    
    curl -s -X "$method" \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Content-Type: application/json" \
        ${data:+-d "$data"} \
        "$url"
}

# Remove existing label if it exists
echo "Removing existing $LABEL label (if present)..."
github_api "DELETE" "$API_URL/$LABEL" || {
    echo "Label $LABEL was not present or could not be removed (this is normal)"
}

# Add the label to retrigger EAS
echo "Adding $LABEL label to retrigger EAS..."
github_api "POST" "$API_URL" "{\"labels\": [\"$LABEL\"]}"

echo "Successfully managed EAS label: $LABEL"