<template>
    <div class="bg_fff">
         <!-- 输入框 -->
          <div>
              <span>订单号<el-input v-model="orderNo" placeholder="订单号"></el-input></span>
              <span>收货人<el-input v-model="consignee" placeholder="收货人"></el-input></span>
              <span>手机号<el-input v-model="phone" placeholder="手机号"></el-input></span>
              <span>订单状态
                  <template>
                 <el-select v-model="orderState" placeholder="请选择">
                   <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </template>
              </span>
         
          <!-- 日期 -->
        
                <div class="block">
                    <span class="demonstration">选择时间</span>
                    <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                     <el-button type="primary" class="el_btn" @click="clickSearch">查询</el-button>
                </div>
             
          </div>

          <!-- 订单 -->
         <el-table
    :data="tableData"
    border
   >
    <el-table-column fixed prop="orderNo" label="订单号" width="150"> </el-table-column>
    <el-table-column prop="orderTime" label="下单时间"  width="120"> </el-table-column>
    <el-table-column prop="phone" label="手机号"  width="120"> </el-table-column>
    <el-table-column prop="consignee" label="收货人" width="100"> </el-table-column>
    <!-- <el-table-column prop="deliveryTime" label="配送地址" width="300"></el-table-column> -->
    <el-table-column prop="deliveryTime" label="送达时间" width="100"> </el-table-column>
    <el-table-column  prop="remarks"  label="用户备注" width="100"></el-table-column>
    <el-table-column  prop="orderAmount" label="订单金额"  width="100"> </el-table-column>
    <el-table-column  prop="orderState"  label="订单状态"  width="100"> </el-table-column>
    <el-table-column fixed="right" label="操作"  width="100"><template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
        <!-- 分页器 -->
  <div class="block">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

  <!-- -----------------------------------查看 ----------------------------->
  <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
  <el-form :model="detail">
    <el-form-item label="订单号:" style="margin-left:40px" prop="orderNo">
     <span>{{detail.orderNo}}</span>
    </el-form-item>
    <el-form-item label="下单时间:" :label-width="formLabelWidth"  prop="orderTime">
     <span>{{detail.orderTime}}</span>
    </el-form-item>
     <el-form-item label="手机号:" :label-width="formLabelWidth"  prop="phone">
     <span>{{detail.phone}}</span>
    </el-form-item>
     <el-form-item label="收货人:" :label-width="formLabelWidth"  prop="consignee">
     <span>{{detail.consignee}}</span>
    </el-form-item>
     <el-form-item label="送货地址:" :label-width="formLabelWidth"  prop="deliverAddress">
     <span>{{detail.deliverAddress}}</span>
    </el-form-item>
     <el-form-item label="送达时间:" :label-width="formLabelWidth"  prop="deliveryTime">
     <span>{{detail.deliveryTime}}</span>
    </el-form-item>
     <el-form-item label="用户备注:" :label-width="formLabelWidth"  prop="remarks">
     <span>{{detail.remarks}}</span>
    </el-form-item>
     <el-form-item label="订单金额:" :label-width="formLabelWidth"  prop="orderAmount">
     <span>{{detail.orderAmount}}</span>
    </el-form-item>
     <el-form-item label="订单状态:" :label-width="formLabelWidth"  prop="orderState">
     <span>{{detail.orderState}}</span>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  <!------------------------------------ 修改 ----------------------------------------------->

  <el-dialog title="修改订单" :visible.sync="isVisible">
  <el-form :model="form">
    <el-form-item label="订单号:" style="margin-left:40px" prop="orderNo">
     <el-input v-model="form.orderNo" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
    <el-form-item label="下单时间" :label-width="formLabelWidth"  prop="userGroup">
    <el-input v-model="form.orderTime" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
    <el-form-item label="手机号:" style="margin-left:40px" prop="orderNo">
     <el-input v-model="form.phone" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
    <el-form-item label="收货人:" style="margin-left:40px" prop="orderNo">
     <el-input v-model="form.consignee" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
    <el-form-item label="送达地址:" style="margin-left:40px" prop="deliverAddress">
     <el-input v-model="form.deliverAddress" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
    <el-form-item label="送达时间:" style="margin-left:40px" prop="orderNo">
     <el-input v-model="form.deliveryTime" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
      <el-form-item label="用户备注:" style="margin-left:40px" prop="orderNo">
     <el-input v-model="form.remarks" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
      <el-form-item label="订单金额:" style="margin-left:40px" prop="orderNo">
     <el-input v-model="form.orderAmount" autocomplete="off" style="width:220px"></el-input>
    </el-form-item>
      <el-form-item label="订单状态:" style="margin-left:40px" prop="orderNo">
      <template>
                 <el-select v-model="form.orderState" placeholder="请选择">
                   <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </template>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="isVisible = false">取 消</el-button>
    <el-button type="primary" @click="clickEdit">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>

