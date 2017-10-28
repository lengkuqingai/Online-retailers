var express = require('express');
var router = express.Router();
var User=require("../models/users")
require('../util/util');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourceqqq');
});
router.post('/login',function(req,res,next){
  let userinfo={
    "userName":req.body.userName,
    "userPwd":req.body.userPwd
  }
  User.findOne(userinfo,function(err,doc){
    if(err){
      res.json({
        "status":"1",
        "msg":err.message
      })
    }else{
      if(!doc){
        res.json({
          "status":"1",
          "msg":"用户名和密码不一致！"
        })
      }else{
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:"/",
          maxAge:1000*60*60
        });
        res.json({
          "status":"0",
          "msg":'',
          "result":{
            userName:doc.userName
          }
        })
      }
    }
  })
})
router.post('/checkLogin',function(req,res,next){
  
  if(req.cookies.userId){
    res.json({
      "status":"0",
      "msg":"",
      "result":req.cookies.userName
    })
  }else{
    res.json({
      "status":"1",
      "msg":"未登录",
      "result":""
    })
  }
})
router.post('/logout',function(req,res,next){
  res.cookie("userId",'',{
    path:'/',
    maxAge:-1
  });
  res.cookie("userName",'',{
    path:'/',
    maxAge:-1
  });
  res.json({
    "status":"1",
    "msg":"退出成功！",
    "result":''
  })
})
router.post('/cart',function(req,res,next){
  if(req.cookies.userId){
    let userId=req.cookies.userId;
    User.findOne({userId:userId},function(err,doc){
      if(!err){
        res.json({
          "status":"1",
          "msg":"",
          "result":doc.cartList
        })
      }
    })
  }else{
    res.json({
      "status":"1",
      "msg":"未登录，请先登录",
      "result":""
    })
  }
})
router.post("/cartList", function(req, res, next) {
  let userId = req.cookies.userId;
  User.findOne({ userId: userId }, function(err, doc) {
      if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
          res.json({
              status: 0,
              msg: '',
              result: doc.cartList
          })
      }
  })
})
router.post('/cartEdit',(req,res,next)=>{
  let userId=req.cookies.userId,
      productId=req.body.productId,
      productNum=req.body.productNum,
      checked=req.body.checked;
      User.update({ 'userId': userId, "cartList.productId": productId }, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked
    }, function(err, doc) {
        console.log(doc);
        if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
            res.json({
                status: "0",
                msg: '',
                result: '修改购物车商品成功'
            })
        }
    })
})
router.post('/del',(req,res,next)=>{
  let userId=req.cookies.userId;
  let productId=req.body.productId;
  User.update({
    userId: userId
  }, {
      $pull: {
          'cartList': {
              'productId': productId
          }
      }
  }, function(err, doc) {
      if (err) {
          res.json({ status: 1, msg: err.message, result: '' })
      } else {
          res.json({ status: 0, msg: '', result: '商品删除成功' })
      }
  })
})
router.get('/addressList',(req,res,next)=>{
  let userId=req.cookies.userId
  User.findOne({ userId: userId }, function(err, doc) {
    if (err) {
        res.json({ status: 1, msg: err.message, result: '' })
    } else {
        res.json({ status: 0, msg: '', result: doc.addressList })
    }
  })
})
router.post("/setDefault",(req,res,next)=>{
  var userId = req.cookies.userId,
  addressId = req.body.addressId;
if (!addressId) {
  res.json({
      status: '1003',
      msg: 'addressId Is null'
  })
} else {
  User.findOne({ userId: userId }, function(err, doc) {
      var addressList = doc.addressList;
      addressList.forEach(item => {
          if (item.addressId == addressId) {
              item.isDefault = true;
          } else {
              item.isDefault = false;
          }
      })

      doc.save(function(err1, doc1) {
          if (err1) {
              res.json({
                  status: '1',
                  msg: err.message,
                  result: ''
              })
          } else {
              res.json({
                  status: '0',
                  msg: '',
                  result: doc1
              })
          }
      })
  })
}
})
router.post("/payMent", function(req, res, next) {
  var userId = req.cookies.userId,
      addressId = req.body.addressId,
      orderTotal = req.body.orderTotal;
  User.findOne({ userId: userId }, function(err, doc) {
      if (err) {
          res.json({
              status: '1',
              msg: err.message,
              result: ''
          })
      } else {
          // 获取收货地址
          var address = '',
              goodsList = [];
          doc.addressList.forEach(item => {
              if (item.addressId == addressId) {
                  address = item;
              }
          })

          // 获取购买的商品
          doc.cartList.filter(item => {
              if (item.checked == '1') {
                  goodsList.push(item);
              }
          })

          // 生成订单号

          var platform = "622";
          var r1 = Math.floor(Math.random() * 10);
          var r2 = Math.floor(Math.random() * 10);
          var sysDate = new Date().Format('yyyyMMddhhmmss');
          var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
          var orderId = platform + r1 + sysDate + r2;

          var order = {
              orderId: orderId,
              orderTotal: orderTotal,
              addressInfo: address,
              goodsList: goodsList,
              orderStatus: '10',
              createDate: createDate
          }

          doc.orderList.push(order);
          doc.save(function(err1, doc1) {
              if (err1) {
                  res.json({ 'status': "1", msg: err.message, result: '' })
              } else {
                  res.json({ 'status': '0', msg: '', result: { orderId: order.orderId, orderTotal: orderTotal } })
              }
          })
      }

  })
})

router.get('/orderDetail', function(req, res, next) {
  var userId = req.cookies.userId,
      orderId = req.param('orderId');
  User.findOne({ userId: userId }, function(err, userInfo) {
      if (err) {
          res.json({ 'status': "1", msg: err.message, result: '' })
      } else {
          var orderList = userInfo.orderList;
          if (orderList.length > 0) {
              var orderTotal = 0;
              orderList.forEach(item => {
                  if (item.orderId == orderId) {
                      orderTotal = item.orderTotal;
                  }
              })

              if (orderTotal > 0) {
                  res.json({ status: 0, msg: '', result: { orderId: orderId, orderTotal: orderTotal } })
              }

          } else {
              res.json({ status: '10010', msg: '当前用户未创建订单', result: '' })
          }
      }
  })
})
module.exports = router;
