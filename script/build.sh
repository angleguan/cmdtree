#!/bin/bash

# clean and generate
hexo clean
hexo g
echo "Build Finish"

echo "Begin compress code"
gulp compress
echo "End compress"