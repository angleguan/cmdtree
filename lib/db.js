const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const fs = require('fs-extra');
const config = require('./config');

const POSTS_DB = config.postsDb;
const PAGES_DB = config.pagesDb;

if (fs.existsSync(POSTS_DB)) {
  fs.unlinkSync(POSTS_DB)
}

if (fs.existsSync(PAGES_DB)) {
  fs.unlinkSync(PAGES_DB)
}

if (!fs.existsSync(config.db_dir)) {
  fs.mkdirSync(config.db_dir);
}

const postsAdapter = new FileSync(POSTS_DB);
const pagesAdapter = new FileSync(PAGES_DB);

const _postsDb = low(postsAdapter);
const _pagesDb = low(pagesAdapter);

_postsDb.defaults({
    noSortedposts: []
  })
  .write();

_pagesDb.defaults({
    pages: []
  })
  .write();

module.exports = {

  appendPostsDb: currentPost => {

    _postsDb.get('noSortedposts')
      .push({
        path: currentPost.path,
        title: currentPost.title,
        date: currentPost.date,
        category: currentPost.category,
        content: currentPost.content,
        url: config.site_url + '/' + currentPost.path
      })
      .write();
  },

  appendPagesDb: currentPage => {

    _pagesDb.get('pages')
      .push({
        path: currentPage.path,
        title: currentPage.title,
        content: currentPage.content,
        url: config.site_url + '/' + currentPage.path
      })
      .write();
  },

  sortDb: () => {

    let posts = JSON.parse(fs.readFileSync(POSTS_DB, 'utf-8')).noSortedposts.sort((a, b) => formatDate(b.date) - formatDate(a.date));

    _postsDb.unset('noSortedposts')
      .write();

    _postsDb.defaults({
        posts
      })
      .write();

    _postsDb.set('count', posts.length).write()
  }

};

function formatDate(item) {
  return parseInt(item.replace(/-/g, ''))
}
