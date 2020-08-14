<template>
  <div>
    <el-card class="box-card" body-style="padding:0px">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div class="text item" >
        <ul>
          <li>管理员ID:{{ id}}</li>
          <li>账号:{{acc}}</li>
          <li>用户组:{{userGroup}}</li>
          <li>创建时间:{{timer}}</li>
        </ul>
      
      </div>

      <el-col :span="12">
        <div class="demo-basic--circle img_div">
          <span style="line-height:45px">管理员头像:</span>
          <div class="block">
            <el-avatar shape="square" :size="50" :src="imgUrl"></el-avatar>
          </div>
          <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:5000/users/avatar_upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                     :data="uploaddata">
                    <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                    <i  class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </div>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import {personal} from '@/api/apis'
import {transDate} from '../../utils/utils'
export default {
  data() {
    return {
         id:"",
        acc:'',
        userGroup:'',
        timer:"",
        imgUrl:'',
        uploaddata:{}
    };
  },
  created(){
   
   this.getFinish()

     this.uploaddata = { id: localStorage.id };
  },
  methods:{
    handleAvatarSuccess(res){
      if(res.code == 0){
         this.$bus.$emit("imguploadfinish");
      }
         this.getFinish()

    },
    getFinish(){
      personal(localStorage.id).then(res=>{
        this.id = res.data.accountInfo.id
        this.acc = res.data.accountInfo.account
        this.userGroup = res.data.accountInfo.userGroup
        this.timer = res.data.accountInfo.ctime
        this.imgUrl = res.data.accountInfo.imgUrl

        this.timer = transDate(this.timer )
      })
    }
  }

};
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
li {
  line-height: 60px;
  list-style: none;
  border-bottom: 1px solid #ccc;
}
.img_div{
    display: flex;
    margin-left: 40px;
}
.block{
    margin-left:20px ;
}

/* 头像上传 */
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height:50px;
    line-height: 50px;
   
  }
  .avatar {
    width:50px;
    height: 50px;
    display: block;
  }
  .el-icon-plus{
    width: 50px;
    height: 50px;
  }
</style>