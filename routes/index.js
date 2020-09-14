var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/xem', function(req, res, next) {
  contactModel.find({},function(err,dulieu){
    res.render('xem', { title: 'Xem dữ liệu' ,data:dulieu});
  })
 
});

router.get('/xoa/:idcanxoa', function(req, res, next) {
  var id = req.params.idcanxoa;
  contactModel.findByIdAndRemove(id).exec();
  res.redirect('/xem');
});


//trang sửa dữ liệu, lấy được thông tin cần sửa
router.get('/sua/:idcansua', function(req, res, next) {
  var id2 = req.params.idcansua;
  contactModel.find({_id:id2},function(err,dulieu){
    res.render('sua', { title: 'Sửa dữ liệu' ,data:dulieu});
  })
});

router.post('/sua/:idcansua', function(req, res, next) {
  var id2 = req.params.idcansua;
  contactModel.findById(id2,function(err,dulieu){ 
  if (err) return handleError(err);
   dulieu.ten = req.body.ten;
   dulieu.tuoi = req.body.tuoi;
   dulieu.save();
   res.redirect('/xem');
  }) 
});

//trang thêm, get
router.get('/them', function(req, res, next) {
    res.render('them', { title: 'Thêm dữ liệu'});
});
//trang thêm, post
router.post('/them', function(req, res, next) {
  var phantu = {
    "ten":req.body.ten,
    "tuoi":req.body.tuoi
  }
  var dulieu = new contactModel(phantu);
  dulieu.save();
  res.redirect('/xem');
});


module.exports = router;
