<template>
  <div class="main_bg">
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button style="float: right" type="primary" @click="clickSave">保存</el-button>
      </div>
      <div class="text item">
        <el-form label-width="80px">
          <el-form-item label="店铺名称">
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input type="textarea" v-model="bulletin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
              <div class="block">
            <el-upload
              :action="shop_Img"
              :on-success="handleAvatarSuccessHead"
              :show-file-list="false"
            >
              <img style="width: 150px"  :src="avatar =='' ? '' : getShop_Img + avatar" />
            </el-upload>
            
          </div>
          </el-form-item>
          <el-form-item label="店铺图片">
          
        <el-upload
            :action="shop_Img"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-remove="removeImg"
            :file-list="shopimgs"
           >
            <i class="el-icon-plus"></i>
            </el-upload>
 
          </el-form-item>
          <el-form-item label="配送费">
            <el-input v-model="deliveryPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="deliveryTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-rate v-model="score"  show-text></el-rate>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="sellCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="supports">
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox><br>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8择抢购" name="type"></el-checkbox><br>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>   
            </el-checkbox-group>
          </el-form-item> 
          <el-form-item label="营业时间">
            <el-time-picker
              v-model="date"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
    import {shopInfo,shop_Img,getShop_Img,shopEdit} from "@/api/apis"
    import {transDate} from '@/utils/utils'
export default {
  data() {
    return {
      shop_Img:"",
      getShop_Img:"",
      dialogImageUrl:"",
      dialogVisible: false,
      
      avatar: "", //店铺头像
      bulletin: "", //公告
      date: [], //营业时间
      deliveryPrice: 0, //配送费
      deliveryTime: 0, //送达时间
      description: "", //描述
      id: 0,
      minPrice: 0, //起送费
      name: "",
      pics: [], //店铺图片
      score: 0, //评分
      sellCount: 0, //销量
      supports: [], //活动

       //回填店铺图片数组
      shopimgs: [],
      
     
    };
  },
  created(){
      this.shop_Img = shop_Img;
      this.getShop_Img = getShop_Img;

    shopInfo().then(res=>{
       
        for (const key in res.data.data) {
          this[key] = res.data.data[key];
        }
        //回填照片墙图片
         this.shopimgs = this.pics.map(imgstr => {
           return {
             name:imgstr,
             url: getShop_Img + imgstr
           }
         })
    })
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
     //店铺头像上传成功
    handleAvatarSuccessHead(res) {
        // console.log(res.imgUrl);
            if(res.code ==0){
            this.avatar = res.imgUrl;
            this.$message({
                type: "success",
                message: "店铺头像上传成功"
              });
      }
    },
    //上传成功时回调
     handleAvatarSuccess(res) {
        
            if(res.code == 0){
               this.pics.push(res.imgUrl);  
            }
            // console.log(res.imgUrl);
         },
    removeImg(res){
       console.log(res.name);
       this.pics.splice(this.pics.indexOf(res.name),1)
    },
    clickSave(){
      var params = {
              id:this.id,
              name:this.name,
              bulletin:this.bulletin,
              avatar:this.avatar,
              deliveryPrice:this.deliveryPrice,
              deliveryTime:this.deliveryTime,
              description:this.description,
              score:this.score,
              sellCount:this.sellCount,
              supports:JSON.stringify(this.supports),
              date:JSON.stringify([transDate(this.date[0]),transDate(this.date[1])]),
              pics:JSON.stringify(this.pics)
      };
 
      shopEdit(params).then(res=>{
        if(res.data.code == 0){
          this.$message({
                type: "success",
                message: "店铺信息修改成功！"
              });
        }
      })

    }
   
  }
};
</script>

<style scoped>
.main_bg {
  background: #fff;
}
.el-button {
  height: 40px;
}
.el-input,
.el-txt {
  width: 300px;
}
.img_toux {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
}


</style>