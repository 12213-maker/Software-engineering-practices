<template>
	<div class="content-box">
		<!-- 照片背景 -->
		<div class="background">
			<img src="@/assets/lnl_images/infinity-2168510.jpg" />
		</div>

		<!-- 主体 -->
		<div class="body">
			<div class="left">
				<div class="share">
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
					<div>shomwe</div>
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
							<el-tag size="large" class="ml-2" type="warning">校内没事推荐</el-tag>
							<el-tag size="large" class="ml-2" type="danger">周末游线路推荐</el-tag>
							<el-tag size="large" class="ml-2">校园周边地点推荐</el-tag>
							<el-tag size="large" class="ml-2" type="success">一日游线路推荐</el-tag>
						</div>
					</el-card>
				</div>
			</div>
		</div>

		<!-- 动态 -->

		<!-- 个人头像卡片 -->
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { Edit } from "@element-plus/icons-vue";
import { community } from "@/api/modules/lnl-paly";
import { GlobalStore } from "@/stores";
import { onMounted, reactive } from "vue";

const globalStore = GlobalStore();
const params = reactive<{ subject: number; pageNum: number; pageSize: number }>({
	subject: 1,
	pageNum: 1,
	pageSize: 5
});
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
onMounted(async () => {
	const res = await community(params);
	console.log(res);
});
</script>

<style scoped lang="scss">
.content-box {
	background-color: pink;
	.background {
		position: relative;
		top: -8px;
		width: 100vw;
		height: 280px;
		img {
			position: relative;
			top: -240%;
			width: 100%;
		}
	}
	.body {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100vw;
		padding-top: 20px;
		margin: 0;
		background-color: #e7dfc9;
		.left {
			width: 50%;
			margin-right: 20px;
			background-color: pink;
		}
		.right {
			position: sticky;
			top: 300px;
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
				.tags {
					/* display: flex;
					flex-flow: wrap;
					flex-direction: row;
					justify-content: space-around; */
				}
				.ml-2 {
					margin: 7px 4px;
				}
			}
		}
	}
}
</style>
