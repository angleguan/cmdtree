---
layout: post
date: 2017-03-20 18:12:15
title: 给Git命令使用别名
category: 使用笔记
---

有的时候我们在操作Git时通常要输入非常长的命令又或者是两三行的命令，太麻烦了！

我们可以像在Linux中那样给命令设置别名，适用于所有平台。

## 如何设置别名

首先，要设置一个别名，你有2个选择
1）

```
$ git config --global alias.co checkout
```

是不是非常简单。上面的代码表示，co是一个别名checkout。


2）编辑 .gitconfig

你.gitconfig可能看起来像这样：
```
[alias]
co = checkout
```

你还可以使用"!"在shell中执行alised命令。

```
di=!git status --porcelain --short --ignored | sed -n '"s/^!! //p"'
```


## 注意事项

创建别名时，你要注意一下这些：

1）Git别名不区分大小写
```
git gco # Lowercase
git gCo # is actually the same
```

2）创建太多的shell别名可能会导致命令名冲突。

例如GS，你使用`git status`可能会和Ghost Script起冲突。幸运的是我不用Ghost

你也可以通过输入可执行文件全路径跳过别名，如`/usr/bin/GS`。

## 实际别名

首先，我们将Prezto对于Git的别名转换为对应的Git命令。

在转换过程中将排除`git submodule`和`git flow`别名，因为他们使用的是大写字母用来区分git stash和git fetch。

```
[alias]
  # Branch (b)
  b=branch
  ba=branch --all --verbose --verbose
  bl=branch --verbose --verbose
  bc=checkout -b
  bx=branch --delete
  bm=branch --move
  bs=show-branch

  # Commit (c)
  c=commit
  ca=commit --all
  cm=commit --message
  cam=commit --all --message
  co=checkout
  cop=checkout --patch
  cf=commit --amend --reuse-message HEAD
  chp=cherry-pick
  cr=revert
  cres=reset "HEAD^"
  cs=show

  # Data (d)
  d=ls-files
  dc=ls-files --cached
  dd=ls-files --deleted
  dx=ls-files --deleted
  dm=ls-files --modified
  do=ls-files --other --exclude-standard
  dk=ls-files --killed
  di=!git status --porcelain --short --ignored | sed -n '"s/^!! //p"'

  # Fetch (f)
  f=fetch
  fa=fetch --all
  fc=clone
  fp=pull
  fr=pull --rebase
  fpr=pull --rebase

  # Grep (g)
  g=grep
  gi=grep --ignore-case
  gl=grep --files-with-matches
  gL=grep --files-without-matches
  gv=grep --invert-match
  gw=grep --word-regexp

  # Index (i)
  ia=add
  iap=add --patch
  iu=add --update
  id=diff --no-ext-diff --cached
  idw=diff --no-ext-diff --cached --word-diff
  ir=reset
  irp=reset --patch
  ix=rm -r --cached

  # Merge (m)
  m=merge
  mnc=merge --no-commit
  mf=merge --ff
  mnf=merge --no-ff
  ma=merge --abort
  mt=mergetool

  # Push (p)
  p=push
  pf=push --force-with-lease
  pa=push --all
  pt=push --tags
  pat=push --all && git push --tags
  pc=!git push --set-upstream origin "$(git-branch-current 2> /dev/null)"
  pp=!git pull origin "$(git-branch-current 2> /dev/null)" && git push origin "$(git-branch-current 2> /dev/null)"

  # Rebase (r)
  r=rebase
  ra=rebase --abort
  rc=rebase --continue
  ri=rebase --interactive
  rs=rebase --skip

  # Stash (s)
  stsh = stash --keep-index
  staash = stash --include-untracked
  staaash = stash --all
  s=stash
  sa=stash apply
  sx=stash drop
  sl=stash list
  sd=stash show --patch --stat
  sp=stash pop
  ss=stash save
  ssu=stash save --include-untracked

  # Working Copy (w)
  ws=status
  wd=diff --no-ext-diff
  wdw=diff --no-ext-diff --word-diff
  wrs=reset --soft
  wrh=reset --hard
  wc=clean -n
  wcf=clean -f
  wcfd=clean -df
  wx=rm -r
  wxf=rm -rf

```

然后，我们将根据[这个stackoverflow答案](https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs/9074343#9074343)添加日志别名。

```
# Log (l)
l1 = log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all
l2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all
l = !git l1
```

使用下面的别名可以添加快照而不上传，很酷吧

```
snapshot = !git stash save "snapshot: $(date)" && git stash apply "stash@{0}"
ls-snapshots = !git stash list --grep snapshot
```

列出最近的分支有时是有用的。
```
recent-branches = !git for-each-ref --count=15 --sort=-committerdate refs/heads/ --format='%(refname:short)'
```

最后添加URL链接到常用网址

```
[url "https://aur.archlinux.org/"]
  insteadOf = "aur:"
[url "ssh+git://aur4.archlinux.org/"]
  pushInsteadOf = "aur:"
[url "https://github.com/"]
  insteadOf = "gh:"
[url "git@github.com:"]
  pushInsteadOf = "gh:"
```

## 一些提示

下面这些不是别名，但可能有用。

Verbose提交消息默认（包括注释掉差异）

```
[commit]
    verbose = true
```

默认推送位置
```
[push]
    default = upstream
```

启用[rerere](https://git-scm.com/blog/2010/03/08/rerere.html)
```
[rerere]
    enabled = true
```

启用彩色输出
```
[color]
    ui = true
```

## 最后

这些别名可能会让你产生过对依赖，如果你感觉不使用这些别名对你的工作效率更加有益，你也可以不用，总之以效率为主。

