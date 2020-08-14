<template>
    <div>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple item_div">
                     <i class="el-icon-document icon_size"></i>
                     <p class="font c_fff">总订单<br>
                     <span class="c_000">{{alldata.totalOrder}}</span></p>
                    </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple item_div">
                    <i class="el-icon-money  icon_size icon_size1"></i>
                     <p class="font c_fff">总销售额<br>
                     <span class="c_000">{{alldata.totalAmount}}</span></p>
                    </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple item_div">
                    <i class="el-icon-tickets icon_size icon_size2"></i>
                     <p class="font c_fff">今日订单<br>
                     <span class="c_000">{{alldata.todayOrder}}</span></p></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple item_div">
                    <i class="el-icon-coin icon_size  icon_size3"></i>
                     <p class="font c_fff">{{alldata.totayAmount}}<br>
                     <span class="c_000">102,400</span></p></div></el-col>
            </el-row>

             <!-- 数据图 -->
           <div ref="chart" style="width:80%;height:370px" id="allcount"></div>
    </div>
</template>

<script>
import echarts from "echarts";
  import { totalData } from "@/api/apis";
    export default {
           data(){
              return{
                data:[],
                alldata:'',
              }
           },

  mounted(){
   var mcharts = echarts.init(document.getElementById("allcount"));
   
        totalData().then(res=>{

          this.alldata = res.data
        
        const option = {
    title: {
        text: '数据统计'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ["金额数据","订单数据"]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: res.data.xData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '金额数据',
            type: 'line',
            stack: '总量',
            data: res.data.amountData
        },
        {
            name: '订单数据',
            type: 'line',
            stack: '总量',
            data:res.data.orderData
        },
    ]
};
        mcharts.setOption(option);
      
        }) 
    
    },

    }
</script>

<style scoped>
   
     .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #fff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 80px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /* 图标 */
  .icon_size{
      font-size: 50px;
      color:deepskyblue;
      line-height: 80px;
  }
  .icon_size1{
 color:#D4237A;
  }

   .icon_size2{
 color:#1296DB;
  }
    .icon_size3{
 color:#1AFA29;
  }
  .c_fff{
      color: #ccc;
  }
  .item_div{
      display: flex;
      justify-content: space-around;
  }
  .font{
      margin-top: 20px;
      line-height: 20px;
      font-size: 14px;
  }
  .c_000{
      color: #000;
  }
  .chart_div{
    background: #fff;
    padding: 20px;
  }
</style>