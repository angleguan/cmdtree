const low = require('lowdb'),
  path = require('path'),
  FileSync = require('lowdb/adapters/FileSync'),
  fs = require('fs-extra'),
  config = require('./config');

const postsDb = path.resolve(process.cwd(), config.postsDb);

if (fs.existsSync(postsDb)) {
  fs.unlinkSync(postsDb)
}

const adapter = new FileSync(postsDb);
const db = low(adapter);

db.defaults({noSortedposts: []})
  .write();

module.exports = function () {
  this.appendDb = (currentDb) => {
    db.get('noSortedposts')
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
  };

  this.sortDb = () => {
    const postsFile = fs.readFileSync(postsDb, 'utf-8');

    const dbPosts = JSON.parse(postsFile).noSortedposts;

    function formatDate(item) {
      return parseInt(item.replace(/-/g, ''));
    }

    let posts = dbPosts.sort((a, b) => formatDate(a.date) - formatDate(b.date));

    db.unset('noSortedposts')
      .write();

    db.defaults({posts})
      .write();
  }
};
