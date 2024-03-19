<template>
	<!-- <div class="content-box">
		<div class="background"></div>
		<div class="userinfo">
			<div class="avatar">
				<el-avatar :size="120" :src="globalStore.userInformation.img"></el-avatar>
			</div>
			<div class="username">{{ globalStore.userInformation.username }}</div>
			<div class="desx">
				<el-tooltip class="box-item" effect="dark" :content="globalStore.userInformation.description" placement="top">
					{{ globalStore.userInformation.description }}
				</el-tooltip>
			</div>
		</div>
	</div> -->

	<nav id="nav" class="gird-header" style="display: none">
		<div class="ui container">
			<div class="ui inverted secondary stackable menu">
				<h2 class="ui olive header item" style="font-family: STSong">{{ userInformation.username }}</h2>
				<!--<div class="right m-item item m-mobile-hide">-->
				<a href="#" class="active m-item item"><i class="home icon"></i>首页</a>
				<a href="#" class="m-item item"><i class="clone outline icon"></i>分类</a>
				<a href="#" class="m-item item"><i class="clock icon"></i>时间轴</a>
				<a href="#" class="m-item item"><i class="music icon"></i>音乐盒</a>
				<a href="#" class="m-item item"><i class="book icon"></i>留言板</a>
				<a href="#" class="m-item item"><i class="pencil alternate icon"></i>友人帐</a>
				<a href="#" class="olive m-item item"><i class="image icon"></i>照片墙</a>
				<a href="#" class="m-item item"><i class="info icon"></i>关于我</a>
				<!--</div>-->
				<div class="right m-item item">
					<form name="search" action="#" method="post" target="_blank">
						<div class="ui icon transparent input m-margin-tb-tiny" style="color: white">
							<input style="color: white" type="text" name="query" placeholder="Search...." />
							<i onclick="document.forms['search'].submit()" class="search link icon"></i>
						</div>
					</form>
				</div>
			</div>
		</div>
		<a href="#" class="ui menu toggle black icon button m-right-top m-mobile-hide" style="display: none">
			<i class="sidebar icon"></i>
		</a>
	</nav>

	<!--顶部图片-->
	<div class="m-bg-class_outer" style="width: 100%; height: 750px">
		<img
			:src="userInformation.img"
			:th:src="userInformation.img"
			alt=""
			class="ui m-bg image"
			style="width: 100%; height: 100%"
		/>
		<div class="m-bg-class_cover" align="center">
			<div class="m-margin-top-maxx" align="center">
				<img
					class="ui circular image"
					align="center"
					:src="userInformation.img"
					th:src="@{/images/me.jpg}"
					style="width: 150px; height: 150px"
				/>
			</div>
			<div class="m-font-size-title-large" align="center">{{ userInformation.username }}</div>

			<div class="" align="center">
				<a href="#" class="ui tencent circular icon button"><i class="user icon"></i></a>
				<a href="#" class="ui wechat circular icon button"><i class="weixin icon"></i></a>
				<a href="#" class="ui qq circular icon button" data-content="316392836" data-position="bottom center"
					><i class="qq icon"></i
				></a>
				<a
					href="https://github.com/oneStarLR/"
					target="_blank"
					class="ui github circular icon button"
					data-content="点击跳转GitHub"
					data-position="bottom center"
					><i class="github icon"></i
				></a>
				<a
					href="https://blog.csdn.net/One_L_Star"
					target="_blank"
					class="ui csdn circular icon button"
					data-content="点击跳转CSDN"
					data-position="bottom center"
					><i class="copyright outline icon"></i
				></a>
				<a href="#" class="ui email circular icon button" data-content="onestarlr@hotmail.com" data-position="bottom center"
					><i class="envelope icon"></i
				></a>
			</div>

			<div class="ui tencent-qr flowing popup transition hidden">
				<img :src="userInformation.img" th:src="@{/images/oneStar.jpg}" alt="" class="ui rounded image" style="width: 110px" />
				<div align="center">公众号</div>
			</div>
			<div class="ui wechat-qr flowing popup transition hidden">
				<img
					:src="userInformation.img"
					th:src="@{/images/oneStarWechat.jpg}"
					alt=""
					class="ui rounded image"
					style="width: 110px"
				/>
				<div align="center">微信</div>
			</div>
			<div class="ui qq-qr flowing popup transition hidden">
				<img :src="userInformation.img" th:src="@{/images/qq.jpg}" alt="" class="ui rounded image" style="width: 110px" />
				<div align="center">QQ</div>
			</div>

			<h3 class="m-font-size-text" align="center">{{ userInformation.description }}</h3>
			<hr style="width: 30%" />
			<!-- <h5 class="m-font-size-text-init-title m-margin-top-large">“大圣，此去欲何?”</h5>
			<h5 class="m-font-size-text-init-title">“踏南天，碎凌霄”</h5>
			<h5 class="m-font-size-text-init-title">“若一去不回……”</h5>
			<h5 class="m-font-size-text-init-title">“便一去不回”</h5> -->
			<div id="waypoint" class="ui m-margin-top-large" align="center">
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==1} ? 'active'"
					><i class="home icon"></i>首页</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==2} ? 'active'"
					><i class="clone outline icon"></i>分类</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==4} ? 'active'"
					><i class="clock icon"></i>时间轴</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==5} ? 'active'"
					><i class="music icon"></i>音乐盒</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==6} ? 'active'"
					><i class="book icon"></i>留言板</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==7} ? 'active'"
					><i class="pencil alternate icon"></i>友人帐</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==8} ? 'active'"
					><i class="image icon"></i>照片墙</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==9} ? 'active'"
					><i class="info icon"></i>关于我</a
				>
			</div>
			<div class="hiddenDiv"></div>
		</div>
	</div>

	<!--最新推荐-->
	<div class="ui m-padded-tb-large">
		<div class="ui m-container-small m-opacity">
			<div class="ui secondary segment" align="center"><i class="bookmark icon"></i>关注</div>
		</div>
		<!-- 我的关注 -->
		<FriendCard :friendList="myBlogInfo.follow" :clickFriendCard="clickFriendCard" />
	</div>

	<!--中间内容-->
	<div class="m-padded-tb-big animated fadeIn" v-if="myArticle.length != 0">
		<div class="ui container">
			<div class="ui stackable grid">
				<!--博客内容-->
				<div class="ui vertical segment">
					<div class="ui m-container-small m-opacity">
						<div class="ui secondary segment" align="center"><i class="bookmark icon"></i>文章</div>
					</div>
					<!--博文列表-->
					<div
						class="ui padded segment m-padded-tb-large m-opacity bowenliebiao"
						style="
							 {
								background-color: rgb(240, 242, 245);
							}
						"
					>
						<div
							@click="() => clickarticle(item)"
							v-for="(item, index) in myArticle"
							:key="index"
							style="
								 {
									margin: 20px 0;
									cursor: pointer;
								}
							"
							class="ui large aligned mobile reversed stackable grid"
						>
							<div class="five wide column" v-if="index % 2 === 0">
								<a href="#" target="_blank">
									<img :src="item.photo[0]" alt="" class="ui rounded image" />
								</a>
							</div>
							<!--博文信息-->
							<div class="eleven wide column bowenxinxi">
								<h3 class="ui header">
									<a href="#" target="_blank" class="m-black">{{ item.title }}</a>
								</h3>
								<p class="m-text m-margin-top-max">
									{{ item.content }}
								</p>
								<div class="ui m-margin-top-max grid">
									<div class="eleven wide column">
										<div class="ui mini horizontal link list">
											<div class="item">
												<img :src="userInformation.img" alt="" class="ui avatar image" />
												<div class="content">
													<a href="#" target="_blank" class="header">{{ userInformation.username }}</a>
												</div>
											</div>
											<div class="item">
												<i class="calendar icon"></i><span>{{ item.time }}</span>
											</div>
											<div class="item">
												<i class="eye icon"></i> <span>{{ item.stars }}</span>
											</div>
											<div class="item">
												<i class="comment outline icon"></i> <span>{{ item.comment.length || 0 }}</span>
											</div>
										</div>
									</div>
									<div class="right aligned five wide column">
										<a href="#" target="_blank" class="ui teal basic label m-padded-tiny m-text-thin">好文</a>
									</div>
								</div>
							</div>
							<!--博文图片-->
							<div class="five wide column" v-if="index % 2 !== 0">
								<a href="#" target="_blank">
									<img :src="item.photo[0]" alt="" class="ui rounded image" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--置顶图标-->
	<div class="m-padded-tb-large m-fixed m-right-bottom">
		<a href="#" class="ui icon button"><i class="chevron up icon"></i> </a>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { GlobalStore } from "@/stores";
