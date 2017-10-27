---
layout: category
title: Use notes
permalink: /use/
---
  <ul>
    {% for post in site.categories.use %}
    <li>
      <span class="post-date">{{ post.date | date: "%Y年%m月%d日" }} » </span>
      <h2>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
    </li>
    {% endfor %}
  </ul>