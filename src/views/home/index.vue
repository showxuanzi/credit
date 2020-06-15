<template>
    <div class="box">
        <PanelProup />
        <el-row :gutter= "30" class="panel-group">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <Map />
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <Chart/>
            </el-col>
        </el-row>
        
        
    </div>
</template>
<script>
import PanelProup from "./components/panelProup";
import Chart from './components/chart';
import Map from './components/map';
export default {
    data(){
        return{

        }
    },
    components:{
        PanelProup,
        Chart,
        Map
    }
}
</script>
<style lang="scss">
    
</style>