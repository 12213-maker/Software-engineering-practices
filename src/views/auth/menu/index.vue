<template>
	<div class="content-box">
		<div class="backgroundtrue"></div>
		<!-- 主体 -->
		<div class="body">
			<div v-if="!ischangepage" class="left">
				<div class="comment" @click="changerouter(item)" v-infinite-scroll="load" v-for="item in article" :key="item.img">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.img">
							<img class="image" :src="item.img" alt="" />
						</div>
						<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.username }}</span>
						<div class="ipschool">
							<el-tag size="small" round v-if="item.subject === 1" class="ml-2" type="warning">表白</el-tag>
							<el-tag size="small" round v-else-if="item.subject === 2" class="ml-2" type="danger">日常</el-tag>
							<el-tag size="small" round v-else-if="item.subject === 3" class="ml-2">知识</el-tag>
							<el-tag size="small" round class="ml-2" type="success" v-else>趣玩</el-tag>
						</div>
					</div>
					<div class="usercomment">
						{{ item.content }}
					</div>
					<div class="imageOter" v-if="item.photo">
						<img class="image" :src="item.photo[0]" alt="" />
					</div>
					<div class="timecontanerall">
						<div class="timecontaner">
							<span class="time">{{ item.time }}</span>

							<div v-if="params.school === 1">
								<el-icon><School /></el-icon>{{ "西南石油大学（成都校区）" }}
							</div>
							<div v-else>
								<el-icon><School /></el-icon>{{ "西南石油大学（南充校区）" }}
							</div>
						</div>
						<div v-if="id === item.uid">
							<el-button :icon="Delete" @click.stop="deletedongati(item.id)" size="small">删除</el-button>
						</div>
					</div>
				</div>

				<!-- 加载更多样式———————————————————————————————————————————————————————————————— -->
				<div class="recent-posts">
					<div class="announcement background-opacity">
						<i class="fa fa-volume-up" aria-hidden="true"></i>
						<div>
							<div v-for="(notice, index) in webInfo.notices" :key="index">
								{{ notice }}
							</div>
						</div>
					</div>

					<div v-if="indexType === 1">
						<div v-for="(sort, index) in sortArticle" :key="index">
							<div>
								<div class="sort-article-first">
									<div>
										<svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -2px; margin-bottom: -2px">
											<path
												d="M367.36 482.304H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3536 114.688-114.688 114.688zM367.36 938.752H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3536 114.6368-114.688 114.6368zM828.672 938.752h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3024 114.6368-114.6368 114.6368zM828.672 482.304h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3024 114.688-114.6368 114.688z"
												fill="#FF623E"
											></path>
										</svg>
										{{ titleName[index] }}
									</div>
									<div class="article-more" @click="$router.push({ path: '/sort', query: { sortId: sort.id } })">
										<svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -2px; margin-bottom: -2px">
											<path
												d="M347.3 897.3H142.2c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L103.3 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L386.3 872.1c-6.9 15.3-22.1 25.2-39 25.2z"
												fill="#009F72"
											></path>
											<path
												d="M730.4 897.3H525.3c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L486.4 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L769.3 872.1c-6.8 15.3-22.1 25.2-38.9 25.2z"
												fill="#F9DB88"
											></path>
										</svg>
										MORE
									</div>
								</div>
								<SortArticle :articleList="sort" />
								<!-- <SortArticle :articleList="article[sort.id]"></SortArticle> -->
							</div>
						</div>
					</div>

					<!-- <div v-show="indexType === 2">
						<articleList :articleList="articles"></articleList>
						<div class="pagination-wrap">
							<div @click="pageArticles()" class="pagination" v-if="pagination.total !== articles.length">下一页</div>
							<div v-else style="user-select: none">~~到底啦~~</div>
						</div>
					</div> -->
				</div>
			</div>

			<!-- *************** -->

			<Editpage v-else @returnback="returnback" @refreshpage="refreshpage" :changeParams="changeParams" />

			<div class="right">
				<!-- more -->
				<div>
					<!-- 头像信息 -->
					<div class="card-content1 shadow-box background-opacity">
						<el-avatar
							style="margin-top: 20px"
							class="user-avatar"
							:size="120"
							:src="globalStore.userInformation.img"
						></el-avatar>
						<div class="web-name">{{ globalStore.userInformation.username }}</div>
						<div class="desx">
							<el-tooltip class="box-item" effect="dark" :content="globalStore.userInformation.description" placement="top">
								{{ globalStore.userInformation.description }}
							</el-tooltip>
						</div>
						<div class="web-info">
							<div class="blog-info-box">
								<span>文章</span>
								<span class="blog-info-num">5</span>
							</div>
							<div class="blog-info-box">
								<span>分类</span>
								<span class="blog-info-num">4</span>
							</div>
							<div class="blog-info-box">
								<span>访问量</span>
								<span class="blog-info-num">23</span>
							</div>
						</div>
						<div class="button collection-btn" @click="changerouter('userSelf')">
							{{ !ischangepage ? "发布动态" : "返回" }}
							<!-- <el-button type="primary" :icon="!ischangepage ? Edit : Back">{{ !ischangepage ? "发布动态" : "返回" }}</el-button> -->
						</div>
						<!-- <a class="collection-btn" @click="showTip()"> <i class="el-icon-star-off" style="margin-right: 2px"></i>朋友圈 </a> -->
					</div>

					<!-- 搜索 -->
					<div
						v-if="!ischangepage"
						style="padding: 15px; border-radius: 10px; margin-top: 30px; animation: hideToShow 1s ease-in-out"
						class="shadow-box background-opacity wow"
					>
						<div style="color: var(--lightGreen); font-size: 20px; font-weight: bold; margin-bottom: 10px">搜索</div>
						<div style="display: flex">
							<input class="ais-SearchBox-input" type="text" v-model="articleSearch" placeholder="搜索文章" maxlength="32" />
							<!-- 搜索按钮 -->
							<div class="ais-SearchBox-submit" @click="selectArticle()">
								<svg style="margin-top: 3.5px; margin-left: 18px" viewBox="0 0 1024 1024" width="20" height="20">
									<path
										d="M51.2 508.8c0 256.8 208 464.8 464.8 464.8s464.8-208 464.8-464.8-208-464.8-464.8-464.8-464.8 208-464.8 464.8z"
										fill="#51C492"
									></path>
									<path
										d="M772.8 718.4c48-58.4 76.8-132.8 76.8-213.6 0-186.4-151.2-337.6-337.6-337.6-186.4 0-337.6 151.2-337.6 337.6 0 186.4 151.2 337.6 337.6 337.6 81.6 0 156-28.8 213.6-76.8L856 896l47.2-47.2-130.4-130.4zM512 776c-149.6 0-270.4-121.6-270.4-271.2S363.2 233.6 512 233.6c149.6 0 271.2 121.6 271.2 271.2C782.4 654.4 660.8 776 512 776z"
										fill="#FFFFFF"
									></path>
								</svg>
							</div>
						</div>
					</div>

					<!-- 学校分类 -->
					<div
						class="notice shadow-box"
						style="border-radius: 10px; margin-top: 30px; animation: hideToShow 1s ease-in-out"
						v-if="!ischangepage"
					>
						<el-card shadow="always">
							<div class="switchschool">
								<div>
									<el-icon color="rgb(98, 79, 60)"><Promotion /></el-icon>公告
								</div>
								<el-select v-model="value" @change="changeSchool()" class="m-2" placeholder="Select" size="small">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</div>
							<div class="noticeinfo">
								{{ `你好，欢迎来到${value === 1 ? "西南石油大学（成都校区）" : "西南石油大学（南充校区）"}动态推荐！` }}
							</div></el-card
						>
					</div>
					<!-- 推荐文章 -->
					<div
						v-if="!ischangepage"
						style="padding: 25px; border-radius: 10px; margin-top: 30px; animation: hideToShow 1s ease-in-out"
						class="shadow-box background-opacity wow"
					>
						<div class="card-content2-title">
							<i class="el-icon-reading card-content2-icon"></i>
							<span>推荐文章</span>
						</div>
						<div
							v-for="(article2, index) in recommendArticles"
							:key="index"
							@click="$router.push({ path: '/article', query: { id: article2.id } })"
						>
							<div class="aside-post-detail">
								<div class="aside-post-image">
									<el-image lazy class="my-el-image" :src="article2.articleCover" fit="cover">
										<div class="image-slot">
											<div class="error-aside-image">
												{{ article2.username }}
											</div>
										</div>
									</el-image>
								</div>
								<div class="aside-post-title">
									{{ article2.articleTitle }}
								</div>
							</div>
							<div class="aside-post-date">
								<i class="el-icon-date" style="color: var(--greyFont)"></i>{{ article2.createTime }}
							</div>
						</div>
					</div>

					<!-- 速览 -->
					<div v-if="!ischangepage">
						<div
							v-for="(sort, index) in sortInfo"
							@click="selectSort()"
							:key="index"
							:style="{ background: constant.sortColor[index % constant.sortColor.length] }"
							class="shadow-box-mini background-opacity wow"
							style="
								position: relative;
								padding: 10px 25px 15px;
								border-radius: 10px;
								animation: hideToShow 1s ease-in-out;
								margin-top: 30px;
								cursor: pointer;
								color: var(--white);
							"
						>
							<div>速览</div>
							<div class="sort-name">
								{{ sort.sortName }}
							</div>
							<div style="font-weight: bold; margin-top: 15px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">
								{{ sort.sortDescription }}
							</div>
						</div>
					</div>

					<div class="tag" v-if="ischangepage">
						<el-card shadow="always">
							<div class="tagtitle">动态主题</div>
							<div class="tags" v-if="!ischangepage">
								<el-tag size="large" class="ml-2" type="danger" @click="changeType(0)">全部</el-tag>
								<el-tag size="large" class="ml-2" type="warning" @click="changeType(1)">表白</el-tag>
								<el-tag size="large" class="ml-2" @click="changeType(4)">趣玩</el-tag>
								<el-tag size="large" class="ml-2" @click="changeType(2)">日常</el-tag>
								<el-tag size="large" class="ml-2" type="success" @click="changeType(3)">知识</el-tag>
							</div>
							<div class="tags" v-else>
								<el-tag size="large" class="ml-2" type="danger">全部</el-tag>
								<el-tag size="large" class="ml-2" type="warning">表白</el-tag>
								<el-tag size="large" class="ml-2">趣玩</el-tag>
								<el-tag size="large" class="ml-2">日常</el-tag>
								<el-tag size="large" class="ml-2" type="success">知识</el-tag>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { Delete } from "@element-plus/icons-vue";
