const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function copyDirSync(sourceDirectory, targetDirectory) {
  fs.readdirSync(sourceDirectory).forEach(fileOrDirector => {
    const filePath = path.resolve(sourceDirectory, fileOrDirector);

    const fsStats = fs.statSync(filePath);
    if (fsStats.isFile()) {
      console.info(
        'copy ' +
        chalk.green(fileOrDirector) +
        ` to ${ targetDirectory.substr(targetDirectory.lastIndexOf('/') + 1) } directory`);
      fs.copyFileSync(filePath, path.resolve(targetDirectory, fileOrDirector))
    }
    if (fsStats.isDirectory()) {
      const newSourceDir = path.resolve(sourceDirectory, fileOrDirector);
      const newTargetDir = path.resolve(targetDirectory, fileOrDirector);
      fs.mkdirSync(newTargetDir);
      copyDirSync(newSourceDir, newTargetDir)
    }
  })
}

const copyDirAsync = (function () {
  let fileCount = 0;
  let copyCount = 0;

  return function copyAsync(sourceDirectory, targetDirectory, callBack) {
    fs.readdir(sourceDirectory, (error, files) => {
      if (error) {
        console.log(error);
        return
      }
      // 遍历文件或者目录的数组

      fileCount += files.length;
      files.forEach(fileOrDirectory => {
        const filePath = path.resolve(sourceDirectory, fileOrDirectory);

        fs.stat(filePath, (error, stats) => {
          if (stats.isFile()) {
            console.info(
              'copy ' +
              chalk.green(fileOrDirectory) +
              ` to ${ targetDirectory.substr(targetDirectory.lastIndexOf('/') + 1) } directory`
            );

            fs.copyFile(filePath, path.resolve(targetDirectory, fileOrDirectory), (error) => {
              if (error) {
                callBack(error);
                process.exit()
              }
              // 如果复制的次数等于文件的个数，则异步复制完成，触发回调函数
              copyCount++;
              if (copyCount >= fileCount) {
                callBack(null)
              }
            })
          }

          if (stats.isDirectory()) {
            const newSourceDir = path.resolve(sourceDirectory, fileOrDirectory);
            const newTargetDir = path.resolve(targetDirectory, fileOrDirectory);

            fs.mkdir(newTargetDir, (error) => {
              if (error) {
                console.log(error);
                return;
              }
              copyCount++;
              copyAsync(newSourceDir, newTargetDir, callBack)
            })
          }
        })
      })
    })
  }
})();


function copyDir(sourceDirectory, targetDirectory, callBack = () => {
}) {
  copyDirAsync(sourceDirectory, targetDirectory, callBack)
}

copyDir.copyDirSync = copyDirSync;

module.exports = copyDir;
