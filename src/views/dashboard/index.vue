<template>
  <div class='chart-container'> 
    <Chart height='50%' width='50%'></Chart>
  </div>
</template>

<script>
import Chart from  "@/components/Charts/mixChart";
export default {
  name: "Dashboard",
  components: {Chart },

  data() {
    return {
      signairStatus:false,
    //  hubConnection: "",
      tableData: ""
    };
  },
}

</script>



<style scoped>
.chart-container{
  position: relative;
  padding: 20px;
  width: 100%;
  height:85vh;
}
</style>
