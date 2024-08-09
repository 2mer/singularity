#!/bin/bash

# Function to handle script termination
cleanup() {
    echo -e "\nScript terminated by the user. Exiting..."
    exit 1
}

# Trap the SIGINT signal (Ctrl+C) to run the cleanup function
trap cleanup SIGINT

# Ask for the package name
read -p "Enter the package name: " PACKAGE_NAME

# Check if the user provided a package name
if [ -z "$PACKAGE_NAME" ]; then
    echo "No package name provided. Exiting..."
    exit 1
fi

# Define the source and destination directories
SOURCE_DIR="template/package"
DEST_DIR="packages/$PACKAGE_NAME"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy files from the source directory to the destination directory
cp -r "$SOURCE_DIR/"* "$DEST_DIR"

# Replace <PACKAGE_NAME> in all files within the destination directory
find "$DEST_DIR" -type f -exec sed -i "s/<PACKAGE_NAME>/$PACKAGE_NAME/g" {} +

echo "Package '$PACKAGE_NAME' has been created successfully in '$DEST_DIR'."
