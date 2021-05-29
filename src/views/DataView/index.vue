<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-left"><a href=""></a></div>
        <div class="mh-middle">享阅智能图书管理系统</div>
        <div class="mh-right"  @click="loaddate">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
            @click="loaddate"
          >
            综合管理台
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <dv-border-box-13 class="left-chart-container">
          <Left-Chart-3 :deviceinfo="devicesDate" />
          <Left-Chart-1 :usercount="usersdate"/>
        </dv-border-box-13>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-13 class="rmctc-left-container">

              <Center-Cmp :bookcount="bookcount" />

            </dv-border-box-13>

            <div class="rmctc-right-container">
              <dv-border-box-3 class="rmctc-chart-1">

                <Right-Chart-1 :bookinfocount="bookinfocount" />

              </dv-border-box-3>

              <dv-border-box-4 class="rmctc-chart-2" :reverse="true">

                <Right-Chart-2 :temperdate="TemplerDate" />

              </dv-border-box-4>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container">

            <TopRightCmp :bookchardate="bookchartdate" />

          </dv-border-box-4>
        </div>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>

import LeftChart1 from './LeftChart1'
import LeftChart2 from './LeftChart2'
import LeftChart3 from './LeftChart3'
import CenterCmp from './CenterCmp'

import RightChart1 from './RightChart1'
import RightChart2 from './RightChart2'
import TopRightCmp from './TopRightCmp'

import TopLeftCmp from './TopLeftCmp'
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr'

export default {
  name: 'DataView',
  components: {
    LeftChart1,
    LeftChart2,
    LeftChart3,
    CenterCmp,
    RightChart1,
    RightChart2,
    TopRightCmp,
    TopLeftCmp
  },
  data() {
    return {
      bookchartdate: [],
      bookcount: {
        bookDate: { all: 7474, lend: 472, warehouse: 1509, shelf: 1509 },
        orderDate: { orderCount: 12, orderItemCount: 33 }},
      TemplerDate: { notetempCount: 35, temperCount: 99 },
      usersdate: {},
      bookinfocount:{date:[{
            Title: '辅助教材',
            ISBN: '11233',
            Author: '作者',
            Total: 0
          },
          {
            Title: '辅助教材',
            ISBN: '11233',
            Author: '作者',
            Total: 0
          },
          {
            Title: '辅助教材',
            ISBN: '11233',
            Author: '作者',
            Total: 0
          },
          {
            Title: '辅助教材',
            ISBN: '11233',
            Author: '作者',
            Total: 0
          },
          {
            Title: '辅助教材',
            ISBN: '11233',
            Author: '作者',
            Total: 0
          }]},
      devicesDate: { onlineCount: 12, deviceCount: 24, activeCount: 24}
    }
  },
  mounted() {
    this.handleStartConnection()
  },
  destroyed: function() {
    this.handleStopConnection()
    console.log('我已经离开了！')
  },
  methods: {
    loaddate()
    {
       let that=this
      console.log("loaddate")
      that.devicesDate = { onlineCount: 66, deviceCount: 102, activeCount: 12}
    },
    handleStartConnection() {
      console.log('start signalr connection...')
      if (!this.connection) {
        const builder = new HubConnectionBuilder()
        // const userToken = UserModule.token.replace('Bearer ', '')
        this.connection = builder
          .withUrl(`${process.env.VUE_APP_BASE_API}/signalr-hubs/dataview`)
          .withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => 60000 })
          .build()
        this.connection.on('BookCount', data => this.oNBookinfUpdate(data))
        this.connection.on('TemplerCount', data => this.oTemplerUpdate(data))
        this.connection.on('UsesStatistics', data => this.oUserinfoUpdate(data))
        this.connection.on('DeviceInfo', data => this.oDeviceinfoUpdate(data))
        this.connection.on('BookinfoCount', data => this.BookinfoCount(data))
        this.signairStatus = true
        this.connection.onclose(error => {
          console.log('signalr connection has closed, error:')
          this.signairStatus = false
          console.log(error)
        })
      }
      if (this.connection.state !== HubConnectionState.Connected) {
        this.connection.start().then(() => {
          this.signairStatus = true
          this.connection.invoke('GetCountAsync')
          this.connection.invoke('GetTempCountAsync')
          this.connection.invoke('GetUserCountAsync')
          this.connection.invoke('GetDeviceInfoAsync')
          this.connection.invoke('GetBookCount')
        })
      }
    },
    oUserinfoUpdate(date) {
      console.log('oUserinfoUpdate', date)
      this.usersdate = date
    },
    BookinfoCount(date) {
      this.bookinfocount = { data: date }
    },
    oDeviceinfoUpdate(date) {
      let that = this
      that.devicesDate = { onlineCount: date.result.onlineCount,
        deviceCount: date.result.deviceCount,
        activeCount: date.result.activeCount}
      console.log('oDeviceinfoUpdate', this.devicesDate)
    },
    oNBookinfUpdate(date) {
      this.bookcount = { bookDate: { all: date.bookDate.all,
        lend: date.bookDate.lend,
        warehouse: date.bookDate.warehouse,
        shelf: date.bookDate.shelf },
      orderDate: {
        orderCount: date.orderDate.orderCount,
        orderItemCount: date.orderDate.orderItemCount
      }
      }
      this.bookchartdate = date.orderDate.statistics
      // const  console.log('sigralrmsg', date)
      // this.bookcount = date
      // })
    },
    oTemplerUpdate(data) {
      let that = this
      console.log('Templer', data)
      that.TemplerDate = { notetempCount: data.notetempCount, temperCount: data.temperCount}
      // this.TemplerDate = data
    },

    handleStopConnection() {
      console.log('stop signalr connection...')
      if (this.connection && this.connection.state === HubConnectionState.Connected) {
        this.connection.stop()
      }
    }
  }
}
</script>

<style lang="less" scoped>
* { margin: 0 !important; }
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 22%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 78%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 60%;
    display: flex;
  }

  .rmctc-left-container {
    width: 55%;
  }

  .rmctc-right-container {
    width: 45%;
  }

  .rmc-bottom-container {
    width: 99%;
    height: 35%;
     .top-right-Cmp{
       width: 100%;
     }
  }

  .rmctc-chart-1, .rmctc-chart-2 {
    height: 50%;
  }
}
</style>
