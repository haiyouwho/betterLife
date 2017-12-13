#!/bin/bash

git add . 
each '请输入commit:'
read commitText
git commit -m $commitText
git pull origin master
git checkout le
git merge fix
git push origin master 