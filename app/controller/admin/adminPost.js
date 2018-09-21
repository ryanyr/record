'use strict';
const fs = require('fs');
const path = require('path');
const uuidV1 = require('uuid/v1');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

class adminController extends Controller {

    async login() {
        // var posts = await this.ctx.service.postsList.getAllPost();
        await this.ctx.render('admin/login.html', {
        //   posts:posts,
          title: '后台管理平台-登录',
          msg:''
        });
    
      }

    async reg() {
      // var posts = await this.ctx.service.postsList.getAllPost();
      await this.ctx.render('admin/reg.html', {
      //   posts:posts,
        title: '后台管理平台-注册',
      });
  
    }

    async doLogin() {
        var req = this.ctx.request.body;
        // console.log(req);
        // this.ctx.body = {posts:1}
        // this.ctx.status = 200;
        var user = await this.ctx.service.admin.doLogin(req);
        // console.log(user);
        if(!user){
          this.ctx.body = {islogin:false,msg:'用户账号或密码错误'};
          this.ctx.status = 200;
        }else{
          this.ctx.body = {islogin:true,msg:'登录成功'};
          this.ctx.status = 200;
          //处理user session
          var username = user.username;
          var password = user.password;
          var name = user.name;
          var uuser = {
            username:username,
            password:password,
            name:name
          };
          this.ctx.session.user = user;
        }
    
      }

    async doReg() {
        var req = this.ctx.request.body;
        // console.log(req);
        var user = await this.ctx.service.admin.doReg(req);
        if(user){
            this.ctx.login(req);
        }
        this.ctx.body = {posts:1}
        this.ctx.status = 200;
        // var posts = await this.ctx.service.postsList.getAllPost();
    
    }

    async home() {
        // var posts = await this.ctx.service.postsList.getAllPost();
        await this.ctx.render('admin/home.html', {
        //   posts:posts,
          title: '后台管理平台',
        });
    
      }

      async userlist() {
        // var posts = await this.ctx.service.postsList.getAllPost();
        await this.ctx.render('admin/userlist.html', {
        //   posts:posts,
          title: '用户列表',
        });
    
      }

      async postlist() {
        var pagesize = this.ctx.service.navData.pageSize;
        var currentPage = 1;
        var pageinfo = {
          currentPage:currentPage,
          pagesize:pagesize
        };        
        var data = await this.ctx.service.admin.getFPPost(pageinfo);
        var posts = data.posts;
        var count = data.count;
        var totalsize = Math.ceil(count/pagesize);
        // console.log(posts);
        await this.ctx.render('admin/postlist.html', {
          posts:posts,
          count:count,
          totalsize:totalsize,
          title: '会议管理',
        });
    
      }

      async postdetail() {
        var id = this.ctx.request.query;
        // console.log(id);
        var posts = await this.ctx.service.admin.getPostDetail(id);
        // console.log(posts);
        await this.ctx.render('admin/post.html', {
          post:posts,
          title: '会议详情',
        });
    
      }

      async postEdit() {
        var id = this.ctx.request.query;
        // console.log(id);
        var posts = await this.ctx.service.admin.getPostDetail(id);
        // console.log(posts);
        await this.ctx.render('admin/postedit.html', {
          post:posts,
          title: '会议编辑',
        });
    
      }

