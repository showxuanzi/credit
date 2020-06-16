<template>
    <div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="account" label="用户名"></el-table-column>
			<el-table-column prop="password" label="密码"></el-table-column>
			<el-table-column prop="reg_time" label="创建时间">
					<template slot-scope="scope">
						{{birthdayFilter(scope.row.reg_time)}}
					</template>
			</el-table-column>
				<el-table-column prop="creator" label="创建者"></el-table-column>
			<el-table-column prop="role_name" label="权限类型"></el-table-column>
		</el-table>
    </div>
</template>
<script>
import {userList} from "@/api/article";

export default {
		data() {
      return {
				listQuery:{
					pageNo: 1, //当前页
					pageSize: 10, //每页几条
					name: "" //查询条件
				},
				tableData: [], //表格数据
				rows: 0, //数据总条数
				pages: 0, //总页码
				dialogFormVisible: false, //查看详情弹框显示与隐藏
				temp:{
					id: ''
				}
      }
		},
		mounted(){
			this.getList();
		},
		computed:{
			// 在computed中传参，必须返回一个function，在funciton中传入一个参数
			birthdayFilter(){
				return function(data){
					let date = new Date(data);
					return date.getFullYear() + '-' + this.checkNum(date.getMonth() + 1) + '-' + this.checkNum(date.getDate())
				}
			},
		},
    methods: {
		checkNum(i) {
			if (i < 10) {
				i = '0' + i
			}
			return i
		},
		getList(){ // 获取列表数据
				userList(this.listQuery).then(res =>{
					console.log(res)
					let {code} = res.data;
					this.rows = res.data.data.length;
					if(code === 20000){
						this.tableData = res.data.data;
					}
				})
			}
    }
    
  }
</script>
<style>
  .el-table .danger-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>