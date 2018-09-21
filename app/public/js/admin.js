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

function getCsrf() {
    var keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  }

function doLogin(){
    var username = $('#username').val();
    var password = $('#password').val();
    var data = {
        username : username,
        password : password
    };
    //匹配验证
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (username === '') {
      alert('请输入手机号');
      return;
    }

    if (!reg.test(username)) {
      alert('手机号不正确');
      return;
    }

    var re = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,16})$/;
    if (password === '') {
        alert('请输入密码');
        return;
    }
    if (!re.test(password)) {
        alert('必须输入6到16位字母与数字组合的密码');
        return;
    }
   /*  var data = new FormData();
    data.append('account',account);
    data.append('pwd',pwd); */
    $.ajax({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader('x-csrf-token', csrftoken);
            }
          },
        url:'doLogin',
        method:'post',
        datatype: 'json',
        // contentType:'application/x-www-form-urlencoded',
        data : JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
    }).done(function(res){
        console.log(res);
        if(res.islogin){
            console.log(1);
            console.log(data);
            window.location.pathname ='admin/postlist';
         }else{
             alert(res.msg);
         }        
    }).fail(function(err){
        console.log(err);
        alert('用户名或登录密码不正确');
    })  
}

function doReg(){
    var username = $('#username').val();
    var password = $('#password').val();
    var password2 = $('#password2').val();
    //匹配验证
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (username === '') {
      alert('请输入手机号');
      return;
    }

    if (!reg.test(username)) {
      alert('手机号不正确');
      return;
    }

    var re = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,16})$/;
    if (password === '') {
        alert('请输入密码');
        return;
    }
    if (!re.test(password)) {
        alert('必须输入6到16位字母与数字组合的密码');
        return;
    }
    if (password2 === '') {
        alert('请输入第二次确认密码');
        return;
    }    
    if (!re.test(password2)) {
        alert('确认密码必须输入6到16位字母与数字组合的密码');
        return;
    }
    if(password!=password2){
        alert('密码再次输入请和第一次一致');
        return;
    }
    var data = {
        username : username,
        password : password
    };
    /* var data = new FormData();
    data.append('account',account);
    data.append('pwd',pwd); */
    $.ajax({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader('x-csrf-token', csrftoken);
            }
          },
        url:'doReg',
        method:'post',
        datatype: 'json',
        // contentType:'application/x-www-form-urlencoded',
        data : JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
    }).done(function(res){
        var data = res.posts;
        // if(data.length>0){
            console.log(1);
            console.log(data);
            alert('注册成功');
            window.location.pathname ='admin/index';
            // displayPost(data);
        // }        
    }).fail(function(err){
        console.log(err);
        alert('发送错误');
    })
}

function show(str){
    var tips = '<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
                '<div class="modal-dialog modal-lg">'+
                '<div class="modal-content">'+
                    str +
                '</div></div></div>';
    $(tips).appendTo('.container');
    $('.modal').modal('show');
}


