<template>
  <div class="left-chart-1">
    <div class="lc1-header">用户数据</div>
    <dv-decoration-5 style="width:100%;height:40px;" />
    <div class="lc1-details">用户总数<span>{{userscount}}</span></div>
   <dv-active-ring-chart :config="config" style="width:300px;height:300px" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart1',
  props: { usercount: Object },
  data () {
    return {
      userscount:10000,
      config: {
        data: [
          {
            name: '家长',
            value: 167
          },
          {
            name: '学生',
            value: 67
          }
        ],
       color: ['#29f', '#2fa', '#fff', '#ffc530', '#469f4b'],
        unit: '人'
      }
    }
  },
  watch: {
    usercount: {
      handler: function(newval, oldval) {
        console.log("User",newval)
        var userdate =  {data:[],  color: ['#29f', '#2fa', '#fff', '#ffc530', '#469f4b'],
        unit: '人'}
        userdate.data=[{name: '学生', value: newval.struentCount},{name: '家长', value: newval.parentCount}]
        this.userscount=newval.userCount
        console.log(" this.userscount", this.userscount)
        this.config=userdate
      // this  var book=[item.title,item.isbn,item.author,item.total]
      // this  bookdate.push(book)
      // this})
      // this// bookdate.data = newval
      // thisthis.config ={ header:['书名','isbn','作者','阅读次数'],data:bookdate,index: true,columnWidth: [50,160,100,120,80],align: ['center','center','center','center']}
      // thisconsole.log(this.config)
      
      }
    }
    }
}
</script>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
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

  .lc1-details {
    height: 50px;
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

  .lc1-chart {
    flex: 1;
  }
}
</style>
