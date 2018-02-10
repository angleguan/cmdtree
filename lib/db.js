const low = require('lowdb'),
  path = require('path'),
  FileSync = require('lowdb/adapters/FileSync'),
  fs = require('fs-extra'),
  config = require('./config');

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

const postsAdapter = new FileSync(POSTS_DB),
  pagesAdapter = new FileSync(PAGES_DB);

const _postsDb = low(postsAdapter),
  _pagesDb = low(pagesAdapter);

_postsDb.defaults({noSortedposts: []})
  .write();

_pagesDb.defaults({pages: []})
  .write();

module.exports = function () {

  this.appendPostsDb = currentDb => {

    _postsDb.get('noSortedposts')
      .push(
        {
          path: currentDb.path,
          title: currentDb.title,
          date: currentDb.date(),
          category: currentDb.category,
          content: currentDb.conetnt,
          url: currentDb.url
        }
      )
      .write();

    // console.log("write db")
  };

  this.appendPagesDb = currentDb => {

    _pagesDb.get('pages')
      .push(
        {
          path: currentDb.path,
          title: currentDb.title,
          content: currentDb.content
        }
      )
      .write();
  };

  this.sortDb = () => {

    const postsFile = fs.readFileSync(POSTS_DB, 'utf-8'); // right

    // console.log(postsFile)

    const dbPosts = JSON.parse(postsFile).noSortedposts;

    function formatDate(item) {
      return parseInt(item.replace(/-/g, ''));
    }

    // console.log(typeof dbPosts)

    let posts = dbPosts.sort((a, b) => formatDate(b.date) - formatDate(a.date));

    _postsDb.unset('noSortedposts')
      .write();

    _postsDb.defaults({posts})
      .write();

    // console.log('sort db')

  }
};
