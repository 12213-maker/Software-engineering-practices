<template>
	<el-form ref="loginFormRef2" :rules="loginRules" :model="form" label-width="120px">
		<el-form-item prop="username" label="用户名">
			<el-input v-model="form.username" />
		</el-form-item>
		<el-form-item prop="password" label="密码">
			<el-input v-model="form.password" />
		</el-form-item>
		<el-form-item prop="phone" label="手机号">
			<el-input v-model="form.phone" />
		</el-form-item>
		<el-form-item label="出生日期">
			<el-col :span="11">
				<el-date-picker v-model="form.birthday" type="date" placeholder="Pick a date" style="width: 100%" />
			</el-col>
		</el-form-item>
		<el-form-item label="性别">
			<el-radio-group v-model="form.sex">
				<el-radio label="0">保密</el-radio>
				<el-radio label="1">男</el-radio>
				<el-radio label="2">女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="个性简介">
			<el-input v-model="form.description" type="textarea" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">Create</el-button>
			<el-button @click="chanagevisible">Cancel</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { register } from "@/api/modules/login";
import { ElNotification } from "element-plus";
import { getTimeState } from "@/utils/util";
import { reactive } from "vue";
const emits = defineEmits(["change_dialog_visible"]);

let form = reactive({
	username: "",
	password: "",
	sex: "",
	phone: "",
	birthday: new Date(),
	description: ""
});

//表单验证
let checkPhone = (rule: any, value: any, callback: any) => {
	let reg = /^1[345789]\d{9}$/;
	if (!reg.test(value)) {
		callback(new Error("请输入11位手机号"));
	} else {
		callback();
	}
};
const loginRules = reactive({
	username: [{ required: true, min: 1, max: 20, message: "请输入1-20位用户名", trigger: "blur" }],
	password: [{ required: true, min: 6, max: 16, message: "请输入6-16位密码", trigger: "blur" }],
	phone: [{ required: true, validator: checkPhone, message: "请输入正确的手机号", trigger: "blur" }]
});

const onSubmit = async () => {
	try {
		const { code } = await register({ ...form, sex: Number(form.sex) });
		if (Number(code) === 200) {
			ElNotification({
				title: getTimeState(),
				message: `用户${form.username}注册成功`,
				type: "success",
				duration: 3000
			});
		} else {
			ElNotification({
				title: getTimeState(),
				message: `用户名重复`,
				type: "warning",
				duration: 3000
			});
		}
	} catch (err) {
		ElNotification({
			title: getTimeState(),
			message: `用户名重复`,
			type: "warning",
			duration: 3000
		});
		console.log(err);
	} finally {
		chanagevisible();
		return;
	}
};

const chanagevisible = () => {
	emits("change_dialog_visible", false);
};
</script>
