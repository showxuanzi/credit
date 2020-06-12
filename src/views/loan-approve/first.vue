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
			<el-table-column prop="loan_name" label="姓名"></el-table-column>
			<el-table-column prop="loan_card" label="身份证号"></el-table-column>
			<el-table-column prop="modified" label="提交时间">
					<template slot-scope="scope">
						{{birthdayFilter(scope.row.modified)}}
					</template>
			</el-table-column>
			<el-table-column prop="result" label="状态">
					<template slot-scope="scope" >
						<el-tag :type="scope.row.result | firstStatusFilter" effect="plain">{{scope.row.result | firstRusltFilter}}</el-tag>
					</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="240">
				<template slot-scope="{row}">
					<el-button type="primary" size="mini" @click="handelDetail(row)">查看</el-button>
					<el-button type="success" size="mini" :disabled="row.result === 'pass'" @click="handelSuccess(row)">通过</el-button>
					<el-button type="danger" size="mini" :disabled="row.result === 'reject'" @click="handelReject(row)">拒绝</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="listQuery.pageNo"
			:page-sizes="[5,10,20,50]"
			:page-size="listQuery.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="rows">
		</el-pagination>
		<!-- 查看详情 -->
    <el-dialog title="初审-查看详情" :visible.sync="dialogFormVisible">
      <el-form ref="updateForm" :inline="true" :model="temp" label-position="left" label-width="70px" style="width: 100%; " size="mini" disabled>
          <el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>个人基本信息</span>
						</div>
						<el-form-item label="ID" prop="id" v-show="false">
							<el-input v-model="temp.id" />
							</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="temp.name" />
						</el-form-item>
						<el-form-item label="身份证" prop="identity_card">
							<el-input v-model.number="temp.identity_card" />
						</el-form-item>
						<el-form-item label="出生日期" prop="birthday">
							<el-date-picker type="datetime" v-model="temp.birthday" />
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-select v-model="temp.sex" class="filter-item" placeholder="Please select">
								<el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
							</el-select>
						</el-form-item>
						<el-form-item label="婚姻状况" prop="marriage">
							<el-select v-model="temp.marriage" class="filter-item" placeholder="Please select">
								<el-option v-for="item in marriageOptions" :key="item.key" 
									:label="item.display_name" :value="item.key" />
							</el-select>
						</el-form-item>
						<el-form-item label="教育程度" prop="education">
							<el-select v-model="temp.education" class="filter-item" placeholder="Please select">
								<el-option v-for="item in educationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
							</el-select>
						</el-form-item>
						<el-form-item label="居住地址" prop="address1">
							<el-input v-model="temp.address1" />
						</el-form-item>
						<el-form-item label="户籍地址" prop="address2">
							<el-input v-model="temp.address2" />
						</el-form-item>
						<el-form-item label="居住电话" prop="phone">
							<el-input v-model.number="temp.phone" />
						</el-form-item>
						<el-form-item label="手机号" prop="mobile_phone">
							<el-input v-model.number="temp.mobile_phone" />
						</el-form-item>
					</el-card>
      </el-form>
    </el-dialog>
    </div>
</template>
<script>
import {approveFirstList,loanQuery,approveFirstPass,approveFirstReject} from "@/api/article";
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
				approveFirstList(this.listQuery).then(res =>{
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
					approveFirstPass({appId:row.id,loanId:row.loan_id}).then(res=> {
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
					approveFirstReject({appId:row.id,loanId:row.loan_id}).then(res=> {
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