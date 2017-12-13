#!/bin/bash

git add . 
echo '请输入commit:'
read commitText
echo 'commit信息是: ${commitText}'
git commit -m ${commitText}
git pull origin master
git checkout le
echo '切换到le分支'
git merge fix
echo '合并fix分支'
git push origin le
echo '推送到le分支'
git checkout fix
echo '切换到fix分支'


