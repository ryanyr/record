//crsf token
var csrftoken = getcookie('csrfToken');

function getcookie(objname){//获取指定名称的cookie的值
    var arrstr = document.cookie.split("; ");
    for(var i = 0;i < arrstr.length;i ++){
    var temp = arrstr[i].split("=");
    if(temp[0] == objname) return unescape(temp[1]);
    }
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
} 

function chooseDistrictItem(obj){
    var item = obj.innerHTML;
    var district = item;
    var department = $('#selectDepartment').text();
    var year = $('#selectYear').text();
    var month = $('#selectMonth').text();
    if(district=='选择省份'||district=='不限省份'){
        district = '';
    }
    if(department=='选择学科'||department=='不限学科'){
        department = '';
    }
    if(year=='选择年份'||year=='不限年份'){
        year = '';
    }
    if(month=='选择月份'||month=='不限月份'){
        month = '';
    }
    var req = {
        district:district,
        department:department,
        year:year,
        month:month
    }
    // console.log(item);
    $('.sideNav').animate({right:'-5rem'},200,'swing',function(){
        $('#selectDistrict').text(item);
        // getPosts('district',{'district':item});
        getAllPosts(req);
    });
    
}

function chooseDepartmentItem(obj){
    var item = obj.innerHTML;
    var department = item;
    var district = $('#selectDistrict').text();
    var year = $('#selectYear').text();
    var month = $('#selectMonth').text();
    if(district=='选择省份'||district=='不限省份'){
        district = '';
    }
    if(department=='选择学科'||department=='不限学科'){
        department = '';
    }
    if(year=='选择年份'||year=='不限年份'){
        year = '';
    }
    if(month=='选择月份'||month=='不限月份'){
        month = '';
    }
    var req = {
        district:district,
        department:department,
        year:year,
        month:month
    }
    // console.log(item);
    $('.sideNav').animate({right:'-5rem'},200,'swing',function(){
        $('#selectDepartment').text(item);
        // getPosts('department',{'department':item});
        getAllPosts(req);
    });
}

function chooseYearItem(obj){
    var item = obj.innerHTML;
    var year = item;
    var district = $('#selectDistrict').text();
    var department = $('#selectDepartment').text();
    var month = $('#selectMonth').text();
    if(district=='选择省份'||district=='不限省份'){
        district = '';
    }
    if(department=='选择学科'||department=='不限学科'){
        department = '';
    }
    if(year=='选择年份'||year=='不限年份'){
        year = '';
    }
    if(month=='选择月份'||month=='不限月份'){
        month = '';
    }
    var req = {
        district:district,
        department:department,
        year:year,
        month:month
    }
    // console.log(item);
    $('.sideNav').animate({right:'-5rem'},200,'swing',function(){
        $('#selectYear').text(item);
        // getPosts('year',{'year':item});
        getAllPosts(req);
    });
}

function chooseMonthItem(obj){
    var item = obj.innerHTML;
    var month = item;
    var district = $('#selectDistrict').text();
    var department = $('#selectDepartment').text();
    var year = $('#selectYear').text();
    if(district=='选择省份'||district=='不限省份'){
        district = '';
    }
    if(department=='选择学科'||department=='不限学科'){
        department = '';
    }
    if(year=='选择年份'||year=='不限年份'){
        year = '';
    }
    var req = {
        district:district,
        department:department,
        year:year,
        month:month
    }
    // console.log(item);
    $('.sideNav').animate({right:'-5rem'},200,'swing',function(){
        $('#selectMonth').text(item);
        // getPosts('month',{'month':item});
        getAllPosts(req);
    });
}

function getAllPosts(obj){
    console.log(obj);
    //可以 stringify在封装obj传输后端解析parse
    $.ajax({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader('x-csrf-token', csrftoken);
            }
          },
        url:'/getPostsByAll',
        method:'get',
        // datatype: 'json',
        data : 'district=' + obj.district + '&department='+obj.department+'&year='+obj.year+'&month='+obj.month,
        contentType: false,
        processData: false,
    }).done(function(data){
        var data = data.posts;
        // if(data.length>0){
            console.log(1);
            console.log(data);
            displayPost(data);
        // }        
    }).fail(function(data){
        console.log(err);
        alert('error');
    })    
}

