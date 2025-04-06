#!/bin/bash

# Create src/assets directory if it doesn't exist
mkdir -p public/src/assets

# Generate gallery images 2-8
for i in {2..8}; do
cat > public/src/assets/gallery-$i.jpg << EOF
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#0B6E4F" opacity="0.2" />
  <circle cx="400" cy="400" r="150" fill="#0B6E4F" opacity="0.4" />
  <text x="400" y="400" font-family="Arial" font-size="32" text-anchor="middle" fill="#0B6E4F">
    Gallery Image $i
  </text>
</svg>
EOF
done

echo "Gallery image placeholders created." 