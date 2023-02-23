<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="" prop="avatar">
				<div class="avatarimg">
					<el-avatar :size="120" :src="getIcon('https://48fb906.r5.cpolar.top/img/user/' +drawerProps.rowData!.img)"></el-avatar>
				</div>
			</el-form-item>
			<el-form-item label="用户姓名" prop="username">
				<el-input v-model="drawerProps.rowData!.username" placeholder="请填写用户姓名" clearable></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="password">
				<el-input type="password" v-model="drawerProps.rowData!.password" placeholder="请填写密码" clearable></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-select v-model="drawerProps.rowData!.sex" placeholder="请选择性别" clearable>
					<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="电话号码" prop="phone">
				<el-input v-model="drawerProps.rowData!.phone" placeholder="请填写电话号码" clearable></el-input>
			</el-form-item>
			<el-form-item label="用户权限" prop="roleId">
				<el-select v-model="drawerProps.rowData!.roleId" placeholder="请选择用户权限" clearable>
					<el-option v-for="item in roleType" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="简介" prop="description">
				<el-input v-model="drawerProps.rowData!.description" placeholder="请填写简介" clearable></el-input>
			</el-form-item>
			<el-form-item label="生日" prop="birthday">
				<el-date-picker v-model="drawerProps.rowData!.birthday" type="date" placeholder="Pick a date" style="width: 100%" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/serviceDict";
import { ElMessage, FormInstance } from "element-plus";

const emit = defineEmits(["refresh"]);

const roleType = [
	{ label: "管理员", value: 1 },
	{ label: "普通用户", value: 2 }
];

const rules = reactive({});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
	usernameOrigin: any;
}

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	usernameOrigin: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			const { id, description, birthday, password, username, roleId, sex, phone } = drawerProps.value.rowData;

			if (drawerProps.value!.usernameOrigin === username) {
				await drawerProps.value.api!({ id, description, birthday, password, roleId, sex, phone });
			} else {
				await drawerProps.value.api!({ id, description, birthday, password, username, roleId, sex, phone });
			}
			ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
			emit("refresh");
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

defineExpose({
	acceptParams
});
</script>
<style scoped lang="scss">
.avatarimg {
	transform: translate(50%);
}
</style>
