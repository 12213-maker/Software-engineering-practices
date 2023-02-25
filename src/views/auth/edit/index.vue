<template>
	<div class="left">
		<div class="leftinner" :style="{ height: item.data.img ? '' : '51vh' }">
			<div class="comment">
				<div class="avatar">
					<div class="avatarimage1" v-if="item.data.userImg || item.data.img">
						<el-avatar
							:size="50"
							:src="getIcon(' http://127.0.0.1:8080/img/user/' + `${isSelfPage ? item.data.userImg : item.data.img}`)"
						></el-avatar>
					</div>
					<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
					<span class="username">{{ item.data.username }}</span>
					<div v-if="isSelfPage" class="ipschool">
						<el-tag size="large" round v-if="item.data.subject === 1" class="ml-2" type="warning">校内美食推荐</el-tag>
						<el-tag size="large" round v-else-if="item.data.subject === 4" class="ml-2" type="danger">周末游线路推荐</el-tag>
						<el-tag size="large" round v-else-if="item.data.subject === 2" class="ml-2">校园周边地点推荐</el-tag>
						<el-tag size="large" round class="ml-2" type="success" v-else>一日游线路推荐</el-tag>
					</div>
				</div>

				<div class="usercomment">
					<el-input v-if="!isSelfPage" v-model="textarea" :rows="7" type="textarea" placeholder="Please input" />
					<div v-else class="usercommentsize">
						{{ item.data.content }}
					</div>
				</div>

				<div v-if="!isSelfPage" class="imageOter uploadone">
					<!-- 上传图片 -->
					<div>
						<el-upload
							list-type="picture-card"
							:before-upload="beforeAvatarUpload"
							:on-change="change"
							:auto-upload="false"
							:limit="1"
						>
							<el-icon><Plus /></el-icon>

							<template #file="{ file }">
								<div>
									<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
								</div>
							</template>
						</el-upload>
					</div>

					<!-- 选择tag -->
					<el-select class="selecttag" v-model="value" placeholder="Select">
						<el-option v-for="(item2, index) in options" :key="item2.value" :label="item2.label" :value="item2.value">
							<el-tag size="large" round v-if="index + 1 === 1" class="ml-2" type="warning">{{ item2.label }}</el-tag>
							<el-tag size="large" round v-else-if="index + 1 === 4" class="ml-2" type="danger">{{ item2.label }}</el-tag>
							<el-tag size="large" round v-else-if="index + 1 === 2" class="ml-2">{{ item2.label }}</el-tag>
							<el-tag size="large" round class="ml-2" type="success" v-else>{{ item2.label }}</el-tag>
						</el-option>
					</el-select>
					<el-select class="ipschool" v-model="value2" placeholder="Select">
						<el-option v-for="item3 in options2" :key="item3.value" :label="item3.label" :value="item3.value" />
					</el-select>
				</div>

				<div class="imageOter showimg" v-else>
					<img
						class="image"
						v-if="item.data.img"
						:src="getIcon(' http://127.0.0.1:8080/img/community/' + item.data.img)"
						alt=""
					/>
				</div>

				<div class="timecontanerall" :style="{ position: item.data.img ? '' : 'relative', top: '-200px' }" v-if="isSelfPage">
					<div class="timecontaner">
						<span class="time">{{ item.data.time }}</span>
					</div>
					<div v-if="id === item.data.uid">
						<el-button :icon="Delete" type="primary" @click="deletedongati(item.data.id)">删除</el-button>
					</div>
				</div>
				<div v-else class="btns">
					<el-button :icon="Delete" type="primary" @click="emit('returnback')">取消</el-button>
					<el-button :icon="Position" type="primary" @click="inputstatus">发布</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { reactive, ref } from "vue";
import { GlobalStore } from "@/stores";
import { Delete, Position } from "@element-plus/icons-vue";
import { deletecommunity, postcommunity } from "@/api/modules/lnl-paly";
import { ElMessage, ElMessageBox } from "element-plus";

const globalStore = GlobalStore();
const userInformation = globalStore.userInformation;
const id = userInformation.id;

const emit = defineEmits(["returnback", "refreshpage"]);

//第一个定义类型，第二个默认值
const props = withDefaults(defineProps<{ changeParams: any }>(), {
	changeParams: {}
});
//isSelfPage 标识从发布动态转过来以及可以编辑动态
const isSelfPage = Object.keys(props.changeParams).length;
console.log(isSelfPage);
const textarea = ref("");

