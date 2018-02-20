---
title: 使用Travis CI自动部署Github Pages
date: 2018-1-15 20:32:26
category: 使用笔记
---

Travis CI是一款免费的用在开源项目上的持续集成化服务，与Github绑定后，每次当项目进行提交之后都会自动对项目进行构建or测试，甚至部署。

现在要说的就是Travis的其中一项功能——自动部署Github Pages，注意，这貌似是Travis新推出的服务，网上大部分使用Travis进行部署Pages的方法还是使用SSH协议来推送到部署分支，而现在可以直接在配置文件`travis.yml`中配置pages服务。

## 前提条件

这里假定你有使用过Travis的经历，如果没有请先去了解一下Travis的基本操作方法。



## 操作方法

### 一、获取Github Token

Github Token是一个供你可以在第三方服务或API中操作仓库的令牌，所以这里先获取到Github Token然后给Travis，其部署的时候才能将生成的网页推送到你的仓库。

在任何页面的右上角，点击你的个人资料照片，然后点击**设置**。

![](/pics/2018/01/1501.png)

在左侧边栏中，点击**开发者设置**。

![](/pics/2018/01/1502.png)

点击个人令牌，然后点击**生成新令牌**

![](/pics/2018/01/1503.png)

在这里输入令牌描述，然后勾选权限，把所有权限都勾上

![](/pics/2018/01/1504.png)

然后你就可以得到一串token，复制好，因为你以后也无法再查看这串token了。

### 二、配置环境变量

在travis网站中打开你的项目，点击右上角的更多选项，选择设置

![](/pics/2018/01/1505.png)

看到下面的环境变量

![](/pics/2018/01/1506.png)

在第一栏填入名称，第二栏填入刚才复制的Github Token值，第三项**绝对不能勾选**，因为这样会把你的token值完全暴露给别人，这是很危险的。

### 三、配置travis.yml

在你的`travis.yml`文件的**最下面**添加如下内容

```yml
deploy:
  provider: pages # Github Pages服务
  local_dir: public # 要推送的目录
  skip-cleanup: true # 必须为true
  github-token: $GITHUB_TOKEN  # 你刚才在设置中填入的变量名
  keep-history: false # 是否保留历史记录
  on:
    branch: master
  target_branch: gh-pages # 提交到的分支
```

需要注意：

- local_dir：这里应该填你使用的程序生成的网页的目录，若是Jekyll应为`_site`

- keep-history：因为travis使用`git push --force`推送代码会覆盖历史，当然其实这样更好，反正都是生成的网页，留着也没用反而会占仓库空间。

#### 配置生成程序命令

这里想一下还是稍微提一下，你应该在`delpoy`命令之前先配置好你使用的程序的生成命令或者你自定义的其它任务（感觉是废话）。

travis在`deploy`阶段之前有`install`和`script`阶段供你来自定义任务，你还需要在最前面选择你的项目语言和版本，这些基本操作就不多说了。

## 了解更多

更多关于Pages部署的内容可以浏览官方文档[GitHub Pages Deployment - Travis CI](https://docs.travis-ci.com/user/deployment/pages/)。
