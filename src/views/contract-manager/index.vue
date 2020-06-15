<template>
    <div>
			<!-- 添加动画效果 -->
			<transition name="serach">
				<el-form :inline="true"  class="demo-form-inline">
					<el-form-item>
							<el-input v-model="listQuery.name" placeholder="请输入姓名" @input="serachList"></el-input>
					</el-form-item>
					<el-form-item>
							<el-button type="primary" size="small" @click="serachList">查询</el-button>
					</el-form-item>
				</el-form>
			</transition>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="loan_name" label="姓名"></el-table-column>
			<el-table-column prop="loan_card" label="身份证号"></el-table-column>
			<el-table-column prop="modified" label="提交时间">
					<template slot-scope="scope">
						{{birthdayFilter(scope.row.modified)}}
					</template>
			</el-table-column>
			<el-table-column prop="result" label="合同状态">
					<template slot-scope="scope" >
						<el-tag :type="scope.row.file_path === null ? 'info' : 'success'" effect="plain">
							{{scope.row.file_path === null ? '未生成合同' : '已生成合同'}}
						</el-tag>
					</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="240">
				<template slot-scope="{row}">
					<el-button type="primary" size="mini" :disabled="row.file_path !== null" @click="handleCreate(row)">生成合同</el-button>
					<el-button type="danger" size="mini" :disabled="row.file_path === null" @click="handleDownload(row)">下载合同</el-button>
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
    </div>
</template>
<script>
import {contractList,contractCreate,contractDownload} from "@/api/article";
import {getToken} from "@/utils/token";
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
				contractList(this.listQuery).then(res =>{
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
			handleCreate(row){
				contractCreate({id: row.id}).then(res => {
					console.log(res);
					if(res.data.code === 20000){
						this.getList();
						this.$notify({
							title: '成功',
							message: '生成合同成功！',
							type: 'success',
							duration: 2000
						});
					}
				})
			},
			handleDownload(row){
				console.log(row)
				contractDownload({id: row.id}).then(res => {
					console.log(res);
					if(res.data.code === 20000){
						this.$notify({
							title: '成功',
							message: '下载合同成功！',
							type: 'success',
							duration: 2000
						});
						let _url = "http://139.196.42.209:5004" + res.data.data.url;
						console.log(_url)
						this.downloadFile(_url);
					}
				})
			},
			downloadFile(url){
				var xhr = new XMLHttpRequest();
				xhr.open('get',url);
				xhr.responseType = "blob"; // 返回字节流
				xhr.setRequestHeader("token",getToken()); // 在头部传入token
				xhr.onload = () => {
					if(xhr.status === 200){
						var filename = xhr.responseURL.substring(xhr.responseURL.lastIndexOf("/")+1);
						this.saveAs(filename,xhr.response);
					}
				};
				xhr.send();
			},
			saveAs(name,data){
				var urlObject = window.URL; // window对象的URL对象是专门用来将blob或者file读取成一个url的
				var export_blob = new Blob([data]); // 代表二进制类型的大对象，就是Blob对象是二进制数据
				var save_link = document.createElement("a"); //创建a标签
				save_link.href = urlObject.createObjectURL(export_blob); // 通过URL。createURL（blob）可以获取当前文件的下载路径
				save_link.download = name; // 利用a标签的download属性
				save_link.click(); // 触发a标签的点击事件

			}
    }
    
  }
</script>
<style lang="scss" scoped>
	.serach-enter-active,.serach-leave-active{
		transition: opacity 10s ease;
	}
	.serach-enter,.serach-leave{
		opacity: 0
	}
</style>