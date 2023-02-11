<template>
	<div>
		<div class="outer">
			<div class="container">
				<el-carousel class="carousel">
					<el-carousel-item class="carouselItem" v-for="picture in dataValue.data.placePictures" :key="picture">
						<img :src="getIcon('https://d1fbc97.r7.cpolar.top/img/place/' + picture)" alt="" />
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
							<div class="information">
								{{ dataValue.data.information }}
							</div>
						</el-descriptions-item>
					</el-descriptions>
				</div>
			</div>
			<div class="bottom">
				<div class="total">
					<div>
						<span style="padding-right: 50px">{{ `评论（${comment.length}）` }}</span>
						<span>最新 | 热评</span>
					</div>
					<el-button type="primary" round :icon="ChatLineRound" @click="dialogVisible = true">评论</el-button>
				</div>
				<div class="comment" v-infinite-scroll="load" v-for="item in dataValue.commentData" :key="item.id">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.userImg">
							<img :src="getIcon('https://d1fbc97.r7.cpolar.top/img/user/' + item.userImg)" alt="" />
						</div>
						<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.username }}</span>
						<el-rate disabled allow-half v-model="item.score" score-template="{value} points" />
						<span class="score">{{ item.score }}分</span>
					</div>
					<div class="usercomment">
						{{ item.comment }}
					</div>
					<div class="imageOter">
						<img
							v-for="picture in item.pictures"
							class="image"
							:key="picture"
							:src="getIcon('https://d1fbc97.r7.cpolar.top/img/comment/' + picture)"
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
							<el-button type="danger" round :icon="Warning">举报</el-button>
						</div>
					</div>
				</div>
				<el-divider v-if="infiniteValue.current < infiniteValue.pages"> 加载中 </el-divider>
				<el-divider v-if="infiniteValue.current >= infiniteValue.pages"> 没有更多了 </el-divider>
			</div>
		</div>
		<el-dialog align-center draggable v-model="dialogVisible" title="评论" width="40%">
			<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
				<el-form-item label="点击评分" prop="pass">
					<el-rate v-model="ruleForm.score" />
				</el-form-item>
				<el-form-item label="发送评论" prop="checkPass">
					<el-input v-model="ruleForm.inputvalue" :rows="2" type="textarea" placeholder="Please input" />
				</el-form-item>
				<el-form-item label="发送图片" prop="age">
					<el-upload
						v-model:file-list="ruleForm.fileList"
						action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
						list-type="picture-card"
						:on-remove="handleRemove"
					>
						<el-icon><Plus /></el-icon>
					</el-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="giveAComment(false)">取消</el-button>
					<el-button type="primary" @click="giveAComment(true)"> 发送 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { Star, StarFilled, Warning, ChatLineRound } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTimeState } from "@/utils/util";
import { placeDetails, commentList, likeAdd, likesDelete } from "@/api/modules/lnl-paly";
import type { UploadProps, UploadUserFile } from "element-plus";

const dialogVisible = ref(false);
const route = useRoute();

const ruleForm = reactive<{
	score: number;
	inputvalue: string;
	fileList: UploadUserFile[];
}>({
	score: 0,
	inputvalue: "",
	fileList: [
		{
			name: "food.jpeg",
			url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
		}
	]
});

const rules = reactive({
	score: [{ require: true, trigger: "blur" }],
	inputvalue: [{ require: true, trigger: "blur" }],
	age: [{ require: true, trigger: "blur" }]
});
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles);
};

const comment = reactive([
	{
		id: 2,
		pid: 1,
		uid: 2,
		score: 4,
		comment:
			"好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。v",
		time: "2023-02-04 11:29:26",
		likes: 225,
		username: "木子曰李",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: true
	},
	{
		id: 3,
		pid: 1,
		uid: 2,
		score: 4.5,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 4,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 5,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 6,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 7,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	}
]);

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
	pid: 1,
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
	// console.log(dataValue.commentData, "加载回来的数据");
	// console.log(infiniteValue);
};

const infiniteValue = reactive({
	current: 0,
	pages: 1
});
//懒加载
const load = async () => {
	if (infiniteValue.current < infiniteValue.pages) {
		console.log(infiniteValue, "我是懒加载");
		const params1 = {
			...params,
			page: infiniteValue.pages
		};
		await getCommentValue(params1);
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
//评论
const giveAComment = (flag: any) => {
	if (flag) {
		console.log(ruleForm.fileList);
	}
	ruleForm.inputvalue = "";
	ruleForm.score = 0;
	dialogVisible.value = false;
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
