const low = require('lowdb'),
  FileSync = require('lowdb/adapters/FileSync'),
  fs = require('fs-extra');

if (fs.existsSync('db.json')) {
  fs.unlinkSync('db.json')
}

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({posts: [], user: {}})
  .write();

function writeDb(appendDb) {
  db.get('posts')
    .push(
      {
        id: appendDb.id,
        path: appendDb.path,
        title: appendDb.title,
        date: appendDb.date("YYYY-MM-DD"),
        category: appendDb.category,
        content: appendDb.conetnt
      }
    )
    .write();
}

module.exports = writeDb;
