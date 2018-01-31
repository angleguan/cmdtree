const low = require('lowdb'),
  path = require('path'),
  FileSync = require('lowdb/adapters/FileSync'),
  fs = require('fs-extra'),
  config = require('./config');

const postsDb = config.postsDb;

const pagesDb = config.pagesDb;

if (fs.existsSync(postsDb)) {
  fs.unlinkSync(postsDb)
}

if (fs.existsSync(pagesDb)) {
  fs.unlinkSync(pagesDb)
}

if (!fs.existsSync(config.db_Dir)) {
  fs.mkdirSync(config.db_Dir);
}

const postsAdapter = new FileSync(postsDb),
  pagesAdapter = new FileSync(pagesDb);

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
          content: currentDb.conetnt
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

    const postsFile = fs.readFileSync(postsDb, 'utf-8'); // right

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
