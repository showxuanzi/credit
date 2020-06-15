<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
          <el-input v-model="listQuery.name" placeholder="请输入姓名" @input="serachList"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" size="small" @click="serachList">查询</el-button>
      </el-form-item>
    </el-form>
		<el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
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
		<!-- 分页 -->
		<!-- <el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="listQuery.pageNo"
			:page-sizes="[5,10,20,50]"
			:page-size="listQuery.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="rows">
		</el-pagination> -->
    </div>
</template>
<script>
import {loanQuery,approveEndPass,approveEndReject,userList} from "@/api/article";
import {sexOptions,educationOptions,marriageOptions} from "@/utils/selectData";

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
				},
				sexOptions,
				educationOptions,
				marriageOptions
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
    tableRowClassName({row}) { //行变色
        switch(row.result){
					case "pass" :
						return "success-row";
					case "reject" :
						return "danger-row";
					default :
						return "";
				}
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
			},
			serachList(){ //查询数据
				this.getList();
			},
			// 处理页码条数,设置默认值
			handleSizeChange(val = this.listQuery.pageSize) { 
				this.listQuery.pageSize = val;
				this.getList();
			},
			//处理当前页
      handleCurrentChange(val = this.listQuery.pageNo) { 
				this.listQuery.pageNo = val;
				this.getList();
			},
			// 查看按钮
			handelDetail(row){
				loanQuery({id:row.loan_id}).then(res => {
					if(res.data.code === 20000){
						this.temp = {...res.data.data.data};// 赋值显示
						this.dialogFormVisible = true;
					}
				})
			},
			// 通过按钮
			handelSuccess(row){
				this.$confirm('确定通过该申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					approveEndPass({appId:row.id,loanId:row.loan_id}).then(res=> {
						if(res.data.code === 20000){
							this.$message({
								type: 'success',
								message: '申请通过!'
							});
							this.getList();
						}
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          });          
        });
			},
			// 拒绝按钮
			handelReject(row){
				this.$confirm('拒绝通过该申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					approveEndReject({appId:row.id,loanId:row.loan_id}).then(res=> {
						if(res.data.code === 20000){
							this.$message({
								type: 'success',
								message: '已拒绝该申请!'
							});
							this.getList();
						}
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          });          
        });
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