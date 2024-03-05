<template>
	<div class="content-box">
		<div class="backgroundtrue"></div>
		<!-- 主体 -->
		<div class="body">
			<div v-if="!ischangepage" class="left">
				<div class="comment" @click="changerouter(item)" v-infinite-scroll="load" v-for="item in data" :key="item.img">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.userPhoto">
							<!-- <el-avatar :size="50" :src="getIcon(' https://737a8db5.r1.cpolar.top/img/user/' + item.userImg)"></el-avatar> -->
							<img class="image" :src="item.userPhoto" alt="" />
						</div>
						<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.create }}</span>
						<div class="ipschool">
							<el-tag size="small" round v-if="item.type === 1" class="ml-2" type="warning">表白</el-tag>
							<el-tag size="small" round v-else-if="item.type === 2" class="ml-2" type="danger">日常</el-tag>
							<el-tag size="small" round v-else-if="item.type === 3" class="ml-2">知识</el-tag>
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
				<!-- <el-divider v-if="infiniteValue.current < infiniteValue.pages"> 加载中 </el-divider>
				<el-divider v-if="infiniteValue.current >= infiniteValue.pages"> 没有更多了 </el-divider> -->
			</div>
			<Editpage @returnback="returnback" @refreshpage="refreshpage" :changeParams="changeParams" v-else />

			<div class="right">
				<div class="selfinformation">
					<el-card shadow="always">
						<div class="avatar">
							<!-- <el-avatar
								:size="120"
								:src="getIcon('https://737a8db5.r1.cpolar.top/img/user/' + globalStore.userInformation.img)"
							></el-avatar> -->
							<img src="../img/avtar.jpg" alt="user" class="user-image" />
						</div>
						<div class="username">{{ globalStore.userInformation.username }}</div>
						<div class="desx">
							<el-tooltip class="box-item" effect="dark" :content="globalStore.userInformation.description" placement="top">
								{{ globalStore.userInformation.description }}
							</el-tooltip>
						</div>
						<div class="button" @click="changerouter('userSelf')">
							<el-button type="primary" :icon="!ischangepage ? Edit : Back">{{ !ischangepage ? "发布动态" : "返回" }}</el-button>
						</div>
					</el-card>
				</div>
				<div class="notice" v-if="!ischangepage">
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
				<div class="notice" v-else>
					<el-card shadow="always">
						<div class="switchschool">
							<div>
								<el-icon color="rgb(98, 79, 60)"><Promotion /></el-icon>公告
							</div>
						</div>
						<div class="noticeinfo">
							{{ `你好，欢迎来到用户页面，详情见右侧！` }}
						</div></el-card
					>
				</div>

				<div class="tag">
					<el-card shadow="always">
						<div class="tagtitle">动态主题</div>
						<div class="tags" v-if="!ischangepage">
							<el-tag size="large" class="ml-2" type="danger" @click="changeType(0)">全部</el-tag>
							<el-tag size="large" class="ml-2" type="warning" @click="changeType(1)">校内美食</el-tag>
							<el-tag size="large" class="ml-2" @click="changeType(4)">周末游线路</el-tag>
							<el-tag size="large" class="ml-2" @click="changeType(2)">校园周边地点</el-tag>
							<el-tag size="large" class="ml-2" type="success" @click="changeType(3)">一日游线路推荐</el-tag>
						</div>
						<div class="tags" v-else>
							<el-tag size="large" class="ml-2" type="danger">全部</el-tag>
							<el-tag size="large" class="ml-2" type="warning">校内美食</el-tag>
							<el-tag size="large" class="ml-2">周末游线路</el-tag>
							<el-tag size="large" class="ml-2">校园周边地点</el-tag>
							<el-tag size="large" class="ml-2" type="success">一日游线路推荐</el-tag>
						</div>
					</el-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { Edit, Delete, Back } from "@element-plus/icons-vue";
import { community, deletecommunity } from "@/api/modules/lnl-paly";
import { GlobalStore } from "@/stores";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Editpage from "../edit/index.vue";
// import Card from "../Card/index.vue";

const globalStore = GlobalStore();
const ischangepage = ref(false);

//更新页面数据
const refreshpage = async () => {
	params.pageNum = 1;
	showData.data = [];
	await getdata();
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
	ischangepage.value = false;
	refreshpage();
};

