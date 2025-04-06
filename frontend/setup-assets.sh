#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p src/assets

# Copy all SVG placeholders from public/src/assets to src/assets
echo "Copying placeholder images to src/assets..."
cp -r public/src/assets/* src/assets/

echo "Assets setup complete!"
echo "You can now run 'npm run dev' to start the development server." 