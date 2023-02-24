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
			<template #tableHeader> </template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link @click="deleteAccount(scope.row)">处理</el-button>
				<el-button type="primary" link @click="deleteAccount2(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef" @refresh="refresh" />
		<el-dialog :destroy-on-close="true" v-model="dialogVisible" title="处理状态" width="40%">
			选择状态：<el-select v-model="value" class="m-2" placeholder="Select" size="large">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handlestatus"> 确定 </el-button>
				</span>
			</template></el-dialog
		>
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "./components/ProTable.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
// , messageadmin
import { messageadminget, messageadmin, putmessageadmin } from "@/api/modules/lnl-paly";
import { ElMessage, ElMessageBox } from "element-plus";

const id = ref(null);
const value = ref(null);
const options = [
	{
		value: "1",
		label: "未读"
	},
	{
		value: "2",
		label: "处理中"
	},
	{
		value: "3",
		label: "已完成"
	}
];
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
	return messageadminget(params);
};
// 表格配置项
const columns: ColumnProps[] = [
	{
		prop: "status",
		label: "状态",
		width: 200,
		search: { el: "input" },
		render: scope => {
			return handleReason(scope.row);
		}
	},
	{
		prop: "time",
		label: "时间",
		width: 300
	},
	{ prop: "content", label: "留言信息" },
	{ prop: "operation", label: "操作", fixed: "right", width: 200 }
];
const refresh = () => {
	proTable.value.getdataback();
};
const handlestatus = async () => {
	if (!value.value) {
		ElMessage({
			type: "warning",
			message: `请选择!`
		});
	}
	await putmessageadmin({ status: value.value, id: id.value });
	proTable.value.getdataback();
	dialogVisible.value = false;
	value.value = null;
	id.value = null;
};
// 处理用户信息
const deleteAccount = async (params: any) => {
	dialogVisible.value = true;
	id.value = params.id;
};
//删除用户信息
const deleteAccount2 = async (params: any) => {
	ElMessageBox.confirm(
		`是否删除留言：${params.content}?
	`,
		"温馨提示",
		{
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
			draggable: true
		}
	).then(async () => {
		await messageadmin({ id: params.id });
		proTable.value.getdataback();
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});
};
//处理用户信息
const handleReason = (scope: any) => {
	switch (scope.status) {
		case 1:
			return <el-tag>未读</el-tag>;
		case 3:
			return <el-tag type="success">已完成</el-tag>;
		case 2:
			return <el-tag type="warning">处理中</el-tag>;
	}
	return "暂未选择";
};
const drawerRef = ref();
</script>
