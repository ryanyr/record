'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller } = app;
  router.get('/', controller.home.index);

  // client
  router.get('/hot', controller.client.post.getAllPosts);
  router.get('/monthy', controller.client.post.getMonthyPosts);
  router.get('/all', controller.client.post.getAllPosts);
  router.get('/mediaList', controller.client.post.getMedia);
  router.get('/media', controller.client.post.getMediaDetail);
  router.get('/doctors', controller.client.post.getDoctors);
  router.get('/doctorinfo', controller.client.post.getDoctorinfo);
  router.get('/getAllDistricts', controller.client.post.getDistrict);
  router.get('/getAllDepartments', controller.client.post.getDepartment);
  router.get('/getAllYears', controller.client.post.getYear);
  router.get('/getAllMonths', controller.client.post.getMonth);
  router.get('/getPostsByDistrict', controller.client.post.getPostsByDistrict);
  router.get('/getPostsByDepartment', controller.client.post.getPostsByDepartment);
  router.get('/getPostsByYear', controller.client.post.getPostsByYear);
  router.get('/getPostsByMonth', controller.client.post.getPostsByMonth);
  router.get('/getPostsByAll', controller.client.post.getPostsByAll);
  router.get('/post', controller.client.post.getPostDetail);
  router.get('/getPostsByKeywords', controller.client.post.getPostsByKeywords);
  router.get('/getMediaByKeywords', controller.client.post.getMediaByKeywords);
  router.get('/getDoctorByKeywords', controller.client.post.getDoctorByKeywords);


  // admin

  router.get('/admin/login', controller.admin.adminPost.login); 

  router.get('/admin/reg', controller.admin.adminPost.reg);  
  router.post('/admin/doReg', controller.admin.adminPost.doReg); 

  /*   const localAuth = app.passport.authenticate('local', {
    successRedirect: '/admin/postlist',
    failureRedirect: '/admin/login'
  }/);*/

  const auth = app.middleware.auth(); 

  // 鉴权成功后的回调页面
  // router.get('/authCallback', controller.admin.adminPost.home);
  router.post('/admin/doLogin', controller.admin.adminPost.doLogin);
  // router.post('/admin/doLogin', controller.admin.adminPost.doLogin);

  router.get('/admin/', auth, controller.admin.adminPost.home);
  router.get('/admin/index',auth,controller.admin.adminPost.home);
  router.get('/admin/userlist',auth,controller.admin.adminPost.userlist);
  router.get('/admin/postlist',auth,controller.admin.adminPost.postlist);
  router.get('/admin/post', auth,controller.admin.adminPost.postdetail);
  router.get('/admin/editpost',auth, controller.admin.adminPost.postEdit);
  router.get('/admin/addpost',auth, controller.admin.adminPost.postAdd);
  router.post('/admin/updatepost', auth,controller.admin.adminPost.postUpdate);
  router.post('/admin/savepost', auth,controller.admin.adminPost.postSave);
  router.post('/admin/deletepost', auth,controller.admin.adminPost.postDelete);
  router.post('/admin/findPost', auth,controller.admin.adminPost.findPost);

  router.get('/admin/medialist',auth, controller.admin.adminPost.medialist);
  router.get('/admin/media',auth, controller.admin.adminPost.mediadetail);
  router.get('/admin/editmedia',auth, controller.admin.adminPost.mediaEdit);
  router.get('/admin/addmedia',auth, controller.admin.adminPost.mediaAdd);
  router.post('/admin/updatemedia',auth, controller.admin.adminPost.mediaUpdate);
  router.post('/admin/savemedia',auth, controller.admin.adminPost.mediaSave);
  router.post('/admin/deletemedia',auth, controller.admin.adminPost.mediaDelete);

  router.get('/admin/doctorlist',auth, controller.admin.adminPost.doctorlist);
  router.get('/admin/doctor',auth, controller.admin.adminPost.doctordetail);
  router.get('/admin/editdoctor',auth, controller.admin.adminPost.doctorEdit);
  router.get('/admin/adddoctor',auth, controller.admin.adminPost.doctorAdd);
  router.post('/admin/updatedoctor',auth, controller.admin.adminPost.doctorUpdate);
  router.post('/admin/updatedoctorwithout',auth, controller.admin.adminPost.doctorNopicUpdate);
  router.post('/admin/savedoctor',auth, controller.admin.adminPost.doctorSave);
  router.post('/admin/deletedoctor', auth,controller.admin.adminPost.doctorDelete);

  router.get('/admin/modifycode',auth, controller.admin.adminPost.modifycode);
  router.get('/admin/system',auth, controller.admin.adminPost.system);
  router.post('/admin/uploadBanner', auth,controller.admin.adminPost.upload);

};