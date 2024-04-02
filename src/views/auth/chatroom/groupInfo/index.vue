<template>
	<div>
		<!-- 群名称 -->
		<div style="height: 60px; background-color: #fcfcfc">
			<span style="line-height: 60px; margin-left: 20px; font-size: 18px">
				{{ props.groups[props.currentGroupId].groupName }}
			</span>
		</div>

		<!-- 群信息 -->
		<div style="background: #f3f3f3; height: calc(100% - 60px)">
			<!-- 群头像 -->
			<div class="myCenter" style="padding: 50px 0">
				<!-- <n-avatar object-fit="cover" :size="60" :src="props.groups[props.currentGroupId].avatar" /> -->
				<img object-fit="cover" :size="40" :src="props.groups[props.currentGroupId].avatar" style="width: 60px; height: 60px" />
			</div>

			<!-- 群信息 -->
			<div class="myCenter">
				<div style="width: 65%; font-size: 16px">
					<!-- 群名称 -->
					<div style="margin-bottom: 10px">
						<span class="friend-label"> 群名称 </span>
						<span style="margin: 0 5px 0 0">
							{{ props.groups[props.currentGroupId].groupName }}
						</span>
						<span
							@click="changeDataType(2)"
							v-if="props.groups[props.currentGroupId].masterFlag"
							style="display: inline-block; vertical-align: sub; cursor: pointer"
						>
							<svg viewBox="0 0 1024 1024" width="20" height="20">
								<path
									d="M929.909189 827.019236H93.990821c-16.598379 0-29.997071 13.398692-29.99707 29.997071s13.398692 29.997071 29.99707 29.997071h835.918368c16.598379 0 29.997071-13.398692 29.99707-29.997071 0-16.498389-13.398692-29.997071-29.99707-29.997071z"
									fill="#FF6600"
									opacity=".502"
								></path>
								<path
									d="M705.931061 198.080656c3.099697 0 8.999121 0.799922 14.098624 5.899424l28.297236 28.297237c5.099502 5.099502 5.899424 10.998926 5.899424 14.098623 0 3.099697-0.799922 8.999121-5.899424 14.098623L392.161703 616.739772l-86.991505 28.997168 27.597305-82.791915 358.964945-358.964945c5.099502-5.199492 11.098916-5.899424 14.198613-5.899424m0-59.994141c-20.497998 0-40.896006 7.799238-56.594473 23.397715L281.672493 529.148325l-0.699932-0.699931-70.693096 212.079289 212.079289-70.693097 0.699932 0.699932 367.664095-367.664095c31.196953-31.196953 31.196953-81.892003 0-113.088956l-28.297237-28.297237c-15.598477-15.598477-35.996485-23.397715-56.494483-23.397715z"
									fill="#FF6600"
								></path>
								<path
									d="M578.626494 230.803461L621.049351 188.381603l141.40619 141.406191-42.421857 42.421857z"
									fill="#FF6600"
								></path>
							</svg>
						</span>
					</div>

					<!-- 群公告 -->
					<div style="margin-bottom: 10px">
						<span class="friend-label"> 群公告 </span>
						<span style="margin: 0 5px 0 0">
							{{ props.groups[props.currentGroupId].notice }}
						</span>
						<span
							@click="changeDataType(3)"
							v-if="props.groups[props.currentGroupId].masterFlag"
							style="display: inline-block; vertical-align: sub; cursor: pointer"
						>
							<svg viewBox="0 0 1024 1024" width="20" height="20">
								<path
									d="M929.909189 827.019236H93.990821c-16.598379 0-29.997071 13.398692-29.99707 29.997071s13.398692 29.997071 29.99707 29.997071h835.918368c16.598379 0 29.997071-13.398692 29.99707-29.997071 0-16.498389-13.398692-29.997071-29.99707-29.997071z"
									fill="#FF6600"
									opacity=".502"
								></path>
								<path
									d="M705.931061 198.080656c3.099697 0 8.999121 0.799922 14.098624 5.899424l28.297236 28.297237c5.099502 5.099502 5.899424 10.998926 5.899424 14.098623 0 3.099697-0.799922 8.999121-5.899424 14.098623L392.161703 616.739772l-86.991505 28.997168 27.597305-82.791915 358.964945-358.964945c5.099502-5.199492 11.098916-5.899424 14.198613-5.899424m0-59.994141c-20.497998 0-40.896006 7.799238-56.594473 23.397715L281.672493 529.148325l-0.699932-0.699931-70.693096 212.079289 212.079289-70.693097 0.699932 0.699932 367.664095-367.664095c31.196953-31.196953 31.196953-81.892003 0-113.088956l-28.297237-28.297237c-15.598477-15.598477-35.996485-23.397715-56.494483-23.397715z"
									fill="#FF6600"
								></path>
								<path
									d="M578.626494 230.803461L621.049351 188.381603l141.40619 141.406191-42.421857 42.421857z"
									fill="#FF6600"
								></path>
							</svg>
						</span>
					</div>

					<!-- 群简介 -->
					<div style="margin-bottom: 40px">
						<span class="friend-label">群简介</span>
						<span style="margin: 0 5px 0 6px">
							{{ props.groups[props.currentGroupId].introduction }}
						</span>
						<span
							@click="changeDataType(4)"
							v-if="props.groups[props.currentGroupId].masterFlag"
							style="display: inline-block; vertical-align: sub; cursor: pointer"
						>
							<svg viewBox="0 0 1024 1024" width="20" height="20">
								<path
									d="M929.909189 827.019236H93.990821c-16.598379 0-29.997071 13.398692-29.99707 29.997071s13.398692 29.997071 29.99707 29.997071h835.918368c16.598379 0 29.997071-13.398692 29.99707-29.997071 0-16.498389-13.398692-29.997071-29.99707-29.997071z"
									fill="#FF6600"
									opacity=".502"
								></path>
								<path
									d="M705.931061 198.080656c3.099697 0 8.999121 0.799922 14.098624 5.899424l28.297236 28.297237c5.099502 5.099502 5.899424 10.998926 5.899424 14.098623 0 3.099697-0.799922 8.999121-5.899424 14.098623L392.161703 616.739772l-86.991505 28.997168 27.597305-82.791915 358.964945-358.964945c5.099502-5.199492 11.098916-5.899424 14.198613-5.899424m0-59.994141c-20.497998 0-40.896006 7.799238-56.594473 23.397715L281.672493 529.148325l-0.699932-0.699931-70.693096 212.079289 212.079289-70.693097 0.699932 0.699932 367.664095-367.664095c31.196953-31.196953 31.196953-81.892003 0-113.088956l-28.297237-28.297237c-15.598477-15.598477-35.996485-23.397715-56.494483-23.397715z"
									fill="#FF6600"
								></path>
								<path
									d="M578.626494 230.803461L621.049351 188.381603l141.40619 141.406191-42.421857 42.421857z"
									fill="#FF6600"
								></path>
							</svg>
						</span>
					</div>
				</div>
			</div>

			<!-- 群按钮 -->
			<div class="myCenter sendMsg">
				<el-button type="info" @click="sendGroupMessage()"> 发消息 </el-button>
				<template
					v-if="
						props.groups[props.currentGroupId].groupType === 1 ||
						(props.groups[props.currentGroupId].groupType === 2 && props.groups[props.currentGroupId].masterFlag)
					"
				>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<el-button type="primary" @click="groupSetting()"> 群设置 </el-button>
				</template>
			</div>
		</div>

		<!-- 群设置 -->
		<el-drawer class="group-card" v-model="data.activeGroupSet" :width="300" placement="right" to="#body-group">
			<el-card style="margin-bottom: 20px">
				<el-tabs model-value="群设置" justify-content="space-evenly" type="line">
					<!-- 群设置 -->
					<el-tab-pane name="群设置" tab="群设置" label="群设置">
						<div>
							<div class="myCenter" style="margin: 15px 0">
								<img
									object-fit="cover"
									@click="changeAvatar(2)"
									round
									class="group-avatar"
									style="width: 70px; height: 70px; border-radius: 50%"
									:src="props.groups[props.currentGroupId].avatar"
								/>
							</div>

							<div
								class="group-set"
								v-if="props.groups[props.currentGroupId].groupType === 1 && props.groups[props.currentGroupId].masterFlag"
							>
								<div>是否需要审核</div>
								<div>
									<el-switch
										@update:value="updateInType(props.currentGroupId, !props.groups[props.currentGroupId].inType)"
										v-model:value="props.groups[props.currentGroupId].inType"
									/>
								</div>
							</div>

							<div style="display: flex; justify-content: space-around; margin-top: 20px">
								<el-button
									type="warning"
									@click="exitGroup(props.currentGroupId)"
									v-if="props.groups[props.currentGroupId].groupType === 1"
								>
									退出群
								</el-button>

								<template v-if="props.groups[props.currentGroupId].masterFlag">
									<el-button type="error" @click="dissolveGroup(props.currentGroupId)"> 解散群 </el-button>
								</template>
							</div>
						</div>
					</el-tab-pane>

					<!-- 成员设置 -->
					<el-tab-pane name="群成员" tab="群成员" label="群成员" v-if="props.groups[props.currentGroupId].groupType === 1">
						<div class="group-user" v-for="(item, index) in data.groupUsers" :key="index">
							<div style="display: flex; align-items: center">
								<div>
									<img object-fit="cover" :size="40" :src="item.img" style="width: 40px; height: 40px" />
								</div>

								<div style="margin-left: 20px; font-size: 16px">
									{{ item.username }}
								</div>
							</div>
							<div style="display: flex; align-items: center">
								<div v-if="item.adminFlag" class="user-tag" style="background-color: orange">管理员</div>

								<div
									v-if="!item.adminFlag && props.groups[props.currentGroupId].adminFlag && item.userStatus === 1"
									class="user-tag"
									@click="changeGroupUserStatus(props.currentGroupId, item, 1, 2)"
									style="background-color: red; cursor: pointer"
								>
									禁言
								</div>

								<div
									v-if="!item.adminFlag && props.groups[props.currentGroupId].adminFlag && item.userStatus === 2"
									class="user-tag"
									@click="changeGroupUserStatus(props.currentGroupId, item, 2, 1)"
									style="background-color: blue; cursor: pointer"
								>
									解禁
								</div>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-drawer>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { reactive } from "vue";

