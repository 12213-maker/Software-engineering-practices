<template>
	<div>
		<div class="outer">
			<div class="container">
				<el-carousel class="carousel">
					<el-carousel-item class="carouselItem" v-for="picture in dataValue.data.placePictures" :key="picture">
						<img :src="getIcon(' https://737a8db5.r1.cpolar.top/img/place/' + picture)" alt="" />
					</el-carousel-item>
				</el-carousel>
				<div class="describe">
					<el-descriptions class="margin-top" title="" :column="1" size="large" border>
						<template #extra>
							<div class="title">
								{{ dataValue.data.name }}
								<el-rate disabled allow-half v-model="dataValue.data.score" score-template="{value} points" />
								<span class="score">{{ dataValue.data.score + "分" }}</span>
							</div>
						</template>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<office-building />
									</el-icon>
									城市
								</div>
							</template>
							{{ dataValue.data.city }}
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<iphone />
									</el-icon>
									电话
								</div>
							</template>
							{{ dataValue.data.phone }}
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<location />
									</el-icon>
									地址
								</div>
							</template>
							{{ dataValue.data.position }}
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<office-building />
									</el-icon>
									介绍
								</div>
							</template>
							<el-tooltip popper-class="tool-tip" effect="dark" :content="dataValue.data.information" placement="top">
								<div class="information">
									{{ dataValue.data.information }}
								</div>
							</el-tooltip>
						</el-descriptions-item>
					</el-descriptions>
				</div>
			</div>
			<div class="bottom" v-if="dataValue.commentData.length !== 0">
				<div class="total">
					<div>
						<span style="padding-right: 50px">{{ `评论` }}</span>
						<span>最新 | 热评</span>
					</div>
					<el-button type="primary" round :icon="ChatLineRound" @click="dialogVisible = true">评论</el-button>
				</div>
				<div class="comment" v-infinite-scroll="load" v-for="item in dataValue.commentData" :key="item.id">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.userImg">
							<el-avatar :size="50" :src="getIcon(' https://737a8db5.r1.cpolar.top/img/user/' + item.userImg)" />
						</div>
						<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.username }}</span>
						<el-rate disabled allow-half v-model="item.score" score-template="{value} points" />
						<span class="score">{{ item.score }}分</span>
					</div>
					<div class="usercomment">
						{{ item.comment }}
					</div>
					<div class="imageOter" v-if="item.pictures.length !== 0">
						<img
							v-for="picture in item.pictures"
							class="image"
							:key="picture"
							:src="getIcon(' https://737a8db5.r1.cpolar.top/img/comment/' + picture)"
							alt=""
						/>
					</div>
					<div class="timecontaner">
						<span>{{ item.time }}</span>
						<div>
							<el-button round :icon="Star" @click="LikeAdd('truntrue', item.id)" v-if="!item.myLike">{{ item.likes }}</el-button>
							<el-button type="warning" round @click="LikeAdd('trunfalse', item.id)" v-else :icon="StarFilled">{{
								item.likes
							}}</el-button>
							<el-button type="danger" @click="jubao(item.id, item.uid)" round :icon="Warning">举报</el-button>
						</div>
					</div>
				</div>
				<el-divider v-if="infiniteValue.current < infiniteValue.pages"> 加载中 </el-divider>
				<!-- <el-divider v-if="infiniteValue.current >= infiniteValue.pages"> 没有更多了 </el-divider> -->
			</div>
			<div v-else class="bottom">
				<div class="total">
					<div>
						<span style="padding-right: 50px">{{ `评论` }}</span>
						<span>最新 | 热评</span>
					</div>
					<el-button type="primary" round :icon="ChatLineRound" @click="dialogVisible = true">评论</el-button>
				</div>
				<div class="comment shownothin">暂无评论</div>
			</div>
		</div>
		<el-dialog align-center draggable v-model="dialogVisible" title="评论" width="40%">
			<el-form ref="ruleFormRefsjpw" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
				<el-form-item label="点击评分" prop="score">
					<el-rate v-model="ruleForm.score" />
				</el-form-item>
				<el-form-item label="发送评论" prop="comment">
					<el-input v-model="ruleForm.comment" :rows="2" type="textarea" placeholder="Please input" />
				</el-form-item>
				<el-form-item label="发送图片" prop="fileList">
					<el-upload
						:auto-upload="false"
						:limit="1"
						:before-upload="beforeAvatarUpload"
						:on-change="change"
						list-type="picture-card"
					>
						<template #file="{ file }">
							<img :src="file.url" />
						</template>
						<el-icon><Plus /></el-icon>
					</el-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancelgiveAComment()">取消</el-button>
					<el-button type="primary" @click="giveAComment()"> 发送 </el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog align-center draggable v-model="jubaoDialog" title="填写举报信息" width="40%">
			<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
				<el-form-item label="详细描述" prop="checkPass">
					<el-input v-model="jubaoparams.description" :rows="2" type="textarea" placeholder="Please input" />
				</el-form-item>
				<el-form-item label="举报理由" prop="checkPass">
					<el-select v-model="jubaoparams.reason" class="m-2" placeholder="Select">
						<el-option v-for="item in jubaooptions" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancelgiveAComment2()">取消</el-button>
					<el-button type="primary" @click="giveAComment2()"> 发送 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { Star, StarFilled, Warning, ChatLineRound } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ElNotification, ElMessage } from "element-plus";
