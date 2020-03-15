stamp=$(date +'%Y-%m-%d %k:%M')
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$scriptDir/../dist"
rm -rf .git
git init
git remote add origin git@github.com:krawaller/algol-deploy.git
git add .
git commit -m "deploy $stamp"
git push -f origin master
rm -rf .git

