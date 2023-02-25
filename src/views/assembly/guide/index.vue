<template>
	<el-main v-loading="loading">
		<div class="profile-wrapper" v-loading="loading">
			<el-row :gutter="40">
				<el-col :xs="24" :sm="24" :md="14" :lg="12" :xl="14">
					<el-form ref="form" :model="FormValue.userinfo" :rules="rules" label-width="120px">
						<!-- 头像 -->
						<div class="avatar">
							<el-upload :on-change="change" :before-upload="beforeAvatarUpload" :show-file-list="false">
								<el-avatar v-if="imageUrl" :size="80" :src="getIcon(' http://127.0.0.1:8080/img/user/' + imageUrl)"></el-avatar>
								<el-avatar
									v-else
									:size="80"
									:src="getIcon(' http://127.0.0.1:8080/img/user/' + FormValue.userinfo.img)"
								></el-avatar>
							</el-upload>
						</div>

						<el-form-item label="用户名" prop="username">
							<el-input v-model="FormValue.userinfo.username"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="FormValue.userinfo.password"></el-input>
						</el-form-item>
						<el-form-item label="生日" prop="birthday">
							<el-date-picker v-model="FormValue.userinfo.birthday" type="date" placeholder="Pick a date" style="width: 100%" />
						</el-form-item>
						<el-form-item label="电话" prop="phone">
							<el-input v-model="FormValue.userinfo.phone"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="FormValue.userinfo.sex">
								<el-radio :label="0">保密</el-radio>
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="权限" prop="roleId">
							<el-radio-group v-model="FormValue.userinfo.roleId" disabled>
								<el-radio :label="1">管理员</el-radio>
								<el-radio :label="2">普通用户</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item class="position" label="学校" prop="school"
							><el-select v-model="value" class="m-2">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>

						<!-- 详细介绍部分  可删 -->
						<el-divider content-position="center">详细介绍</el-divider>
						<el-form-item label="简介" prop="description">
							<el-input type="textarea" v-model="FormValue.userinfo.description" maxlength="100" show-word-limit></el-input>
						</el-form-item>
						<!-- 保存重置按钮 -->
						<el-form-item>
							<el-button type="primary" @click.stop="save">修改</el-button>
							<el-button @click.stop="reset">重置</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col class="hidden-sm-and-down" :md="8" :lg="12" :xl="8">
					<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
						<el-tab-pane label="我的举报" name="first">
							<el-table :data="reportValue.data" style="width: 100%" height="484" stripe>
								<el-table-column prop="time" label="时间" width="165" />
								<el-table-column prop="reason" label="举报原因" width="95">
									<template #default="props">
										<el-tag v-if="props.row.reason === 1">垃圾广告</el-tag>
										<el-tag v-else-if="props.row.reason === 2" type="success">有害信息</el-tag>
										<el-tag v-else-if="props.row.reason === 3" type="info">网络暴力</el-tag>
										<el-tag v-else-if="props.row.reason === 4" type="warning">人生攻击</el-tag>
										<el-tag v-else-if="props.row.reason === 5" type="danger">不实信息</el-tag>
										<el-tag v-else-if="props.row.reason === 6" type="info">刷屏</el-tag>
										<el-tag v-else type="success">其它</el-tag>
									</template>
								</el-table-column>

								<el-table-column prop="description" label="详细理由" />
								<el-table-column prop="status" label="状态" width="90">
									<template #default="props">
										<el-tag v-if="props.row.status === 1" type="warning">未处理</el-tag>
										<el-tag v-else type="success">已处理</el-tag>
									</template>
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="我的留言" name="second">
							<el-table :data="messageValue.data" stripe style="width: 100%" height="484">
								<el-table-column type="index" width="50" />
								<el-table-column prop="time" label="时间" width="165" />
								<el-table-column prop="content" label="留言信息" />
							</el-table>
							<el-button
								type="primary"
								:style="{
									marginTop: '12px'
								}"
								@click="givemessage = true"
								>提交留言</el-button
							>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>
			<el-dialog center width="30%" v-model="givemessage" title="提交留言">
				<el-input placeholder="请留言" v-model="giveinput"></el-input>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="givemessage = false">取消</el-button>
						<el-button type="primary" @click="clickgivemymessage"> 确认 </el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</el-main>
</template>

<script setup lang="ts" name="userinfo">
import { GlobalStore } from "@/stores";
import { getuserinfo, putuserinfo, userPassword, report, message, uploadImg, giveMyMessage } from "@/api/modules/lnl-paly";
import type { TabsPaneContext } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

const globalStore = GlobalStore();
const imageUrl = ref("");

