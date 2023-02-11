<template>
	<el-main v-loading="loading">
		<div class="profile-wrapper" v-loading="loading">
			<el-row :gutter="40">
				<el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
					<el-form ref="form" :model="FormValue.userinfo" :rules="rules" label-width="120px">
						<div class="center">个人中心</div>

						<!-- 个人资料 -->
						<div class="avatar">
							<el-upload action="https://d1fbc97.r7.cpolar.top/user/uploadImg" :on-success="changeAvatar" :headers="myHeaders">
								<el-avatar
									:size="80"
									:src="getIcon('https://d1fbc97.r7.cpolar.top/img/user/' + FormValue.userinfo.img)"
								></el-avatar>
							</el-upload>
						</div>
						<!-- <div class="avatar">
							<el-upload
								action="https://d1fbc97.r7.cpolar.top/user/uploadImg"
								:show-file-list="false"
								:on-success="handleUpImage"
								:before-upload="beforeImageUpload"
								list-type="picture"
								accept="image/*"
								:headers="myHeaders"
							>
								<el-avatar
									:size="80"
									:src="getIcon('https://d1fbc97.r7.cpolar.top/img/user/' + FormValue.userinfo.img)"
								></el-avatar>
							</el-upload>
						</div>
						<div class="avatar">
							<el-upload :on-change="change" :on-success="changeAvatar">
								<el-avatar
									:size="80"
									:src="getIcon('https://d1fbc97.r7.cpolar.top/img/user/' + FormValue.userinfo.img)"
								></el-avatar>
							</el-upload>
						</div> -->
						<el-form-item label="用户名" prop="username">
							<el-input v-model="FormValue.userinfo.username"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="FormValue.userinfo.password"></el-input>
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
				<el-col class="hidden-sm-and-down" :md="8" :lg="10" :xl="8">
					<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
						<el-tab-pane label="我的举报" name="first">
							<el-table :data="tableData" style="width: 100%">
								<el-table-column prop="time" label="Date" width="105" />
								<el-table-column prop="score" label="Score" width="130">
									<template #default="props">
										<el-rate size="small" v-model="props.row.score" disabled allow-half score-template="{value} points" />
									</template>
								</el-table-column>
								<el-table-column prop="comment" label="Description" />
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="我的留言" name="second">
							<el-table :data="tableData" style="width: 100%">
								<el-table-column prop="time" label="Date" width="105" />
								<el-table-column prop="score" label="Name" width="100" />
								<el-table-column prop="comment" label="Address" /> </el-table
						></el-tab-pane>
					</el-tabs>
					<div class="pagination"><el-pagination background layout="prev, pager, next" :total="50" /></div>
				</el-col>
			</el-row>
		</div>
	</el-main>
</template>

<script setup lang="ts" name="userinfo">
import { GlobalStore } from "@/stores";

// uploadImg
import { getuserinfo, putuserinfo, userPassword, report, message } from "@/api/modules/lnl-paly";
import type { TabsPaneContext } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

const globalStore = GlobalStore();
const tableData = [
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	},
	{
		time: "2016-05-03",
		score: 2,
		comment: "No. 189, Grove St, Los Angeles"
	}
];
const myHeaders = {
	"x-access-token": globalStore.token
};
const FormValue = reactive<{ userinfo: any }>({
	userinfo: {}
});
const activeName = ref("first");
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
	desc: ""
};
const rules = {
	userName: [
		{ required: true, message: "请输入用户名", trigger: "blur" },
		{
			min: 1,
			max: 7,
			message: "长度在 1 到 7 个字符",
			trigger: "blur"
		}
	]
};
//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
const handleClick = async (tab: TabsPaneContext, event: Event) => {
	if (tab.props.label === "我的举报") {
		const { data } = await report({});
		reportValue.data = (data as any).records;
		// console.log(reportValue.data);
	} else {
		const { data } = await message({});
		messageValue.data = (data as any).records;
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
		const { username, sex, phone, birthday, description, password } = FormValue.userinfo;
		// console.log({ username, sex, phone, birthday, description });
		await userPassword({ password });
		await putuserinfo({ username, sex, phone, birthday, description });
		await getuserInfo();
		ElMessage.success("修改成功");
	});
}
//修改用户头像
const changeAvatar = async () => {
	await getuserInfo();
	ElMessage.success("修改成功");
};
// const change = async (uploadFile: any) => {
// 	console.log(uploadFile.raw);
// 	await uploadImg({ file: uploadFile });
// };
// 重置
async function reset() {
	await getuserInfo();
	ElMessage.success("重置成功");
}
//获取用户信息
const getuserInfo = async () => {
	const { data } = await getuserinfo({});
	FormValue.userinfo = data;
};
onMounted(async () => {
	getuserInfo();
});
</script>

<style scoped lang="scss">
.profile-wrapper {
	padding: 10px 20px;
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
}
.el-main {
	height: 82vh;
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
