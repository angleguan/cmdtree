git add .
echo "input commit >>"
read commit
git commit -m "$commit"
git push origin master