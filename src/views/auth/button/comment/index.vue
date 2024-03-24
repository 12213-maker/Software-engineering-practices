<template>
	<div>
		<!-- 评论框 -->
		<div style="margin-bottom: 40px">
			<div class="comment-head"><i class="el-icon-edit-outline" style="font-weight: bold; font-size: 22px"></i> 留言</div>
			<div>
				<!-- 文字评论 -->
				<!-- <div v-show="!isGraffiti">
					<commentBox @showGraffiti="isGraffiti = !isGraffiti" @submitComment="submitComment"> </commentBox>
				</div> -->
			</div>
		</div>

		<!-- 评论内容 -->
		<div v-if="comment.length > 0">
			<!-- 评论数量 -->
			<div class="commentInfo-title">
				<span style="font-size: 1.15rem">Comments | </span>
				<!-- <span>{{ comment.length }} 条留言</span> -->
			</div>
			<!-- 评论详情 -->
			<div id="comment-content" class="commentInfo-detail" v-for="(item, index) in comment" :key="index">
				<!-- 头像 -->
				<!-- <el-avatar shape="square" class="commentInfo-avatar" :size="35" :src="item.img"></el-avatar> -->

				<div style="flex: 1; padding-left: 12px">
					<!-- 评论信息 -->
					<!-- <div style="display: flex; justify-content: space-between">
						<div>
							<span class="commentInfo-username">{{ item.username }}</span>
							<span class="commentInfo-master" v-if="item.userId === userId">主人翁</span>
							<span class="commentInfo-other">{{ item.time }}</span>
						</div>
						<div class="commentInfo-reply" @click="replyDialog(item, item)">
							<span v-if="item.reply.length > 0">{{ item.reply.length }} </span><span>回复</span>
						</div>
					</div> -->
					<!-- 评论内容 -->
					<!-- <div class="commentInfo-content">
						<span v-html="item.commentContent"></span>
					</div> -->
					<!-- 回复模块 -->
					<div v-if="isEmpty(item.childComments) && isEmpty(item.childComments.records)">
						<div class="commentInfo-detail" v-for="(childItem, i) in item.childComments.records" :key="i">
							<!-- 头像 -->
							<!-- <el-avatar shape="square" class="commentInfo-avatar" :size="30" :src="childItem.avatar"></el-avatar> -->

							<div style="flex: 1; padding-left: 12px">
								<!-- 评论信息 -->
								<!-- <div style="display: flex; justify-content: space-between">
									<div>
										<span class="commentInfo-username-small">{{ childItem.username }}</span>
										<span class="commentInfo-master" v-if="childItem.userId === userId">主人翁</span>
										<span class="commentInfo-other">{{ $common.getDateDiff(childItem.createTime) }}</span>
									</div>
									<div>
										<span class="commentInfo-reply" @click="replyDialog(childItem, item)">回复</span>
									</div>
								</div> -->
								<!-- 评论内容 -->
								<!-- <div class="commentInfo-content">
									<template v-if="childItem.parentCommentId !== item.id && childItem.parentUserId !== childItem.userId">
										<span style="color: var(--blue)">@{{ childItem.parentUsername }} </span>:
									</template>
									<span v-html="childItem.commentContent"></span>
								</div> -->
							</div>
						</div>
						<!-- 分页 -->
						<!-- <div class="pagination-wrap" v-if="item.childComments.records.length < item.childComments.total">
							<div class="pagination" @click="toChildPage(item)">展开</div>
						</div> -->
					</div>
				</div>
			</div>
			<!-- 分页 -->
			<!-- <proPage
				:current="pagination.current"
				:size="pagination.size"
				:total="pagination.total"
				:buttonSize="6"
				:color="$constant.commentPageColor"
				@toPage="toPage"
			>
			</proPage> -->
		</div>
		<!-- 
		<div v-else class="myCenter" style="color: var(--greyFont)">
			<i>来发第一个留言啦~</i>
		</div>

		<el-dialog
			title="留言"
			:visible.sync="replyDialogVisible"
			width="30%"
			:before-close="handleClose"
			:append-to-body="true"
			:close-on-click-modal="false"
			destroy-on-close
			center
		>
			<div>
				<commentBox :disableGraffiti="true" @submitComment="submitReply"> </commentBox>
			</div>
		</el-dialog> -->
	</div>
