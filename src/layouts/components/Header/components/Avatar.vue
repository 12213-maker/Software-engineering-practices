<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img :src="getIcon('https://1573395f.r7.cpolar.top/img/user/' + userinfo.img)" alt="avatar" />
		</div>
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
		<el-table :data="gridData">
			<el-table-column property="date" label="Date" width="150" />
			<el-table-column property="name" label="Name" width="200" />
			<el-table-column property="address" label="Address" />
		</el-table>
	</el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { GlobalStore } from "@/stores";
import { LOGIN_URL } from "@/config/config";
import { logoutApi, myMessage } from "@/api/modules/lnl-paly";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const globalStore = GlobalStore();
const userinfo = globalStore.userInformation;
const router = useRouter();
let dialogTableVisible = ref(false);
const gridData = [
	{
		date: "2016-05-02",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-02",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-02",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-02",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-02",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-02",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-04",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-01",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	},
	{
		date: "2016-05-03",
		name: "John Smith",
		address: "No.1518,  Jinshajiang Road, Putuo District"
	}
];

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

const showMymessage = async () => {
	const { data } = await myMessage({});
	console.log(data);

	dialogTableVisible.value = true;
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
watch(
	imageUrl,
	(newValue: any) => {
		console.log("showme", newValue);

		image.value = newValue;
	},
	{ immediate: true, deep: true }
);
onMounted(() => {
	console.log(image.value);
});
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