import FriendCard from "../friendCard/index.vue";
import { computed, reactive, ref, watch } from "vue";

const globalStore = GlobalStore();
const myUserId = ref(globalStore.userInformation.id);
const userInformation = ref(globalStore.userInformation);
//博客内容
const myBlogInfo = reactive<any>({});
let myArticle = reactive<any>([]);

//全部用户
let myUserInfo = reactive(globalStore.user.find((item: any) => item.id === myUserId.value));
let getUsers = computed(() => globalStore.user);
watch(
	getUsers,
	(newvalue: any) => {
		myUserInfo.value = newvalue.find((item: any) => item.id === myUserId.value);
		const { fans, follow } = newvalue.find((item: any) => item.id === myUserId.value) || {};
		myBlogInfo.fans = newvalue.filter((item: any) => fans.includes(item.id));
		myBlogInfo.follow = newvalue.filter((item: any) => follow.includes(item.id)).map((item: any) => item.userinfo);
	},
	{ immediate: true, deep: true }
);

//全部文章
let article = ref(globalStore.article);
let getArticle = computed(() => globalStore.article);
watch(
	getArticle,
	(newvalue: any) => {
		article.value = newvalue;
		const { articles, collect, starts } = myUserInfo;
		myBlogInfo.articles = newvalue.filter((item: any) => articles.includes(item.id));
		myBlogInfo.collect = newvalue.filter((item: any) => collect.includes(item.id));
		myBlogInfo.starts = newvalue.filter((item: any) => starts.includes(item.id));
		myArticle = myBlogInfo.articles;
	},
	{ immediate: true, deep: true }
);

