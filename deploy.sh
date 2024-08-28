echo "Building..."
echo "======================================================================="
sh build.sh || exit 1
echo "Copying site to ../missukissu.github.io"
sh copy_site.sh || exit 1
cd ../missukissu.github.io
echo "Merging remote into local master branch..."
echo "======================================================================="
git fetch origin
git merge origin/master
echo "Committing to Git..."
echo "======================================================================="
git add .
git commit -m "commit-date: `date '+%Y-%m-%d %H:%M:%S'`"
echo "Pushing to remote..."
echo "======================================================================="
git push origin master
cd ../MISSUKISSU
echo "======================================================================="
echo "Complete!"
echo "======================================================================="