const value = ref(1);
const options = [
	{
		value: 1,
		label: "校内美食推荐"
	},
	{
		value: 2,
		label: "校园周边地点推荐"
	},
	{
		value: 3,
		label: "一日游线路推荐"
	},
	{
		value: 4,
		label: "周末游线路推荐"
	}
];
const value2 = ref(1);
const options2 = [
	{
		value: 1,
		label: "西南石油大学（成都校区）"
	},
	{
		value: 2,
		label: "成都理工大学"
	}
];

type DataType = {
	userImg: string;
	username: string;
	subject: number;
	content: string;
	img: string;
	time: string;
	uid: number;
	id: number;
};
let item = reactive<{ data: DataType }>({
	data: {
		userImg: "",
		username: "",
		subject: 1,
		content: "",
		img: "",
		time: "",
		uid: 0,
		id: 0
	}
});
if (isSelfPage) {
	Object.assign(item.data, props.changeParams);
	console.log("我是item数据");
} else {
	Object.assign(item.data, userInformation);
	console.log("我是发布动态数据", item.data);
}

//删除动态
const deletedongati = async (value: any) => {
	ElMessageBox.confirm(`是否删除此条动态?`, "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		draggable: true
	}).then(async () => {
		await deletecommunity({ id: value });
		emit("returnback");
		emit("refreshpage");
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});
};
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

const imageUrl = reactive<Array<any>>([]);
const beforeAvatarUpload = (file: any) => {
	// 使图片显示
	imageUrl.push(URL.createObjectURL(file));
	console.log(imageUrl);
	return false;
};
let formdata = new FormData();
const change = async (uploadFile: any) => {
	formdata.append("file", uploadFile.raw);
};
//发送动态
const inputstatus = async () => {
	if (textarea.value === "") {
		ElMessage({
			type: "warning",
			message: `请输入!`
		});
	}
	const params = {
		content: textarea.value,
		subject: value.value,
		file: formdata.get("file"),
		school: value2.value
	};
	await postcommunity(params);
	ElMessage({
		type: "success",
		message: `发布成功!`
	});
	emit("returnback");
};
</script>

<style scoped lang="scss">
.left {
	width: 50%;
	height: 84vh;
	margin-right: 20px;
	visibility: hidden;
	background-color: pink;
	border-radius: 10px;
	transform: translate(22%);
	.leftinner {
		width: 100%;
		height: 80vh;
		overflow: hidden;
		visibility: visible;
		background-color: white;
		border-radius: 10px;
		opacity: 0.98;
		.comment {
			display: flex;
			flex-direction: column;
			padding: 20px;
			padding-left: 120px;
			margin-bottom: 20px;
			color: #4f4f4f;
			background-color: white;
			border-radius: 10px;
			.avatar {
				position: relative;
				left: -60px;
				display: flex;
				align-items: center;
				padding-bottom: 15px;
				.ipschool {
					position: absolute;
					right: -60px;
					display: flex;
					align-items: center;
				}
				.avatarimage1 {
					width: 50px;
					height: 50px;
					margin-right: 10px;
					overflow: hidden;
					border-radius: 50%;
					img {
						width: 100%;
					}
				}
				.avatarimage {
					overflow: hidden;
				}
				.username {
					margin-right: 20px;
					font-size: 18px;
				}
				.score {
					color: #f56c6c;
				}
			}
			.usercomment {
				padding-bottom: 15px;
				font-size: 17px;
				color: #4f4f4f;
				.usercommentsize {
					font-size: 20px;
				}
			}
			.imageOter {
				display: flex;
				width: 100px;
				height: 100px;
				.image {
					width: 100%;
					margin: 0 3px;
				}
				.selecttag {
					position: absolute;
					left: 290px;
					display: flex;
					align-items: center;
				}
				.ipschool {
					position: absolute;
					left: 530px;
					display: flex;
					align-items: center;
				}
			}
			.uploadone {
				padding-top: 30px;
			}
			.showimg {
				width: 300px;
				height: 300px;
			}
			.timecontanerall {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100px;
				.timecontaner {
					display: flex;
					align-items: center;
					.time {
						display: block;
						margin-top: 5px;
						margin-right: 30px;
					}
				}
			}
			.btns {
				position: absolute;
				bottom: 165px;
				left: 575px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100px;
				height: 100px;
			}
		}
	}
}
</style>
