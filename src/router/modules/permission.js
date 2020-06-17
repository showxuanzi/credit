const permission = {
	path: "/permission",//权限管理
	name: "permission",
	meta:{title: "权限管理"},
	component: () => import("@/views/permission/index"),
	children: [
		{
			// path: "/permission/create",
			path: "create",
			name: "create",
			meta:{title: "创建人员"},
			component: () => import("@/views/permission/create")
		},
		{
			// path: "/permission/list",
			path: "list",
			name: "list",
			meta:{title: "列表展示"},
			component: () => import("@/views/permission/list")
		}
	]
};
export default permission;