      async postUpdate() {
        var data = this.ctx.request.body;
        var result = await this.ctx.service.admin.postUpdate(data);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'保存成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'保存失败，请稍后再试'};
        }
    
      }

      async postDelete() {
        var id = this.ctx.request.body.id;
        // console.log(id);
        var result = await this.ctx.service.admin.postDelete(id);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'删除成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'删除失败，请稍后再试'};
        }
    
      }

      async postAdd() {

        await this.ctx.render('admin/postadd.html', {
          title: '添加会议',
        });
    
      }

      async postSave() {
        var data = this.ctx.request.body;
        // console.log(data);
        var result = await this.ctx.service.admin.postSave(data);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'保存成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'保存失败，请稍后再试'};
        }
      }

      async findPost(){
        var req = await this.ctx.request.body;
        console.log(req);
        var posts = await this.ctx.service.admin.findPost(req);
        // console.log(posts);
        this.ctx.body = {posts: posts};
        this.ctx.status = 200;
      }

      async medialist() {
        var media = await this.ctx.service.admin.getAllMedia();
        await this.ctx.render('admin/medialist.html', {
          media:media,
          title: '视频管理',
        });
    
      }

      async mediadetail() {
        var id = this.ctx.request.query;
        // console.log(id);
        var posts = await this.ctx.service.admin.getMediaDetail(id);
        // console.log(posts);
        await this.ctx.render('admin/media.html', {
          post:posts,
          title: '会议详情',
        });
    
      }

      async mediaEdit() {
        var id = this.ctx.request.query;
        // console.log(id);
        var posts = await this.ctx.service.admin.getMediaDetail(id);
        // console.log(posts);
        await this.ctx.render('admin/mediaedit.html', {
          post:posts,
          title: '会议编辑',
        });
    
      }

      async mediaAdd() {

        await this.ctx.render('admin/mediaadd.html', {
          title: '添加视频',
        });
    
      }

      async mediaSave() {
        var data = this.ctx.request.body;
        // console.log(data);
        var result = await this.ctx.service.admin.mediaSave(data);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'保存成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'保存失败，请稍后再试'};
        }
      }

      async mediaUpdate() {
        var data = this.ctx.request.body;
        var result = await this.ctx.service.admin.mediaUpdate(data);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'保存成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'保存失败，请稍后再试'};
        }
    
      }

      async mediaDelete() {
        var id = this.ctx.request.body.id;
        // console.log(id);
        var result = await this.ctx.service.admin.mediaDelete(id);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'删除成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'删除失败，请稍后再试'};
        }
    
      }


      async doctorlist() {
        var doctors = await this.ctx.service.admin.getAllDoctor();
        await this.ctx.render('admin/doctorlist.html', {
          doctors:doctors,
          title: '专家学者列表',
        });
    
      }

      async doctordetail() {
        var id = this.ctx.request.query;
        // console.log(id);
        var doctor = await this.ctx.service.admin.getDoctorDetail(id);
        // console.log(doctor);
        await this.ctx.render('admin/doctor.html', {
          doctor:doctor,
          title: '医生详情',
        });
    
      }

      async doctorEdit() {
        var id = this.ctx.request.query;
        // console.log(id);
        var doctor = await this.ctx.service.admin.getDoctorDetail(id);
        // console.log(posts);
        await this.ctx.render('admin/doctoredit.html', {
          doctor:doctor,
          title: '专家编辑',
        });
    
      }

      async doctorAdd() {

        await this.ctx.render('admin/doctoradd.html', {
          title: '添加专家',
        });
    
      }

      async doctorSave() {
        const stream = await this.ctx.getFileStream();
        // console.log(stream);
        // const filename = encodeURIComponent(stream.filename) + path.extname(stream.filename).toLowerCase();
        const filename = uuidV1() + path.extname(stream.filename).toLowerCase();
        const target = path.join(this.config.baseDir, 'app/public/uploadimg/', filename);
        const writeStream = fs.createWriteStream(target);
        const url = '../public/uploadimg/' + filename;
        try {
          await awaitWriteStream(stream.pipe(writeStream));
          var data = {
            name: stream.fields.name,
            department: stream.fields.department,
            company: stream.fields.company,
            telephone: stream.fields.telephone,
            age: stream.fields.age,
            intro: stream.fields.intro,
            avatar: url
          }
          var result = await this.ctx.service.admin.doctorSave(data);
          if(result){
            this.ctx.status=200;
            this.ctx.body={message:'保存成功'};
          }else{
            this.ctx.status=403;
            this.ctx.body={message:'保存失败，请稍后再试'};
          }
        } catch (err) {
          await sendToWormhole(stream);
          throw err;
        }
      }

      async doctorUpdate() {
        const stream = await this.ctx.getFileStream();
        // console.log(stream);
        // const filename = encodeURIComponent(stream.filename) + path.extname(stream.filename).toLowerCase();
        const filename = uuidV1() + path.extname(stream.filename).toLowerCase();
        const target = path.join(this.config.baseDir, 'app/public/uploadimg/', filename);
        const writeStream = fs.createWriteStream(target);
        const url = '../public/uploadimg/' + filename;
        try {
          await awaitWriteStream(stream.pipe(writeStream));
          var data = {
            id: stream.fields.id,
            name: stream.fields.name,
            department: stream.fields.department,
            company: stream.fields.company,
            telephone: stream.fields.telephone,
            age: stream.fields.age,
            intro: stream.fields.intro,
            avatar: url
          }
          var result = await this.ctx.service.admin.doctorUpdate(data);
          if(result){
            this.ctx.status=200;
            this.ctx.body={message:'保存成功'};
          }else{
            this.ctx.status=403;
            this.ctx.body={message:'保存失败，请稍后再试'};
          }
        } catch (err) {
          await sendToWormhole(stream);
          throw err;
        }
    
      }

      async doctorNopicUpdate() {
        var data = this.ctx.request.body;
        var result = await this.ctx.service.admin.doctorUpdate(data);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'保存成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'保存失败，请稍后再试'};
        }
    
      }

      async doctorDelete() {
        var id = this.ctx.request.body.id;
        // console.log(id);
        var result = await this.ctx.service.admin.doctorDelete(id);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'删除成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'删除失败，请稍后再试'};
        }
    
      }

      async modifycode() {
        // var posts = await this.ctx.service.postsList.getAllPost();
        await this.ctx.render('admin/system.html', {
        //   posts:posts,
          title: '修改密码',
        });
    
      }

      async system() {
        // var posts = await this.ctx.service.postsList.getAllPost();
        await this.ctx.render('admin/system.html', {
        //   posts:posts,
          title: '广告位图片管理',
        });
    
      }

      async uploadBanner() {
        var data = this.ctx.request.body;
        // console.log(data);
        // var result = await this.ctx.service.admin.mediaSave(data);
        // console.log(result);
        if(result){
          this.ctx.status=200;
          this.ctx.body={message:'保存成功'};
        }else{
          this.ctx.status=403;
          this.ctx.body={message:'保存失败，请稍后再试'};
        }
      }

      async upload() {
        const stream = await this.ctx.getFileStream();
        // console.log(stream);
        // const filename = encodeURIComponent(stream.filename) + path.extname(stream.filename).toLowerCase();
        const filename = uuidV1() + path.extname(stream.filename).toLowerCase();
        const target = path.join(this.config.baseDir, 'app/public/uploadimg/', filename);
        const writeStream = fs.createWriteStream(target);
        const url = '../public/uploadimg/' + filename;
        try {
          await awaitWriteStream(stream.pipe(writeStream));
          var data = {
            id: uuidV1(),
            postkey : stream.fields.postkey,
            url:url
          }
          var result = await this.ctx.service.admin.bannerSave(data);
        } catch (err) {
          await sendToWormhole(stream);
          throw err;
        }
    
        this.ctx.body = { url: url };
      }
}

module.exports = adminController;