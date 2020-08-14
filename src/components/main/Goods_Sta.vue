<template>
    <div>
        <!-- 时间范围 -->
             <div class="block">
                    <span class="demonstration">时间范围</span>
                    <el-date-picker
                   
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                     <el-button type="primary" class="el_btn">查询</el-button>
                </div>

                  <!-- 数据图 -->
                <div class="bgff">
                      <div ref="chart" style="width:70%;height:350px" class="chart_div"></div>
                </div>
    </div>
</template>

<script>
    export default {
         mounted(){
    this.getEchartData()  
    },


   methods: {
    getEchartData() {
      const chart = this.$refs.chart
   if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {
    title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      }
   
    }
  }
    }
          
</script>

<style scoped>
 .block{
          margin: 10px 0px;
      }
      .demonstration{
          margin-right: 10px;
      }
      .el_btn{
          margin: 0px 10px;
      }
      .bgff{
          background-color: #fff;
      }
      .chart_div{
          padding: 10px;
      }
</style>