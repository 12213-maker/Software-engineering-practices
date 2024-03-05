import { defineStore, createPinia } from "pinia";
import { ThemeConfigProps, AssemblySizeType } from "./interface";
import { DEFAULT_PRIMARY } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): any => ({
		//文章
		article: [
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
				type: 0, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
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
		],
		copy: [
			{
				id: 1, //文章id
				create: "不是风动11", //创建人
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
				id: 333, //文章id
				create: "不是风动22", //创建人
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
		],
		//用户
		user: [
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
		],

		//学校食堂

		//课表（待做）

		// token
		token: "",
		// userInfo
		systemMessageLength: "",
		userInfo: "",
		image: "",
		userInformation: {},
		params: {
			pageNum: 0,
			pageSize: 5
		},
		// element组件大小
		assemblySize: "default",
		// language
		language: "",
		// themeConfig
		themeConfig: {
			// 当前页面是否全屏
			maximize: false,
			// 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
			layout: "transverse",
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true,
			// 页脚
			footer: true
		}
	}),
	getters: {
		getArticle: state => state.article
	},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		//setuserinformation
		setUserInformation(userInfo: any) {
			this.userInformation = userInfo;
		},
		setImage(image2: any) {
			this.image = image2;
		},
		// setUserInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: AssemblySizeType) {
			this.assemblySize = assemblySize;
		},
		// updateLanguage
		updateLanguage(language: string) {
			this.language = language;
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig;
		},
		setSystemMessageLength(total: any) {
			this.systemMessageLength = total;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
