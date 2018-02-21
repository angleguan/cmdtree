const config = require('./config');
const moment = require('moment');
const posts = require(config.postsDb);
const pages = require(config.pagesDb);
const categories = require(config.categoriesDb);

module.exports = item => {

  let page = {};

  let currentCategory = [];

  if (typeof item === 'string') {

    currentCategory[0] = item;
    currentCategory[1] = [];

    posts.posts.forEach(post => {
      if (post.category === item) {
        currentCategory[1].push(post)
      }
    })

  } else {

    for (let i in item) {
      page.title = item['title'];
      page.date = f => moment(item['date']).format(f || 'YYYY-MM-DD');
      page.category = item['category'];
      page.content = item['content']
    }

  }

  return {
    site: {
      title: config.site_title,
      url: config.site_url,
      posts: posts.posts,
      categories: categories.categories,
      pages: pages.pages,
      last_updated: moment().format('YYYY年M月D日')
    },
    page: page,
    category: currentCategory
  }
};
