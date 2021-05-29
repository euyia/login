<template>
  <div class="top-right-cmp">
    <div class="chart-name">
      阅读日趋势
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
   <dv-charts :option="option" style="top:-20px;"/>
  </div>
</template>

<script>
export default {
  name: 'TopRightCmp',
   props: { bookchardate: Array},
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: '阅读趋势',
              color: '#00baff'
            }
          ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: [
            '10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08', '10/09', '10/10', '10/11', '10/12', '10/13'
          ],
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
           boundaryGap: false,
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 20
        },
        series: [          
          {
            name: '阅读趋势',
            data: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
            ],
            type: 'line',
            lineStyle: {
              stroke: '#00baff'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#00baff',
                stroke: 'transparent'
              }
            }
          }          
        ]
      }
    }
  },
  watch: {
    bookchardate: {
      handler: function(newval, oldval) {
      console.log("bookchardate",newval)
     let options = {
        legend: {
          data: [
            {
              name: '阅读趋势',
              color: '#00baff'
            }
          ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: [
            
          ],
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
           boundaryGap: false,
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 200
        },
        series: [          
          {
            name: '阅读趋势',
            data: [
             
            ],
            type: 'line',
            lineStyle: {
              stroke: '#00baff'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#00baff',
                stroke: 'transparent'
              }
            }
          }          
        ]
      }
     
     let seriedata=[]
      newval.forEach(item=> {
       options.xAxis.data.push(item.name)
        seriedata.push(item.count)
      })
      options.series= [          
          {
            name: '阅读趋势',
            data: seriedata,
            type: 'line',
            lineStyle: {
              stroke: '#00baff'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#00baff',
                stroke: 'transparent'
              }
            }
          }          
        ]
      console.log(options)
    this.option=options

      }
    }
  }
}
</script>

<style lang="less">
.top-right-cmp {
  position: relative;
  padding: 0 50px;
  width: 100%;
  box-sizing: border-box;

  .chart-name {

    right: 70px;
    text-align: right;
    font-size: 20px;
    top: 10px;
  }
  .dv-charts{
    width: 500px;
  }
}
</style>
