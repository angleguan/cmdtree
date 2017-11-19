---
title: 使用Jekyll在Github上搭建博客
date: 2017-06-16T22:10:39+00:00
layout: post
category: use
---

## 使用Github Pages

开启Github Pages可以把你的仓库变成一个类似虚拟主机一样的东西，用来托管网站的源文件。

首先，我们创建一个仓库，官方推荐使用这种 `yourname.github.io`命名格式（你也可以使用其它名称）

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

一般如果按照`yourname.github.io`这种格式创建的仓库会默认开启Pages服务，如果没有，或者你使用了其它名称的仓库，需要在仓库的【Setting】下找到这个Github Pages设置并选择你的分支即可。

![](/pics/2017/11/Screenshot_20171102_104929.png)

现在你打开 `yourname.github.io` 就可以看到刚才新建的页面了。**这就是Github Pages服务**

## 使用Jekyll

![](/pics/2017/11/a3861d0800a231783e7ae74a2815132e.png)

> jekyll是一个使用Ruby编写的静态站点生成工具，使用Liquid模板渲染引擎，支持Markdown和Textile标记语言，并且可以为所有以 .html、.markdown、.textile扩展名结尾的文件使用YAML配置，内置语法高亮功能。

而Github的Pages服务可以为每个Github主机上的仓库提供静态页面服务，并且Github Pages服务支持Jekyll自动编译，也就说你可以将未生成的Jekyll源代码push到仓库由Github替你完成生成服务，这是Jekyll相对于其它静态博客生成系统的一大优点。

**说白了Jekyll就是一个可以把你用Markdown写的文章变成HTML的工具，而Github Pages来帮你执行这个任务自动部署**


### 安装Jekyll

使用ruby gem安装，如果在这里遇到什么问题，可以看一下这里[Jekyll最全使用指南 - 樊志阳](https://fanzhiyang.com/blog/jekyll/)

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

如果报错，你可以尝试下面的方法

```
$ gem install bundler
$ bundle install
$ bundle exec jekyll s
```

然后在浏览器访问`127.0.0.1:4000`就可以看到网站了，关于Jekyll的更多使用技巧访问[Jekyll最全使用指南 - 樊志阳](https://fanzhiyang.com/blog/jekyll/)

## Jekyll主题

你可以前往[Jekyll Themes](http://jekyllthemes.org/)找到很多Jekyll主题。

下面是一个Jekyll主题（站点）标准的目录结构：

```
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
|-- _sass
	|-- base.scss
|-- _config.yml
`-- index.html
```

**_includes**文件夹存放你需要在模板文件中包含的文件，如`hader.html`你可以使用Liquid标签 `{‰ include header.html ‰} `来引用相应的文件。

**_plugins**文件夹用来存放插件文件（.rb文件)。

**_layout**文件夹存放布局模板，如`post.html`。

**_posts**文件夹用来存放文章文件，文件命名遵循 `yyyy-mm-dd-title.md` 规则。

**_site**自动生成的，所以可以忽略，如果你有在本地安装jekyll并预览了的话，可以在.gitignore文件里设置Git停止对本目录的跟踪。

**_config.yml**文件储存配置选项，这样在本地启动预览时就不用每次都手动输入了。

**index.html 和所有的 HTML/Markdown/Textile 文件** 所有的HTML/Markdown/Textile文件都可以包含 YAML 配置，这类文件都会被jekyll解析并生成网页。

现在你可以在自己的仓库中配置好你自己的目录及文件，也可以`clone`我的仓库，然后修改。

```
$ git clone https://github.com/rhatyang/rhatyang.github.io.git
```

## 撰写文章

所有的文章都储存在`_posts`里，使用Markdown语法，每篇文章都需要撰写YAML头信息，像这样，说明这篇博文的信息：

---
title: 使用Jekyll在Github上搭建博客
date: 2017-06-16T22:10:39+00:00
layout: post
category: Jekyll
---

## 绑定域名

默认的`yourname.github.io` 域名不好看，你可以自己购买一个域名并绑定到Github Pages：

1. 在你的仓库中新建一个名为CNAME的文件，往里面写入你的网站域名（不带HTTPS/HTTP）
2. 在你的域名管理页或者是DNS解析的地方，增加一个记录，记录类别为CNAME类型，指向YOURNAME.github.io即可。

绑定域名后如何开启HTTPS，参考[Github Pages绑定域名添加HTTPS（Cloudflare） - 樊志阳](https://fanzhiyang.com/blog/github-pages-cloudflare-ssl/)

参考及相关资料：

* <http://pages.github.com/>
* <https://github.com/mojombo/jekyll/wiki>
* <http://blog.envylabs.com/2009/08/publishing-a-blog-with-github-pages-and-jekyll/>
* <http://daringfireball.net/projects/markdown/syntax>