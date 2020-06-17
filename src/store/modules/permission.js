import {normalRoutes,asyncRoutes} from "@/router/index";
// console.log(normalRoutes);
// console.log( asyncRoutes)
const state = {
	routes: []
};
const getters = {
	get_routes: state => state.routes
};
const mutations = {
	SET_ROUTE: (state,routes) => {
		state.routes = routes;
	}
};
const actions = {
	GETROUTES({commit},roleName){
		// roleName 角色信息，是一个数组
		return new Promise((resolve) => {
			let _route,// 返回的路由对象
				filterRoute; // 过滤的路由
			let home = normalRoutes.filter(item => item.path === "/home")[0]; //取出路由对象
			home.children = []; // 每次都对子集清空
			if(roleName.includes("administrator")){ //判断是否是管理员
				home.children = asyncRoutes;
			}else{
				filterRoute = filterAsyncRoute(asyncRoutes,roleName);
				home.children = filterRoute;
			}
			_route = [home] || []; // 返回的必须是数组对象，因为在route.addRoute()方法中要求传入的是数组对象
			commit("SET_ROUTE",_route);
			resolve(_route);
		})
	}
};
//  过滤路由
function filterAsyncRoute(routes,roleName){
	var data = routes.filter(route => {
		return route.meta && route.meta.roles && roleName.some( item => route.meta.roles.includes(item))
	});
	return data;
}
export default{
    state,
    getters,
    mutations,
    actions
}