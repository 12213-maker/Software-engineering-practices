import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
// import AuthButtons from "@/assets/json/authButtons.json";
import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(`/user/login`, params, { headers: { noLoading: true } });
};

//用户注册
export const register = (params: Login.Register) => {
	return http.post("user/register", params, { headers: { noLoading: true } });
};

// * 获取按钮权限
// export const getAuthButtonListApi = () => {
// 	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { headers: { noLoading: true } });
// 	// 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtons.json 数据
// 	return AuthButtons;
// };

// * 获取菜单列表
export const getAuthMenuListApi = () => {
	// return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { headers: { noLoading: true } });
	// 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
	return DynamicRouter;
};

// * 用户退出登录
export const logoutApi = () => {
	return http.post(PORT1 + `/logout`);
};
