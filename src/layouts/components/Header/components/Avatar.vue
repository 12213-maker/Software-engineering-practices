<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img :src="getIcon('https://8c93136.r6.cpolar.top/img/user/' + userinfo.img)" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="changerouter()">
					<el-icon><User /></el-icon>{{ $t("header.personalData") }}
				</el-dropdown-item>
				<el-dropdown-item @click="changerouter()">
					<el-icon><Edit /></el-icon>{{ $t("header.changePassword") }}
				</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>
					<el-icon><SwitchButton /></el-icon>{{ $t("header.logout") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- infoDialog -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { GlobalStore } from "@/stores";
import { LOGIN_URL } from "@/config/config";
import { logoutApi } from "@/api/modules/lnl-paly";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const globalStore = GlobalStore();
const userinfo = globalStore.userInformation;
const router = useRouter();

//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

// 退出登录
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(async () => {
		// 1.调用退出登录接口
		await logoutApi({});
		// 2.清除 Token
		globalStore.setToken("");
		// 3.重定向到登陆页
		router.replace(LOGIN_URL);
		ElMessage.success("退出登录成功！");
	});
};

interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
const changerouter = () => {
	router.push("/assembly/guide");
};

const getProjectList = computed(() => {
	return globalStore.userInformation;
});
watch(
	getProjectList,
	(newValue: any, oldValue: any) => {
		// console.log("===================>监听到了", newValue, oldValue);

		return { newValue, oldValue };
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