const FormValue = reactive<{ userinfo: any }>({
	userinfo: {}
});
const activeName = ref("first");
let givemessage = ref(false);
let giveinput = ref("");
FormValue.userinfo = globalStore.userInformation;
const reportValue = reactive({
	data: []
});
const messageValue = reactive({
	data: {}
});
const loading = false;
const form = {
	phone: "",
	userName: "",
	userId: "",
	cityId: "",
	cityName: "",
	role: null,
	desc: "",
	school: ""
};
const value = ref();
const options = [
	{
		value: 1,
		label: "西南石油大学（成都校区）"
	},
	{
		value: 2,
		label: "成都理工大学"
	}
];
const clickgivemymessage = async () => {
	let d = new Date();
	let str =
		d.getFullYear() +
		"-" +
		(d.getMonth() + 1 >= 10 ? +(d.getMonth() + 1) : "0" + (d.getMonth() + 1)) +
		"-" +
		(d.getDate() >= 10 ? d.getDate() : "0" + d.getDate()) +
		" " +
		(d.getHours() >= 10 ? d.getHours() : "0" + d.getHours()) +
		":" +
		(d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes()) +
		":" +
		(d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds());
	giveMyMessage({ uid: FormValue.userinfo.id, content: giveinput.value, time: str });
	const { data } = await message({});
	messageValue.data = data as any;
	givemessage.value = false;
	ElMessage.success("留言成功");
};
//表单验证
let checkPhone = (rule: any, value: any, callback: any) => {
	let reg = /^1[345789]\d{9}$/;
	if (!reg.test(value)) {
		callback(new Error("请输入11位手机号"));
	} else {
		callback();
	}
};
const rules = {
	username: [{ min: 1, max: 20, message: "请输入1-20位用户名", trigger: "blur" }],
	password: [{ min: 6, max: 16, message: "请输入6-16位密码", trigger: "blur" }],
	phone: [{ validator: checkPhone, message: "请输入正确的手机号", trigger: "blur" }]
};
//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
const handleClick = async (tab: TabsPaneContext, event: Event) => {
	if (tab.props.label === "我的举报") {
		// const { data } = await report({});
		// reportValue.data = (data as any).records;
		console.log(reportValue.data);
	} else {
		// const { data } = await message({});
		// messageValue.data = (data as any).records;
		// console.log(messageValue.data);
	}
	console.log(tab.props.label, event);
};
function save() {
	ElMessageBox.confirm("您是否确认修改信息?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(async () => {
		const { username: usernameorigin } = globalStore.userInformation;
		const { username, sex, phone, birthday, description, password } = FormValue.userinfo;
		await userPassword({ password });
		if (username != usernameorigin) {
			await putuserinfo({ username, sex, phone, birthday, description, school: value.value });
		} else {
			await putuserinfo({ sex, phone, birthday, description, school: value.value });
		}
		ElMessage.success("修改成功");
		await getuserInfo();
		const { data } = await getuserinfo({});
		globalStore.setUserInformation(data);
	});
}

//上传头像
const change = async (uploadFile: any) => {
	let formdata = new FormData();
	formdata.append("file", uploadFile.raw);
	await uploadImg(formdata);
	await getuserInfo();
};
const beforeAvatarUpload = (file: any) => {
	if (file.type !== "image/jpeg") {
		ElMessage.error("上传只能是png,jpg,jpeg格式!");
		return false;
	} else if (file.size / 1024 / 1024 > 1) {
		ElMessage.error("上传图片大小不能超过1M!");
		return false;
	}

	// 使图片显示
	imageUrl.value = URL.createObjectURL(file);
	sessionStorage.setItem("sessionImg", imageUrl.value);
	globalStore.setImage(imageUrl.value);
	return false;
};
// 重置
async function reset() {
	await getuserInfo();
	ElMessage.success("重置成功");
}
//获取用户信息
const getuserInfo = async () => {
	const { data } = await getuserinfo({});
	FormValue.userinfo = data;
	value.value = FormValue.userinfo.school;
};

onMounted(async () => {
	getuserInfo();
	const { data } = await message({});
	messageValue.data = data as any;
	const { data: data1 } = await report({});
	reportValue.data = data1 as any;
});
</script>

<style scoped lang="scss">
.profile-wrapper {
	.el-divider--horizontal {
		margin: 50px 0;
	}
	.avatar {
		display: flex;
		justify-content: center;
		margin-bottom: 10px;
		overflow: hidden;
	}
	.tabPane {
		display: flex;
		width: 30vw;
		height: 70vh;
		padding: 10px;
		background-color: pink;
		.div {
			width: 100%;
			background-color: aqua;
		}
	}
	.pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	.position {
		position: absolute;
		top: 340px;
		left: 300px;
	}
}
.el-main {
	height: 84vh;
	line-height: 0%;
	color: #333333;
	background-color: white;
}
.center {
	margin-bottom: 10px;
	font-size: 20px;
	color: #333333;
}
</style>
