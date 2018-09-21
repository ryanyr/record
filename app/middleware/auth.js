'use strict';

module.exports = () => {
    return async function auth(ctx, next) {

      //基于passport
      /* console.log(ctx.user);
      var isAuth = ctx.isAuthenticated();
      console.log('isAuth++++++++++++++++++++++++++++++++++++++++'+isAuth);
      if(!isAuth){
        await ctx.render('admin/login.html', {
          //   posts:posts,
            title: '后台管理平台-登录',
            msg:'请登录授权'
        });
      }else{
        await next();
      } */
      
      //基于cookie session
      var user = ctx.session.user;
      // console.log('111111111111111111111111111111111'+user);
      if(user){
        await next();
      }else{
        await ctx.render('admin/login.html', {
          //   posts:posts,
            title: '后台管理平台-登录',
            msg:'请登录授权'
        });
      }

    };
  };