<script>
import {OrderList,OrderDetail,orderEdit} from "@/api/apis"
import {transDate} from '@/utils/utils'
    export default {
          data() {
                return {
                  //信息查看
                  tableData: [], 
                  currentPage:1,
                  pageSize:5,
                  total:0,
           
                  option:["全部","已完成", "派送中", "已受理"],           
                  //查询数据
                    orderNo: "", //订单号
                    consignee: "", //收货人
                    phone: "", //手机号
                    orderState: "", //订单状态
                    date: "",
                    detail:{},//订单详情
                    formLabelWidth: '100px',
                    dialogFormVisible: false,
                    isVisible:false,
                    form:{}
                  }
              },

       created(){
             //刷新订单列表
           this.getOrderList()

            },
 
         methods: {
           //封装刷新订单列表函数
         getOrderList(paramsex){
             OrderList({
               currentPage:this.currentPage,
               pageSize:this.pageSize,
               ...paramsex
               }).then(res=>{
                 var arrs = res.data.data        
                 for (const obj of arrs) {
                   obj.orderTime = transDate(obj.orderTime)
                   obj.deliveryTime = transDate(obj.deliveryTime)
                 }
                this.tableData = arrs
                this.tableData=res.data.data
                this.total=res.data.total
             })
         },
         //查寻
         clickSearch(){
                  console.log(this.date);
            var {orderNo,consignee,phone,orderState} = this;
            var paramsex = {};
            if(orderNo !="") paramsex.orderNo = orderNo
            if(consignee !="") paramsex.consignee = consignee
            if(phone !="") paramsex.phone = phone
            if(orderState !="" && orderState != "全部") paramsex.orderState = orderState
            if(this.date) 
            paramsex.date = JSON.stringify([transDate(this.date[0]),transDate(this.date[1])])
            this.paramsex = paramsex

            this.getOrderList(this.paramsex)
         },
      //订单详情
      handleClick(row) {
        // console.log(row);
        this.dialogFormVisible = true
        OrderDetail(row.id).then(res=>{
          //  console.log(res.data);
          res.data.data.orderTime = transDate(res.data.data.orderTime)
          res.data.data.deliveryTime = transDate(res.data.data.deliveryTime)
          this.detail = res.data.data
           
        })
     // this.dialogFormVisible = false
      },

      //修改订单
     handleEdit(row){
      // console.log(row.data);
      this.form = {...row}
      this.isVisible = true
     
     },
     //确定修改订单
     clickEdit(){
         orderEdit(this.form).then(res=>{
            if(res.data.code == 0){
               this.$message({ //登录成功提示
              message: '订单修改成功!',
                  type: 'success'
                  
                });

            }else{
              this.$message({ //登录成功提示
              message: '请稍后再试!',
                  type: 'success'
                  
                });
            }
           
         })

         this.isVisible = false
          this.getOrderList()
     },

      handleSizeChange(newpagesize) {
        // 每页条数
        this.pageSize = newpagesize
         this.getOrderList(this.paramsex)
      },
      handleCurrentChange(newpage) {
        // 当前页
        this.currentPage = newpage
         this.getOrderList(this.paramsex)

      }
    },

   
       
    }
</script>

<style  scoped>
   
      .el-input{
          width: 150px;
          margin:0 10px;
      }  
      .bg_fff{
          background-color:#fff;
          padding: 20px;
      }
      .block{
          margin: 10px 0px;
      }
      .el_btn{
          margin: 0px 10px;
          margin-bottom: 50px;
      }
</style>