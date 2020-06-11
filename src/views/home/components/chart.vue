<template>
    <div>
        <div ref="main" style="width: 100%;height:400px;"></div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    mounted(){
        this.init();
    },
  methods:{
    init(){
       // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.main);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            color: ["#37a2da","#32c5e9","#9fe6b8","#ffdb5c","#ff9f7f","#fb7293","#e7bcf3","#8378ea"],
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: [20, 110],
                    center: ['25%', '50%'],
                    roseType: 'radius',
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: [
                        {value: 10, name: 'rose1'},
                        {value: 5, name: 'rose2'},
                        {value: 15, name: 'rose3'},
                        {value: 25, name: 'rose4'},
                        {value: 20, name: 'rose5'},
                        {value: 35, name: 'rose6'},
                        {value: 30, name: 'rose7'},
                        {value: 40, name: 'rose8'}
                    ]
                },
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['75%', '50%'],
                    roseType: 'area',
                    data: [
                        {value: 10, name: 'rose1'},
                        {value: 5, name: 'rose2'},
                        {value: 15, name: 'rose3'},
                        {value: 25, name: 'rose4'},
                        {value: 20, name: 'rose5'},
                        {value: 35, name: 'rose6'},
                        {value: 30, name: 'rose7'},
                        {value: 40, name: 'rose8'}
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