<template>
	<el-form :model="form" label-width="120px">
		<el-form-item label="用户名">
			<el-input v-model="form.name" />
		</el-form-item>
		<el-form-item label="密码">
			<el-input v-model="form.password" />
		</el-form-item>
		<el-form-item label="手机号">
			<el-input v-model="form.region" />
		</el-form-item>
		<el-form-item label="出生日期">
			<el-col :span="11">
				<el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
			</el-col>
		</el-form-item>
		<el-form-item label="我感兴趣">
			<el-checkbox-group v-model="form.type">
				<el-checkbox label="美食" name="eat" />
				<el-checkbox label="美景" name="view" />
				<el-checkbox label="美玩" name="play" />
				<el-checkbox label="美睡" name="sleep" />
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="性别">
			<el-radio-group v-model="form.sex">
				<el-radio label="男" />
				<el-radio label="女" />
			</el-radio-group>
		</el-form-item>
		<el-form-item label="个性简介">
			<el-input v-model="form.desc" type="textarea" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">Create</el-button>
			<el-button @click="chanagevisible">Cancel</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from "vue";
const emits = defineEmits(["change_dialog_visible"]);

// do not use same name with ref
const form = reactive({
	name: "",
	password: "",
	region: "",
	date1: "",
	type: [],
	sex: "",
	desc: ""
});

const onSubmit = () => {
	console.log("submit!");
	console.log("showme", form);
};

const chanagevisible = () => {
	emits("change_dialog_visible", false);
};
</script>
