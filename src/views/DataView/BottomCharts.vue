<template>
  <div class="bottom-charts">
    <dv-conical-column-chart :config="config" style="width:400px;height:200px;" />
  </div>
</template>

<script>

export default {
  name: 'BottomCharts', 
  data () {
    return {
       data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 71
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    },
    {
      name: '信阳',
      value: 35
    },
    {
      name: '漯河',
      value: 15
    }
  ],
  img: [
    '/img/conicalColumnChart/1st.png',
    '/img/conicalColumnChart/2st.png',
    '/img/conicalColumnChart/3st.png',
    '/img/conicalColumnChart/4st.png',
    '/img/conicalColumnChart/5st.png',
    '/img/conicalColumnChart/6st.png',
    '/img/conicalColumnChart/7st.png'
  ]
    }
  }
}
</script>

<style lang="less">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

}
</style>
