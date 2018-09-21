const Service = require('egg').Service;
const dataSource = require('./navData');
const format = require('./format');

class PostsListService extends Service{

    async getBanners(){
        const banners = await this.app.model.Banner.findAll();
        // console.log(banners);
        return banners;
    }


    async getAllPost(){
        const posts = await this.app.model.Post.findAll();
        
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getAllDistricts(){
        const districts = dataSource.district;
        // console.log(districts);
        return districts;
    }

    async getAllDepartments(){
        const departments = dataSource.department;
        // console.log(departments);
        return departments;
    }

    async getAllYears(){
        const years = dataSource.year;
        // console.log(years);
        return years;
    }

    async getAllMonths(){
        const months = dataSource.month;
        // console.log(months);
        return months;
    }

    async getPostsByDistrict(req){
        var params = req;
        const posts = await this.app.model.Post.findAll({
            where: { province: params.district } 
        });
        
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getPostsByDepartment(req){
        var params = req;
        const posts = await this.app.model.Post.findAll({
            where: { province: params.district } 
        });
        
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getPostsByYear(req){
        var params = req;
        var year = params.year;
        // console.log(year);
        var start = new Date(year,0,1,0,0,0);
        var fin = new Date(year,11,31,23,59,59);
        // console.log(start);
        // console.log(fin);
        const posts = await this.app.model.Post.findAll({
            where: { meeting_time: {
                //中文文档内使用[Op.between],chm in En 使用$between
                $between:[start,fin]
            } }
            //limit:10
        });        
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getPostsByMonth(req){
        var params = req;
        var month = params.month;
        const posts = await this.app.model.Post.findAll({
            where: { province: params.district } 
        });
        
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getPostsByAll(req){
        var params = req;
        var queryObj = {};
        var district = params.district;
        var department = params.department;
        var year = params.year;
        var month = params.month;
        var start;
        var fin;
        if(!!district){
            queryObj.province = district;
        }
        if(!!department){
            queryObj.department = department;
        }
        if(!!year){
            start = new Date(year,0,1,0,0,0);
            fin = new Date(year,11,31,23,59,59);
            queryObj.meeting_time = {
                $between:[start,fin]
            };
        }
        /* if(!!month){
            queryObj.month = month;
        } */
        // console.log(queryObj);
        const posts = await this.app.model.Post.findAll({
            where: queryObj
            //limit:10
        });        
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getPostDetail(data){
        var postid = data.id;
        // console.log(postid);
        const post = await this.app.model.Post.find({
            where: { id: postid } 
        });
        var formatTime = format.formatDate(post.meeting_time);
        post.meetingTime = formatTime;
        return post;
    }

    async getPostsByKeywords(data){
        var keyword = data.keyword;
        keyword = '%'+keyword+'%';
        console.log(keyword);
        const posts = await this.app.model.Post.findAll({
            where: { title: {
                $like:keyword
            } } 
        });
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getMonthyPosts(){        
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var start = new Date(year,month,1,0,0,0);
        var fin = new Date(year,month,31,23,59,59);
        // console.log(start);
        // console.log(fin);
        const posts = await this.app.model.Post.findAll({
            where:{
                meeting_time:{
                    $between:[start,fin]
                }                
            }
        });
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        return posts;
    }

    async getMedia(){
        const media = await this.app.model.Media.findAll();
        
        for(var i=0; i<media.length; i++){             
            var formatTime = format.formatDate(media[i].post_time);
            media[i].posttime = formatTime;
        }
        return media;
    }

    async getMediaDetail(data){
        var id = data.id;
        const media = await this.app.model.Media.findOne({
            where: { id: id } 
        });
        var formatTime = format.formatDate(media.post_time);
        media.posttime = formatTime;

        return media;
    }

    async getMediaByKeywords(data){
        var keyword = data.keyword;
        keyword = '%'+keyword+'%';
        // console.log(keyword);
        const media = await this.app.model.Media.findAll({
            where: { title: {
                $like:keyword
            } } 
        });
        for(var i=0; i<media.length; i++){             
            var formatTime = format.formatDate(media[i].post_time);
            media[i].posttime = formatTime;
        }       
        return media;
    }

    async getDoctors(){
        const doctors = await this.app.model.User.findAll({
            where:{
                role:2
            }
        });
        
        return doctors;
    }

    async getDoctorinfo(data){
        var id = data.id;
        // console.log(postid);
        const doctor = await this.app.model.User.find({
            where: { id: id } 
        });
        var formatTime = format.formatDate(doctor.last_sign_in_at);
        doctor.last_sign_in = formatTime;
        return doctor;
    }

    async getDoctorByKeywords(data){
        var keyword = data.keyword;
        keyword = '%'+keyword+'%';
        // console.log(keyword);
        const doctors = await this.app.model.User.findAll({
            where: { name: {
                $like:keyword
            },role:2 } 
        });    
        return doctors;
    }

}

module.exports = PostsListService;