<template>
    <div>
        <div ref="map" style="width: 100%;height:400px;"></div>
    </div>
</template>
<script>
import echarts from "echarts";
import 'echarts/map/js/china'; // 显示地图时需要引入该插件
export default {
    mounted(){
        this.init();
    },
  methods:{
    init(){
       // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.map);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '中国地图',
                subtext: '数据纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (p / km2)'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            visualMap: {
                min: 800,
                max: 50000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            series: [
                {
                    type: 'map',
                    map: "china",
                    label: {
                        show: true
                    },
                    data: [
                        {name: '北京', value: 60057.34},
                        {name: '广东', value: 15477.48},
                        {name: '上海', value: 31686.1},
                        {name: '青海', value: 6992.6},
                        {name: '新疆', value: 44045.49},
                        {name: '湖北', value: 40689.64},
                        {name: '四川', value: 37659.78},
                        {name: '湖南', value: 45180.97},
                        {name: '黑龙江', value: 55204.26},
                        {name: '内蒙古', value: 21900.9},
                        {name: '辽宁', value: 4918.26},
                        {name: '河北', value: 5881.84},
                        {name: '山东', value: 4178.01},
                        {name: '山西', value: 42207.92},
                        {name: '陕西', value: 2180.98},
                        {name: '浙江', value: 9172.94},
                        {name: '江西', value: 3368},
                        {name: '青海', value: 21900.9},
                        {name: '江苏', value: 4918.26},
                        {name: '宁夏', value: 58811.84},
                        {name: '吉林', value: 41178.01},
                        {name: '甘肃', value: 2227.92},
                        {name: '重庆', value: 21080.98},
                        {name: '天津', value: 9172.94},
                        {name: '广西', value: 806.98}
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option); 
    }
  }
}
</script>
<style>
</style>