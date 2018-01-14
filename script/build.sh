#!/bin/bash

# clean and generate
hexo clean
hexo g
echo "Build Finish"

script/compress