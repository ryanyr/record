'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {

    var banners = await this.ctx.service.postsList.getBanners();
    // console.log(banners);
    await this.ctx.render('client/home.html', {
      banners:banners,
      title: '医疗会议查询平台',
    });

  }
  
}

module.exports = HomeController;
