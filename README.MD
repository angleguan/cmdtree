# Fan Zhiyang's Personal Blog

我的个人博客，使用Jekyll搭建。

如果你也想这样写博客，你可以clone（或者fork）下一份本源码或者下载一个你认为好看的Jekyll主题然后修改一下`_config.yml`文件，把`_posts`下的文章换成你自己的文章即可，当然有的信息我直接写在模板文件里了，自行查找并修改即可。

```
$ git clone https://github.com/rhatyang/blog.git
```

### 启动方法

```
$ bundle install
$ bundle exec jekyll serve
```

具体使用方法可以参见文章: [使用Jekyll在Github上搭建博客](https://fanzhiyang.com/blog/use-jekyll-build-blog-on-github/)

### 关于分类

Jekyll提供有一个自动生成分类页的插件，[jekyll/jekyll-archives: Archive pages for your Jekyll tags and categories.](https://github.com/jekyll/jekyll-archives)，但是Github不允许使用，你可以在本地生成好页面推送到Github或者像我一样自己写分类页面。
