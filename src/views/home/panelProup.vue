<template>
  <el-row :gutter= "30" class="panel-group">
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="card-panel-col" v-for="(list, i) in lists" :key="i">
      <div class="card-panel" :style="{background:list.color}">
        <div class="card-panel-description">
          <div class="card-panel-text">
              {{list.name}}
          </div>
          <div class="card-panel-num" >
              <count-to :start-val="0" :end-val="list.endVal" :duration="list.duration" />
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import countTo from 'vue-count-to';
  export default {
    components: { countTo },
    data () {
      return {
        startVal: 0,
        endVal: 2020,
        duration: 500,
        autoplay: true,
        lists:[
            {startVal:0,endVal:13600,duration:3600,name:'最高可借金额',color:'#67c23a'},
            {startVal:0,endVal:9833,duration:2300,name:'回报率',color:'#e6a23c'},
            {startVal:0,endVal:8888,duration:3000,name:'业绩领跑',color:'#f56c6c'},
            {startVal:0,endVal:6666,duration:2000,name:'安稳底薪站队',color:'#409eff'}
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-description {
        font-weight: bold;
        text-align: center;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;

      .card-panel-text {
        line-height: 18px;
        color: #333;
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

</style>