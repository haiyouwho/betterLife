#!/bin/sh

git add . 
echo '-------请输入commit:'
read commitText
echo "-------commit信息是: $commitText-------"
git commit -m${commitText}
echo "------------------commit------------------"
git pull origin master
git checkout le
echo '-------切换到le分支-------'
git add . 
echo '-------请输入le分支 commit:'
read commitTextLe
echo "-------commit信息是: $commitTextLe-------"
git commit -m${commitTextLe}
git merge fix
echo '-------合并fix分支-------'
git push origin le
echo '-------推送到le分支-------'
git checkout fix
echo '-------切换到fix分支-------'


