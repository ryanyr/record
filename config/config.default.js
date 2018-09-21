'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519788741490_4312';

  // add your config here
  // config.middleware = ['auth'];
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  config.nunjucks = {
    // dir: 'path/to/template/dir',  // default to `{app_root}/app/view`
    cache: true, // local env is false
  };

  config.security = {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      useSession: false, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
    }
  };

   /* config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'egg',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }; */

  exports.sequelize = {
    dialect: 'mysql',
    database: 'egg',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root'

  };

  exports.bcrypt = {
    saltRounds: 10 // default 10
  }

  exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  
  return config;
};


