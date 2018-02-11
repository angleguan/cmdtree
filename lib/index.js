const fs = require('fs-extra');
const outputFileSync = require('./output-file-sync');
const path = require('path');
const config  = require('./config');
const pageFile = require(config.pagesDb);
const postFile = require(config.postsDb);
const data = require('./data');
const artTemplate = require('art-template');

const template = {
  home: artTemplate(path.join(config.template_dir + '/index.html'), data()),
  sitemap: artTemplate(path.join(config.template_dir + '/sitemap.xml'), data()),
  post: post => artTemplate(path.join(config.template_dir + '/post.html'), data(post)),
  page: page => artTemplate(path.join(config.template_dir + '/page.html'), data(page)),
  category: category => artTemplate(path.join(config.template_dir + '/category.html'), data(category))
};

function generate() {
  outputFileSync(path.resolve(config.public_dir, 'index.html'), template.home, 'utf8');
  outputFileSync(path.resolve(config.public_dir, 'sitemap.xml'), template.sitemap, 'utf8');
}

function generatePost() {
  postFile.posts.forEach(item => {
    outputFileSync(path.resolve(config.public_dir, item.path), template.post(item), 'utf8')
  });
}

function generatePage() {
  pageFile.pages.forEach(item => {
    outputFileSync(path.resolve(config.public_dir, item.path), template.page(item), 'utf8')
  });

}

function generateCategory() {
  for (let item in config.categories) {
    outputFileSync(path.resolve(config.public_dir, config.post_permalink, config.categories[item] + '.html'), template.category(item), 'utf8');
  }
}

function all() {
  generate();
  generatePost();
  generatePage();
  generateCategory();
}

module.exports = all;
