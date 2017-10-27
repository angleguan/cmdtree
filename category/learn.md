---
layout: category
title: Learning Notes
permalink: /learn/
---
  <ul>
    {% for post in site.categories.learn %}
    <li>
      <span class="post-date">{{ post.date | date: "%Y年%m月%d日" }} » </span>
      <h2>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
    </li>
    {% endfor %}
  </ul>