let data = reactive({
	//群成员
	groupUsers: [],
	//组设置
	activeGroupSet: false
});
const props = withDefaults(
	defineProps<{
		groups: any;
		user: any;
		groupMessages: any;
		currentGroupId: any;
		exitGroup: any;
		dissolveGroup: any;
		changeDataType: any;
		sendGroupMessage: any;
		changeAvatar: any;
	}>(),
	{
		groups: [],
		user: [],
		groupMessages: [],
		currentGroupId: [],
		exitGroup: [],
		dissolveGroup: [],
		changeDataType: [],
		sendGroupMessage: [],
		changeAvatar: []
	}
);
const emit = defineEmits(["exitGroup", "dissolveGroup", "changeDataType", "sendGroupMessage", "changeAvatar"]);

function updateInType(currentGroupId, inType) {
	console.log(currentGroupId, inType);
	// $http
	// 	.post($constant.baseURL + "/imChatGroup/updateGroup", {
	// 		id: props.groups[currentGroupId].id,
	// 		inType: inType
	// 	})
	// 	.then(res => {
	// 		ElMessage({
	// 			message: "修改成功！",
	// 			type: "success"
	// 		});
	// 	})
	// 	.catch(error => {
	// 		ElMessage({
	// 			message: error.message,
	// 			type: "error"
	// 		});
	// 	});
}

