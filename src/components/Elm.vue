<template>
  <div style="height:100%">
    <el-container>
      <!-- 侧栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="curhash"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
              unique-opened
            >
              <span>
                <i class="el-icon-sugar font_i"></i>
                <i class="el-icon-cold-drink font_span"></i>
              </span>
              <div v-for="(item) in powerarr" :key="item.url">
                <el-menu-item v-if="!item.children" :index="item.url">
                  <i :class="item.icon" class="chart_span"></i>
                  <span>{{item.name}}</span>
                </el-menu-item>

                <el-submenu v-else :index="item.url">
                  <template slot="title">
                    <i :class="item.icon" class="chart_span"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-for="(child) in item.children"
                      :key="child.url"
                      :index="child.url"
                    >{{child.name}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header style="background:#fff">
           <div style="width:300px">
          <el-breadcrumb separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item v-for="item in routlist" :key="item" style="line-height:50px">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right" style="line-height:50px;margin-right:10px"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/Elm/Addacc" style="text-decoration:none;padding:5px 10px;color:#555">个人中心</router-link>
            </el-dropdown-menu>
          </el-dropdown>
          <el-row class="demo-avatar demo-basic">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="headimg"></el-avatar>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-header>

        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { checktoken,personal } from "@/api/apis";
export default {
  data() {
    return {
      headimg:"",
      username: "", 
      list: [
        {
          url: "/Elm/Home",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/Elm/Order",
          icon: "el-icon-s-order",
          name: "订单管理",
          roles: ["super", "normal"]
        },
        {
          url: "/Elm/lidee",
          icon: "el-icon-s-claim",
          name: "商品管理",
          children: [
            { url: "/Elm/GoodsList", name: "商品列表" },
            { url: "/Elm/Addgoods", name: "商品添加" },
            { url: "/Elm/Classification", name: "商品分类" },
          ],
          roles: ["super", "normal"]
        },
        { 
          url: "/Elm/ShopAdmin",
           icon: "el-icon-s-shop",
            name: "店铺管理" ,
            roles: ["super"]
        },
        {
          url: "/Elm/liders",
          icon: "el-icon-user-solid",
          name: "账号管理",
          children: [
            { url: "/Elm/AccList", name: "账户列表" },
            { url: "/Elm/Account", name: "账户添加" },
            { url: "/Elm/ModifyPwd", name: "修改密码" },
          ],
          roles: ["super"]
        },
        {
          url: "/Elm/lider",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/Elm/Goods_Sta", name: "商品统计" },
            { url: "/Elm/Statistical", name: "订单统计" },
          ],
          roles: ["super"]
        },
      ],
      curhash:"",
      routlist:[],
      
    };
  },

  computed: {
     powerarr(){
       //返回新的数组
         var newarr = this.list.filter((item)=>{
            // 返回包含此用户权限的数据
            return item.roles.includes(localStorage.role)
         })
         return newarr

     }
  },

  created() {
        
      this.curhash = this.$route.path
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = localStorage.acc;
      } else {
        this.username = "请登录";
      }
    });
    this.refreshinfo();
    this.$bus.$on("imguploadfinish", () => {
      this.refreshinfo(); //刷新头像
    });

    this.routlist = this.$route.meta.routlist
   

  },
    methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
     refreshinfo(){
        personal(localStorage.id).then(res=>{
              this.headimg = res.data.accountInfo.imgUrl
              
    })
     }
  },
  watch:{
      $route(to){
        this.routlist = to.meta.routlist
        // console.log(this.routlist);
      }
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 50px;
}

.el-aside {
  background-color: #545c64;
}

.el-main {
  background-color: #f0f2f5;
  color: #333;
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
  
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  width: 200px;
  height: 100%;
}

/* 下拉菜单 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header {
  display: flex;
  justify-content: space-between;
}

.el-dropdown {
  margin-left: 800px;
}
.font_i {
  font-size: 30px;
  margin-left: 100px;
  color: orange;
}
.font_span {
  font-size: 50px;
  color: #409eff;
}
.chart_span {
  color: #fff;
}
.el-dropdown-link{
  display: flex;
}
</style>