// import { deletecommunity } from "@/api/modules/lnl-paly";
import { GlobalStore } from "@/stores";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Editpage from "../edit/index.vue";
import SortArticle from "../sortArticle/index.vue";

//more
const articleSearch = ref();
const selectArticle = () => {};
const selectSort = () => {};
// const showTip = () => {};
const recommendArticles = [
	{
		id: 1,
		username: "lnl",
		articleTitle: "一场说走就走的旅行上课的韩国代购",
		createTime: "2024-01-10 17：19：21",
		articleCover: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg"
	},
	{
		id: 1,
		username: "lnl",
		articleTitle: "凤凰古城 | 建于清康熙四十三年（1704年）",
		createTime: "2024-01-10 17：19：21",
		articleCover: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg"
	},
	{
		id: 1,
		username: "lnl",
		articleTitle: "凤凰古 | 城建于清康熙四十三年（1704年）",
		createTime: "2024-01-10 17：19：21",
		articleCover: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg"
	}
];
const sortInfo = [
	{ id: 2, sortName: "知识", sortDescription: "前端 后端 考研" },
	{ id: 5, sortName: "日常", sortDescription: "风景 美食 拍照" },
	{ id: 0, sortName: "表白", sortDescription: "i like you" },
	{ id: 1, sortName: "吐槽", sortDescription: "吃食 教室 配套设施" },
	{ id: 4, sortName: "实习兼职", sortDescription: "实习城市 实习互助" },
	{ id: 3, sortName: "趣玩", sortDescription: "周边玩乐" }
];
const constant = {
	sortColor: [
		"linear-gradient(to right, #358bff, #15c6ff)",
		"linear-gradient(to right, #18e7ae, #1eebeb)",
		"linear-gradient(to right, #ff6655, #ffbf37)",
		"linear-gradient(120deg, rgba(255, 39, 232, 1) 0%, rgba(255, 128, 0, 1) 100%)",
		"linear-gradient(120deg, rgba(91, 39, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)"
	]
};
const webInfo = {
	notices: ["notices1", "notices2"]
};
const indexType = ref(1);
//____________________________

