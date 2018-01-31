const rmrf = require('rimraf'),
  config = require('../lib/config');

rmrf(config.public_dir, err => {
  if (!err) {
    console.log('删除生成文件目录成功')
  }
});

rmrf(config.db_Dir, err => {
  if (!err) {
    console.log('删除数据库成功')
  }
})