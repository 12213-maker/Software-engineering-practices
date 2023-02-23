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
				<el-button type="primary" :icon="Upload" plain @click="dialogVisible = true"> 添加用户 </el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<UserDrawer ref="drawerRef" @refresh="refresh" />
		<el-dialog :destroy-on-close="true" v-model="dialogVisible" title="新增用户" width="40%">
			<Adduser @change_dialog_visible="changeDialogvisible" compname="usermanagement" />
		</el-dialog>
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { User } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { Delete, EditPen, Upload, View, Refresh } from "@element-plus/icons-vue";
import { userUserInfo, PutuserUserInfo, DeleteuserUserInfo, PutResetPassword } from "@/api/modules/lnl-paly";
import Adduser from "./components/Adduser.vue";
import { ElMessage, ElMessageBox } from "element-plus";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
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

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
	let newParams = JSON.parse(JSON.stringify(params));
	newParams.username && (newParams.username = "custom-" + newParams.username);
	return userUserInfo(params);
};
const changeDialogvisible = (value: any) => {
	dialogVisible.value = value;
};

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "index", label: "#", width: 80 },
	{
		prop: "img",
		label: "用户图片",
		render: scope => {
			return (
				<el-avatar
					size={50}
					shape={"square"}
					src={getIcon("https://48fb906.r5.cpolar.top/img/user/" + scope.row.img)}
				></el-avatar>
			);
		}
	},
	{
		prop: "username",
		label: "用户姓名",
		search: { el: "input" },
		render: scope => {
			return (
				<el-button type="primary" link>
					{scope.row.username}
				</el-button>
			);
		}
	},
	{
		prop: "sex",
		label: "性别",
		render: scope => {
			let flag = scope.row.sex;
			if (flag === 0) {
				return "保密";
			} else if (flag === 1) {
				return "男";
			} else {
				return "女";
			}
		}
	},
	{ prop: "phone", label: "电话号码" },
	{
		prop: "password",
		label: "密码",
		render: () => {
			return "******";
		}
	},
	{ prop: "description", label: "简介", width: 150 },
	{
		prop: "roleId",
		label: "用户权限",
		fieldNames: { label: "userLabel", value: "userStatus" },
		render: scope => {
			const type = scope.row.roleId ? "success" : "warning";
			return <el-tag type={type}>{scope.row.roleId === 2 ? "普通用户" : "管理员"}</el-tag>;
		}
	},
	{
		prop: "birthday",
		label: "生日",
		width: 180
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 330 }
];
const refresh = () => {
	proTable.value.getdataback();
};

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	ElMessageBox.confirm(`是否删除用户${params.username}?`, "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		draggable: true
	}).then(async () => {
		await DeleteuserUserInfo({ id: params.id });
		proTable.value.getdataback();
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});

	console.log(params);
	// await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
	proTable.value.getdataback();
};

//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	ElMessageBox.confirm(`是否重置用户${params.username}的密码?`, "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		draggable: true
	}).then(async () => {
		await PutResetPassword({ id: params.id });
		proTable.value.getdataback();
		ElMessage({
			type: "success",
			message: `重置密码成功!`
		});
	});
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}) => {
	let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		//编辑用户
		api: PutuserUserInfo,
		getTableList: proTable.value.getTableList,
		usernameOrigin: rowData.username
	};
	drawerRef.value.acceptParams(params);
};
</script>
