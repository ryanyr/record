'use strict';

// had enabled by egg
// exports.static = true;

// exports.mysql = {
//   enable: true,
//   package: 'egg-mysql',
// };

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.passport = {
  enable: true,
  package: 'egg-passport'
}

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}