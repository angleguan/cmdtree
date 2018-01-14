#!/bin/bash

# clone theme
git clone https://github.com/rhatyang/hexo-theme-zy.git themes/zy

# clean and generate

hexo clean

hexo g

echo "Build Finish"