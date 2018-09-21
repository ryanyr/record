'use strict';

const Controller = require('egg').Controller;

class postController extends Controller {

  async getAllPosts() {

    var posts = await this.ctx.service.postsList.getAllPost();
    await this.ctx.render('client/postsList.html', {
      posts:posts,
      title: '会议列表',
    });

  }

  async getMonthyPosts() {
    
    var posts = await this.ctx.service.postsList.getMonthyPosts();
    await this.ctx.render('client/monthList.html', {
      posts:posts,
      title: '本月会议',
    });

  }

  async getMedia() {

    var media = await this.ctx.service.postsList.getMedia();
    await this.ctx.render('client/mediaList.html', {
      media:media,
      title: '视频列表',
    });

  }

  async getMediaDetail() {
    var id = await this.ctx.request.query;
    // console.log(postid);
    var media = await this.ctx.service.postsList.getMediaDetail(id);
    // console.log(post);
    await this.ctx.render('client/media.html', {
      media:media,
      title: '视频详情',
    });
  }

  async getDoctors() {

    var doctors = await this.ctx.service.postsList.getDoctors();
    console.log(doctors);
    await this.ctx.render('client/doctors.html', {
      doctors:doctors,
      title: '专家学者',
    });

  }

  async getDistrict(){
    var districts = await this.ctx.service.postsList.getAllDistricts();
    // console.log(districts);
    this.ctx.body = {districts: districts};
    this.ctx.status = 200;
  }

  async getDepartment(){
    var departments = await this.ctx.service.postsList.getAllDepartments();
    // console.log(districts);
    this.ctx.body = {departments: departments};
    this.ctx.status = 200;
  }

  async getYear(){
    var years = await this.ctx.service.postsList.getAllYears();
    // console.log(districts);
    this.ctx.body = {years: years};
    this.ctx.status = 200;
  }

  async getMonth(){
    var months = await this.ctx.service.postsList.getAllMonths();
    // console.log(districts);
    this.ctx.body = {months: months};
    this.ctx.status = 200;
  }

  async getPostsByDistrict(){
    var req = await this.ctx.request.query;
    // console.log(req);
    var posts = await this.ctx.service.postsList.getPostsByDistrict(req);
    // console.log(posts);
    this.ctx.body = {posts: posts};
    this.ctx.status = 200;
  }

  async getPostsByDepartment(){
    var req = await this.ctx.request.query;
    // console.log(req);
    var posts = await this.ctx.service.postsList.getPostsByDepartment(req);
    // console.log(posts);
    this.ctx.body = {posts: posts};
    this.ctx.status = 200;
  }

  async getPostsByYear(){
    var req = await this.ctx.request.query;
    // console.log(req);
    var posts = await this.ctx.service.postsList.getPostsByYear(req);
    // console.log(posts);
    this.ctx.body = {posts: posts};
    this.ctx.status = 200;
  }

  async getPostsByMonth(){
    var req = await this.ctx.request.query;
    // console.log(req);
    var posts = await this.ctx.service.postsList.getPostsByMonth(req);
    // console.log(posts);
    this.ctx.body = {posts: posts};
    this.ctx.status = 200;
  }

  async getPostsByAll(){
    var req = await this.ctx.request.query;
    // console.log(req);
    var posts = await this.ctx.service.postsList.getPostsByAll(req);
    // console.log(posts);
    this.ctx.body = {posts: posts};
    this.ctx.status = 200;
  }

  async getPostsByKeywords(){
    var req = await this.ctx.request.query;
    console.log(req);
    var posts = await this.ctx.service.postsList.getPostsByKeywords(req);
    // console.log(posts);
    this.ctx.body = {posts: posts};
    this.ctx.status = 200;
  }

  async getPostDetail(){
    var postid = await this.ctx.request.query;
    // console.log(postid);
    var post = await this.ctx.service.postsList.getPostDetail(postid);
    // console.log(post);
    await this.ctx.render('client/post.html', {
      post:post,
      title: '会议详情',
    });
  }

  async getDoctorinfo(){
    var id = await this.ctx.request.query;
    // console.log(postid);
    var doctor = await this.ctx.service.postsList.getDoctorinfo(id);
    // console.log(post);
    await this.ctx.render('client/doctorinfo.html', {
      doctor:doctor,
      title: '专家信息',
    });
  }

  async getMediaByKeywords(){
    var req = await this.ctx.request.query;
    console.log(req);
    var media = await this.ctx.service.postsList.getMediaByKeywords(req);
    // console.log(media);
    this.ctx.body = {media: media};
    this.ctx.status = 200;
  }

  async getDoctorByKeywords(){
    var req = await this.ctx.request.query;
    console.log(req);
    var doctors = await this.ctx.service.postsList.getDoctorByKeywords(req);
    // console.log(media);
    this.ctx.body = {doctors: doctors};
    this.ctx.status = 200;
  }

  
}

module.exports = postController;