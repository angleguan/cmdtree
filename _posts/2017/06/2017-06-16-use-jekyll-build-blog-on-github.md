---
title: 使用Jekyll在Github上搭建博客
date: 2017-06-16T22:10:39+00:00
layout: post
category: use
---

## 使用Github Pages

首先，你需要创建一个仓库按照这种 `yourname.github.io`命名格式（你也可以使用其它名称）

然后clone到本地

```
$ git clone git@github.com:yourname/yourname.github.io.git
```

在`yourname.github.io`文件夹内，你可以新建一个文件，像这样
```
    <!doctype html>
    <html>
      <head>
        <title>Hello</title>
      </head>

      <body>
        <h1>Hello!</h1>
      </body>
    </html>
```

然后推送到Github

```
    $ git add .
    $ git commit -a -m 'init commit.'
    $ git push origin master
```

一般如果按照`yourname.github.io`这种格式创建的仓库会默认开启Pages服务，如果没有，或者你使用了其它名称的仓库，需要在仓库的【Setting】下找到这个并选择你的分支即可

![](/pics/2017/11/Screenshot_20171102_104929.png)

现在你打开 `yourname.github.io` 就可以看到刚才新建的页面了。**这就是Github Pages服务**

## 使用Jekyll

![](/pics/2017/11/a3861d0800a231783e7ae74a2815132e.png)

> jekyll是一个使用Ruby编写的静态站点生成工具，使用Liquid模板渲染引擎，支持Markdown和Textile标记语言，并且可以为所有以 .html、.markdown、.textile扩展名结尾的文件使用YAML配置，内置语法高亮功能。

而Github的Pages服务可以为每个Github主机上的仓库提供静态页面服务，并且Github Pages服务支持Jekyll自动编译，也就说你可以将未生成的Jekyll源代码push到仓库由Github替你完成生成服务，这是Jekyll相对于其它静态博客生成系统的一大优点。

**说白了Jekyll就是一个可以把你用Markdown写的文章变成HTML的工具，而Github Pages来帮你执行这个任务自动部署**


### 安装Jekyll

使用ruby gem安装，如果在这里遇到什么问题，可以看一下这里[Jekyll最全使用指南 - ZhiYang Blog](https://fanzhiyang.com/blog/jekyll/)

```
$ gem install jekyll
```

然后生成一个站点


```
$ jekyll new newsite
```

进入这个站点并输入

```
$ jekyll s
```

建议按照`bundle`并使用`bunlde`运行这个命令

```
$ gem install bundle
$ bundle exec jekyll s
```

然后在浏览器访问`127.0.0.1:4000`就可以看到网站了，关于Jekyll的更多使用技巧或者问题可以查看我写过的更多的关于Jekyll的内容。


## 绑定域名

默认的`yourname.github.io` 域名不好看，你可以自己购买一个域名并绑定到Github Pages

1. 在你的仓库中新建内容为 www.youdomain.com 的 CNAME 文件；
2. 在你的域名管理页或者是DNS解析的地方，增加一个记录，记录类别为CNAME(Alias)类型.

**Note：** 如果你在CNAME中填写的是顶级域名，就得设置DNS的记录类别为CNAME型，并设置主机为 `yourname.github.io`。详细介绍请移步Github的Pages页面。

接下来我们只需要按照自己的喜好设计页面。首先认识下jekyll的文件及目录配置:

      .
      |-- _includes
      |-- _plugins 
      |-- _layout 
      |   |-- default.html
      |   `-- post.html
      |-- _post
      |   |-- yyyy-mm-dd-title.markdown
      |   `-- yyyy-mm-dd-title.markdown
      |-- _site
      |-- _config.yml
      `-- index.html

**_includes**存放你需要在模板文件中包含的文件，你可以使用Liquid标签 `{‰ include header.html ‰} `来引用相应的文件。

**_plugins**可以增加你自己的插件

**_layout**存放布局模板

**_post**存放文章列表，文件命名一定要遵循 `yyyy-mm-dd-title.md` 规则

**_sitejekyll**自动生成的，所以可以忽略，如果你有在本地安装jekyll并预览了的话，可以使用.gitignore设置Git停止对本目录的跟踪。

**_config.yml**设置经常使用的配置选项，这样在本地启动预览时就不用每次都手动输入了。

**index.html 和所有的 HTML/Markdown/Textile 文件** 所有的HTML/Markdown/Textile文件都可以包含 YAML 配置，这类文件都会被jekyll解析。

现在你可以在自己的仓库中配置好你自己的目录及文件，也可以`clone`我的仓库，然后修改。

    $ git clone https://github.com/rhatyang/rhatyang.github.io.git

参考及相关资料：

* <http://pages.github.com/>
* <https://github.com/mojombo/jekyll/wiki>
* <http://blog.envylabs.com/2009/08/publishing-a-blog-with-github-pages-and-jekyll/>
* <http://daringfireball.net/projects/markdown/syntax>

