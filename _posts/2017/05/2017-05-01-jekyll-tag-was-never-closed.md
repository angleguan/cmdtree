---
layout: post
date: 2017-05-01 09:57:48
title: "Jekyll error：tag was never closed"
category: use
---

#### 解决办法是不要在文章开头添加raw标签!


之前没有碰到过这个问题，如果你在文章的开头是{% raw %}{% raw %}{% endraw %}或者是{% raw %}{% highlight %}{% endraw %}，那么运行Jekyll时将会提示如下错误：


```
Liquid Exception: Liquid syntax error (line 1): 'raw' tag was never closed in /home/rhatyang/Desktop/blog/_posts/2017/09/2017-09-12-jekyll.md/#excerpt                                                                                                                    
  Liquid Exception: Liquid syntax error (line 1): 'raw' tag was never closed in /_layouts/default.html

```

## 原因

这是因为Jekyll会使用文章的第一行来做默认描述或者摘录。

通过在`_config.yml`中添加
```

excerpt_separator: ""
```


但是这样会完全关闭摘录。

如果你使用默认页面描述的，这样会导致你没有描述，同时会加速你的生成速度。