import { getTimeState } from "@/utils/util";
import { placeDetails, commentList, likeAdd, likesDelete, commentAdd, jubaoreport } from "@/api/modules/lnl-paly";
import type { UploadUserFile } from "element-plus";
import { GlobalStore } from "@/stores";
const dialogVisible = ref(false);
const route = useRoute();
const globalStore = GlobalStore();
const ruleForm = reactive<{
	score: number;
	comment: string;
	fileList: UploadUserFile[];
}>({
	score: 0,
	comment: "",
	fileList: []
});
const ruleFormRefsjpw = ref();
const givecommentFlag = ref(false);
const rules = reactive({
	score: [{ require: true, trigger: "blur" }],
	comment: [{ require: true, trigger: "blur" }],
	age: [{ require: true, trigger: "blur" }]
});

const jubaoDialog = ref(false);
const jubaoparams = reactive({
	uid: 0,
	commentId: 0,
	reason: 1,
	description: ""
});
const jubaooptions = reactive([
	{ label: "垃圾广告", value: 1 },
	{ label: "有害信息", value: 2 },
	{ label: "网络暴力", value: 3 },
	{ label: "人生攻击", value: 4 },
	{ label: "不实信息", value: 5 },
	{ label: "刷屏", value: 6 },
	{ label: "其它", value: 7 }
]);

//举报
const jubao = async (id: any, uid: any) => {
	if (uid === globalStore.userInformation.id) {
		ElMessage.warning("不可以自我举报！");
		return;
	}
	jubaoparams.commentId = id;
	jubaoDialog.value = true;
};
//取消举报
const cancelgiveAComment2 = () => {
	jubaoparams.reason = 1;
	jubaoparams.description = "";
	jubaoDialog.value = false;
};
//确认举报
const giveAComment2 = async () => {
	jubaoparams.uid = globalStore.userInformation.id;
	await jubaoreport(jubaoparams);
	ElMessage.success("举报成功");
	cancelgiveAComment2();
};

//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

//返回的数据
const dataValue = reactive<{ data: any; commentData: any }>({
	data: {
		id: 0,
		name: "",
		score: 0,
		position: "",
		phone: "",
		information: "",
		number: "",
		placePictures: [],
		city: ""
	},
	commentData: []
});
//申请展示接口数据
const apireturndata = async () => {
	const res = await placeDetails({ id: route.query.id });
	dataValue.data = res.data as any;
};

const params = {
	pid: route.query.id,
	order: 1,
	page: 1,
	limit: 3
};
//申请评论数据
const getCommentValue = async (params: any) => {
	const res = (await commentList(params)) as any;
	infiniteValue.current = res.data.current;
	infiniteValue.pages = res.data.pages;
	dataValue.commentData.push(...(res.data as any).records);
};

