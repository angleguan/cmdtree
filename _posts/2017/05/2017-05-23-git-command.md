---
title: Git常用命令
date: 2017-05-23T14:35:57+00:00
layout: post
category: use
---

## 首先我们要生成SSH

```
 $ ssh-keygen -t rsa -C "fanzhiyang2001@gmail.com"
```

将生成的文件夹下的.ssh/id_rsa.pub文件里的内容复制到SSH keys

## 设置用户名和邮箱

```
$ git config --global user.name "rhatyang"
$ git config --global user.email "fanzhiyang2001@gmail.com"
```

## 初始化当前目录的项目

```
git init
```
在项目的根目录会生成.git文件夹

## 在该项目文件夹下新建一个文件，然后把该文件送到暂存区

```
echo "# test" >> README.md
git add .  //将工作区所有修改添加到暂存区
git add filename //将指定文件添加到暂存区
git status  //列出变更文件
```

## 将暂存区修改添加到本地仓库

```
git commit -m '备注信息'
```

## 添加远程仓库，并将上述改动push到远程仓库

```
git remote add origin https://github.com/rhatyang/test.git
git push -u origin master
```

**一般情况下，自己的项目都是添加ssh连接**

```
git remote rm origin   //移除之前添加的origin
git remote add origin git@github.com:rhatyang/test.git       //使用ssh添加新的origin
```

## 放弃暂存区修改

```
git checkout -- filename  //放弃暂存区修改（修改不在）
git rm --cached filename  //放弃add（修改还在，但产生一条delete记录）
git reset HEAD filename   //同上（没有delete记录）
git stash     //暂时放弃未提交的修改
git stash pop  //恢复
```

## 分支操作

```
/*查看分支*/
git branch     //所有本地分支
git branch -r  //所有远程分支
git branch -a  //所有远程分支和本地分支

/*创建分支*/
git branch branchName     //留在当前分支
git checkout -b branchName   //创建并切换分支
git branch --set-upstream-to=<remote>/branchName  //建立本地分支与远程分支的追踪关系
git branch --track branchName  [remote branch]   //新建一个分支，并与远程建立追踪关系
git checkout branchName  //切到指定分支

/*分支合并*/
git pull origin branch   //取回远程更新并与本地分支合并
git fetch origin branch //取回远程更新
git merge branch  //合并指定分支到当前分支(产生提交记录)
git rebase branch  //合并指定分支到当前分支(不产生提交记录，比较适合有强迫症的)

git cherry-pick commitId  //将与commitId对应的提交合进当前分支
```
