<template>
    <div>
           
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 
        <el-form-item label="原密码" prop="oldpass">
          <el-input type="password"  v-model.number="ruleForm.oldpass"  style="width:230px"></el-input>
        </el-form-item>
         <p class="error-p">{{ msg }}</p>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width:230px"></el-input>
        </el-form-item>
      <p class="error-p">{{ err }}</p>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button  @click="resetForm('ruleForm')">重置</el-button>
          
        </el-form-item>
      </el-form>
        </el-card>
   
    </div>
</template>

<script> 
   import {SurePwd} from "@/api/apis"
   import {ModifyPwd} from "@/api/apis"
    export default {
      data(){
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
           ruleForm: {
              oldpass:'',
              pass: '',
              checkPass: '',
        },
         rules: {
                  pass: [
                    { validator: validatePass, trigger: 'blur' }
                  ],
                  checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                  ],
              },
         msg:'',
         err:'',
        }
      },
      methods:{
        submitForm(){
            SurePwd(this.ruleForm.oldpass,localStorage.id).then((resa)=>{
             if(!(this.ruleForm.oldpass && this.ruleForm.pass && this.ruleForm.checkPass)){
                  this.err = '密码为必填项'
            
             }else {
                if(resa.data.code == 0){
                       this.ruleForm.msg = resa.data.msg     
                      ModifyPwd(this.ruleForm.pass,localStorage.id).then(res=>{
                           if(res.data.code == 0){
                                 this.$message({ //登录成功提示
                                  message: '恭喜你，修改成功!',
                                  type: 'success'
                                });
                           }
                      });
                    }else{
                       this.err = resa.data.msg
                    }
             }
           
           
            });

            
            
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
    clear: both
  }

  .box-card {
    width: 100%;
  }
   .spans{
      margin-right: 10px;
  }
  .content{
      padding-left: 60px;
  }
  .act_span{
      margin-left: 15px;
  }
  .el-btn{
      margin-left: 50px;
  }
  .error-p{
    color: red;
    font-size: 12px;
  }
</style>