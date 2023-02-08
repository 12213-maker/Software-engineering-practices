<template>
	<div>
		<div class="outer">
			<div class="container">
				<el-carousel class="carousel">
					<el-carousel-item class="carouselItem" v-for="picture in dataValue.data.placePictures" :key="picture">
						<img :src="getIcon('http://3d254f0e.r5.cpolar.top/img/place/' + picture)" alt="" />
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
				<div class="comment" v-for="item in dataValue.commentData" :key="item.id">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.userImg">
							<img :src="getIcon('http://3d254f0e.r5.cpolar.top/img/user/' + item.userImg)" alt="" />
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
							:src="getIcon('http://3d254f0e.r5.cpolar.top/img/comment/' + picture)"
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
			</div>
		</div>
		<el-dialog align-center draggable v-model="dialogVisible" title="评论" width="30%">
			<el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
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

const dialogVisible = ref(false);
const textarea = ref("");
const route = useRoute();

const dataValue = reactive({
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
	commentData: [
		{
			comment: "",
			id: 0,
			likes: 0,
			myLike: false,
			pictures: [],
			pid: 0,
			score: 0,
			time: "",
			uid: 1,
			userImg: "",
			username: ""
		}
	]
});

const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
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
//申请展示接口数据
const apireturndata = async () => {
	const res = await placeDetails({ id: route.query.id });
	dataValue.data = res.data as any;
};
//申请评论数据
const getCommentValue = async () => {
	const params = {
		pid: 1,
		order: 1,
		page: 1,
		limit: 5
	};

	const res = await commentList(params);
	dataValue.commentData = (res.data as any).records;
	console.log(dataValue.commentData);
};
//用户点赞or取消点赞评论
const LikeAdd = async (flag: string, commentId: any) => {
	if (flag === "truntrue") {
		await likeAdd({ commentId });
		ElNotification({
			title: getTimeState(),
			message: "点赞成功",
			type: "success",
			duration: 3000
		});
	} else {
		await likesDelete({ commentId });
		ElNotification({
			title: getTimeState(),
			message: "取消点赞成功",
			type: "success",
			duration: 3000
		});
	}
	getCommentValue();
};
//评论
const giveAComment = (flag: any) => {
	if (flag) {
		console.log(textarea.value);
	}
	textarea.value = "";
	dialogVisible.value = false;
};
onMounted(() => {
	apireturndata();
	getCommentValue();
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
