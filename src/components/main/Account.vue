<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账户" prop="acc" >
    <el-input  v-model="ruleForm.acc" autocomplete="off" style="width:218px"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="pwd" >
    <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" style="width:218px"></el-input>
  </el-form-item>
       <el-form-item label="用户组" prop="userGroup">
    <el-select v-model="ruleForm.userGroup" >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
     
    </el-select>
  </el-form-item>
           <p class="error-p">{{ msgs }}</p>
        <div class="el-btn">
          <el-button type="primary" @click="clickadd">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
       

       </el-form>
    </el-card>
  </div>
</template>

<script>
import { adduser } from "@/api/apis";
export default {
        data(){

                  return{
                  
                    msgs:'', 
                    options:[
                      {value:"超级管理员", label:"超级管理员"},
                      {value:"普通管理员", label:"普通管理员"},             
                      ], 

                  ruleForm: {
                    acc:'',
                    pwd:'', 
                    userGroup:'',  
                      },           
                  }
        },
        methods:{
          clickadd(){
            adduser(this.ruleForm.acc,this.ruleForm.pwd,this.ruleForm.userGroup).then(res=>{

               if(this.ruleForm.acc==""&&this.ruleForm.pwd==""&&this.ruleForm.userGroup==""){
                   this.msgs = "用户名或密码不能为空"
               } else if(res.data.code == 0){
                   this.$router.push("/Elm/Home")
              }

            })
          },
          resetForm(formName) {
        this.$refs[formName].resetFields();
      }
        
      
        
    }
        }


</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.spans {
  margin-right: 10px;
}
.content {
  padding-left: 100px;
}
.act_span {
  margin-left: 15px;
}
.el-btn {
  margin-left: 50px;
}
.error-p{
  font-size: 12px;
  color: red;
  margin-left: 100px;
}
</style>