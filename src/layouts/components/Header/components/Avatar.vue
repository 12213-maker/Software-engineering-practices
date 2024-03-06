<template>
	<el-dropdown trigger="click">
		<el-badge :is-dot="unreadmessage ? true : false" class="item">
			<el-avatar v-if="login" :size="40" :src="userinfo.img"></el-avatar>
			<el-avatar v-else :size="40" src="../../../../assets/lnl_images/default.png"></el-avatar>
		</el-badge>

		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="changerouter()">
					<el-icon><User /></el-icon>{{ $t("header.personalData") }}
				</el-dropdown-item>
				<el-dropdown-item @click="changerouter()">
					<el-icon><Edit /></el-icon>{{ $t("header.changePassword") }}
				</el-dropdown-item>
				<el-dropdown-item @click="showMymessage">
					<el-badge :hidden="unreadmessage ? false : true" :value="unreadmessage" class="item">
						<el-icon><Bell /></el-icon>{{ "查看系统信息" }}
					</el-badge>
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
			<el-table-column property="title" label="消息简要" width="120">
				<template #default="scope">
					<el-tag class="ml-2" v-if="scope.row.title === 1" type="success">举报成功</el-tag>
					<el-tag class="ml-2" v-else-if="scope.row.title === 2" type="info">举报失败</el-tag>
					<el-tag class="ml-2" v-else-if="scope.row.title === 3" type="warning">评论被举报</el-tag>
					<el-tag class="ml-2" v-else-if="scope.row.title === 4" type="warning">管理员有话说</el-tag>
					<el-tag class="ml-2" v-else>留言回复</el-tag>
				</template>
			</el-table-column>

			<el-table-column property="time" label="时间" width="170" />
			<el-table-column property="content" label="消息内容" />
			<el-table-column property="status" label="消息状态" width="100">
				<template #default="scope2">
					{{ scope2.row.status === 1 ? "已读" : "未读" }}
					<!-- <el-checkbox
						@change="changestatusresolve(scope2.row)"
						:checked="scope2.row.status === 1 ? true : false"
						:disabled="scope2.row.status === 1 ? true : false"
						:label="scope2.row.status === 1 ? '已读' : '未读'"
						size="large"
					/> -->
				</template>
			</el-table-column>
		</el-table>
		<!-- <div class="readall" @click="readAllnews"><el-button>一键全读</el-button></div> -->
	</el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { GlobalStore } from "@/stores";
import { LOGIN_URL } from "@/config/config";
import { systemMessageunread } from "@/api/modules/lnl-paly";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const globalStore = GlobalStore();

const userinfo = ref();
userinfo.value = globalStore.userInformation;

const login = computed(() => globalStore.login);

const getProjectList = computed(() => {
	return globalStore.userInformation;
});
watch(
	getProjectList,
	(newValue: any) => {
		userinfo.value = newValue;
	},
	{ immediate: true, deep: true }
);

// const userinfo = globalStore.userInformation || sessionStorage.getItem("sessionImg");
const router = useRouter();
let dialogTableVisible = ref(false);
//处理图片
// const getIcon = (name: string) => {
// 	return new URL(name, import.meta.url).href;
// };

// 退出登录
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(async () => {
		// 1.调用退出登录接口
		// await logoutApi({});
		// 2.清除 Token
		globalStore.setToken("");
		globalStore.setImage("");
		globalStore.setLogin(false);
		// 3.重定向到登陆页
		router.replace(LOGIN_URL);
		ElMessage.success("退出登录成功！");
	});
};

const systeminfo = reactive<{ data: any }>({ data: {} });
const showMymessage = async () => {
	dialogTableVisible.value = true;

	const data = [
		{
			title: 1,
			time: "2024-3-4",
			content: "文章内容有问题",
			status: 2
		},
		{
			title: 4,
			time: "2024-3-3",
			content: "欢迎登录智慧校园~",
			status: 1
		}
	];
	refreshmessage();
	systeminfo.data = data;
};

//更新未读条数
const refreshmessage = async () => {
	const res = await systemMessageunread({});
	unreadmessage.value = res.data;
};
interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
const changerouter = () => {
	router.push("/assembly/guide");
};
let image = ref(globalStore.image);
const imageUrl = computed(() => {
	return globalStore.image;
});
//点击已读
// const changestatusresolve = async (row: any) => {
// 	console.log(row);
// 	await putsystemMessage({ systemMessageId: row.id });
// 	showMymessage();
// 	refreshmessage();
// };
//点击全读
// const readAllnews = async () => {
// 	await putsystemMessagereadAll({});
// 	ElMessage.success("全部已读！");
// 	refreshmessage();
// 	dialogTableVisible.value = false;
// };
watch(
	imageUrl,
	(newValue: any) => {
		image.value = newValue;
	},
	{ immediate: true, deep: true }
);

const unreadmessage = ref();
unreadmessage.value = globalStore.systemMessageLength;
const mesage = computed(() => {
	return globalStore.systemMessageLength;
});
watch(mesage, newvalue => {
	unreadmessage.value = newvalue;
});

onMounted(() => {
	console.log(image.value, "showme", globalStore.article, globalStore.user);
});
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
