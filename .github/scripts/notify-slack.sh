#!/bin/bash
# .github/scripts/notify-slack.sh
# Centralized Slack notification handler

set -e

NOTIFICATION_TYPE="$1"
SLACK_CHANNEL="#task-wan"
GITHUB_ICON_URL="https://raw.githubusercontent.com/nyplex/bot-icons/refs/heads/main/github-icon.png"

# Function to send Slack message
send_slack_message() {
    local message="$1"
    local color="$2"
    local use_attachment="$3"
    
    if [[ "$use_attachment" == "true" ]]; then
        # Send as attachment (for error messages)
        curl -X POST -H 'Content-type: application/json' \
            --data "{
                \"username\": \"GITHUB - CHECKS\",
                \"icon_url\": \"$GITHUB_ICON_URL\",
                \"channel\": \"$SLACK_CHANNEL\",
                \"attachments\": [{
                    \"fallback\": \"$message\",
                    \"pretext\": \"$message\",
                    \"color\": \"$color\",
                    \"fields\": [{
                        \"title\": \"Details\",
                        \"value\": \"*•* *$(get_error_title)* — PR #$PR_NUMBER by $GITHUB_ACTOR $(get_error_description)\",
                        \"short\": false
                    }]
                }]
            }" \
            "$SLACK_WEBHOOK_URL"
    else
        # Send as simple text message (for success)
        curl -X POST -H 'Content-type: application/json' \
            --data "{
                \"text\": \"$message\",
                \"username\": \"GITHUB - CHECKS\",
                \"icon_url\": \"$GITHUB_ICON_URL\",
                \"channel\": \"$SLACK_CHANNEL\"
            }" \
            "$SLACK_WEBHOOK_URL"
    fi
}

# Helper functions for error messages
get_error_title() {
    case "$NOTIFICATION_TYPE" in
        "PR_TITLE_FAILED") echo "PR Title Check failed" ;;
        "TESTS_FAILED") echo "Unit Tests failed" ;;
        "LINT_FAILED") echo "Linter failed" ;;
        "UNAUTHORIZED_AUTHOR") echo "Unauthorized PR Author" ;;
    esac
}

get_error_description() {
    case "$NOTIFICATION_TYPE" in
        "PR_TITLE_FAILED") echo "is missing a Jira key." ;;
        "TESTS_FAILED") echo ". Please check the logs." ;;
        "LINT_FAILED") echo ". Please check the logs." ;;
        "UNAUTHORIZED_AUTHOR") echo "targeting $BASE_REF. You are not authorized to create PRs to staging/main branches." ;;
    esac
}

# Generate appropriate message based on notification type
case "$NOTIFICATION_TYPE" in
    "PR_TITLE_FAILED")
        send_slack_message "🚨 PR Title Check Failed: <$PR_URL|Check PR>" "#D00000" "true"
        exit 1  # Fail the job for branch protection
        ;;
    "TESTS_FAILED")
        send_slack_message "🚨 PR Unit Tests Failed: <$PR_URL|Check PR>" "#D00000" "true"
        ;;
    "LINT_FAILED")
        send_slack_message "🚨 PR Linter Failed: <$PR_URL|Check PR>" "#D00000" "true"
        ;;
    "UNAUTHORIZED_AUTHOR")
        send_slack_message "🚫 Unauthorized PR Author: <$PR_URL|Check PR>" "#D00000" "true"
        exit 1  # Fail the job for branch protection
        ;;
    "ALL_PASSED")
        if [[ "$BASE_REF" == "develop" ]]; then
            MESSAGE=":white_check_mark: *Unit Tests & Linter passed!* *<$PR_URL|PR #$PR_NUMBER>* by *$GITHUB_ACTOR*. Label 'eas-preview' has been added."
        elif [[ "$BASE_REF" == "main" ]]; then
            MESSAGE=":white_check_mark: *Unit Tests & Linter passed!* *<$PR_URL|PR #$PR_NUMBER>* by *$GITHUB_ACTOR*. Label 'eas-production' has been added."
        else
            MESSAGE=":white_check_mark: *Unit Tests & Linter passed!* *<$PR_URL|PR #$PR_NUMBER>* by *$GITHUB_ACTOR*."
        fi
        send_slack_message "$MESSAGE" "" "false"
        ;;
    *)
        echo "Unknown notification type: $NOTIFICATION_TYPE"
        exit 1
        ;;
esac