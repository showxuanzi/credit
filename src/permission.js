import router from "./router";
import store from "./store";

// beforeEach（三个参数） 路由拦截——在路由跳转前执行
//  to —— 即将进入的路由
// from —— 即将离开，到哪去
// next —— 下一个要执行的状态
router.beforeEach(async (to,from,next)=>{
	// 页面进入先判断路径
	// 1、是否是登录页——是的话继续
	if(to.path === "/login"){
		next();
	}else{
		// 2、不是登录页——判断有无用户信息（角色，权限）
		// 3、有用户信息，判断角色 —— 有角色信息直接跳转
		var hasRoles = store && store.getters.roles && store.getters.roles.length > 0; // 在vuex中获取用户信息
		if(hasRoles){
			next();
		}else{
			// 4、没有角色信息，页面刷新要再次发送请求拿到用户信息
			// 捕获异常(例如页面刷新，没有用户信息了，退出之后清除用户信息也要重新获取),
			try{
				let {roles} = await store.dispatch("USERINFO"); // 先执行，用Promise的异步同步化
				let rolesName = roles.map(item => item.name);
				let asyncRoute = await store.dispatch("GETROUTES",rolesName);
				router.addRoutes(asyncRoute); // 添加动态路由
				// 获取到角色信息，跳转，没有角色信息登录
				if(roles){
					next({...to});
				}else{
					next({path: "/login"});
				}
			}catch(error){
				next({path: "/login"})
			}

		}
	}

	
	
})