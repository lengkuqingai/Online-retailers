<template>
  <div>
      <div class="site-header" style="clear:both;">
        <div class="container">
            <div class="header-logo">
                <a href="index.php" title="小米官网"><img src="../../static/img/logo.png" /></a>
            </div>
            <div class="header-nav">
                <ul class="nav-list">
                    <li class="nav-category">
                        <a class="btn-category-list" href="catalog.php" style="display:none;">全部商品分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="link" href="category.php?id=76"><span>电子产品</span></a>
                        <div class='item-children'>
                            <div class="container">
                                <ul class="children-list clearfix">
                                    <li class="first">
                                        <div class="figure figure-thumb">
                                            <a href="goods.php?id=27"><img src="" alt="小米电视2 40英寸"></a>
                                        </div>
                                        <div class="title"><a href="goods.php?id=27">小米电视2 40英寸</a></div>
                                        <p class="price">2200<em>元</em>元</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="container-user"> -->
            <div class="topbar-cart" id="ECS_CARTINFO">
                <a class="cart-mini " href="flow.php">
                    <i class="iconfont">&#xe60c;</i> 
                    <router-link to="/cart">购物车</router-link>
                    <span class="mini-cart-num J_cartNum" id="hd_cartnum">(0)</span>
                </a>
            </div>
            <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
                <span v-text="nickName"></span>
                <a class="link" href="javascript:;" rel="nofollow" @click="login" v-if="!nickName">登录</a>
                <span class="sep">|</span>
                <a href="javascript:;" v-if="nickName" @click="logout">退出</a>
                <a class="link" href="javascript:;" rel="nofollow" v-if="!nickName">注册</a>
            </div>
            <!-- </div> -->
        </div>
        <div id="J_navMenu" class="header-nav-menu" style="display: none;">
            <div class="container"></div>
        </div>
    </div>



    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':loginFlag}">
        <div class="md-modal-inner">
          <div class="md-top">
            <div class="md-title">login in</div>
            <button class="md-close" @click="loginFlag=!loginFlag">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <div class="error-wrap">
                <span class="error error-show" >用户名或密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name" data-type="loginname" class="regi_login_input regi_login_input_left">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
                </li>
              </ul>

            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="logininfo">登录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="loginFlag" @click="loginFlag=!loginFlag">
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            loginFlag:false,
            userName:'',
            userPwd:'',
            nickName:''
        }
    },
    created(){
        this.checkLogin()
    },
    methods:{
        login(){
            this.loginFlag=!this.loginFlag
        },
        logininfo(){
            axios.post('/users/login',{"userName":this.userName,"userPwd":this.userPwd}).then(res=>{
                this.loginFlag=!this.loginFlag;
                this.nickName=res.data.result.userName;
            })
        },
        logout(){
            axios.post('/users/logout').then(res=>{
                this.nickName=res.data.result.userName;
            })
        },
        checkLogin(){
            axios.post('/users/checkLogin').then(res=>{
                this.nickName=res.data.result;
            })
        }
    }
}
</script>

<style>

</style>
