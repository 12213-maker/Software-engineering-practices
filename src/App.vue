<template>
	<el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { GlobalStore } from "@/stores";
import { useTheme } from "@/hooks/useTheme";
import { getBrowserLang } from "@/utils/util";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

const globalStore = GlobalStore();
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: false
});

const article = [
	// {
	// 	id: 0, //文章id
	//	create: "创建人", //创建人
	//  uid:'文章创建人id'
	// 	userPhoto: "头像", //用户头像
	// 	adress: "地址", //地址
	// 	time: "发表时间", //发布时间
	// 	title: "文章标题", //文章标题
	// 	content: "文章内容", //文章内容
	// 	photo: "文章图片", //文章图片
	// 	subject: "文章类别", //表白：1，日常：2，知识：3，趣玩：4
	// 	stars: "点赞数", //点赞数量
	// comment: [
	// username: "用户1",
	// 		userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
	// 		info: "留言内容11111111", //留言内容
	// 		time: "2024.3.6",
	// 		adress: "北京",
	// 		reply
	// ]
	// "文章留言" //文章留言
	// },
	{
		id: 1, //文章id
		uid: 1,
		create: "不是风动", //创建人
		userPhoto: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg", //用户头像
		adress: "四川", //地址
		time: "2024/3/5", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"凤凰古城建于清康熙四十三年（1704年），东门和北门古城楼尚在。城内青石板街道、江边木结构吊脚楼，以及朝阳宫、古城博物馆、杨家祠堂、沈从文故居、熊希龄故居、天王庙、大成殿、万寿宫等建筑，全都透着古城特色。", //文章内容
		photo: [
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
		], //文章图片
		subject: 3, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 522, //点赞数量
		comment: [
			{
				username: "用户1",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "我觉得非常不错但是很多内容都是没有必要的江东父老看书看对方哈理工 领导机构 ", //留言内容
				time: "2024/3/6",
				adress: "北京",
				reply: [
					{
						username: "用户2",
						userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
						info: "回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容", //留言内容
						time: "2024/3/6",
						adress: "上海"
					},
					{
						username: "用户3",
						userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
						info: "留言内容333333333", //留言内容
						time: "2024/3/6",
						adress: "深圳"
					}
				]
			},
			{
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容222222222", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						username: "用户2",
						userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
						info: "回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容", //留言内容
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
				]
			},
			{
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "留言内容333333333", //留言内容
				time: "2024.3.6",
				adress: "深圳",
				reply: [
					{
						username: "用户2",
						userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
						info: "回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容", //留言内容
						time: "2024.3.6",
						adress: "上海"
					},
					{
						username: "用户3",
						userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
						info: "留言内容333333333", //留言内容
						time: "2024.3.6",
						adress: "深圳"
					},
					{
						username: "用户2",
						userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
						info: "回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容", //留言内容
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
				]
			}
		] //文章留言
	},
	{
		id: 2, //文章id
		uid: 1,
		create: "lnl", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
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
		subject: 0, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
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
		uid: 0,
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		subject: 2, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
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
		uid: 0,
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		subject: 4, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
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
		uid: 0,
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		subject: 5, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
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
		uid: 0,
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "不是风动的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		subject: 1, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
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

const user = [
	{
		id: 0,
		userinfo: {
			password: 123456,
			account: "admin", //校园账号
			userName: "用户名",
			des: "用户简介",
			photo: "头像", //头像
			adress: "地址" //地址
		},
		articles: "发表文章", //发布文章
		collect: "我的收藏", //我的收藏
		starts: "我的点赞", //我的点赞
		fans: "我的粉丝", //我的粉丝
		follow: "我的关注" //我的关注
	},
	{
		id: 1,
		userinfo: {
			password: 123456,
			account: "admin", //校园账号
			userName: "用户名",
			des: "用户简介",
			photo: "头像", //头像
			adress: "地址" //地址
		},
		articles: "发表文章", //发布文章
		collect: "我的收藏", //我的收藏
		starts: "我的点赞", //我的点赞
		fans: "我的粉丝", //我的粉丝
		follow: "我的关注" //我的关注
	}
];

globalStore.setArticles(article);
globalStore.setUsers(user);

// element 语言配置
const i18nLocale = computed(() => {
	if (globalStore.language && globalStore.language == "zh") return zhCn;
	if (globalStore.language == "en") return en;
	return getBrowserLang() == "zh" ? zhCn : en;
});

// 配置全局组件大小
const assemblySize = computed(() => globalStore.assemblySize);
</script>
