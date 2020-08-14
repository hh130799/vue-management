<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
       
      </div>
      <div class="text item"><span class="spans">商品名称</span>
          <el-input v-model="name" placeholder="请输入内容" style="width:300px">{{name}}</el-input>
      </div>
       <div class="text item"><span class="spans">商品分类</span>
         <el-select v-model="Cgood" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.cateName"
                    :label="item.label"
                    :value="item.cateName">
                    </el-option>
                </el-select>
      </div>
        <div class="text item"><span class="spans">商品价格</span>
          <el-input-number v-model="price" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </div>
        <div class="text item img_div"><span class="spans">商品图片</span>
        <el-upload
            :action="imgs_Upload"
            list-type="picture-card"
           
            :on-success="handleAvatarSuccess"
           >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imgs" alt="">
        </el-dialog>
      </div>
        <div class="text item img_div"><span class="spans">商品描述</span>
         <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="goodsDesc"
            style="width:300px">
            </el-input>
      </div>
       <el-button type="primary" style="margin:0px 70px" @click="addGoods">添加商品</el-button>
    </el-card>
  </div>
</template>

<script>
import {categories,goodAdd,imgs_Upload} from "@/api/apis"
export default {
     data() {
    return {
      name: '',
      Cgood:'',
      options: [],
      price: 1,
      dialogVisible: false,
      goodsDesc: '',
      imgs:"",
      imgs_Upload:""
    }
  },
   methods: {
      handleChange(value) {
        console.log(value);
      },
      handleAvatarSuccess(res) {
            // console.log(res);
            if(res.code == 0){
               this.imgs = res.imgUrl
            }
        
      },
      addGoods(){
          goodAdd(this.name,this.Cgood,this.price,this.imgs,this.goodsDesc).then(res=>{
               if(res.data.code==0){
                     this.$message({ //登录成功提示
                      message: '添加成功!',
                          type: 'success'
                });
                this.name="",
                this.Cgood="",
                this.price="",
                this.goodsDesc=""
                 
               }else {
                  this.$message({ //登录成功提示
                     message: '添加失败!',
                  type: 'success'
                  
                });
               }

          })
      }
    
    },
    created(){
      this.imgs_Upload = imgs_Upload
      //商品查询
      categories().then(res=>{
        this.options=res.data.categories
      })
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
    clear: both
  }

  .box-card {
    width: 100%;
  }
  .img_div{
      display: flex;
      
  }
  .spans{
      margin-right: 10px;
  }
</style>