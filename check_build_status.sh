#!/bin/bash

APP_NAME=$1
STATUS_FILE="/var/www/ivoryimage.dev/build_status.txt"

# Create the status file if it doesn't exist
if [ ! -f "$STATUS_FILE" ]; then
  touch "$STATUS_FILE"
fi

# Check if the app has been built before
if grep -q "$APP_NAME" "$STATUS_FILE"; then
  echo "BUILT_BEFORE=true" >> $GITHUB_ENV
else
  echo "BUILT_BEFORE=false" >> $GITHUB_ENV
  # Mark the app as built
  echo "$APP_NAME" >> "$STATUS_FILE"
fi
