<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="用户列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="Upload" plain @click="dialogVisible = true"> 新增地点 </el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef" @refresh="refresh" />
		<el-dialog :destroy-on-close="true" v-model="dialogVisible" title="新增地点" width="40%">
			<Adduser @change_dialog_visible="changeDialogvisible" compname="usermanagement" />
		</el-dialog>
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
// import { User } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "./components/ProTable.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { Delete, Upload } from "@element-plus/icons-vue";
import { placedeletePlace, placelistAll } from "@/api/modules/lnl-paly";
import Adduser from "./components/Adduser.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const proTable = ref();
const initParam = reactive({
	type: 1
});
const dataCallback = (data: any) => {
	return {
		list: data.list,
		total: data.total,
		pageNum: data.pageNum,
		pageSize: data.pageSize
	};
};
let dialogVisible = ref(false);
const getTableList = (params: any) => {
	let newParams = JSON.parse(JSON.stringify(params));
	newParams.username && (newParams.username = "custom-" + newParams.username);
	return placelistAll(params);
};
const changeDialogvisible = (value: any) => {
	dialogVisible.value = value;
};
// 表格配置项
const columns: ColumnProps[] = [
	{ type: "index", label: "#", width: 80 },
	{
		prop: "picture",
		label: "店铺图片",
		width: 100,
		render: scope => {
			return (
				<el-avatar
					size={50}
					shape={"square"}
					src={getIcon("https://48fb906.r5.cpolar.top/img/place/" + scope.row.picture)}
				></el-avatar>
			);
		}
	},
	{
		prop: "name",
		label: "店铺名称",
		search: { el: "input" },
		width: 250
	},
	{
		prop: "score",
		label: "评分",
		width: 70
	},
	{ prop: "phone", label: "联系方式", width: 170 },
	{
		prop: "position",
		label: "位置",
		width: 250
	},
	{ prop: "information", label: "简介" },
	{ prop: "operation", label: "操作", fixed: "right", width: 160 }
];
const refresh = () => {
	proTable.value.getdataback();
};
// 删除用户信息
const deleteAccount = async (params: any) => {
	ElMessageBox.confirm(`是否删除店铺：${params.name}?`, "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		draggable: true
	}).then(async () => {
		await placedeletePlace({ id: params.id });
		proTable.value.getdataback();
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});
	proTable.value.getdataback();
};
//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
// const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}) => {
// 	let params = {
// 		title,
// 		rowData: { ...rowData },
// 		isView: title === "查看",
// 		//编辑用户
// 		api: PutuserUserInfo,
// 		getTableList: proTable.value.getTableList,
// 		usernameOrigin: rowData.username
// 	};
// 	drawerRef.value.acceptParams(params);
// };
</script>