function searchByKeywords(){
    var keyword = $('#searchKeywords').val();
    $.ajax({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader('x-csrf-token', csrftoken);
            }
          },
        url:'/getPostsByKeywords',
        method:'get',
        // datatype: 'json',
        data : 'keyword=' + keyword,
        contentType: false,
        processData: false,
    }).done(function(data){
        var data = data.posts;
        // if(data.length>0){
            console.log(1);
            console.log(data);
            displayPost(data);
        // }        
    }).fail(function(data){
        console.log(err);
        alert('error');
    }) 
}

function displayPost(data){
    $('.list-group').empty();
    var post = '';
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            var item = '<a href="/post?id='+ data[i].id +'" class="list-group-item list-group-item-action flex-column align-items-start">'+
                            '<div class="d-flex w-100 justify-content-between">'+
                            '<p class="title">'+ data[i].title +'</p>'+            
                            '</div>'+
                            '<p class="time">' + data[i].meeting_time +'</p>'+
                            '<p class="content">' + data[i].intro + '</p>' +
                            '<p class="location">' + data[i].province +'-' + data[i].city +'</p>'+
                        '</a>';
            post +=item;
        }
    }else{
        post = '<div class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between">暂无数据</div></div>';
    }
    
    $('.list-group').html(post);
}

/* function getPosts(obj){
    console.log(obj);
    var district = obj.district;
    var department = obj.department;
    var year = obj.year;
    var month = obj.month;
    var posts = [];
    $.ajax({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader('x-csrf-token', csrftoken);
            }
          },
        url:'/getPosts',
        method:'get',
        data: obj,
        contentType: false,
        processData: false,
    }).done(function(data){
        console.log(1);
    }).fail(function(data){
        console.log(2);
    })
} */

function getPosts(type,data){
    // console.log(type);
    var posts = [];
    var url = '';
    switch(type){
        case 'district':
            url = '/getPostsByDistrict';
            break;
        case 'department':
            url = '/getPostsByDepartment';
            break;
        case 'year':
            url = '/getPostsByYear';
            break;
        case 'month':
            url = '/getPostsByMonth';
            break;
        default:break;
    }
    $.ajax({
        url: url,
        method:'get',
        data: data
    }).done(function(data){
        console.log(data.posts);
        posts =  data.posts;
    }).fail(function(data){
        console.log('err');
    })
    
}

$(function(){
       
    //会议   

    //选择地区
    $('#selectDistrict').click(function(){
        $.ajax({
            url:'/getAllDistricts',
            method:'get'
        }).done(function(data){
            $('.sideNav').find('ul').html('');
            var districts = data.districts;
            for(var i =0;i<districts.length;i++){
                var item = $('<li class="navitem district" onClick=chooseDistrictItem(this)>'+districts[i]+'</li>');
                $('.sideNav').find('ul').append(item);
            }
            $('.sideNav').animate({right:0},200,'swing');
            // console.log(data);
        }).fail(function(err){
            console.log(err);
        });
    });
    //选择学科
    $('#selectDepartment').click(function(){
        $.ajax({
            url:'/getAllDepartments',
            method:'get'
        }).done(function(data){
            $('.sideNav').find('ul').html('');
            var departments = data.departments;
            for(var i =0;i<departments.length;i++){
                var item = $('<li class="navitem department" onClick=chooseDepartmentItem(this)>'+departments[i]+'</li>');
                $('.sideNav').find('ul').append(item);
            }
            $('.sideNav').animate({right:0},200,'swing');
            // console.log(data);
        }).fail(function(err){
            console.log(err);
        });
    });
    //选择年份
    $('#selectYear').click(function(){
        $.ajax({
            url:'/getAllYears',
            method:'get'
        }).done(function(data){
            $('.sideNav').find('ul').html('');
            var years = data.years;
            for(var i =0;i<years.length;i++){
                var item = $('<li class="navitem year" onClick=chooseYearItem(this)>'+years[i]+'</li>');
                $('.sideNav').find('ul').append(item);
            }
            $('.sideNav').animate({right:0},200,'swing');
            // console.log(data);
        }).fail(function(err){
            console.log(err);
        });
    });
    //选择地区
    $('#selectMonth').click(function(){
        $.ajax({
            url:'/getAllMonths',
            method:'get'
        }).done(function(data){
            $('.sideNav').find('ul').html('');
            var months = data.months;
            for(var i =0;i<months.length;i++){
                var item = $('<li class="navitem year" onClick=chooseMonthItem(this)>'+months[i]+'</li>');
                $('.sideNav').find('ul').append(item);
            }
            $('.sideNav').animate({right:0},200,'swing');
            // console.log(data);
        }).fail(function(err){
            console.log(err);
        });
    });

})