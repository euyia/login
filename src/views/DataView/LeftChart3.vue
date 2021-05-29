<template>
  <div class="left-chart-3">
    <div class="lc1-header">设备状态</div>
    <div class="lc3-details">设备运行总数<span>{{devicecount}}</span></div>
     <dv-active-ring-chart class="ccmc-middle" :config="config" />
      <div class="wrapper">
       <div class="content">
       <div class="item">在线:{{deviceinfo.onlineCount}}</div>
       <div class="item">总数:{{deviceinfo.deviceCount}}</div>
       <div class="item">激活:{{deviceinfo.activeCount}}</div>
      </div>
      </div>
     </div>
</template>

<script>
export default {
  name: 'LeftChart3',
  props:["deviceinfo"],
 //{
 //  deviceinfo: Object,
 //  default:{ }
 //},
  data () {
    return {
      devicecount: 12,
      config: {
        data: [
      //   {
      //     name: '在线设备',
      //     value: this.deviceinfo.onlineCount
      //   },
      //   {
      //     name: '离线设备',
      //     value:  this.deviceinfo.deviceCount - this.deviceinfo.onlineCount
      //   },
      //   {
      //     name: '激活设备',
      //     value: this.deviceinfo.activeCount
      //   }
        ],
        colors: ['#55baff', '#00ffc9', '#fff'],
        lineWidth: 30,
        radius: '65%',
        activeRadius: '60%'
      }
    }
  },
  watch: {
    deviceinfo: {
     // immediate: true,      
      handler: function(newval, oldval) {
         console.log("222222",this.config)
        var data = [
          {
            name: '在线设备',
            value: newval.onlineCount
          },
          {
            name: '离线设备',
            value: newval.deviceCount - newval.onlineCount
          },
          {
            name: '激活设备',
            value: newval.activeCount
          }
        ]
        this.$set(this.config, 'data', data)
        this.config = { ...this.config }
        this.devicecount = this.deviceinfo.deviceCount
      }
    }
  }
}
</script>

<style lang="less">
.left-chart-3 {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;

  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-bottom: 20px;
  }

  .lc3-details {
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc3-chart {
    flex: 1;
  }

  .ccmc-middle {
      width: 90%;
      height: 90%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }
  .wrapper {
 margin-top: 10px;
 margin-left: 50px;
 margin-bottom: 10px;
 width: 100%;
}
.content{
    width:80%;
    margin:0px auto;
}
.item {
 float: left;
 margin: 0;

 width: 100px;
 height: 30px;
}
}
</style>
