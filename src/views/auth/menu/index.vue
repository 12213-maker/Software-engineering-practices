<template>
	<div class="content-box">
		<div class="backgroundtrue"></div>
		<!-- 主体 -->
		<div class="body">
			<div class="left">
				<div class="comment" v-infinite-scroll="load" v-for="item in showData.data" :key="item.img">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.userImg">
							<img :src="getIcon('https://1573395f.r7.cpolar.top/img/user/' + item.userImg)" alt="" />
						</div>
						<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.username }}</span>
					</div>
					<div class="usercomment">
						{{ item.content }}
					</div>
					<div class="imageOter" v-if="item.img">
						<!-- <img
							v-for="picture in item.img"
							class="image"
							:key="picture"
							:src="getIcon('https://1573395f.r7.cpolar.top/img/community/' + picture)"
							alt=""
						/> -->
						<img
							class="image"
							v-if="item.img"
							:src="getIcon('https://1573395f.r7.cpolar.top/img/community/' + item.img)"
							alt=""
						/>
					</div>
					<div class="timecontaner">
						<span>{{ item.time }}</span>
						<el-tag size="large" round v-if="item.subject === 1" class="ml-2" type="warning">校内美食推荐</el-tag>
						<el-tag size="large" round v-else-if="item.subject === 2" class="ml-2" type="danger">周末游线路推荐</el-tag>
						<el-tag size="large" round v-else-if="item.subject === 3" class="ml-2">校园周边地点推荐</el-tag>
						<el-tag size="large" round class="ml-2" type="success" v-else>一日游线路推荐</el-tag>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="selfinformation">
					<el-card shadow="always">
						<div class="avatar">
							<el-avatar
								:size="120"
								:src="getIcon('https://1573395f.r7.cpolar.top/img/user/' + globalStore.userInformation.img)"
							></el-avatar>
						</div>
						<div class="username">{{ globalStore.userInformation.username }}</div>
						<div class="desx">{{ globalStore.userInformation.description }}</div>
						<div class="button"><el-button type="primary" :icon="Edit">发布动态</el-button></div>
					</el-card>
				</div>
				<div class="notice">
					<el-card shadow="always">
						<div>
							<el-icon color="rgb(98, 79, 60)"><Promotion /></el-icon>公告
						</div>
						<div class="noticeinfo">你好啊，欢迎来到没课去哪儿！</div></el-card
					>
				</div>
				<div class="tag">
					<el-card shadow="always">
						<div class="tagtitle">标签</div>
						<div class="tags">
							<el-tag size="large" class="ml-2" type="warning">校内美食推荐</el-tag>
							<el-tag size="large" class="ml-2" type="danger">周末游线路推荐</el-tag>
							<el-tag size="large" class="ml-2">校园周边地点推荐</el-tag>
							<el-tag size="large" class="ml-2" type="success">一日游线路推荐</el-tag>
						</div>
					</el-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { Edit } from "@element-plus/icons-vue";
import { community } from "@/api/modules/lnl-paly";
import { GlobalStore } from "@/stores";
import { onMounted, reactive } from "vue";
// import { Warning } from "@element-plus/icons-vue";

const globalStore = GlobalStore();
const params = reactive<{ subject?: number; pageNum: number; pageSize: number }>({
	pageNum: 1,
	pageSize: 5
});

//懒加载数据
const infiniteValue = reactive({
	current: 0,
	pages: 1
});
//懒加载
const load = async () => {
	if (infiniteValue.current < infiniteValue.pages) {
		console.log("继续加载");

		// const params = { ...apiParams, ...route.query, page: apiParams.page++ };
		// await apireturndataback(params);
	} else return;
};

//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
interface DataValueInterface {
	time: string;
	subject: number;
	content: string;
	img: string;
	userImg: string;
	username: string;
}
//存放数据
const showData = reactive<{ data: Array<DataValueInterface> }>({ data: [] });
//获取动态数据
const getdata = async () => {
	const res = (await community(params)) as any;
	showData.data.push(...res.data.records);
	console.log(showData.data);
};
onMounted(() => {
	getdata();
});
</script>

<style scoped lang="scss">
.content-box {
	/* position: relative; */
	.backgroundtrue {
		position: absolute;
		width: 100vw;
		height: 87.3vh;
		background-image: url("@/assets/lnl_images/infinity-2168510.jpg");
		background-size: 100% 100%;
		transform: translateY(-10px);
	}
	.body {
		position: relative;
		top: -40px;
		z-index: 999;
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100vw;
		padding: 20px 0;
		padding-top: 50px;
		margin: 0;
		opacity: 0.9;
		.left {
			width: 50%;
			margin-right: 20px;
			transform: translate(22%);
			.comment {
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
		.right {
			position: fixed;
			top: 113px;
			left: 200px;
			width: 20%;
			.selfinformation {
				margin-bottom: 15px;
				overflow: hidden;
				border-radius: 15px;
				.avatar {
					display: flex;
					justify-content: center;
					margin-bottom: 10px;
				}
				.username {
					font-size: 21px;
					text-align: center;
				}
				.desx {
					height: 50px;
					text-align: center;
				}
				.button {
					display: flex;
					justify-content: center;
				}
			}
			.notice {
				margin-bottom: 15px;
				overflow: hidden;
				font-size: 18px;
				border-radius: 15px;
				.noticeinfo {
					padding-top: 10px;
					font-size: 13px;
				}
			}
			.tag {
				overflow: hidden;
				border-radius: 15px;
				.ml-2 {
					margin: 7px 4px;
				}
			}
		}
	}
}
</style>
