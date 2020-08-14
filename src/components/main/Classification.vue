<template>
    <div class="main_bg">
           <div class="title">
             <span>商品分类</span>
              <el-button type="primary"  @click="clickAdd">添加分类</el-button>
         </div>
      <!-- 添加分类模态框 -->
       <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="分类名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否启用">
    <el-switch v-model="form.value"  active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
 </el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="clickClass">确 定</el-button>
  </div>
</el-dialog>



         <!-- 数据列表 -->
          <el-table
    :data="tableData"
    style="width: 100% ,padding:20px">
    <el-table-column
      label="序号"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分类名称"
      width="180">
      <template slot-scope="scope">
      
       <span style="margin-left: 10px" v-show="!scope.row.isedit">{{ scope.row.cateName }}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
      </template>
    </el-table-column>
    <el-table-column
      label="是否启用"
      width="180">
     <template slot-scope="scope">
      <el-switch
            :disabled="!scope.row.isedit"
           v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949">
</el-switch>
      </template> 
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
            <div class="block">
      <el-pagination
                 @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                  >
      </el-pagination>
  </div>
    </div>
</template>
  
<script>
import {getClass,delcate,addClass,editcate} from "@/api/apis";
    export default {
          data() {
      return {

          formLabelWidth: '80px',
          dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          value:true,
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },

        tableData: [], 
          total:1, 
          pagesize:5,
          currentPage: 1
      }
    },
    created(){
        this.fn()
    },
    methods: {
      //更新数据
        fn(){
            getClass(this.currentPage,this.pagesize).then(res=>{
                 let arr = res.data.data;
                   for (let i = 0; i < arr.length; i++) {
                        arr[i].state = arr[i].state == 1;
                        arr[i].isedit = false;
                      } //是否在编辑状态
                  
              this.tableData = arr
              this.total = res.data.total
 
         })
        },

      // 编辑
      handleEdit(scope) {
        if (scope.row.isedit) {
              
         editcate(scope.row).then(res=>{ 
                if(res.data.code == 0){
                   this.$message({
                  type: 'success',
                  message: '修改成功!'
          });
           console.log(res.data);
                scope.row.isedit = false;
          }
         })
      } else {
        //开启编辑状态
        scope.row.isedit = true;
      }
        
      },
      handleDelete(scope) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
         delcate(scope.row.id).then(res=>{
           if(res.data.code==0) this.fn()
             
             this.$message({
            type: 'success',
            message: '删除成功!'
          });
         

         })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      

      },
      //添加分类
      clickAdd(){
        this.dialogFormVisible = true
      },
      clickClass(){
          addClass(this.form.name,this.form.value).then(res =>{
              if(res.data.code==0){
               
                  this.$message({
                  type: "success",
                  message: "添加成功!"
                  
          });
           this.fn()
              }else{
                  this.$message({
            type: "success",
            message: "添加失败!"
          });
              }
          })
         this.dialogFormVisible = false

      },


      //分页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
        this.fn()
      }
    }
    }
</script>

<style scoped>
.main_bg{
   background: #fff;
}
 .title{
        height: 60px;
        line-height:60px;
        display: flex;
        border-bottom:1px solid #ddd ;
        justify-content: space-between;
        padding-left: 20px;
    }
    .el-button{
        margin: 10px;
        height: 40px;
        }
          .block{
          padding-bottom:30px ;
          padding-left: 20px;
      }
       
</style>