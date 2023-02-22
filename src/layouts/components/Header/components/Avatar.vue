<template>
	<el-dropdown trigger="click">
		<!-- <div class="avatar">
			<img v-if="image" :src="getIcon('https://73d529c6.r3.cpolar.top/img/user/' + image)" alt="avatar" />
			<img v-else :src="getIcon('https://73d529c6.r3.cpolar.top/img/user/' + userinfo.img)" alt="avatar" />

			</div> -->
		<el-avatar v-if="image" :size="40" :src="getIcon('https://73d529c6.r3.cpolar.top/img/user/' + image)"></el-avatar>
		<el-avatar v-else :size="40" :src="getIcon('https://73d529c6.r3.cpolar.top/img/user/' + userinfo.img)"></el-avatar>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="changerouter()">
					<el-icon><User /></el-icon>{{ $t("header.personalData") }}
				</el-dropdown-item>
				<el-dropdown-item @click="changerouter()">
					<el-icon><Edit /></el-icon>{{ $t("header.changePassword") }}
				</el-dropdown-item>
				<el-dropdown-item @click="showMymessage">
					<el-icon><Bell /></el-icon>{{ "查看系统信息" }}
				</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>
					<el-icon><SwitchButton /></el-icon>{{ $t("header.logout") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<InfoDialog ref="infoRef"></InfoDialog>
	<PasswordDialog ref="passwordRef"></PasswordDialog>
	<el-dialog v-model="dialogTableVisible" title="系统信息">
		<el-table :data="systeminfo.data">
			<el-table-column property="title" label="消息简要" width="110">
				<template #default="scope">
					<el-tag class="ml-2" v-if="scope.row.title === 1" type="success">举报成功</el-tag>
					<el-tag class="ml-2" v-else-if="scope.row.title === 2" type="info">举报失败</el-tag>
					<el-tag class="ml-2" v-else-if="scope.row.title === 3" type="warning">评论被举报</el-tag>
					<el-tag class="ml-2" v-else>留言回复</el-tag>
				</template>
			</el-table-column>

			<el-table-column property="time" label="时间" width="170" />
			<el-table-column property="content" label="消息内容" />
			<el-table-column property="status" label="消息状态" width="100">
				<template #default="scope2">
					<div @change="changestatusresolve(scope2.row)">{{ scope2.row.status ? "已读" : "未读" }}</div>
				</template>
			</el-table-column>
		</el-table>
		<div class="readall" @click="readAllnews"><el-button>一键全读</el-button></div>
	</el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { GlobalStore } from "@/stores";
import { LOGIN_URL } from "@/config/config";
import { logoutApi, myMessage, putsystemMessage, putsystemMessagereadAll } from "@/api/modules/lnl-paly";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const globalStore = GlobalStore();
const userinfo = globalStore.userInformation || sessionStorage.getItem("sessionImg");
const router = useRouter();
let dialogTableVisible = ref(false);

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
		globalStore.setImage("");
		// 3.重定向到登陆页
		router.replace(LOGIN_URL);
		ElMessage.success("退出登录成功！");
	});
};

const systeminfo = reactive<{ data: any }>({ data: {} });
const showMymessage = async () => {
	dialogTableVisible.value = true;
	const { data } = (await myMessage({})) as any;
	systeminfo.data = data;
};

interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
const changerouter = () => {
	router.push("/assembly/guide");
};
let image = ref("");
const imageUrl = computed(() => {
	return globalStore.image;
});
//点击已读
const changestatusresolve = (row: any) => {
	console.log(row);
	putsystemMessage({ systemMessageId: row.id });
};
//点击全读
const readAllnews = async () => {
	await putsystemMessagereadAll({});
	ElMessage.success("全部已读！");
	dialogTableVisible.value = false;
};
watch(
	imageUrl,
	(newValue: any) => {
		image.value = newValue;
	},
	{ immediate: true, deep: true }
);
onMounted(() => {});
</script>

<style scoped lang="scss">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	background-color: pink;
	border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
	}
}
.readall {
	position: relative;
	top: 15px;
	left: 310px;
}
</style>
