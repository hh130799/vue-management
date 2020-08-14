import vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import {checktoken} from './api/apis'

vue.use(VueRouter)//使用插件
 

// 创建一个路由对象,并且暴露此路由对象
  var router =  new VueRouter({
     routes: [
         {
        path: '/', //hash值
        name: 'default',   //路由对象的名字/id
        component: Login,      //切换页面       
    },
    {
        path:'/Elm',  
        name: 'Elm', 
         component:()=>import('./components/Elm'),
         children:[{
            path:'/Elm/Home',
            name:'Home',
            component:()=>import('./components/main/Home'),
            meta:{routlist:["后台首页"]}
            
         },
         {
            path:'/Elm/ShopAdmin',
            name:'ShopAdmin',
            component:()=>import('./components/main/ShopAdmin'),
            meta:{routlist:["店铺管理"]}

         },
         {
            path:'/Elm/Order',
            name:'Order',
            component:()=>import('./components/main/Order'),
            meta:{routlist:["订单管理"]}

         },
         {
            path:'/Elm/Statistical',
            name:'Statistical',
            component:()=>import('./components/main/Statistical'),
            meta:{routlist:["销售统计","订单统计"]}

         },
         {
            path:'/Elm/Addacc',
            name:'Addacc',
            component:()=>import('./components/main/Addacc'),
            
         },
         {
            path:'/Elm/Classification',
            name:'Classification',
            component:()=>import('./components/main/Classification'),
            meta:{routlist:["商品管理","商品分类"]}

         },
         {
            path:'/Elm/Addgoods',
            name:'Addgoods',
            component:()=>import('./components/main/Addgoods'),
            meta:{routlist:["商品管理","商品添加"]}

         },
         {
            path:'/Elm/Goods_Sta',
            name:'Goods_Sta',
            component:()=>import('./components/main/Goods_Sta'),
            meta:{routlist:["销售统计","商品统计"]}
         },
         {
            path:'/Elm/Account',
            name:'Account',
            component:()=>import('./components/main/Account'),
            meta:{routlist:["账号管理","账户添加"]}
         },
        
         {
            path:'/Elm/ModifyPwd',
            name:'ModifyPwd',
            component:()=>import('./components/main/ModifyPwd'),
            meta:{routlist:["账号管理","修改密码"]}

         },
         {
            path:'/Elm/AccList',
            name:'AccList',
            component:()=>import('./components/main/AccList'),
            meta:{routlist:["账号管理","用户列表"]}

         }, 
         {
            path:'/Elm/GoodsList',
            name:'GoodsList',
            component:()=>import('./components/main/GoodsList'),
            meta:{routlist:["商品管理","商品列表"]}

         },
         
        ]
         
         

        
    }
    ]
})

//路由拦截
router.beforeEach((to,from,next)=>{
    console.log(from);
    if(to.path !='/'){
      checktoken(localStorage.token).then(res=>{
         if(res.data.code == 0){
            next()
         }else{
            next('/')
         }
      });

    }else 
      next()

})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router