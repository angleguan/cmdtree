---
date: 2017-09-03 14:20:09
title: Arch Linux 安装 Jekyll
category: 使用笔记
---

#### 补充一个：

Archlinux可以直接用pacman安装`ruby-jekyll`，但是通常这样使用会报错，原因是需要安装一些gem依赖，例如sass等，安装完`ruby-jekyll`再用gem安装一下需要的包就好了

我推荐如果用gem安装jekyll出错时干脆用pacman安装，虽然这样安装的版本会比较低，但是很稳，因为arch的源太新，经常滚到最新的rubydev版本，所以有时候jekyll会报错，pacman安装的则不会。



在我印象中，在Windows或者Ubuntu等系统中安装完Ruby即可使用

```
$ gem install jekyll
```


这条命令来安装好jekyll，通常是没有错误并可以直接使用的。

但是刚才在Archlinux中安装之前我的记忆来安装Jekyll，在运行时却是报错的：

```
$ jekyll -v
-zsh: jekyll: command not found
```

通常，提示一个命令没有发现，就会想到是当前shell中没有添加命令路径，我切换到bash同样也是报错。

其实这是一个很简单的错误，只要把变量路径添加到当前shell的配置文件即可

对于bash，请添加`～/.bashrc`，对于zsh，添加到`~/.zshrc`

```
PATH="$(ruby -e 'print Gem.user_dir')/bin:$PATH"
GEM_HOME=$(ls -t -U | ruby -e 'puts Gem.user_dir')
GEM_PATH=$GEM_HOME
export PATH=$PATH:$GEM_HOME/bin
```


然后还需要安装`bundle`

```
$ gem install bundle

```

但是还是会报错，同上

```
$ bundle -v
-zsh: bundle: command not found
```

照样需要添加路径，但是路径不同

```
export PATH=$PATH:/root/.gem/ruby/2.4.0/bin

```

添加完路径后执行

```
$ source .zshrc  ## 或者.bashrc
```
更新配置文件即可。

