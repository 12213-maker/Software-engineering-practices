<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名：">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="loginForm.password" placeholder="密码：" show-password autocomplete="new-password">
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="Key" round @click="dialogVisible = true" size="large">注册</el-button>
		<el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
			登录
		</el-button>
	</div>

	<el-dialog :destroy-on-close="true" v-model="dialogVisible" title="Register" width="40%">
		<register @change_dialog_visible="changeDialogvisible" />
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/api/interface";
import { ElNotification } from "element-plus";
// import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import { getTimeState } from "@/utils/util";
import { HOME_URL } from "@/config/config";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { Key, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import register from "./register.vue";

const router = useRouter();
const tabsStore = TabsStore();
const keepAlive = KeepAliveStore();
const globalStore = GlobalStore();
const userInfos = globalStore.user;

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
let dialogVisible = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({ username: "", password: "" });

const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			const userInfo = userInfos.find((item: any) => {
				const { password, account } = item.userinfo;
				// if (password === loginForm.password && acount === loginForm.username) return item;
				console.log(loginForm, password, account, item);
				return password == loginForm.password && account == loginForm.username;
			});
			console.log(userInfo, "userInfo");
			const res = {
				code: 200,
				data: {
					token:
						"-BUl8EZf65F-Dvy_yR8FoATTxCjn6VHsoiZMFDorJfghOCyll4lqYB_rv-6WsuIctJJpwgn1WlJLpi0mjv5K9K_RUU2emAM7lbiIa1fk3o5_Nj8iL6tUS-ILnso1HRml",
					user: userInfo.userinfo || {
						id: 0,
						roleId: 1,
						username: "更与行人别",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e",
						password: "123456",
						birthday: "2001-10-27",
						phone: "18980530858",
						sex: 2,
						description: "人生如逆旅，我亦是行人。",
						school: 1
					}
				}
			};

			// 1.执行登录接口
			// const { code, data } = await loginApi({ ...loginForm });
			const { code, data } = res;

			if (Number(code) === 200) {
				globalStore.setToken(data.token);
				globalStore.setLogin(true);
				//保存用户信息
				globalStore.setUserInformation(data.user);

				// 2.添加动态路由
				await initDynamicRouter();

				// // 3.清空 tabs、keepAlive 保留的数据
				tabsStore.closeMultipleTab();
				keepAlive.setKeepAliveName();
				// 4.跳转到首页
				router.push(HOME_URL);
				ElNotification({
					title: getTimeState(),
					message: `欢迎${data.user.roleId === 1 ? "管理员" : "用户"}：${data.user.username} 登录智慧校园`,
					type: "success",
					duration: 3000
				});
			} else {
				ElNotification({
					title: getTimeState(),
					message: `用户名或密码错误`,
					type: "warning",
					duration: 1000
				});
			}
		} finally {
			loading.value = false;
		}
	});
};

const changeDialogvisible = (value: any) => {
	dialogVisible.value = value;
};

onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
