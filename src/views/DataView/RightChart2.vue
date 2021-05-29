<template>
  <div class="right-chart-2">
    <div class="rc1-header">温度测量总数</div>

    <div class="rc1-chart-container">
      <div class="left">
        <div class="number">{{temperdate.temperCount}}</div>
        <div>温度测量总数</div>
        <div class="number" style="color:#FF0000" >{{temperdate.notetempCount}}</div>
        <div>温度异常总数</div>
      </div>
      

      <dv-charts class="right" :option="option" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightChart2',
  props: {
    temperdate: Object,
    default:{}
  },
  data () {
    return {
      temperCount: 900,
      notetempCount: 10,
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '温度正常', value: this.temperCount },
              { name: '温度异常', value: this.notetempCount }
            ],
            radius: ['45%', '65%'],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              labelLineEndLength: 10,
              formatter: '{percent}%\n{name}',
              style: {
                fontSize: 14,
                fill: '#fff'
              }
            }
          }
        ],
        color: ['#3de7c9', '#f30', '#fff', '#ffc530', '#469f4b']
      }
    }
  },
  watch: {
    temperdate: {
      immediate: true,
      handler: function(newval, oldval) {
        console.log("wcathTempler",newval)
        var data= [
              { name: '温度正常', value: newval.temperCount },
              { name: '温度异常', value: newval.notetempCount }
              ]
       // this.option.series[0].data[0].value = newval.temperCount
        this.option.series[0].data = data
         this.option = { ...this.option }
        console.log("option", this.option)
      }
    }
  }
}
</script>

<style lang="less">
.right-chart-2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rc1-header {
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }

  .rc1-chart-container {
    flex: 1;
    display: flex;
  }

  .left {
    width: 30%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      font-size: 34px;
      color: #096dd9;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  .right {
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
</style>
