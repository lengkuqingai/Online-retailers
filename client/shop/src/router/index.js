import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goodlist from '@/views/Goodlist'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm';
import orderSuccess from '@/views/orderSuccess';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goodlist',
      component: Goodlist
    },{
      path: '/cart',
      name: 'Cart',
      component: Cart
    },{
      path: '/address',
      name: 'address',
      component: Address,
  },{
        path: '/orderconfirm',
        name: 'OrderConfirm',
        component: OrderConfirm,
    },{
          path: '/ordersuccess',
          name: 'orderSuccess',
          component: orderSuccess,
      }
  ]
})
