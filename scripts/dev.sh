#!/bin/bash

# npm run dev launch

# If PORT is not defined
if [ -z "$PORT" ]; then

  # Check if .env file exists
  if [ -f .env ]; then
    # Read PORT value from .env
    PORT=$(grep -E '^PORT=' .env | cut -d '=' -f 2-)
  fi

  # Check if POST is still null
  if [ -z "$PORT" ]; then
    # Default value if not set in .env or system environment
    PORT="8080"  
  fi
fi

next dev --port $PORT