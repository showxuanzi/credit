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
			<el-table-column prop="name" label="姓名" width="80"></el-table-column>
			<el-table-column prop="identity_card" label="身份证号" width="200"></el-table-column>
			<el-table-column prop="birthday" label="生日" width="100">
					<template slot-scope="scope">
						{{birthdayFilter(scope.row.birthday)}}
					</template>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
				<template slot-scope="scope">
					{{scope.row.sex | sexFilter}}
				</template>
			</el-table-column>
			<el-table-column prop="marriage" label="婚姻状况" width="100">
				<template slot-scope="scope">
					{{scope.row.marriage | marriageFilter}}
				</template>
			</el-table-column>
			<el-table-column prop="education" label="学历" width="100">
				<template slot-scope="scope">
					{{scope.row.education | educationFilter}}
				</template>
			</el-table-column>
			<el-table-column prop="address1" label="居住地址" width="200"></el-table-column>
			<el-table-column prop="address2" label="户籍地址" width="200"></el-table-column>
			<el-table-column prop="mobile_phone" label="手机号" width="200"></el-table-column>
			<el-table-column prop="company" label="就职公司" width="200"></el-table-column>
			<el-table-column prop="status" label="申请状态" width="100">
				<template slot-scope="scope">
					<el-tag :type="scope.row.status | statusType">{{scope.row.status | statusFilter}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="240">
				<template slot-scope="{row}">
					<el-button @click="handleClick(row)" type="primary" size="mini" :disabled="row.status!=0 && row.status!=3 && row.status!=6">编辑</el-button>
					<el-button type="danger" size="mini" :disabled="row.status!=0">删除</el-button>
					<el-button type="success" size="mini" :disabled="row.status!=0&&row.status!=3&&row.status!=6" @click="submitToApprove(row)">提交审核</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import {loanList,loanSubmit} from "@/api/article";
  export default {
		data() {
      return {
				listQuery:{
					pageNo: 1, //当前页
					pageSize: 6, //每页几条
					name: "" //查询条件
				},
				tableData: [], //表格数据
				rows: 0, //数据总条数
				pages: 0 //总页码
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
		filters:{
			// 在filters中不能调用methods的方法，在fitlers中this是undefined
			// birthdayFilter(data){
			// 	console.log(data)
				// let date = new Date(data);
				// console.log(this) //undefined
				// return date.getFullYear() + '-' + this.checkNum(date.getMonth() + 1) + '-' + this.checkNum(date.getDate())
			// },
			statusFilter(data){
				switch(data){
					case 0 :
						return "进件";
					case 1 :
						return "提交初审";
					case 2 :
						return "初审通过";
					case 3 :
						return "初审拒绝";
					case 4 :
						return "提交终审";
					case 5 :
						return "终审通过";
					case 6 :
						return "终审拒绝";
					case 7 :
						return "生成合同";
					default :
						return "进件";
				}
			},
			statusType(data){
				switch(data){
					case 0 :
						return "info";
					case 1 :
						return "";
					case 2 :
						return "success";
					case 3 :
						return "danger";
					case 4 :
						return "info";
					case 5 :
						return "success";
					case 6 :
						return "danger";
					case 7 :
						return "success";
					default :
						return "info";
				}
			},
			sexFilter(data){
				switch (data) {
					case 'man':
						return '男';
					case 'woman':
						return '女';
					default:
						return "男";
				}
			},
			educationFilter(data){
				switch (data) {
					case 'college':
						return '大学';
					case 'highschool':
						return '高中';
					default:
						return "大学";
				}
			},
			marriageFilter(data){
				switch (data) {
					case 'married ':
						return '已婚';
					case 'unmarried':
						return '未婚';
					default:
						return "未婚";
				}
			}
		},
    methods: {
			checkNum(i) {
				if (i < 10) {
					i = '0' + i
				}
				return i
			},
      tableRowClassName({row}) { //行变色
				// var status = row.status;
        switch(row.status){
					case 0 :
						return "";
					case 1 :
						return "";
					case 2 :
						return "success-row";
					case 3 :
						return "danger-row";
					case 4 :
						return "";
					case 5 :
						return "success-row";
					case 6 :
						return "danger-row";
					case 7 :
						return "success-row";
					default :
						return "";
				}
			},
			getList(){ // 获取列表数据
				loanList(this.listQuery).then(res =>{
					let {code} = res.data;
					if(code === 20000){
						let {data,pages,rows} = res.data.data.data;
						this.tableData = data;
						this.pages = pages;
						this.rows = rows;
					}
				})
			},
			serachList(){ //查询数据
				this.getList();
			},
			handleClick(){

			},
			submitToApprove(row){ // 提交审核
				let {id} = row;
				console.log(id)
				loanSubmit({id:id}).then(res => {
					console.log(res);
					if(res.data.code === 20000){
						this.getList();
						this.$notify({
							title: '成功',
							message: '提交审核成功',
							type: 'success',
							duration: 2000
						});
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