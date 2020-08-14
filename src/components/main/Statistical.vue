<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" class="el_btn" @click="clickSearch">查询</el-button>
    </div>
    <!-- 数据图 -->
    <div class="bgff">
      <div ref="chart" style="width:70%;height:350px" id="chart_div"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { orderTotal } from "@/api/apis";
import { transDate } from "@/utils/utils";
export default {
  data() {
    return {
      date: [], //当前选择时间
    };
  },

  methods: {
    clickSearch() {
      let timestr = JSON.stringify([
        transDate(this.date[0]),
        transDate(this.date[1]),
      ]);
      this.refreshEcharts(timestr);
    },

    refreshEcharts(str) {
      orderTotal(str).then((res) => {
        var arr = res.data.data;
        for (var obj of arr) {
          obj.orderTime = transDate(obj.orderTime);
        }

        var option = {
           legend: {
            data: ["下单时间", "订单金额"],
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
            type: "cross",
            crossStyle: {
            color: "#999",
              },
            },
          },
         
          xAxis: {
            // name:'下单时间',
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "下单金额",
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };
        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart = echarts.init(document.getElementById("chart_div"));
  },
  created() {
    this.refreshEcharts("[]");
  },
};
</script>

<style scoped>
.block {
  margin: 10px 0px;
}
.demonstration {
  margin-right: 10px;
}
.el_btn {
  margin: 0px 10px;
}
.bgff {
  background-color: #fff;
}
</style>