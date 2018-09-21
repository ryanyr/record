const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {

    if (app.config.env === 'local') {
        app.beforeStart(async function () {
                await app
                    .model
                    .sync({force: false}); // false 为不覆盖 true会删除再创建
            });
    }

    /* app.passport.use(new LocalStrategy({
            passReqToCallback: true,
            usernameField:'username'
        }, (req, username, password, done) => {
            var user = {
                username: username,
                password: password
            }
            app.passport.doVerify(req, user, done);             
        }));

    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
        console.log(user);
        var username = user.username;
        var password = user.password;
        var uuser = await ctx.model.User.findOne({
            where:{
                username: username,
                password:password
            }
        })
        if(uuser){
            return uuser;
        }else{
            // bcrypt.compare(password, user.password, callback); 
            // return done(null, uuser);
            ctx.status = 200;
            ctx.body = {userRight:false};
        }
    });
    app.passport.serializeUser(async (ctx, user) => {        
        console.log(1111111111);
        var isAuth = ctx.isAuthenticated();
        console.log('isAuth++++++++++++++++++++++++++++++++++++++++'+isAuth);
        // console.log(ctx.user);
        // ctx.login(user);
    });
    app.passport.deserializeUser(async (ctx, user) => {
        console.log(22222222222222);
        var id = user.id;
        var uuser = await ctx.model.User.findOne({
            where:{
                id:id
            }
        })
        console.log(uuser);
        // done(null, uuser);
    });  */

}