const value = ref(1);
const options = [
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

// const data = [
// 	{
// 		time: "2024.3.5",
// 		subject: 1,
// 		content:
// 			"contenttps://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jptps://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jp",
// 		img: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg",
// 		userImg: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg",
// 		username: "不是风动",
// 		id: 1,
// 		uid: 1
// 	},
// 	{ time: "2024.3.5", subject: 2, content: "content", img: "", userImg: "", username: "lnl", id: 1, uid: 1 },
// 	{ time: "2024.3.5", subject: 1, content: "content", img: "", userImg: "", username: "lnl", id: 1, uid: 1 },
// 	{
// 		time: "2024.3.5",
// 		subject: 1,
// 		content: "content",
// 		img: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg",
// 		userImg: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg",
// 		username: "lnl",
// 		id: 1,
// 		uid: 1
// 	},
// 	{ time: "2024.3.5", subject: 2, content: "content", img: "", userImg: "", username: "lnl", id: 1, uid: 1 },
// 	{ time: "2024.3.5", subject: 1, content: "content", img: "", userImg: "", username: "lnl", id: 1, uid: 1 },
// 	{
// 		time: "2024.3.5",
// 		subject: 1,
// 		content: "content",
// 		img: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg",
// 		userImg: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg",
// 		username: "lnl",
// 		id: 1,
// 		uid: 1
// 	},
// 	{ time: "2024.3.5", subject: 2, content: "content", img: "", userImg: "", username: "lnl", id: 1, uid: 1 },
// 	{ time: "2024.3.5", subject: 1, content: "content", img: "", userImg: "", username: "lnl", id: 1, uid: 1 }
// ];

const data = [
	// {
	// 	id: 0, //文章id
	// 	create: "创建人", //创建人
	// 	userPhoto: "头像", //用户头像
	// 	adress: "地址", //地址
	// 	time: "发表时间", //发布时间
	// 	title: "文章标题", //文章标题
	// 	content: "文章内容", //文章内容
	// 	photo: "文章图片", //文章图片
	// 	type: "文章类别", //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
	// 	stars: "点赞数", //点赞数量
	// 	comment: "文章留言" //文章留言
	//  campus: 1,//校区：1-成都校区，
	// },
	{
		id: 1, //文章id
		create: "不是风动", //创建人
		userPhoto: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg", //用户头像
		adress: "四川", //地址
		time: "2024-3-5", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"凤凰古城建于清康熙四十三年（1704年），东门和北门古城楼尚在。城内青石板街道、江边木结构吊脚楼，以及朝阳宫、古城博物馆、杨家祠堂、沈从文故居、熊希龄故居、天王庙、大成殿、万寿宫等建筑，全都透着古城特色。", //文章内容
		photo: [
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
		], //文章图片
		type: 3, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 522, //点赞数量
		campus: 1,
		comment: [
			{
				username: "用户1",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容11111111", //留言内容
				time: "2024.3.6",
				adress: "北京"
			},
			{
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容222222222", //留言内容
				time: "2024.3.6",
				adress: "上海"
			},
			{
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容333333333", //留言内容
				time: "2024.3.6",
				adress: "深圳"
			}
		] //文章留言
	},
	{
		id: 2, //文章id
		create: "不是风动", //创建人
		userPhoto: "https://randomuser.me/api/portraits/men/45.jpg", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: [
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
		], //文章图片
		type: 0, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		campus: 2,
		comment: [
			{
				username: "用户1",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容11111111", //留言内容
				time: "2024.3.6",
				adress: "北京"
			},
			{
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容222222222", //留言内容
				time: "2024.3.6",
				adress: "上海"
			},
			{
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容333333333", //留言内容
				time: "2024.3.6",
				adress: "深圳"
			}
		] //文章留言
	},
	{
		id: 3, //文章id
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		type: 2, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		campus: 1,
		comment: [
			{
				username: "用户1",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容11111111", //留言内容
				time: "2024.3.6",
				adress: "北京"
			},
			{
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容222222222", //留言内容
				time: "2024.3.6",
				adress: "上海"
			},
			{
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容333333333", //留言内容
				time: "2024.3.6",
				adress: "深圳"
			}
		] //文章留言
	},
	{
		id: 4, //文章id
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		type: 4, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		campus: 1,
		comment: [
			{
				username: "用户1",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容11111111", //留言内容
				time: "2024.3.6",
				adress: "北京"
			},
			{
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容222222222", //留言内容
				time: "2024.3.6",
				adress: "上海"
			},
			{
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容333333333", //留言内容
				time: "2024.3.6",
				adress: "深圳"
			}
		] //文章留言
	},
	{
		id: 5, //文章id
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		type: 5, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		campus: 1,
		comment: [
			{
				username: "用户1",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容11111111", //留言内容
				time: "2024.3.6",
				adress: "北京"
			},
			{
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容222222222", //留言内容
				time: "2024.3.6",
				adress: "上海"
			},
			{
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容333333333", //留言内容
				time: "2024.3.6",
				adress: "深圳"
			}
		] //文章留言
	},
	{
		id: 6, //文章id
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		type: 1, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		campus: 1,
		comment: [
			{
				username: "用户1",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容11111111", //留言内容
				time: "2024.3.6",
				adress: "北京"
			},
			{
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容222222222", //留言内容
				time: "2024.3.6",
				adress: "上海"
			},
			{
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容333333333", //留言内容
				time: "2024.3.6",
				adress: "深圳"
			}
		] //文章留言
	}
];

// console.log(article);

//存放数据
const showData = reactive<{ data: any }>({ data: [] });
//获取动态数据
const getdata = async () => {
	const res = (await community(params)) as any;
	infiniteValue.current = res.data.current;
	infiniteValue.pages = res.data.pages;
	// showData.data.push(...res.data.records);
	showData.data.push(...data);
};

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
console.log(load);

//处理图片
// const getIcon = (name: string) => {
// 	return new URL(name, import.meta.url).href;
// };
// interface DataValueInterface {
// 	time: string;
// 	subject: number;
// 	content: string;
// 	img: string;
// 	userImg: string;
// 	username: string;
// 	id: number;
// 	uid: number;
// }

//改变主题
const changeType = (value: any) => {
	console.log(value);
	params.subject = value;
	params.pageNum = 1;
	showData.data = [];
	getdata();
};
//改变学校
const changeSchool = () => {
	params.school = value.value;
	params.pageNum = 1;
	showData.data = [];
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
		await deletecommunity({ id: value });
		params.pageNum = 1;
		showData.data = [];
		await getdata();
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});
};

onMounted(() => {
	getdata();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
