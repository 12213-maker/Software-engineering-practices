import http from "@/api";
import { placelistvalue, PlaceMore } from "../interface/index";

export const placeList = (params: placelistvalue) => {
	return http.get("/place/list", params, { headers: { noLoading: true } });
};

////地点更多推荐列表
export const placeMore = (params: PlaceMore) => {
	return http.get("/place/more", params, { headers: { noLoading: true } });
};

//地点详细信息/place/details
export const placeDetails = (params: any) => {
	return http.get("/place/details", params, { headers: { noLoading: true } });
};

//展示评论列表
export const commentList = (params: any) => {
	return http.get("/comment/list", params, { headers: { noLoading: true } });
};

//用户点赞评论
export const likeAdd = (params: any) => {
	return http.post("/likes/add", params, { headers: { noLoading: true } });
};

//用户取消评论点赞 /likes/delete
export const likesDelete = (params: any) => {
	return http.post("/likes/delete", params, { headers: { noLoading: true } });
};
//用户举报评论
export const jubaoreport = (params: any) => {
	return http.post("/report", params, { headers: { noLoading: true } });
};
//用户发表评论 /comment/add
export const commentAdd = (params: any) => {
	return http.post("/comment/add", params, { headers: { noLoading: true, "Content-type": "multipart/form-data" } });
};

//用户退出登录/user/logout
export const logoutApi = (params: any) => {
	return http.get("/user/logout", params, { headers: { noLoading: true } });
};

//用户查询个人信息/user/info
export const getuserinfo = (params: any) => {
	return http.get("/user/info", params, { headers: { noLoading: true } });
};

//用户修改基本信息/user/info
export const putuserinfo = (params: any) => {
	return http.put("/user/info", params, { headers: { noLoading: true } });
};

//修改密码user/password
export const userPassword = (params: any) => {
	return http.put("user/password", params, { headers: { noLoading: true } });
};

//修改头像user/uploadImg
export const uploadImg = (params: any) => {
	return http.post("/user/uploadImg", params, { headers: { noLoading: true } });
};
//我的举报/report
export const report = (params: any) => {
	return http.get("/report/myReports", params, { headers: { noLoading: true } });
};

//我的留言/message
export const message = (params: any) => {
	return http.get("/message/myMessages", params, { headers: { noLoading: true } });
};

//管理员获取table列表/user/userInfo
export const userUserInfo = (params: any) => {
	return http.get("/user/userInfo", params, { headers: { noLoading: true } });
};

//管理员新增用户 /user/userInfo
export const PostuserUserInfo = (params: any) => {
	return http.post("/user/userInfo", params, { headers: { noLoading: true } });
};
//管理员修改用户信息/user/userInfo
export const PutuserUserInfo = (params: any) => {
	return http.put("/user/userInfo", params, { headers: { noLoading: true } });
};
//管理员重置用户密码
export const PutResetPassword = (params: any) => {
	return http.put("/user/resetPassword", params, { headers: { noLoading: true } });
};
//管理员删除用户/user/delete/{id}
export const DeleteuserUserInfo = (params: any) => {
	return http.delete("/user/delete", params, { headers: { noLoading: true } });
};
//用户查看系统信息
export const myMessage = (params: any) => {
	return http.get("/systemMessage/myMessage", params, { headers: { noLoading: true } });
};
//用户点击已读按钮
export const putsystemMessage = (params: any) => {
	return http.put("/systemMessage/read", params, { headers: { noLoading: true } });
};
//用户点击全部已读按钮
export const putsystemMessagereadAll = (params: any) => {
	return http.put("/systemMessage/readAll", params, { headers: { noLoading: true } });
};
//用户提交留言/message
export const giveMyMessage = (params: any) => {
	return http.post("/message", params, { headers: { noLoading: true } });
};
//查看所有动态 //community/all
export const community = (params: any) => {
	return http.get("/community/all", params, { headers: { noLoading: true } });
};
//查看个人动态
export const getselfcommunity = (params: any) => {
	return http.get("/community", params, { headers: { noLoading: true } });
};
//删除动态
export const deletecommunity = (params: any) => {
	return http.delete("/community", params, { headers: { noLoading: true } });
};
//发布动态
export const postcommunity = (params: any) => {
	return http.post("/community", params, { headers: { noLoading: true, "Content-type": "multipart/form-data" } });
};
