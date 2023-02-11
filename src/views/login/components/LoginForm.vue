<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名：admin">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="loginForm.password" placeholder="密码：123456" show-password autocomplete="new-password">
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
import { loginApi } from "@/api/modules/login";
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
			// 1.执行登录接口
			const { code, data } = await loginApi({ ...loginForm });

			if (Number(code) === 200) {
				globalStore.setToken(data.token);
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
					message: "欢迎登录 没课去哪儿",
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
