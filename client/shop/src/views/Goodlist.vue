<template>
  <div>
      <nav-header></nav-header>
      <nav-bread>
          goods
      </nav-bread>
      <!-- <Nav></Nav> -->
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" @click="sortgoods" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur':selectedPrice=='all'}" @click="priceChecked('all')">All</a></dd>
                        <dd v-for="(item,index) in priceLevel">
                            <a @click="priceChecked(index)" :class="{'cur':selectedPrice==index}" href="javascript:void(0)">{{item.start}} - {{item.end}}</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for=" item in goods">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'static/img/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav-footer></nav-footer>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
  </div>
</template>
<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Navbread'
import Nav from '@/components/Nav'
import axios from 'axios'
    export default {
        components:{
            NavHeader,
            NavFooter,
            NavBread,
            Nav
        },
        data(){
            return {
                goods:[],
                sortflag:true,
                selectedPrice:'all',
                busy:false,
                currentPage:1,
                priceLevel:[{
                    start:0,end:100
                },{
                    start:100,end:500
                },{
                    start:500,end:1000
                },{
                    start:1000,end:2000
                }]
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(flag){
                let sort=this.sortflag ? 1 : -1;
                let param={
                    sort:sort,
                    selectedPrice:this.selectedPrice,
                    pageSize:8,
                    currentPage:this.currentPage
                };
                axios.get('/goods/list',{params:param}).then(res=>{
                    if(!flag){
                        this.goods=res.data.result;
                    }else{
                        this.goods =this.goods.concat(res.data.result);
                        if(res.data.result.length==0){
                            this.busy=true;
                        }else{
                            this.busy=false;
                        }
                    }
                })
            },
            sortgoods(){
                this.sortflag=!this.sortflag;
                this.getGoodsList();
            },
            priceChecked(index){
                this.selectedPrice=index;
                this.currentPage=1;
                this.getGoodsList();
            },
            loadMore: function() {
                this.busy = true;
                setTimeout(() => {
                    this.currentPage++;
                    this.getGoodsList(true);
                }, 1000);
            },
            addCart(productId){
                axios.post('/goods/addCart',{productId:productId}).then(res=>{
                    console.log(res)
                    if(res.data.status=="0"){
                        alert("添加购物车成功！")
                    }
                })
            }
        }
    }
</script>