const infiniteValue = reactive({
	current: 0,
	pages: 1
});
//延迟标志器
let timer = ref();
//懒加载
const load = async () => {
	if (timer.value) {
		clearTimeout(timer.value);
	}
	timer.value = setTimeout(() => {
		loadmore();
	}, 1000);
};
//懒加载
const loadmore = async () => {
	if (infiniteValue.current < infiniteValue.pages) {
		params.page++;
		await getCommentValue(params);
	} else return;
};
//用户点赞or取消点赞评论
const LikeAdd = async (flag: string, commentId: any) => {
	if (flag === "truntrue") {
		dataValue.commentData.map((item: any) => {
			if (item.id === commentId) {
				item.myLike = true;
				item.likes++;
			}
			return item;
		});

		await likeAdd({ commentId });
		ElNotification({
			title: getTimeState(),
			message: "点赞成功",
			type: "success",
			duration: 3000
		});
	} else {
		dataValue.commentData.map((item: any) => {
			if (item.id === commentId) {
				item.myLike = false;
				item.likes--;
			}
			return item;
		});
		await likesDelete({ commentId });
		ElNotification({
			title: getTimeState(),
			message: "取消点赞成功",
			type: "success",
			duration: 3000
		});
	}
	getCommentValue(params);
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

//评论
const giveAComment = async () => {
	// const valid = await ruleFormRefsjpw.value.validate();

	const { score, comment } = ruleForm;
	if (score + "" == "" || comment == "") {
		return;
	}
	const { pid } = params;
	await commentAdd({ pid, score, comment, files: formdata.get("file") });
	dialogVisible.value = false;
	ruleForm.comment = "";
	ruleForm.score = 0;
	params.page = 1;
	const res = (await commentList(params)) as any;
	infiniteValue.current = res.data.current;
	infiniteValue.pages = res.data.pages;
	dataValue.commentData = (res.data as any).records;
	ElMessage.success("发送评论成功");
};

//取消评论
const cancelgiveAComment = () => {
	dialogVisible.value = false;
	ruleForm.comment = "";
	ruleForm.score = 0;
	givecommentFlag.value = false;
};
onMounted(() => {
	apireturndata();
	getCommentValue(params);
});
</script>

<style scoped lang="scss">
.outer {
	padding: 20px 130px;
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 300px;
		overflow: hidden;
		border-radius: 10px;
		.carousel {
			width: 44%;
			height: 100%;
			border-radius: 10px;
			.carouselItem {
				width: 100%;
				height: 100%;
				font-size: 16px;
				img {
					position: absolute;
					width: 100%;
					height: 100%;
				}
				.small {
					position: absolute;
					padding: 0 15px;
					padding-top: 10px;
					font-size: 17px;
					.titile {
						padding-bottom: 20px;
						font-size: 22px;
					}
				}
			}
		}
		.describe {
			width: 55%;
			height: 100%;
			overflow: hidden;
			border-radius: 10px;
			.margin-top {
				position: relative;
				height: 100%;
				background-color: rgb(245 247 250);
				border-radius: 10px;
				.title {
					position: relative;
					top: 5px;
					left: -29%;
					font-size: 22px;
					font-weight: 700;
				}
				.cell-item {
					width: 60px;
				}
				.information {
					width: 100%;
					height: 80px;
				}
			}
		}
	}
	.bottom {
		padding: 0 50px;
		margin-top: 40px;
		overflow: hidden;
		background-color: rgb(245 247 250);
		border-radius: 10px;
		box-shadow: 0 0 50px 0 #dbdbdb;
		.total {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20px;
			padding-top: 10px;
			font-size: 20px;
			line-height: 40px;
			color: #4f4f4f;
		}
		.shownothin {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 150px;
			font-size: 20px;
		}
		.comment {
			padding: 20px;
			padding-left: 120px;
			margin: 10px;
			color: #4f4f4f;
			background-color: white;
			border-radius: 10px;
			.avatar {
				position: relative;
				left: -60px;
				display: flex;
				align-items: center;
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
				padding-bottom: 10px;
				font-size: 17px;
				color: #4f4f4f;
			}
			.imageOter {
				display: flex;
				width: 100px;
				height: 100px;
				.image {
					width: 100%;
					margin: 0 3px;
				}
			}
			.timecontaner {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
}
</style>
<style>
.tool-tip {
	max-width: 350px;
}
</style>
