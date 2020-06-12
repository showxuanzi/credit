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
			<el-table-column prop="name" label="姓名" width="120"></el-table-column>
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
					<el-button type="primary" size="mini" :disabled="row.status!=0 && row.status!=3 && row.status!=6"  @click="openEdit(row)">编辑</el-button>
					<el-button type="danger" size="mini" :disabled="row.status!=0" @click="openDelet(row)">删除</el-button>
					<el-button type="success" size="mini" :disabled="row.status!=0&&row.status!=3&&row.status!=6" @click="submitToApprove(row)">提交审核</el-button>
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
		<!-- 删除弹框 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>确定要删除吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="handleDelete">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 编辑弹层功能 -->
    <el-dialog title="申请管理-编辑" :visible.sync="dialogFormVisible">
      <el-form ref="updateForm"  :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="ID" prop="id" v-show="false">
              <el-input v-model="temp.id" />
            </el-form-item>
          <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker type="datetime" v-model="temp.birthday" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="temp.sex" class="filter-item" placeholder="Please select">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
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
          <el-form-item label="手机号" prop="mobile_phone">
            <el-input v-model.number="temp.mobile_phone" />
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleEdit()">保存</el-button>
      </div>
    </el-dialog>
	</div>
</template>
<script>
import {loanList,loanSubmit,loanDelete,loanUpdate} from "@/api/article";
import {sexOptions,educationOptions} from "@/utils/selectData";
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
				dialogVisible: false, //删除弹框显示与隐藏
				dialogFormVisible: false, //编辑弹框显示与隐藏
				temp:{
					id: ''
				},
				sexOptions,
				educationOptions
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
		},
    methods: {
		checkNum(i) {
			if (i < 10) {
				i = '0' + i
			}
			return i
		},
      tableRowClassName({row}) { //行变色
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
			submitToApprove(row){ // 提交审核
				let {id} = row;
				loanSubmit({id:id}).then(res => {
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
			openEdit(row){
				this.temp = {...row};// 赋值显示
				this.dialogFormVisible = true;
			},
			handleEdit(){
				loanUpdate(this.temp).then(res => {
					if(res.data.code === 20000){
						this.$notify({
							title: '编辑',
							message: '编辑成功！',
							type: 'success',
							duration: 2000
						});
						this.dialogFormVisible = false;
						this.getList();
					}
				})
			},
			// 点击删除，弹窗打开
			openDelet(row){
				this.temp = {...row};
				this.dialogVisible = true;
			},
			// 确定删除
			handleDelete(){
				loanDelete({id: this.temp.id}).then(res => {
					if(res.data.code === 20000){
						this.$notify({
							title: '删除',
							message: '删除成功！',
							type: 'success',
							duration: 2000
						});
						this.dialogVisible = false;
						this.getList();
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