<template>
	<div>
		<el-menu-item :index="basePath" v-if="!item.children">
			<i class="el-icon-menu"></i>
			<span slot="title">{{item.meta.title}}</span>
		</el-menu-item>
		<el-submenu :index="basePath" v-else>
			<template slot="title">
				<i class="el-icon-menu"></i>
				{{item.meta.title}}
			</template>
			<!-- 递归调用 -->
			<subItem v-for="route in item.children" :key="route.path"
			:item="route" :base-path="resolvePath(route.path)"/>
		</el-submenu>
	</div>
</template>
<script>
import path from "path";
export default {
	name: "subItem",
	props: ["item","basePath"],
	methods:{
		// 用于路径拼接，当二级导航是相对路径的时候用此方法，绝对路径的时候可以不用
		resolvePath($path){
			return path.resolve(this.basePath,$path);
		}
	}
}
</script>