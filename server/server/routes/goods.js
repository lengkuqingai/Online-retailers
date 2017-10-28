var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Goods=require("../models/goods")
var User=require("../models/users")
mongoose.connect("mongodb://localhost:27017/shop")
mongoose.connection.on("connected",function(){
    console.log("数据库连接成功")
})
mongoose.connection.on("error",function(){
    console.log("数据库连接失败")
})
mongoose.connection.on("disconnected",function(){
    console.log("数据库已关闭")
})
router.get("/",function(req,res,next){
    res.send("这是goods页面")
})
router.get("/list",function(req,res,next){
    let sort=req.param('sort');
    let priceLevel=req.param('selectedPrice');
    let pageSize=req.param('pageSize'),
        currentPage=req.param('currentPage');
    pageSize=parseInt(pageSize)>0?parseInt(pageSize):8;
    currentPage=parseInt(currentPage)>0?parseInt(currentPage):1;
    let skip=(currentPage-1)*pageSize,
        limit=pageSize;
    let param={};
    switch (priceLevel) {
        case '0':
            param={
                salePrice:{
                    $gt:0,
                    $lte:100
                }
            }
            break;
        case '1':
            param={
                salePrice:{
                    $gt:100,
                    $lte:500
                }
            }
            break;
        case '2':
            param={
                salePrice:{
                    $gt:500,
                    $lte:1000
                }
            }
            break;
        case '3':
            param={
                salePrice:{
                    $gt:1000,
                    $lte:2000
                }
            }
            break;
        default:
            break;
    }
    console.log(param)
    let goodsModel=Goods.find(param).sort({salePrice:sort}).skip(skip).limit(limit);
    goodsModel.exec({},function(err,doc){
        if(err){
            res.json({status:"1",msg:"查询失败"})
            
        }else{
            res.json({status:"0",msg:"","result":doc})
            console.log(doc)
        }
    })
})
router.post("/addCart",function(req,res,next){
    let productId=req.body.productId;
    var userId=100000077;
    var goodexit='';
    User.findOne({'userId':userId},function(err,userdoc){
        if(!err){
            userdoc.cartList.forEach(function(element) {
                if(element.productId==productId){
                    goodexit=element;
                    element.productNum++;
                }
            });
            if(goodexit){
                userdoc.save(function(err,doc){
                    if(err){
                        res.json({
                            "status":"0",
                            msg:"添加商品数量失败!"
                        })
                    }else{
                        res.json({
                            "status":"0",
                            msg:"",
                            "result":"添加商品数量成功！"
                        })
                    }
                })
            }else{
                Goods.findOne({'productId':productId},function(err,goodsdoc){
                    goodsdoc.productNum = 1;
                    userdoc.cartList.push(goodsdoc);
                    userdoc.save(function(err,doc){
                        res.json({
                            "status":"0",
                            "msg":"",
                            "result":"添加购物车成功！"
                        })
                    })
                })
            }  
        }
    })
    
})
module.exports=router;