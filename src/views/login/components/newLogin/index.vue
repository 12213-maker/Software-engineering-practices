<template>
	<div>
		<!-- 登陆和注册 -->
		<div v-if="!isEmpty(currentUser)" class="myCenter in-up-container my-animation-hideToShow">
			<!-- 背景图片 -->
			<el-image class="my-el-image" style="position: absolute" v-once lazy :src="currentUser.img" fit="cover"> </el-image>
			<div class="in-up" id="loginAndRegist">
				<div class="form-container sign-up-container">
					<div class="myCenter">
						<h1>注册</h1>
						<input v-model="username" type="text" maxlength="30" placeholder="手机号" />
						<input v-model="password" type="password" maxlength="30" placeholder="密码" />
						<input v-model="email" type="email" placeholder="邮箱" />
						<input v-model="code" type="text" placeholder="验证码" disabled />
						<a style="margin: 0" href="#" @click="changeDialog('邮箱验证码')">获取验证码</a>
						<button @click="regist()">注册</button>
					</div>
				</div>
				<div class="form-container sign-in-container">
					<div class="myCenter">
						<h1>登录</h1>
						<input v-model="account" type="text" placeholder="用户名/邮箱/手机号" />
						<input v-model="password" type="password" placeholder="密码" />
						<a href="#" @click="changeDialog('找回密码')">忘记密码？</a>
						<button @click="login()">登录</button>
					</div>
				</div>
				<div class="overlay-container">
					<div class="overlay">
						<div class="overlay-panel myCenter overlay-left">
							<h1>已有帐号？</h1>
							<p>请登录🚀</p>
							<button class="ghost" @click="signIn()">登录</button>
						</div>
						<div class="overlay-panel myCenter overlay-right">
							<h1>没有帐号？</h1>
							<p>立即注册吧😃</p>
							<button class="ghost" @click="signUp()">注册</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 用户信息 -->
		<div v-else class="user-container myCenter my-animation-hideToShow">
			<!-- 背景图片 -->
			<el-image
				class="my-el-image"
				style="position: absolute"
				v-once
				lazy
				src="https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg"
				fit="cover"
			>
				<!-- <div slot="error" class="image-slot"></div> -->
			</el-image>
			<div class="shadow-box-mini user-info" style="display: flex">
				<div class="user-left">
					<div>
						<el-avatar class="user-avatar" @click="changeDialog('修改头像')" :size="60" :src="currentUser.img"></el-avatar>
					</div>
					<div class="myCenter" style="margin-top: 12px">
						<div class="user-title">
							<div>用户名：</div>
							<div>手机号：</div>
							<div>邮箱：</div>
							<div>性别：</div>
							<div>简介：</div>
						</div>
						<div class="user-content">
							<div>
								<el-input maxlength="30" v-model="currentUser.username"></el-input>
							</div>
							<div>
								<div v-if="!isEmpty(currentUser.phone)">
									{{ currentUser.phone }}
									<span class="changeInfo" @click="changeDialog('修改手机号')">修改（功能未接入）</span>
								</div>
								<div v-else><span class="changeInfo" @click="changeDialog('绑定手机号')">绑定手机号（功能未接入）</span></div>
							</div>
							<div>
								<div v-if="!isEmpty(currentUser.email)">
									{{ currentUser.email }} <span class="changeInfo" @click="changeDialog('修改邮箱')">修改</span>
								</div>
								<div v-else><span class="changeInfo" @click="changeDialog('绑定邮箱')">绑定邮箱</span></div>
							</div>
							<div>
								<el-radio-group v-model="currentUser.sex">
									<el-radio :label="0" style="margin-right: 10px">沃尔玛的塑料袋</el-radio>
									<el-radio :label="1" style="margin-right: 10px">男</el-radio>
									<el-radio :label="2">女</el-radio>
								</el-radio-group>
							</div>
							<div>
								<el-input v-model="currentUser.description" maxlength="60" type="textarea" show-word-limit></el-input>
							</div>
						</div>
					</div>
					<div style="margin-top: 20px">
						<ProButton
							:info="'提交'"
							@click="submitUserInfo()"
							before="rgb(131, 123, 199)"
							after="linear-gradient(45deg, #f43f3b, #ec008c)"
						>
						</ProButton>
					</div>
				</div>
				<div class="user-right"></div>
			</div>
		</div>

		<el-dialog
			:title="dialogTitle"
			v-model="showDialog"
			width="30%"
			:before-close="clearDialog"
			:append-to-body="true"
			close-on-click-modal
			close-on-press-escape
			destroy-on-close
			center
		>
			<div class="myCenter" style="flex-direction: column">
				<div>
					<div v-if="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号'">
						<div style="margin-bottom: 5px">手机号：</div>
						<el-input v-model="phoneNumber"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
						<el-input v-model="code"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">密码：</div>
						<el-input v-model="password"></el-input>
					</div>
					<div v-else-if="dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱'">
						<div style="margin-bottom: 5px">邮箱：</div>
						<el-input v-model="email"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
						<el-input v-model="code"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">密码：</div>
						<el-input v-model="password"></el-input>
					</div>
					<div v-else-if="dialogTitle === '修改头像'">
						<uploadPicture :prefix="'userAvatar'" @addPicture="addPicture" :maxSize="1" :maxNumber="1"></uploadPicture>
					</div>
					<div v-else-if="dialogTitle === '找回密码'">
						<div class="myCenter" style="margin-bottom: 12px">
							<el-radio-group v-model="passwordFlag">
								<el-radio :label="1" style="margin-right: 10px">手机号</el-radio>
								<el-radio :label="2">邮箱</el-radio>
							</el-radio-group>
						</div>
						<div v-if="passwordFlag === 1">
							<div style="margin-bottom: 5px">手机号：</div>
							<el-input v-model="phoneNumber"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
							<el-input v-model="code"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">新密码：</div>
							<el-input maxlength="30" v-model="password"></el-input>
						</div>
						<div v-else-if="passwordFlag === 2">
							<div style="margin-bottom: 5px">邮箱：</div>
							<el-input v-model="email"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
							<el-input v-model="code"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">新密码：</div>
							<el-input maxlength="30" v-model="password"></el-input>
						</div>
					</div>
					<div v-else-if="dialogTitle === '邮箱验证码'">
						<div>
							<div style="margin-bottom: 5px">邮箱：</div>
							<el-input v-model="email"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
							<el-input v-model="code"></el-input>
						</div>
					</div>
				</div>
				<div style="display: flex; margin-top: 30px" v-show="dialogTitle !== '修改头像'">
					<ProButton
						:info="codeString"
						v-show="
							dialogTitle === '修改手机号' ||
							dialogTitle === '绑定手机号' ||
							dialogTitle === '修改邮箱' ||
							dialogTitle === '绑定邮箱' ||
							dialogTitle === '找回密码' ||
							dialogTitle === '邮箱验证码'
						"
						@click="getCode()"
						before="black"
						after="linear-gradient(45deg, #f43f3b, #ec008c)"
						style="margin-right: 20px"
					>
					</ProButton>
					<ProButton
						:info="'提交'"
						@click="submitDialog()"
						before="rgb(131, 123, 199)"
						after="linear-gradient(45deg, #f43f3b, #ec008c)"
					>
					</ProButton>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="login">
