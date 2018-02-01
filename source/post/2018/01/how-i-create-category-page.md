---
date: 2018-1-8 14:48:46 +0800
title: Jekyll生成单个分类页面
category: 使用笔记
---

Jekyll有提供生成分类或者标签页面的插件——[jekyll-archives](https://github.com/jekyll/jekyll-archives)，只需简单配置即可使用，但是在Github Pages中不允许使用，所以我只能手动生成分类页了。

具体方法如下：



## 输出单个分类文章

输出分类`CATEGORY`下的所有文章：

```
{% for post in site.categories.CATEGORY %}
  {{ post.title }}
{% endfor %}
```

但是这里的分类只能为英文，中文会报错，但是我又想显示为中文，怎么办呢？

### 使用YAML储存分类信息

我想到的解决办法就是使用YAML（或者任何一种数据储存格式，如JSON）**把英文分类对应的中文储存起来**，然后再需要显示的地方**循环出对应的中文分类**。

储存的文件需要放在`_data`文件夹下，我新建了一个`category.yml`文件如下

```yml
- value: "learn"
  title: "学习笔记"

- value: "linux"
  title: "Unix/Linux"

- value: "js"
  title: "JavaScript"
  link: "javascript"

- value: "history"
  title: "历史爱好者"

- value: "use"
  title: "使用笔记"

- value: "network"
  title: "网络技术与安全"

- value: "lifetime"
  title: "晃眼一生"
```

然后循环英文分类，输出对应的中文名

```
{% for category in post.categories %}
  {% for c in site.data.category %}
    {% if category == c.value %}
      {{ c.title }}
    {% endif %}
  {% endfor %}
{% endfor %}
```

所以事实上在站点的分类变量中，都是英文名，我只是将他输出为中文，如果对此不在意的人可以跳过。

## 生成分类页

这里的分类页**必须**自己手动新建好，这个是没办法的，除了使用Ruby插件，但是我将其简化到容易维护的办法就是，将HTML全部放到一个`layout`文件里，我在`_layouts`文件夹下新建了一个`category.html`文件:

```html
<h2 class="category-title">分类：{{ page.title }}</h2>

<!-- 将分类页的分类赋给变量page_category -->
{% assign page_category = page.category %}
<ul>
  <!-- 因为无法直接在categories后面跟新建的变量,所以只能通过循环判断的方式来确定当前分类 -->
  <!-- 循环所有分类 -->
  {% for category in site.categories %}

  <!-- 如果分类页面的分类与变量中的分类相同 -->
  {% if page_category == category[0] %}

  <!-- 循环此分类中所有文章 -->
  {% for post in category[1] %}
  <li>
    <small class="post-date">{{ post.date | date:"%Y-%m-%d" }}</small>
    <a class="category-post-title" href="{{ post.url }}">
      {{ post.title }}
    </a>
  </li>
  {% endfor %}
  {% endif %}
  {% endfor %}
</ul>
```

然后新建一个`category`文件夹，在里面分别创建好每个分类文件，这些文件只需要定义一些头信息即可

```yml
---
layout: category
title: 学习笔记
category: 学习笔记
---
```

这样就会生成`/category/learn/`页面了。

## 总结

总的来说还是不太复杂的，因为我的分类比较少而且很少会创建新的分类，所以这样可以一直用下去，如果你的分类很多而且经常创建新建新分类就很麻烦了。

*对于我来说这个方法比使用插件更好，因为插件生成的页面如果使用中文名的话它生成的路径也是中文的。*
