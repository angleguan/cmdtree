const fs = require('fs-extra'),
  rd = require('rd');

function createCategoryDir() {
  const categoryList = config.category;

  for (let item in categoryList) {
    fs.mkdirSync(path.join(__dirname, public_dir, categoryList[item]));
  }
}

module.exports = createCategoryDir;