function changeDataType(type) {
	emit("changeDataType", type);
}

function sendGroupMessage() {
	emit("sendGroupMessage");
}

function groupSetting() {
	data.activeGroupSet = true;
	if (props.groups[props.currentGroupId].groupType === 1) {
		getGroupUser(props.currentGroupId);
	}
}

function getGroupUser(groupId, current = 1, size = 9999) {
	console.log(current, size);
	const infolist = props.groupMessages[groupId].map(item => item.fromId);
	const records = [];
	props.user.forEach(item => {
		const { userinfo } = item;
		if (infolist.includes(userinfo.id)) {
			records.push(userinfo);
		}
	});
	data.groupUsers = records;
	// $http
	// 	.get($constant.baseURL + "/imChatGroupUser/getGroupUser", { groupId: groupId, current: current, size: size })
	// 	.then(res => {
	// 		if (!$common.isEmpty(res.data) && !$common.isEmpty(res.data.records)) {
	// 			data.groupUsers = res.data.records;
	// 		}
	// 	})
	// 	.catch(error => {
	// 		ElMessage({
	// 			message: error.message,
	// 			type: "error"
	// 		});
	// 	});
}

function exitGroup(currentGroupId) {
	emit("exitGroup", currentGroupId);
}

function dissolveGroup(currentGroupId) {
	emit("dissolveGroup", currentGroupId);
}

function changeGroupUserStatus(groupId, item, oldUserStatus, userStatus) {
	console.log(groupId, item, oldUserStatus, userStatus);
	// $http
	// 	.get($constant.baseURL + "/imChatGroupUser/changeUserStatus", {
	// 		groupId: groupId,
	// 		userId: item.userId,
	// 		oldUserStatus: oldUserStatus,
	// 		userStatus: userStatus
	// 	})
	// 	.then(res => {
	// 		item.userStatus = userStatus;
	// 		ElMessage({
	// 			message: "修改成功！",
	// 			type: "success"
	// 		});
	// 	})
	// 	.catch(error => {
	// 		ElMessage({
	// 			message: error.message,
	// 			type: "error"
	// 		});
	// 	});
}

function changeAvatar(type) {
	emit("changeAvatar", type);
}
console.log(changeAvatar, changeGroupUserStatus, dissolveGroup, exitGroup, updateInType);
</script>

<style scoped lang="scss">
.friend-label {
	color: #797979;
	margin-right: 30px;
}

.sendMsg .n-button {
	height: 35px;
	padding: 15px 25px;
}

.group-set {
	display: flex;
	justify-content: space-between;
	padding: 10px;
}

.group-set:first-child {
	font-size: 16px;
}

.user-tag {
	color: white;
	border-radius: 3px;
	font-size: 12px;
	padding: 0 6px;
	margin: 0 6px;
	height: 22px;
	line-height: 22px;
	letter-spacing: 2px;
}

.group-user {
	display: flex;
	padding: 10px;
	height: 60px;
	justify-content: space-between;
	box-sizing: border-box;
}

.group-avatar {
	cursor: pointer;
	transition: all 0.3s;
	user-select: none;
}

.group-avatar:hover {
	transform: rotate(360deg);
}
/* 居中 */
.myCenter {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
