<template>
    <div>
             <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>商品列表</span>
   
  </div>
  <div  class="text item">
           <el-table
       v-loading="loading"
       element-loading-text="拼命加载中"
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
         
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
           <el-form-item label="所属分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
           <el-form-item label="添加时间">
            <span>{{props.row.ctime}}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>{{ props.row.price }}</span>
          </el-form-item>
         
          <el-form-item label="店铺描述">
            <span>{{ props.row.goodsDesc }}</span>
          </el-form-item>
         
        </el-form>
      </template>
    </el-table-column>
   
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
     <el-table-column
      label="所属分类"
      prop="category">
    </el-table-column>
     <el-table-column
      label="商品价格"
      prop="price">
    </el-table-column>
     
     <el-table-column
      label="商品图片"
      prop="imgUrl">
      <template slot-scope="scope">
        <img :src="get_Img + scope.row.imgUrl" style="width:60px">
        </template>
    </el-table-column>
    <el-table-column
      label="商品描述"
      prop="goodsDesc">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <!-- 修改商品 -->
 

<el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
   
    <el-form-item label="所属分类" :label-width="formLabelWidth">
      <el-select v-model="form.category" placeholder="请选择分类">
         <el-option
                    v-for="item in options"
                    :key="item.cateName"
                    :label="item.label"
                    :value="item.cateName">
                    </el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="商品价格" :label-width="formLabelWidth">
      <el-input-number v-model="form.price"  :min="0" autocomplete="off"></el-input-number>
    </el-form-item>

    
    <el-row>
        <el-col>
          商品图片
          <div class="inner">
            <el-upload
              :action="imgs_Upload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
            >
              <i v-show="!form.imgUrl" class="el-icon-plus"></i>
              <img
                style="width: 100px"
                v-show="form.imgUrl"
                :src="get_Img  + form.imgUrl"
              />
            </el-upload>
          </div>
        </el-col>
      </el-row>
     <el-form-item label="修改商品描述" :label-width="formLabelWidth">
      <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="goodEdits">确 定</el-button>
  </div>
</el-dialog>
  </div>
   <div class="block">
   <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20,25,30,35,40,45,50]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
     </el-pagination>
                     </div>
</el-card>
    </div>
</template>

<script>
import {goodList,delGoods,goodEdit,categories,imgs_Upload,get_Img} from '@/api/apis'
import {transDate} from '@/utils/utils'
    export default {
        data() {
      return {
        tableData: [],//列表数据
         currentPage: 1,//当前页数
         currPage: 1,
         pagesize:5,//每页条数
         total:0,//总条数
        dialogTableVisible: false,
        dialogFormVisible: false,
       
        form: {},
         options: [],
         loading: false,
         formLabelWidth: '100px',
         imgs_Upload:"",
         get_Img:''
      }
    },
      methods: {
        getList(){
             goodList(this.currentPage,this.pagesize).then(res=>{
              
              var arr = res.data.data
               for (const obj of arr) {
                  obj.ctime = transDate(obj.ctime)
               } 
               this.tableData = arr
              this.tableData = res.data.data
              this.total = res.data.total

       })
        },
        //图片上传成功回调
         handleAvatarSuccess(res) {
            if(res.code == 0){
               this.form.imgUrl = res.imgUrl
            }
         },
      handleEdit(row) {
       
        categories().then(res=>{
        this.options=res.data.categories
      })
         this.form = {...row}
        //  console.log(this.form)
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm("此操作将永久删除数据, 是否继续?", "系统提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "保留数据",
        type: "warning"
      })
        .then(() => {
          delGoods(row.id).then(res => {
            if (res.data.code == 0) this.getList();
          });

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
         
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       handleSizeChange(newpagesize) {
        // console.log(`每页 ${val} 条`);
         //改变当前条数
        this.pagesize = newpagesize
         this.getList()
      },
      handleCurrentChange(newpage) {
           //改变当前页数
       this.currentPage = newpage;
      //请求当前页数新数据
        // console.log(`当前页: ${val}`);
        this.currentPage = newpage
        this.getList()
      },

      //修改商品
      goodEdits(){
         goodEdit(this.form).then(res=>{
          //  console.log(res.data);
              if(res.data.code == 0){
                 this.$message({ //登录成功提示
                      message: '修改成功!',
                          type: 'success'
                });
              }else{
                  this.$message({ //登录成功提示
                      message: '修改失败!',
                          type: 'success'
                });
              }
         }) 

         this.getList()
         this.dialogFormVisible = false
      }
    },
    created(){
      this.loading=true
      //图片
      this.imgs_Upload = imgs_Upload
      this.get_Img = get_Img
      this.getList()
      //获取分类数据
      categories().then(res=>{
        this.options=res.data.categories
      })
      //关闭加载
       this.loading=false
    }
    }
</script>

<style scoped>
/* 整体样式 */
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
 /* 表格样式 */
   .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width:70px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>