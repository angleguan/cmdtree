---
title: 合并两个Git仓库
date: 2018-2-1 16:44:29
category: 使用笔记
---

记录一下合并两个git仓库的方法

### 原理

先说一下原理

将要合并的仓库添加到另一个仓库作为远程仓库，可以是一个远程仓库也可以是一个本地仓库使用相对路径也可。

使用git fetch命令下载要合并仓库的数据

将fetch下来的仓库作为一个分支添加到本地

合并两个分支即可

### 具体命令

不变的仓库为repo2，要合并到repo1中，一下操作均在repo1中

```
git remote add other ../repo2 ## 要合并的仓库的路径
git fetch other 
git checkout -b repo2 other/master
git checkout master
git merge repo2
```

合并（merge）过程中若遇到报错

```
fatal: refusing to merge unrelated histories
```

则加上`--allow-unrelated-histories`参数

```
git merge repo2 --allow-unrelated-histories
```