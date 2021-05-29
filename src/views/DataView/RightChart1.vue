<template>
  <div class="right-chart-1">
    <div class="rc1-header">图书借阅排行</div>

   <dv-scroll-board :config="config" style="width:100%;height:290px" />
  </div>
</template>

<script>
export default {
  name: 'RightChart1',
  props: { bookinfocount: Object },
  data () {
    return {       
      config: {
      header:['书名','isbn','作者','阅读次数'],
        data: [
          {
            title: '辅助教材',
            isbn: '11233',
            author: '作者',
            total: 0
          }
        ],
        index:true,
       columnWidth: [200,120,160,80],align: ['center','center','center','center']

      }
    }
  },
  watch: {
    bookinfocount: {
      handler: function(newval, oldval) {
        console.log("bookinfocount",newval)
        var bookdate =  []
        newval.data.forEach(item =>{
          var book=[item.title,item.isbn,item.author,item.total]
          bookdate.push(book)
        })
       // bookdate.data = newval
        this.config ={ header:['书名','isbn','作者','阅读次数'],data:bookdate,index: true,columnWidth: [50,220,120,160,80],align: ['center','center','center','center']}
        console.log(this.config)
      }
    }

  }

}
</script>

<style lang="less">
.right-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rc1-header {
    align-items: center;
     text-align: center;
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