</template>

<script setup lang="ts" name="authMenu">
const props = withDefaults(defineProps<{ source: any; type: any; userId: any }>(), {
	source: 0,
	type: "",
	userId: ""
});
// const { source, type, userId } = props;
import { GlobalStore } from "@/stores";
// import { ref } from "vue";
const globalStore = GlobalStore();
const article = globalStore.article;
const comment =
	article.find((item: any) => {
		return item.id === props.source;
	}).comment || [];
console.log(comment, "comment");

// const myUserId = ref(globalStore.userInformation.id);
// const userInformation = ref(globalStore.userInformation);
// //博客内容
// const myBlogInfo = reactive<any>({});
// let myArticle = reactive<any>([]);

// // ----------------
// const isGraffiti = ref(false);
// const comments = ref([]);
// const submitComment = () => {};
// const replyDialog = (val1: any, val2: any) => {
// 	console.log(val2, val1);
// };
// const subscribeLabel = () => {};
// // ----------------

// //全部用户
// let myUserInfo = reactive(globalStore.user.find((item: any) => item.id === myUserId.value));
// let getUsers = computed(() => globalStore.user);
// watch(
// 	getUsers,
// 	(newvalue: any) => {
// 		myUserInfo.value = newvalue.find((item: any) => item.id === myUserId.value);
// 		const { fans, follow } = newvalue.find((item: any) => item.id === myUserId.value) || {};
// 		myBlogInfo.fans = newvalue.filter((item: any) => fans.includes(item.id));
// 		myBlogInfo.follow = newvalue.filter((item: any) => follow.includes(item.id)).map((item: any) => item.userinfo);
// 	},
// 	{ immediate: true, deep: true }
// );

// //全部文章
// let article = ref(globalStore.article);
// let getArticle = computed(() => globalStore.article);
// watch(
// 	getArticle,
// 	(newvalue: any) => {
// 		article.value = newvalue;
// 		const { articles, collect, starts } = myUserInfo;
// 		myBlogInfo.articles = newvalue.filter((item: any) => articles.includes(item.id));
// 		myBlogInfo.collect = newvalue.filter((item: any) => collect.includes(item.id));
// 		myBlogInfo.starts = newvalue.filter((item: any) => starts.includes(item.id));
// 		myArticle = myBlogInfo.articles;
// 	},
// 	{ immediate: true, deep: true }
// );

// watch(
// 	myUserId,
// 	(newvalue: any) => {
// 		//关注和粉丝
// 		myUserInfo.value = getUsers.value.find((item: any) => item.id === newvalue);
// 		//当前用户
// 		userInformation.value = myUserInfo.value.userinfo;
// 		const { fans, follow } = getUsers.value.find((item: any) => item.id === newvalue) || {};
// 		myBlogInfo.fans = getUsers.value.filter((item: any) => fans.includes(item.id));
// 		myBlogInfo.follow = getUsers.value.filter((item: any) => follow.includes(item.id)).map((item: any) => item.userinfo);

// 		//文章收藏点赞
// 		article.value = getArticle.value;
// 		const { articles, collect, starts } = myUserInfo.value;
// 		myBlogInfo.articles = getArticle.value.filter((item: any) => articles.includes(item.id));
// 		myBlogInfo.collect = getArticle.value.filter((item: any) => collect.includes(item.id));
// 		myBlogInfo.starts = getArticle.value.filter((item: any) => starts.includes(item.id));
// 		myArticle = myBlogInfo.articles;
// 	},
// 	{ immediate: true, deep: true }
// );

// //点击我的关注
// const clickFriendCard = (value: any) => {
// 	myUserId.value = value;
// 	console.log(value, "userId");
// };

// const clickarticle = (value: any) => {
// 	console.log(value, "valueskdjf");
// 	currentAricle.value = value;
// 	detailinfo.value = true;
// };

const isEmpty = (value: any) => {
	if (
		typeof value === "undefined" ||
		value === null ||
		(typeof value === "string" && value.trim() === "") ||
		(Array.prototype.isPrototypeOf(value) && value.length === 0) ||
		(Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)
	) {
		return true;
	} else {
		return false;
	}
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
