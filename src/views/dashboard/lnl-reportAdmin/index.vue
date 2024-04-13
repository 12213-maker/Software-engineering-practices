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
				<!-- <el-button type="primary" link @click="deleteAccount(scope.row)">处理</el-button> -->
				<el-button type="primary" link @click="handelclickchuli(scope.row)">处理</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef" @refresh="refresh" />
		<el-dialog :destroy-on-close="true" v-model="dialogVisible" title="处理评论" width="40%">
			<div>举报评论：{{ dialogInfo.comment }}</div>
			<div>举报原因：{{ dialogInfo.reason }}</div>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handelclickchuli2(0)">改为已处理</el-button>
					<el-button type="primary" @click="handelclickchuli2(1)"> 删除该举报信息 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "./components/ProTable.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { reportadminget, reportadminhandle } from "@/api/modules/lnl-paly";
import { ElMessage } from "element-plus";

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
	return reportadminget(params);
};
// 表格配置项
const columns: ColumnProps[] = [
	{
		prop: "status",
		label: "状态",
		width: 100,
		search: { el: "input" },
		render: scope => {
			const type = scope.row.status === 1 ? "success" : "warning";
			return <el-tag type={type}>{scope.row.status === 0 ? "未处理" : "已处理"}</el-tag>;
		}
	},
	{
		prop: "comment",
		label: "评论"
	},
	{
		prop: "time",
		label: "举报时间",
		width: 200
	},

	{
		prop: "comment.reason",
		label: "举报原因",
		width: 200,
		render: scope => {
			return handleReason(scope.row);
		}
	},
	{ prop: "reason", label: "详细理由" },
	{ prop: "operation", label: "操作", fixed: "right", width: 160 }
];
const refresh = () => {
	proTable.value.getdataback();
};

//处理用户信息
const handleReason = (scope: any) => {
	switch (scope.type) {
		case 1:
			return <el-tag>垃圾广告</el-tag>;
		case 2:
			return <el-tag type="success">有害信息</el-tag>;
		case 3:
			return <el-tag type="info">网络暴力</el-tag>;
		case 4:
			return <el-tag type="warning">人生攻击</el-tag>;
		case 5:
			return <el-tag type="danger">不实信息</el-tag>;
		case 6:
			return <el-tag type="info">刷屏</el-tag>;
		case 7:
			return <el-tag type="success">其它</el-tag>;
	}
	return "暂未选择";
};
const dialogInfo = ref();
const handelclickchuli = (value: any) => {
	if (value.status === 1) {
		ElMessage({
			type: "warning",
			message: `已处理!`
		});
		return;
	}
	dialogVisible.value = true;
	dialogInfo.value = value;
};
const handelclickchuli2 = async (value: any) => {
	//点击删除
	if (value) {
		await reportadminhandle({ id: dialogInfo.value.id, status: 1 });
		proTable.value.getdataback();
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	}
	//点击已处理
	else {
		// await reportadminhandle({ id: dialogInfo.value.id, status: 2 });
		proTable.value.getdataback();
		ElMessage({
			type: "success",
			message: `已处理!`
		});
	}
	dialogVisible.value = false;
};
const drawerRef = ref();
</script>
