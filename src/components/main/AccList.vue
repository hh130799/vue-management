<template>
    <div>
           <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号列表</span>
               
            </div>
            <div class="text item">
   <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="账号"
      width="120">
      <template slot-scope="scope">{{ scope.row.account }}</template>
    </el-table-column>
    <el-table-column
      prop="userGroup"
      label="用户组"
      width="120">
    </el-table-column>
    <el-table-column 
     
      label="创建时间"
      show-overflow-tooltip>
       <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
   




       </el-table>

            </div>

             <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                     </div>
                 <el-button type="danger" @click="toggleSelection([multipleSelection])">批量删除</el-button>
                <el-button type="primary">取消选择</el-button>       

            </el-card>

             <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="账号" style="margin-left:60px">
      <el-input v-model="form.account" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
    <el-form-item label="用户组" :label-width="formLabelWidth"  prop="userGroup">
     <el-select v-model="form.userGroup" >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
    </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="clickEdit">确 定</el-button>
  </div>
</el-dialog>

    </div>

    
</template>

<script>
import {acclist,reuser,batchdel,userEdit} from '@/api/apis'

import {transDate} from '@/utils/utils'
    export default {
         data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage4: 1,
        currentPage: 5,
        pagesize:1,
        total:0,
        formLabelWidth: '100px',
        dialogFormVisible: false,
         options:[
                      {value:"超级管理员", label:"超级管理员"},
                      {value:"普通管理员", label:"普通管理员"},             
                      ], 
        form: {
          account: '',
          userGroup:"",
        },
      }
    },
      created(){//账号列表更新

     this.getlist()

    },
         methods: {
        // 封装列表更新函数
        getlist(){
           acclist(this.pagesize,this.currentPage).then(res=>{
         
         var arrs = res.data.data
          for (const obj of arrs) {             
              obj.ctime = transDate(obj.ctime)
         }
          this.tableData = arrs
         this.tableData=res.data.data
        
        this.total=res.data.total
         })
        },

          //  账号编辑
      handleEdit(row) {
        // console.log(scope);
         this.form = {...row}
        this.dialogFormVisible = true
      },
      //账户确定修改
      clickEdit(){
           userEdit(this.form).then(res=>{
             if(res.data.code==0){
                 this.$message({ //登录成功提示
              message: '账号修改成功!',
                  type: 'success'
                  
                });
                this.getlist()
             }else{
                this.$message.error('请稍后再试！！！');
             }
           })
            this.dialogFormVisible = false
      },

      //账号删除
      handleDelete(index, row) {
        // console.log(index, row);
        reuser(row.id).then(res=>{
            if(res.data.code==0){
               this.$message({ //登录成功提示
              message: '删除成功!',
                  type: 'success'
                  
                });
           this.getlist()
            }
        })

      },
     
        toggleSelection(rows) {
         
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
            batchdel(row).then(res=>{
              if(res.data.code == 0){
                    this.$message({ //登录成功提示
                  message: '批量删除成功!',
                      type: 'success'
                });
             this.getlist()

              }else {
                 this.$notify.error({
                   
                    message: '批量删除失败'
                  });
              }
            })
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //选中的值
      handleSelectionChange(val) {
         
        this.multipleSelection = val;
         console.log(val);
        var arr=[]
        for (const val of this.multipleSelection) {
              arr.push(val.id)   
                 }
          // console.log(newarr)
         var newarr = JSON.stringify(arr)
          this.multipleSelection = newarr


        
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = val
         this.getlist()

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagesize = val
       this.getlist()
      },
    },

    }
    
</script>

<style scoped>
 .block{
     padding: 20px;
 }
 .el-button{
     margin: 0px 10px;
 }
 .el-dialog, .el-pager li{
   width:30%;
 }
</style>