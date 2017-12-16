---
layout: post
date: 2017-12-15 20:47:39 +0800
title: "浅谈Jekyll代码高亮"
category: use
---

要想实现对代码的高亮，首先要搞清楚Jekyll把你在文章（md文件）中的代码块都解析成什么样了。

Jekyll默认使用kramdown解析器，其它解析器不作讨论，然后这里需要注意一下，在Jekyll中你可以使用两种方法来表明代码块：{% raw %}`{% highlight ruby %}`或者用三个反单引号<code>```</code>{% endraw %}来包括代码块。

但是它们解析出来的HTML结构却不同：

如果你是使用这种方法标注代码块（Jekyll增强功能，Liquid标签）

{% raw %}
```
{% highlight ruby %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}
```
{% endraw %}

那么它解析出来的HTML是这样的：

![](/pics/2017/12/1502.png)

即

```js
figure.highlight > pre > code.language-ruby > 一大堆span
```

如果你是这样标注代码的：（这是markdown语法）

![](/pics/2017/12/1501.png)

（因为我在markdown文件中打出这样很麻烦，所以截图了）

那么它解析出来的HTML是这样的：

![](/pics/2017/12/1503.png)

即：

```js
div.highlighter-rouge > div.highlight > pre.highlight > code > 一大堆span
```

当你没有标注是什么语言的时候，它将会直接解析出一个code标签而不会再解析出关键字

![](/pics/2017/12/1504.png)

虽然这两者解析出的`HTML结构`不同，但他们最后解析出的关键字样式是相同的，这就是因为它们使用的高亮器都是`Rouge`，所以你可以**直接使用rouge生成高亮样式文件引用**即可。

```
rougify style monokai.sublime > rouge.css
```

`monokai.sublime`是高亮样式，但是我一直没找到在哪里可以查看到具体有哪些样式和预览。

还有一种高亮生成方案是`Pygments`，这里不作讨论，但是它俩解析出来的小标签是一样的，所以你完全也可以用Pygments生成样式给rouge用。

```
pygmentize -S default -f html -a .highlight > default.css
```

这里`default`也是代码样式，您可以换成其它样式，具体可以到[Pygments — Pygments](http://pygments.org/demo/)查看到一些样式预览，我现在是使用的Pygments生成的tango主题。

还有其它的方法就是使用`highlight.js`了。