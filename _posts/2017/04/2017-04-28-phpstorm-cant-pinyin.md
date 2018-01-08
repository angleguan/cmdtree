---
layout: post
date: 2017-04-28 09:18:26 +0800
title: phpstorm不能输入中文的解决办法
category: use
---

在Linux上安装phpstorm之后不能输入中文，通常是因为环境变量未设置正确

找到phpstorm的安装目录，使用`whereis phpstorm`即可找到。

我的是在`/opt/phpstorm/`下，然后打开安装目录中的`bin`文件夹中的`phpstrom.sh`文件，在文件前面加上

```
export XMODIFIERS="@im=fcitx"
export QT_IM_MODULE="fcitx"
```

重启软件即可！

注：JetBrains所有的IDE不能输入中文解决方案同上