const globalStore = GlobalStore();
const ischangepage = ref(false);

let article = ref(globalStore.article);
const sortArticle = reactive([[], [], [], [], [], []]) as any;
// article.value.forEach((item: any) => {
// 	const { subject } = item;
// 	sortArticle[subject].push(item);
// });
const titleName = ["表白", "吐槽", "知识", "趣玩", "实习兼职", "日常"];

const getArticle = computed(() => globalStore.article);
watch(
	getArticle,
	(newvalue: any) => {
		article.value = newvalue;
		newvalue.forEach((item: any) => {
			const { subject } = item;
			sortArticle[subject].push(item);
		});
	},
	{ immediate: true, deep: true }
);
//更新页面数据
const refreshpage = async () => {
	params.pageNum = 1;
	showData.data = [];
	getdata();
};

let changeParams = reactive({});
//点击跳转
const changerouter = (data: any) => {
	if (!ischangepage.value) {
		changeParams = data === "userSelf" ? {} : data;
		//确认跳转
		ischangepage.value = true;
	} else {
		ischangepage.value = false;
	}
};
//点击返回
const returnback = () => {
	changerouter("userSelf");
};

const value = ref(0);
const options = [
	{
		value: 0,
		label: "全部"
	},
	{
		value: 1,
		label: "西南石油大学（成都校区）"
	},
	{
		value: 2,
		label: "西南石油大学（南充校区）"
	}
];

