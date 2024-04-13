<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="用户列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
			:data="article"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<!-- <el-button type="primary" :icon="Upload" plain @click="dialogVisible = true"> 新增地点 </el-button> -->
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef" @refresh="refresh" />
		<el-dialog :destroy-on-close="true" v-model="dialogVisible" title="新增地点" width="40%">
			<Adduser @change_dialog_visible="changeDialogvisible" @refreshdata="getTableList2" compname="usermanagement" />
		</el-dialog>
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
// import { User } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "./components/ProTable.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { Delete } from "@element-plus/icons-vue";
import { placedeletePlace, placelistAll } from "@/api/modules/lnl-paly";
import Adduser from "./components/Adduser.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();
const article = globalStore.article;
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
const getTableList2 = () => {
	const positionParams = reactive({
		type1: 1,
		type2: 0,
		order: 1,
		name: undefined,
		city: "成都",
		page: 1,
		limit: 10
	});
	getTableList(positionParams);
};
const changeDialogvisible = (value: any) => {
	dialogVisible.value = value;
};
// 表格配置项
const columns: ColumnProps[] = [
	{
		prop: "title",
		label: "文章标题",
		width: 240
		// render: scope => {
		// 	return (
		// 		<el-avatar
		// 			size={50}
		// 			shape={"square"}
		// 			src={getIcon(" https://737a8db5.r1.cpolar.top/img/place/" + scope.row.picture)}
		// 		></el-avatar>
		// 	);
		// }
	},
	{
		prop: "username",
		label: "作者",
		search: { el: "input" },
		width: 100
	},
	{
		prop: "subject",
		label: "类型",
		search: { el: "input" },
		width: 100,
		render: scope => {
			return (
				<>
					<el-tag v-if={scope.row.subject === 0} type="warnig">
						表白
					</el-tag>
					<el-tag v-eles-if={scope.row.subject === 1} type="warnig">
						吐槽
					</el-tag>
					<el-tag v-eles-if={scope.row.subject === 2} type="success">
						知识
					</el-tag>
					<el-tag v-eles-if={scope.row.subject === 3} type="info">
						趣玩
					</el-tag>
					<el-tag v-eles-if={scope.row.subject === 4} type="primary">
						实习兼职
					</el-tag>
					<el-tag v-eles={scope.row.subject === 5} type="warnig">
						日常
					</el-tag>
				</>
			);
		}
	},
	{
		prop: "stars",
		label: "点赞量",
		width: 70
	},
	{
		prop: "time",
		label: "发布时间",
		width: 100
	},
	{ prop: "adress", label: "地址", width: 70 },
	{
		prop: "content",
		label: "内容",
		width: 250
	},
	{
		prop: "information",
		label: "文章图片",
		width: 250,
		render: scope => {
			return (
				<>
					<img style="width:100px;height:100;margin:0 10px" src={scope.row.photo[0]}></img>
					<img style="width:100px;height:100;" src={scope.row.photo[1]}></img>
				</>
			);
		}
	},
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
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
		await placedeletePlace({ id: params.id });
		proTable.value.getdataback();
	});
};
//处理图片
// const getIcon = (name: string) => {
// 	return new URL(name, import.meta.url).href;
// };
// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
</script>
