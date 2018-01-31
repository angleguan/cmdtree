const rmrf = require('rimraf'),
  config = require('../lib/config');

rmrf(config.public_dir, err => {
  if (!err) {
    console.log('删除生成文件目录成功')
  }
});

rmrf(config.postsDb, err => {
  if (!err) {
    console.log('删除文章数据库成功')
  }
});