import { ref } from "vue";
import { GlobalStore } from "@/stores";
import { ElMessage, ElNotification } from "element-plus";
import ProButton from "../proButton/index.vue";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
import { getTimeState } from "@/utils/util";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { TabsStore } from "@/stores/modules/tabs";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
const tabsStore = TabsStore();
const keepAlive = KeepAliveStore();

const username = ref("");
const account = ref("");
let password = ref("");
let phoneNumber = ref("");
let email = ref("");
const avatar = ref("");
const showDialog = ref(false);
const code = ref("");
let dialogTitle = ref("");
const codeString = ref("验证码");
let passwordFlag = ref(null);
let intervalCode = ref(null);

const globalStore = GlobalStore();
const router = useRouter();
const currentUser = globalStore.user;

const isEmpty = (value: any) => {
	if (
		typeof value === "undefined" ||
		value === null ||
		(typeof value === "string" && value.trim() === "") ||
		(Array.prototype.isPrototypeOf(value) && value.length === 0) ||
		(Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)
	) {
		return true;
	} else {
		return false;
	}
};

console.log(currentUser, "currentUser", isEmpty(currentUser));

const changeDialog = (value: any) => {
	if (value === "邮箱验证码") {
		if (isEmpty(email.value)) {
			ElMessage({
				message: "请输入邮箱！",
				type: "error"
			});
			return false;
		}
		if (!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(email.value)) {
			ElMessage({
				message: "邮箱格式有误！",
				type: "error"
			});
			return false;
		}
	}

	dialogTitle.value = value;
	showDialog.value = true;
};
const submitUserInfo = () => {
	// console.log(value);
};