const id = globalStore.userInformation.id;
const params = reactive<{ subject?: number; pageNum: number; pageSize: number; school: number }>({
	pageNum: 1,
	pageSize: 3,
	subject: 0,
	school: 1
});

//存放数据
const showData = reactive<{ data: any }>({ data: [] });
//获取动态数据
const getdata = () => {};

//懒加载数据
const infiniteValue = reactive({
	current: 0,
	pages: 1
});
//懒加载
const loadmore = async () => {
	if (infiniteValue.current < infiniteValue.pages) {
		params.pageNum++;
		getdata();
	} else return;
};
//防抖
let timer = ref();
const load = () => {
	if (timer.value) {
		clearTimeout(timer.value);
	}
	timer.value = setTimeout(() => {
		console.log("继续加载");
		loadmore();
	}, 1000);
};

//改变主题
const changeType = (value: any) => {
	params.subject = value;
	params.pageNum = 1;
	showData.data = [];

	if (value === 0) {
		const origin = globalStore.originArticle;
		globalStore.setArticles(origin);
	} else {
		const article = globalStore.originArticle;
		const newArticle = article.filter((item: any) => {
			return item.subject === value;
		});
		globalStore.setArticles(newArticle);
	}
	getdata();
};
//改变学校
const changeSchool = () => {
	params.school = value.value;
	params.pageNum = 1;
	showData.data = [];

	if (value.value === 0) {
		const origin = globalStore.originArticle;
		globalStore.setArticles(origin);
	} else {
		const article = globalStore.originArticle;
		const newArticle = article.filter((item: any) => {
			return item.school === value.value;
		});
		globalStore.setArticles(newArticle);
	}

	getdata();
};
//删除动态
const deletedongati = async (value: any) => {
	ElMessageBox.confirm(`是否删除此条动态?`, "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		draggable: true
	}).then(async () => {
		// await deletecommunity({ id: value });

		const article = globalStore.article;
		const newArticle = article.filter((item: any) => {
			return item.id !== value;
		});
		globalStore.setArticles(newArticle);
		globalStore.setOriginArticles(newArticle);

		params.pageNum = 1;
		showData.data = [];
		// await getdata();
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});
};

onMounted(() => {
	console.log(globalStore.article, "globalstore");
	getdata();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