watch(
	myUserId,
	(newvalue: any) => {
		//关注和粉丝
		myUserInfo.value = getUsers.value.find((item: any) => item.id === newvalue);
		//当前用户
		userInformation.value = myUserInfo.value.userinfo;
		const { fans, follow } = getUsers.value.find((item: any) => item.id === newvalue) || {};
		myBlogInfo.fans = getUsers.value.filter((item: any) => fans.includes(item.id));
		myBlogInfo.follow = getUsers.value.filter((item: any) => follow.includes(item.id)).map((item: any) => item.userinfo);

		//文章收藏点赞
		article.value = getArticle.value;
		const { articles, collect, starts } = myUserInfo.value;
		myBlogInfo.articles = getArticle.value.filter((item: any) => articles.includes(item.id));
		myBlogInfo.collect = getArticle.value.filter((item: any) => collect.includes(item.id));
		myBlogInfo.starts = getArticle.value.filter((item: any) => starts.includes(item.id));
		myArticle = myBlogInfo.articles;
	},
	{ immediate: true, deep: true }
);

//点击我的关注
const clickFriendCard = (value: any) => {
	myUserId.value = value;
	console.log(value, "userId");
};

const clickarticle = (value: any) => {
	console.log(value, "valueskdjf");
};
</script>

<style scoped lang="scss">
/* @import "./editormd.min.css"; */
@import "./index.scss";
/* @import "./index2.css"; */
@import "https://cdn.jsdelivr.net/semantic-ui/2.2.4/semantic.min.css";
</style>