const clearDialog = () => {
	password.value = "";
	phoneNumber.value = "";
	email.value = "";
	// avatar.value = "";
	showDialog.value = false;
	code.value = "";
	dialogTitle.value = "";
	passwordFlag.value = null;
};
const addPicture = () => {};
const getCode = () => {
	if (codeString.value === "验证码") {
		// 获取验证码
		let params = {};
		if (!checkParams(params)) {
			return;
		}

		// let url;
		// if (dialogTitle.value === "找回密码" || dialogTitle.value === "邮箱验证码") {
		// 	url = "/user/getCodeForForgetPassword";
		// } else {
		// 	url = "/user/getCodeForBind";
		// }

		// $http
		// 	.get($constant.baseURL + url, params)
		// 	.then(res => {
		// 		ElMessage({
		// 			message: "验证码已发送，请注意查收！",
		// 			type: "success"
		// 		});
		// 	})
		// 	.catch(error => {
		// 		ElMessage({
		// 			message: error.message,
		// 			type: "error"
		// 		});
		// 	});
		ElMessage({
			message: "验证码已发送，请注意查收！",
			type: "success"
		});
		codeString.value = "30";
		intervalCode.value = setInterval(() => {
			if (codeString.value === "0") {
				clearInterval(intervalCode.value);
				codeString.value = "验证码";
			} else {
				codeString.value = parseInt(codeString.value) - 1 + "";
			}
		}, 1000);
	} else {
		ElMessage({
			message: "请稍后再试！",
			type: "warning"
		});
	}
};
const submitDialog = () => {
	console.log(dialogTitle.value, "dialogTitle");
	if (dialogTitle.value === "修改头像") {
		if (isEmpty(avatar.value)) {
			ElMessage({
				message: "请上传头像！",
				type: "error"
			});
		} else {
			// let user = {
			// 	avatar: avatar.trim()
			// };
			// $http
			// 	.post($constant.baseURL + "/user/updateUserInfo", user)
			// 	.then(res => {
			// 		if (!isEmpty(res.data)) {
			// 			$store.commit("loadCurrentUser", res.data);
			// 			currentUser = $store.state.currentUser;
			// 			clearDialog();
			// 			ElMessage({
			// 				message: "修改成功！",
			// 				type: "success"
			// 			});
			// 		}
			// 	})
			// 	.catch(error => {
			// 		ElMessage({
			// 			message: error.message,
			// 			type: "error"
			// 		});
			// 	});
		}
	} else if (
		dialogTitle.value === "修改手机号" ||
		dialogTitle.value === "绑定手机号" ||
		dialogTitle.value === "修改邮箱" ||
		dialogTitle.value === "绑定邮箱"
	) {
		updateSecretInfo();
	} else if (dialogTitle.value === "找回密码") {
		if (passwordFlag.value !== 1 && passwordFlag.value !== 2) {
			ElMessage({
				message: "请选择找回方式！",
				type: "error"
			});
		} else {
			updateSecretInfo();
		}
	} else if (dialogTitle.value === "邮箱验证码") {
		showDialog.value = false;
	}
};
const updateSecretInfo = () => {
	if (isEmpty(code.value)) {
		ElMessage({
			message: "请输入验证码！",
			type: "error"
		});
		return;
	}
	if (isEmpty(password)) {
		ElMessage({
			message: "请输入密码！",
			type: "error"
		});
		return;
	}
	let params = {
		code: code.value.trim(),
		password: password.value.trim()
	};
	if (!checkParams(params)) {
		return;
	}

	if (dialogTitle.value === "找回密码") {
		//在这里修改用户的密码
		const oldUser = globalStore.user;
		const newUser = oldUser.map((item: any) => {
			const { phone, email: itemEamil } = item.userinfo;
			console.log(phone, phoneNumber.value, itemEamil, email.value, password.value, "password.value");
			if (phone === phoneNumber.value || itemEamil === email.value) {
				return { ...item, userinfo: { ...item.userinfo, password: password.value } };
			}
			return item;
		});
		console.log(newUser, "newUserrt");
		globalStore.setUsers(newUser);

		ElMessage({
			message: "修改成功，请重新登陆！",
			type: "success"
		});
		clearDialog();

		// $http
		// 	.post($constant.baseURL + "/user/updateForForgetPassword", params, false, false)
		// 	.then(res => {
		// 		clearDialog();
		// 		ElMessage({
		// 			message: "修改成功，请重新登陆！",
		// 			type: "success"
		// 		});
		// 	})
		// 	.catch(error => {
		// 		ElMessage({
		// 			message: error.message,
		// 			type: "error"
		// 		});
		// 	});
	} else {
		// $http
		// 	.post($constant.baseURL + "/user/updateSecretInfo", params, false, false)
		// 	.then(res => {
		// 		if (!isEmpty(res.data)) {
		// 			$store.commit("loadCurrentUser", res.data);
		// 			currentUser = $store.state.currentUser;
		// 			clearDialog();
		// 			ElMessage({
		// 				message: "修改成功！",
		// 				type: "success"
		// 			});
		// 		}
		// 	})
		// 	.catch(error => {
		// 		ElMessage({
		// 			message: error.message,
		// 			type: "error"
		// 		});
		// 	});
	}
};
const checkParams = (params: any) => {
	if (
		dialogTitle.value === "修改手机号" ||
		dialogTitle.value === "绑定手机号" ||
		(dialogTitle.value === "找回密码" && passwordFlag.value === 1)
	) {
		params.flag = 1;
		if (isEmpty(phoneNumber)) {
			ElMessage({
				message: "请输入手机号！",
				type: "error"
			});
			return false;
		}
		if (!/^1[345789]\d{9}$/.test(phoneNumber.value)) {
			ElMessage({
				message: "手机号格式有误！",
				type: "error"
			});
			return false;
		}
		params.place = phoneNumber;
		return true;
	} else if (
		dialogTitle.value === "修改邮箱" ||
		dialogTitle.value === "绑定邮箱" ||
		dialogTitle.value === "邮箱验证码" ||
		(dialogTitle.value === "找回密码" && passwordFlag.value === 2)
	) {
		params.flag = 2;
		if (isEmpty(email.value)) {
			ElMessage({
				message: "请输入邮箱！",
				type: "error"
			});
			return false;
		}
		if (!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(email.value)) {
			ElMessage({
				message: "邮箱格式有误！",
				type: "error"
			});
			return false;
		}
		params.place = email.value;
		return true;
	}
	return false;
};
const regist = () => {
	console.log("regist1");
	if (isEmpty(username.value) || isEmpty(password.value)) {
		ElMessage({
			message: "请输入用户名或密码！",
			type: "error"
		});
		return;
	}

	if (dialogTitle.value === "邮箱验证码" && isEmpty(email.value)) {
		ElMessage({
			message: "请输入邮箱！",
			type: "error"
		});
		return false;
	}

	if (isEmpty(code.value)) {
		ElMessage({
			message: "请输入验证码！",
			type: "error"
		});
		return;
	}

	if (username.value.indexOf(" ") !== -1 || password.value.indexOf(" ") !== -1) {
		ElMessage({
			message: "用户名或密码不能包含空格！",
			type: "error"
		});
		return;
	}

	const alluser = globalStore.user;
	let user = {
		id: alluser.length,
		userinfo: {
			id: alluser.length,
			username: username.value.trim(),
			account: username.value.trim(),
			password: password.value.trim(),
			email: email.value,
			roleId: 0
		},
		articles: [], //发布文章
		collect: [], //我的收藏
		starts: [], //我的点赞
		fans: [], //我的粉丝
		follow: [] //我的关注
	};
	alluser.push(user);
	globalStore.setUsers(alluser);
	ElMessage({
		message: "注册成功，请重新登录",
		type: "success"
	});
	setTimeout(() => {
		password.value = "";
		signIn();
	}, 500);
};
const login = async () => {
	if (isEmpty(account.value) || isEmpty(password.value)) {
		ElMessage({
			message: "请输入账号或密码！",
			type: "error"
		});
		return;
	}
	const nowUser = currentUser.find((item: any) => {
		const { phone, password: myPassword } = item.userinfo;
		return account.value === phone && myPassword == password.value;
	});
	if (!nowUser) {
		ElMessage({
			message: "账号或密码错误！",
			type: "error"
		});
		return;
	}
	globalStore.setUserInformation(nowUser.userinfo);
	globalStore.setToken("data.token");
	globalStore.setLogin(true);
	// 2.添加动态路由
	await initDynamicRouter();

	// // 3.清空 tabs、keepAlive 保留的数据
	tabsStore.closeMultipleTab();
	keepAlive.setKeepAliveName();
	router.push(HOME_URL);
	ElNotification({
		title: getTimeState(),
		message: `欢迎${nowUser.userinfo.roleId === 1 ? "管理员" : "用户"}：${nowUser.userinfo.username} 登录智慧校园`,
		type: "success",
		duration: 3000
	});
};
const signIn = () => document.querySelector("#loginAndRegist").classList.remove("right-panel-active");
const signUp = () => document.querySelector("#loginAndRegist").classList.add("right-panel-active");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
