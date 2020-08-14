<template>
    <div> 
         <el-container>  
        <el-main >
          <div>
            <p>系统登录</p>

            <el-input v-model="acc" prefix-icon="el-icon-user-solid"  size="small"> </el-input><br>
 
           <el-input  v-model="pwd" show-password prefix-icon="el-icon-lock"  size="small"></el-input><br>
           <p class="error-p">{{ msgs }}</p>
           <el-button type="primary" @click="clickLogin">登录</el-button>
           
          </div>
         
        </el-main>
        </el-container>
    </div>
</template>

<script>
import {Login} from "@/api/apis"
    export default {
         data() {
          return {
            acc: '',
            pwd:'',
            msgs:''
    }
  },
  methods:{
      clickLogin(){
        Login(this.acc,this.pwd).then(res => {
         
         if(res.data.code == 0){
            // console.log(res.data);
             localStorage.token = res.data.token 
             localStorage.role = res.data.role //写入用户组
             localStorage.id = res.data.id //存入ID
            localStorage.acc = this.acc //存入用户

           this.$router.push("/Elm/Home")//改变hash地址
           this.$message({ //登录成功提示
              message: '恭喜你，登录成功!',
              type: 'success'
            });

          }else this.msgs = res.data.msg
        })
      }
  }
}
    
</script>

<style scoped>
.el-main {
    background-color: #545C64;
    color: #fff;
    text-align: center;
    height: 100%;    
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    top: 0;
    bottom: 0;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-input{
      width: 240px;
      margin-bottom:10px;
      
  }
  .el-button {
      padding: 8px 105px;
  }
  .error-p{
  font-size: 12px;
  color: red;
 
}
</style>