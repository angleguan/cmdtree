const marked = require('marked'),
  hljs = require('highlight.js');

// 不知道为什么使用marked+highlight.js高亮代码会慢一些
marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  autolink: true,
  highlight: (code) => hljs.highlightAuto(code).value,
})
