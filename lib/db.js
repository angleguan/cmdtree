const low = require('lowdb'),
  FileSync = require('lowdb/adapters/FileSync'),
  fs = require('fs-extra');

if (fs.existsSync('posts.json')) {
  fs.unlinkSync('posts.json')
}

const adapter = new FileSync('posts.json');
const db = low(adapter);

db.defaults({noSortedposts: []})
  .write();

module.exports = function () {
  this.appendDb = (cdb) => {
    db.get('noSortedposts')
      .push(
        {
          path: cdb.path,
          title: cdb.title,
          date: cdb.date(),
          category: cdb.category,
          content: cdb.conetnt
        }
      )
      .write();
  };

  this.sortDb = () => {
    const gb = fs.readFileSync('./posts.json', 'utf-8');

    const ngb = JSON.parse(gb).noSortedposts;

    let posts = ngb.sort((a, b) => parseInt(a.date.replace(/-/g, '')) - parseInt(b.date.replace(/-/g, '')));

    db.unset('noSortedposts')
      .write();

    db.defaults({posts})
      .write();
  }
};
