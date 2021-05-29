<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>图书统计</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>
    <div class="cc-details">
      <div>图书总数量</div>
      <div v-for="str in bookdate.bookDate.all.toString()" class="card">{{str}}</div>  
    </div>
    <div class="cc-main-container">
      <div class="ccmc-left">
        <div class="station-info">
          在库<span>{{bookdate.bookDate.warehouse}}</span>
        </div>
        <div class="station-info">
          借出<span>{{bookdate.bookDate.lend}}</span>
        </div>
        <div class="station-info">
          上架<span class="station-title">{{bookdate.bookDate.shelf}}</span>
        </div>
      </div>

      <dv-active-ring-chart class="ccmc-middle" :config="config" />

      <div class="ccmc-right">
        <div class="station-info">
         总订单 <span class="station-title">{{bookdate.orderDate.orderCount}}</span>
        </div>
        <div class="station-info">
         总借出图书 <span class="station-title">{{bookdate.orderDate.orderItemCount}}</span>
        </div>
      </div>

      <LabelTag :config="labelConfig" />
    </div>
    
  </div>
</template>

<script>
import LabelTag from './LabelTag'

export default {
  name: 'CenterCmp',
  components: {
    LabelTag
  },
  props: {
    bookcount:Object,
    default:{bookDate:{all: 7474,
             lend: 472,
             warehouse: 1509,
             shelf: 1509},
             orderDate:{
               orderCount:12,
               orderItemCount: 33
             }
             }
   },
  data() {
    return {
      bookdate:{
        all:'7474',
        lend: 472,
        warehouse: 1509,
        shelf: 1509
      },
      config: {
        data: [
          {
            name: '在库',
            value: 1315
          },
          {
            name: '上架',
            value: 415
          },
          {
            name: '未还',
            value: 415
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        lineWidth: 60,
        radius: '55%',
        activeRadius: '60%'
      },

      labelConfig: {
        data: ['在库', '上架', '未还', '总订单', '总借出图书']
      }
    }
  },
  watch: {
    bookcount: {
      immediate: true,
      handler: function(newval, oldval) {
        this.bookdate = newval
        this.config.data[0].value = this.bookdate.bookDate.warehouse
        this.config.data[1].value = this.bookdate.bookDate.shelf
        this.config.data[2].value = this.bookdate.bookDate.lend
         this.config = { ...this.config }
        console.log("bookcount",newval)
      }
    }
  }
}
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;

  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }

  .cc-details {
    height: 80px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;

    .card {
      background-color: rgba(4,49,128,.6);
      color: #08e5ff;
      height: 70px;
      width: 70px;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 10px;
    }
  }

  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;

    .ccmc-middle {
      width: 50%;
      height: 90%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }

    .ccmc-left, .ccmc-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;

      span {
        font-size: 40px;
        font-weight: bold;
      }

      .station-info {
        height: 80px;
        display: flex;
        align-items: center;
        .station-title{
          left: 40px;
        }
      }
    }

    .ccmc-left {
      align-items: flex-end;

      span {
        margin-left: 20px;
      }
    }

    .ccmc-right {
      align-items: flex-start;

      span {
        margin-right: 20px;
      }
    }
  }

  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

}
</style>
