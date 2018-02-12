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

const formatDate = item => parseInt(item.replace(/-/g, ''));

module.exports = {

  appendPostsDb: currentDb => {

    _postsDb.get('noSortedposts')
      .push({
        path: currentDb.path,
        title: currentDb.title,
        date: currentDb.date(),
        category: currentDb.category,
        content: currentDb.conetnt,
        url: currentDb.url
      })
      .write();
  },

  appendPagesDb: currentDb => {

    _pagesDb.get('pages')
      .push({
        path: currentDb.path,
        title: currentDb.title,
        content: currentDb.content,
        url: currentDb.url
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
  }

};
