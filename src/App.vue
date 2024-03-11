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

//登录用户
// data: {
// 					token:
// 						"-BUl8EZf65F-Dvy_yR8FoATTxCjn6VHsoiZMFDorJfghOCyll4lqYB_rv-6WsuIctJJpwgn1WlJLpi0mjv5K9K_RUU2emAM7lbiIa1fk3o5_Nj8iL6tUS-ILnso1HRml",
// 					user: {
// 						id: 0,
// 						roleId: 1,//1-管理员  0-普通用户
//						account:admin, //用户名
// 						username: "更与行人别",
// 						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e",
// 						password: "123456",
// 						birthday: "2001-10-27",
// 						phone: "18980530858",
// 						sex: 2,
// 						description: "人生如逆旅，我亦是行人。",
// 						school: 1
// 					}
// 				}

let article = [
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
		uid: 0,
		create: "不是风动", //创建人
		userPhoto: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg", //用户头像
		adress: "四川", //地址

		time: "2024/3/5", //发布时间
		title: "凤凰古城非常美丽", //文章标题
		content:
			"凤凰古城建于清康熙四十三年（1704年），东门和北门古城楼尚在。城内青石板街道、江边木结构吊脚楼，以及朝阳宫、古城博物馆、杨家祠堂、沈从文故居、熊希龄故居、天王庙、大成殿、万寿宫等建筑，全都透着古城特色。", //文章内容
		photo: [
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
		], //文章图片
		subject: 3, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 522, //点赞数量
		school: 1, //学校
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
		title: "兔兔的文章", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: [
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
		], //文章图片
		subject: 0, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 2, //学校
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
		uid: 2,
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
		school: 1, //学校
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
		uid: 1,
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "兔兔的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		subject: 4, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 1, //学校
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
		school: 1, //学校
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
		uid: 1,
		create: "不是风动", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-3-6", //发布时间
		title: "兔兔的文章标题", //文章标题
		content:
			"丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。", //文章内容
		photo: ["https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"], //文章图片
		subject: 1, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 2, //学校
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
		id: 7, //文章id
		uid: 0,
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
		school: 1, //学校
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
		id: 8, //文章id
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
		school: 2, //学校
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
		id: 9, //文章id
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
		school: 1, //学校
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
		id: 10, //文章id
		uid: 2,
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
		school: 1, //学校
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
		id: 11, //文章id
		uid: 2,
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
		school: 1, //学校
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
		id: 12, //文章id
		uid: 2,
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
		school: 2, //学校
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
			id: 0,
			password: 123456,
			account: "admin", //校园账号
			username: "更与行人别",
			roleId: 1, //1-管理员  0-普通用户
			description: "人生如逆旅，我亦是行人。",
			img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
			adress: "四川", //地址
			phone: "18980530858",
			birthday: "2001-10-27",
			sex: 2,
			school: 1,
			backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
		},
		articles: [1, 5, 7, 9], //发布文章
		collect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //我的收藏
		starts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //我的点赞
		fans: [1, 2], //我的粉丝
		follow: [1, 2, 3, 4] //我的关注
	},
	{
		id: 1,
		userinfo: {
			id: 1,
			password: 123456,
			account: "admin1", //校园账号
			username: "兔兔",
			description: "欲买桂花同载酒,终不似,少年游",
			img: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500", //头像
			roleId: 0,
			phone: "19980834457",
			adress: "四川", //地址
			sex: 1,
			school: 2,
			birthday: "2002-1-2",
			backgroundImg:
				"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
		},
		articles: [2, 4, 6, 8], //发布文章
		collect: [3, 4, 5], //我的收藏
		starts: [3, 4, 5], //我的点赞
		fans: [0, 2], //我的粉丝
		follow: [0, 2] //我的关注
	},
	{
		id: 2,
		userinfo: {
			id: 2,
			password: 123456,
			account: "admin2", //校园账号
			username: "知觉钝化",
			description: "我从一出生就是一个自闭小孩",
			roleId: 1,
			img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622210133_f97c0.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712652190&t=f9c79aa803549c9402ba43ab6e156d74", //头像
			phone: "15928778347",
			adress: "四川", //地址
			sex: 2,
			school: 1,
			birthday: "2000-6-7",
			backgroundImg:
				"https://ts1.cn.mm.bing.net/th/id/R-C.15e970cd0765096178a6da16993cfbb1?rik=IT5KfevidZcTig&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1210%2f22%2fc0%2f14558824_1350879506501.jpg&ehk=X9ro%2fg%2fGTmsglVrbV%2bmy8c3wsAvcHseqcEhsf80RMWA%3d&risl=&pid=ImgRaw&r=0"
		},
		articles: [10, 3, 11, 12], //发布文章
		collect: [6, 7, 8], //我的收藏
		starts: [6, 7, 8], //我的点赞
		fans: [0, 1], //我的粉丝
		follow: [0, 1] //我的关注
	},
	{
		id: 3,
		userinfo: {
			id: 3,
			password: 123456,
			account: "admin1", //校园账号
			username: "兔兔2",
			description: "欲买桂花同载酒,终不似,少年游",
			img: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500", //头像
			roleId: 0,
			phone: "19980834457",
			adress: "四川", //地址
			sex: 1,
			school: 2,
			birthday: "2002-1-2",
			backgroundImg:
				"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
		},
		articles: [], //发布文章
		collect: [3, 4, 5], //我的收藏
		starts: [3, 4, 5], //我的点赞
		fans: [0, 2], //我的粉丝
		follow: [0, 2] //我的关注
	},
	{
		id: 4,
		userinfo: {
			id: 4,
			password: 123456,
			account: "admin2", //校园账号
			username: "知觉钝化2",
			description: "我从一出生就是一个自闭小孩",
			roleId: 1,
			img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622210133_f97c0.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712652190&t=f9c79aa803549c9402ba43ab6e156d74", //头像
			phone: "15928778347",
			adress: "四川", //地址
			sex: 2,
			school: 1,
			birthday: "2000-6-7",
			backgroundImg:
				"https://ts1.cn.mm.bing.net/th/id/R-C.15e970cd0765096178a6da16993cfbb1?rik=IT5KfevidZcTig&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1210%2f22%2fc0%2f14558824_1350879506501.jpg&ehk=X9ro%2fg%2fGTmsglVrbV%2bmy8c3wsAvcHseqcEhsf80RMWA%3d&risl=&pid=ImgRaw&r=0"
		},
		articles: [], //发布文章
		collect: [6, 7, 8], //我的收藏
		starts: [6, 7, 8], //我的点赞
		fans: [0, 1, 2], //我的粉丝
		follow: [0] //我的关注
	}
];

article = article.map((item: any) => {
	const { uid } = item;
	const { id, ...userInfo } = user.find((item2: any) => item2.id === uid)?.userinfo || {};
	return { id, ...item, ...userInfo };
});

globalStore.setArticles(article);
globalStore.setOriginArticles(article);
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
