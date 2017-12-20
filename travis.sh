#!/usr/bin/env bash
set -e # halt script on error

echo 'Testing travis...'
gem install jekyll
jekyll build