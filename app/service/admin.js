const Service = require('egg').Service;
const dataSource = require('./navData');
const format = require('./format');

class PostsListService extends Service{

    async doReg(data){
        // console.log(data);
        var data = data;
        var date = new Date();
        // console.log(date);
        var id = format.generateUUID();
        var savedate = {
            id:id,
            role:0,
            username:data.username,
            name: '',
            password:data.password,
            department: data.department||'',
            company: data.company||'',
            telephone: data.telephone||11111111111,
            age: data.age||20,
            intro: data.intro||'',
            avatar: data.avatar||'',      
            last_sign_in_at:date
        }
        const posts = await this.app.model.User.create(savedate);
        return true;
    }

    async doLogin(data){
        // console.log(data);
        var data = data;
        var username = data.username;
        var password = data.password;
        // console.log(date);
        const user = await this.app.model.User.findOne({
            where:{
                username:username,
                password:password
            }
        });
        return user;
        
    }

    async getFPPost(data){
        var offset = (data.currentPage - 1)*data.pagesize;
        var limit = data.pagesize;
        const result = await this.app.model.Post.findAndCountAll({
            offset:offset,
            limit:limit
        });  
        const posts = result.rows;
        const count = result.count;    
        for(var i=0; i<posts.length; i++){             
            var formatTime = format.formatDate(posts[i].meeting_time);
            posts[i].meetingTime = formatTime;
        }
        var data = {
            posts:posts,
            count:count
        };
        return data;
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

    async findPost(req){
        var params = req;
        var queryObj = {};
        var pagesize = dataSource.pageSize;
        var offset = (params.currentpage-1)*pagesize;
        var province = params.province;
        var city = params.city;
        var department = params.department;
        var year = params.year;
        var contentkewords = params.contentkewords;
        var participatkewords = params.participatkewords;
        var start;
        var fin;
        if(!!province){
            queryObj.province = province;
        }
        if(!!city){
            queryObj.city = city;
        }
        if(!!department){
            queryObj.department = department;
        }
        if(!!contentkewords){
            queryObj.content = {$like:'%'+contentkewords+'%'};
        }
        if(!!participatkewords){
            queryObj.participant_id = {$like:'%'+participatkewords+'%'};
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
            where: queryObj,
            limit:pagesize,
            offset:offset
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
            media[i].post_time = formatTime;
        }
        return media;
    }

    async getDoctors(){
        const doctors = await this.app.model.User.findAll();        
        return doctors;
    }

    async postSave(data){
        var data = data;
        var dateD = data.date.toString();        
        var year = dateD.substring(0,4);
        var month = dateD.substring(5,7)-1;
        var day = dateD.substring(8);
        var date = new Date(year,month,day,data.hour,data.minute,0);
        // console.log(date);
        var id = format.generateUUID();
        var savedate = {
            id:id,
            title:data.title,
            department:data.department,
            intro:data.intro,
            content:data.content,
            province:data.province,
            city:data.city, 
            author:data.title,//取session中user信息 todo
            participant_id: data.participant_id,                
            meeting_time:date
        }
        const posts = await this.app.model.Post.create(savedate);
        return true;
    }

    async postUpdate(data){
        var data = data;
        var dateD = data.date.toString();        
        var year = dateD.substring(0,4);
        var month = dateD.substring(5,7)-1;
        var day = dateD.substring(8);
        var date = new Date(year,month,day,data.hour,data.minute,0);       
        var id = data.id;
        var savedate = {
            title:data.title,
            department:data.department,
            intro:data.intro,
            content:data.content,
            province:data.province,
            city:data.city, 
            author:data.title,//取session中user信息 todo
            participant_id: data.participant_id,                
            meeting_time:date
        }
        const posts = await this.app.model.Post.update(savedate,{
            where:{
                id:id
            }
        });
        return true;
    }

    async postDelete(id){
        var id = id;
        const posts = await this.app.model.Post.destroy({
            where:{
                id:id
            }
        });
        return true;
    }

    async getAllMedia(){
        const media = await this.app.model.Media.findAll({
            limit:10
        });        
        for(var i=0; i<media.length; i++){             
            var formatTime = format.formatDate(media[i].post_time);
            media[i].postTime = formatTime;
        }
        return media;
    }

    async getMediaDetail(data){
        var postid = data.id;
        // console.log(postid);
        const post = await this.app.model.Media.find({
            where: { id: postid } 
        });
        var formatTime = format.formatDate(post.post_time);
        post.postTime = formatTime;
        return post;
    }


    async mediaSave(data){
        var data = data;
        var date = new Date();
        // console.log(date);
        var id = format.generateUUID();
        var savedate = {
            id:id,
            userid:id,
            title:data.title,
            department:data.department,
            intro:data.intro,
            content:data.content,
            province:data.province,
            mediaurl:data.mediaurl, 
            city:data.city, 
            author:data.author,//取session中user信息 todo           
            post_time:date
        }
        const posts = await this.app.model.Media.create(savedate);
        return true;
    }

    async mediaUpdate(data){
        var data = data;
        var date = new Date();       
        var id = data.id;
        var savedate = {
            userid:id,
            title:data.title,
            department:data.department,
            intro:data.intro,
            content:data.content,
            province:data.province,
            mediaurl:data.mediaurl, 
            city:data.city, 
            author:data.author,//取session中user信息 todo           
            post_time:date
        }
        const posts = await this.app.model.Media.update(savedate,{
            where:{
                id:id
            }
        });
        return true;
    }

    async mediaDelete(id){
        var id = id;
        const posts = await this.app.model.Media.destroy({
            where:{
                id:id
            }
        });
        return true;
    }

    async bannerSave(data){
        var postkey = data.postkey;
        const existed = await this.app.model.Banner.findOne({
            where:{
                postkey:postkey
            }
        });
        if(existed){
            const posts = await this.app.model.Banner.update(data,{
                where:{
                    postkey:postkey
                }
            });
            return true;
        }else{
            const posts = await this.app.model.Banner.create(data);
            return true;
        }
        
    }

    async getAllDoctor(){
        const doctors = await this.app.model.User.findAll({
            where:{
                role:2
            },
            // limit:10
        });        
        for(var i=0; i<doctors.length; i++){             
            var formatTime = format.formatDate(doctors[i].last_sign_in_at);
            doctors[i].last_sign_in = formatTime;
        }
        return doctors;
    }

    async getDoctorDetail(data){
        var id = data.id;
        // console.log(postid);
        const doctor = await this.app.model.User.find({
            where: { 
                id: id,
                role:2
            } 
        });
        var formatTime = format.formatDate(doctor.last_sign_in_at);
        doctor.last_sign_in = formatTime;
        return doctor;
    }


    async doctorSave(data){
        var data = data;
        var date = new Date();
        // console.log(date);
        var id = format.generateUUID();
        var savedate = {
            id:id,
            role:2,
            name: data.name,
            passwd:'123456',
            department: data.department,
            company: data.company,
            telephone: data.telephone,
            age: data.age,
            intro: data.intro,
            avatar: data.avatar,      
            last_sign_in_at:date
        }
        const posts = await this.app.model.User.create(savedate);
        return true;
    }

    async doctorUpdate(data){
        var data = data;
        // console.log(date);
        var savedate = {
            role:2,
            name: data.name,
            passwd:'123456',
            department: data.department,
            company: data.company,
            telephone: data.telephone,
            age: data.age,
            intro: data.intro,
            avatar: data.avatar,      
        }
        const posts = await this.app.model.User.update(savedate, {where:{
                id:data.id
            }
        });
        return true;
    }

    async doctorDelete(id){
        var id = id;
        const doctor = await this.app.model.User.destroy({
            where:{
                id:id
            }
        });
        return true;
    }

}

module.exports = PostsListService;