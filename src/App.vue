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
// 						email: "18980530858",
// 						sex: 2,
// 						description: "人生如逆旅，我亦是行人。",
// 						school: 1
// 					}
// 				}

// 🍊 👸🏻 ᕼᗩᑭᑭY ᗷIᖇTᕼᗪᗩY 🎂🌷 💵 ²⁰²⁴⁄₀₃₋₂₂ 🥂 𝐂𝐡𝐞𝐞𝐫𝐬 ⸝⸝⸝ 𓏲🍸食拿酒稳👌🏻ᵒᵏᵎᵎᵎ 🐟ྀི 🐖ྀི 怎麼睡不飽😪 ᶻᶻᶻ 电量蓄满🔋⁺¹⁰⁰ 📞
// 日常：逛吃¹下午👭🏻🍧    🥣᪘ 聚餐𝗣𝗹𝗼𝗴 :)    ♬ ♩ ♪ ♫ ♭ ♮ ♯ ♪ 🫧  和好天气出行☁️  ²⁰²⁴⁄₀₃₋₂₁ 🤷🏻‍♀️ 𝗧𝗵𝘂𝗿𝘀𝗱𝗮𝘆
// 实习：喘口气吧小大人⍥⃝
//  多喝咖啡 ⊂☕ྀི⊃ 万事ᵒᵏᵎᵎᵎ ​​​ 𝙇𝙤𝙫𝙚 𝙔𝙤𝙪𝙧𝙨𝙚𝙡𝙛 🌷𓈒𓏸 🥀 ‘’ 𝗗𝗮𝗶𝗹𝘆 𝗣𝗹𝗼𝗼𝗼𝗼𝗴  📍嘞是𝑪𝒉𝒐𝒏𝒈𝒒𝒊𝒏𝒈  “啷个嫩个辣”🥘 在成都的街头走一走👣
// 𝗕𝗲 𝗪𝗶𝘁𝗵 𝗨👫🏻相逢的意义在于照亮彼此  ⏰ ⁾⁾ 𝑾𝒂𝒌𝒆 𝒎𝒆 𝒖𝒑 /•᷅‎‎•᷄\୭₊  𝗴𝗿𝗲𝗲𝗲𝗲𝗲𝗲𝗻 𝗱𝗮𝘆 🚎 ⁼³₌₃
// 在没有天花板的地方 大口吸氧 🏃🏻‍♀️🍃  ⛰️ 🌷  🍰•ᴗ•🥄下午茶   •ᴥ• ∥开心专辑 🫧  橘子色日落🌇/🍊ˎˊ˗  🍰🍹 ♫•*¨🧸*•.¸¸♪✧

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
		// create: "不是风动", //创建人
		// userPhoto: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg", //用户头像
		adress: "四川", //地址
		time: "2024/3/5", //发布时间
		title: "📍𝒀𝒖𝒏𝑵𝒂𝒏---一场说走就走的旅行", //文章标题
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0吹苍山洱海的风🌇/⛰️ˎˊ˗\n
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0阳春三月，云南宣威繁花盛开、桃红柳绿。公园中、小区里、街道上，娇艳欲滴的海棠、樱花、李花迎着春光悄然绽放，一簇簇春花相映成画，处处春和景明、生气勃勃。赏花市民徜徉其间，用相机定格绝美春色。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
				time: "2024.3.6",
				adress: "深圳"
			}
		], //文章留言
		photo: [
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnxtx3xhptj31401hcu0q.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnxtx4bfl2j31401hc7hg.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hntpf8lm7qj31hc1z4hdu.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnxtzax9eqj31401hc4qp.jpg"
		], //文章图片
		subject: 5, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 522, //点赞数量
		school: 1 //学校
	},
	{
		id: 2, //文章id
		uid: 1,
		create: "lnl", //创建人
		userPhoto: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500", //用户头像
		adress: "云南", //地址
		time: "2024-2-26", //发布时间
		title: "🛵💨去有风的地方", //文章标题
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0橘子色日落🌇/🍊ˎˊ˗\n
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0阳春三月，云南宣威繁花盛开、桃红柳绿。公园中、小区里、街道上，娇艳欲滴的海棠、樱花、李花迎着春光悄然绽放，一簇簇春花相映成画，处处春和景明、生气勃勃。赏花市民徜徉其间，用相机定格绝美春色。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0在没有天花板的地方 大口吸氧 🏃🏻‍♀️🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p1: 祝愿世间所有美好都恰逢其时\n
			\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p2: 金色天际线\n
			\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p3: 看到花心情都更美丽了\n
			\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p4: nice~\n
		 `,
		photo: [
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnrd0erqq1j31hc1z47wi.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnrd15ggshj31g41xg1kx.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnrft60nydj31hc1z44qp.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnrhwszmhcj31401hctkm.jpg"
		], //文章图片
		subject: 0, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 2, //学校
		comment: [
			{
				uid: 0,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 1,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
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
						email: "282292790@qq.com",
						school: 2,
						birthday: "2002-1-2",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
					}
				]
			},
			{
				uid: 2,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 1,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
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
						email: "282292790@qq.com",
						school: 2,
						birthday: "2002-1-2",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
					},
					{
						uid: 1,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
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
						email: "282292790@qq.com",
						school: 2,
						birthday: "2002-1-2",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "📍嘞是𝑪𝒉𝒐𝒏𝒈𝒒𝒊𝒏𝒈", //文章标题
		photo: [
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnvinmpskyj31441hg4pk.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnvinq6c1jj31hc1z4u0x.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnviorf3svj31hc1z4qv5.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnviot9p6wj31hc1z41kx.jpg"
		], //文章图片
		subject: 2, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 1, //学校
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0来重庆耍一哈子📍 巴适得很 👍🏻\n
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。

		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0重庆的街头走一走👣
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0“啷个嫩个辣”🥘
      空气里都是火锅香
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 1,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
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
						email: "282259270@qq.com",

						school: 1,
						birthday: "2000-6-7",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.15e970cd0765096178a6da16993cfbb1?rik=IT5KfevidZcTig&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1210%2f22%2fc0%2f14558824_1350879506501.jpg&ehk=X9ro%2fg%2fGTmsglVrbV%2bmy8c3wsAvcHseqcEhsf80RMWA%3d&risl=&pid=ImgRaw&r=0"
					}
				]
			},
			{
				uid: 0,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
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
						email: "282259270@qq.com",

						school: 1,
						birthday: "2000-6-7",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.15e970cd0765096178a6da16993cfbb1?rik=IT5KfevidZcTig&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1210%2f22%2fc0%2f14558824_1350879506501.jpg&ehk=X9ro%2fg%2fGTmsglVrbV%2bmy8c3wsAvcHseqcEhsf80RMWA%3d&risl=&pid=ImgRaw&r=0"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
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
						email: "282259270@qq.com",

						school: 1,
						birthday: "2000-6-7",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.15e970cd0765096178a6da16993cfbb1?rik=IT5KfevidZcTig&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1210%2f22%2fc0%2f14558824_1350879506501.jpg&ehk=X9ro%2fg%2fGTmsglVrbV%2bmy8c3wsAvcHseqcEhsf80RMWA%3d&risl=&pid=ImgRaw&r=0"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "𓅰 𓅬 𓅮 𓅯 𓅷 总有一只海鸥为你停留", //文章标题
		subject: 1, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 1, //学校
		photo: [
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnvfwnpro3j30u00te0wb.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnvfwnpro3j30u00te0wb.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnvfwnpro3j30u00te0wb.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnvfwnpro3j30u00te0wb.jpg"
		], //文章图片
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 🐖ྀི 怎麼睡不飽😪 ᶻᶻᶻ 我有一颗早起的心 可我的被窝不同意\n
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0阳春三月，云南宣威繁花盛开、桃红柳绿。公园中、小区里、街道上，娇艳欲滴的海棠、樱花、李花迎着春光悄然绽放，一簇簇春花相映成画，处处春和景明、生气勃勃。赏花市民徜徉其间，用相机定格绝美春色。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "喘口气吧小大人", //文章标题
		subject: 4, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 1, //学校
		photo: [
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnvfwongnlj30eb0ebdh2.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnvfwongnlj30eb0ebdh2.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnvfwongnlj30eb0ebdh2.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hnvfwongnlj30eb0ebdh2.jpg"
		], //文章图片
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 多喝咖啡 ⊂☕ྀི⊃ 万事ᵒᵏᵎᵎᵎ 电量蓄满🔋⁺¹⁰⁰ 📞\n
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0阳春三月，云南宣威繁花盛开、桃红柳绿。公园中、小区里、街道上，娇艳欲滴的海棠、樱花、李花迎着春光悄然绽放，一簇簇春花相映成画，处处春和景明、生气勃勃。赏花市民徜徉其间，用相机定格绝美春色。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "📸𝗕𝗲 𝗪𝗶𝘁𝗵 𝗨", //文章标题
		subject: 1, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 2, //学校
		photo: [
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnv8v6di5xj31kq23m4qq.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnv8v6di5xj31kq23m4qq.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnv8v6di5xj31kq23m4qq.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnv8v6di5xj31kq23m4qq.jpg"
		], //文章图片
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 👫🏻相逢的意义在于照亮彼此\n
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0阳春三月，云南宣威繁花盛开、桃红柳绿。公园中、小区里、街道上，娇艳欲滴的海棠、樱花、李花迎着春光悄然绽放，一簇簇春花相映成画，处处春和景明、生气勃勃。赏花市民徜徉其间，用相机定格绝美春色。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "🛰 每一片落叶的意义", //文章标题
		subject: 1, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 522, //点赞数量
		school: 1, //学校
		photo: [
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnv8purco4j31jg21we81.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnv8purco4j31jg21we81.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnv8purco4j31jg21we81.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnv8purco4j31jg21we81.jpg"
		], //文章图片
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 👫🏻喘口气吧小大人\n
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0阳春三月，云南宣威繁花盛开、桃红柳绿。公园中、小区里、街道上，娇艳欲滴的海棠、樱花、李花迎着春光悄然绽放，一簇簇春花相映成画，处处春和景明、生气勃勃。赏花市民徜徉其间，用相机定格绝美春色。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
				time: "2024.3.6",
				adress: "深圳"
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
		title: "🍩 学校周围的饭还挺好吃的ﻌﻌﻌ❤︎", //文章标题
		content: `\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0🍰•ᴗ•🥄下午茶\n
			\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p1: 面条真的超级好吃，感觉可以天天吃\n
			\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p2: 太辣了，肚子受不了，但是味道非常nice，感觉可以一周吃一次\n
			\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p3: 小龙虾不用多说了，直接统治吃货的心\n
			\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 p4: 冰冰凉凉哟~~\n
			`, //文章内容
		photo: [
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hns2ovk3rkj31hc1z44qp.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnq9w6vv79j31hc1z4npd.jpg",
			"https://wx3.sinaimg.cn/orj360/006mtPxvly1hns2ldcil5j31hc1z4b2a.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnskqkhq8pj31hc1z41kx.jpg"
		], //文章图片
		subject: 0, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 2, //学校
		comment: [
			{
				uid: 0,
				info: "哇看起来就很好吃诶，第一张店铺名字在哪里啊？", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 1,
						info: "我也忘了在哪里买的了。", //留言内容
						time: "2024/3/6",
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
						email: "282292790@qq.com",
						school: 2,
						birthday: "2002-1-2",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
					}
				]
			},
			{
				uid: 2,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "最后一张图里面的东西在哪里买的啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 1,
						info: "在正因街有个巷子里面。", //留言内容
						time: "2024/3/7",
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
						email: "282292790@qq.com",
						school: 2,
						birthday: "2002-1-2",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
					},
					{
						uid: 1,
						info: "哪天我们可以一起去", //留言内容
						time: "2024/3/7",
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
						email: "282292790@qq.com",
						school: 2,
						birthday: "2002-1-2",
						backgroundImg:
							"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "潇洒哦", //留言内容
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
		title: "排序算法总结", //文章标题
		subject: 2, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 1, //学校
		photo: [
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnvfwqtolvj30u00td44k.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnvfwqtolvj30u00td44k.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnvfwqtolvj30u00td44k.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnvfwqtolvj30u00td44k.jpg"
		], //文章图片
		content: `
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0 冒泡排序：相邻交换\n
		\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0冒泡排序是一种交换排序，核心是冒泡，把数组中最小的那个往上冒，冒的过程就是和他相邻的元素交换。冒泡排序有一种优化算法，就是立一个 flag，当在一趟序列遍历中元素没有发生交换，则证明该序列已经有序。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "有些人一旦错过 真踏马谢天谢地", //文章标题
		subject: 3, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 1, //学校
		photo: [
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnwn2yopz3j30jg0hkdh3.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnwn2yopz3j30jg0hkdh3.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnwn2yopz3j30jg0hkdh3.jpg",
			"https://wx4.sinaimg.cn/orj360/006mtPxvly1hnwn2yopz3j30jg0hkdh3.jpg"
		], //文章图片
		content: `\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "等我有钱了 路上的狗我都甩两百", //文章标题
		subject: 5, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 1, //学校
		photo: [
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnwn2yhcanj30j60j6gpn.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnwn2yhcanj30j60j6gpn.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnwn2yhcanj30j60j6gpn.jpg",
			"https://wx1.sinaimg.cn/orj360/006mtPxvly1hnwn2yhcanj30j60j6gpn.jpg"
		], //文章图片
		content: `\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
		title: "⏰ ⁾⁾ 𝑾𝒂𝒌𝒆 𝒎𝒆 𝒖𝒑 /•᷅‎‎•᷄\୭₊", //文章标题
		subject: 1, //表白：0，吐槽：1，知识：2，趣玩：3，实习兼职：4，日常：5
		stars: 2, //点赞数量
		school: 2, //学校
		photo: [
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnx57v3tgaj31hc1z4b2a.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnx57v3tgaj31hc1z4b2a.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnx57v3tgaj31hc1z4b2a.jpg",
			"https://wx2.sinaimg.cn/orj360/006mtPxvly1hnx57v3tgaj31hc1z4b2a.jpg"
		], //文章图片
		content: `\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0不会永远在梦中 🌷🍃
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0无需滤镜 📸 随手一拍都是风景
		\n\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0让生命以自己喜欢的方式运行，而非成为别人期待的结果！我要当我生命的主角，最近也是悟到了这个点，我的生命要听自己的内在声音，不是听从外面的。
		 `, //文章内容
		comment: [
			{
				uid: 2,
				info: "好漂亮！哪里拍的啊，我也想去拍点照片嘿嘿嘿。", //留言内容
				time: "2024.3.6",
				adress: "北京",
				reply: [
					{
						uid: 0,
						info: "都是随手拍的，不知道具体位置在哪里。", //留言内容
						time: "2024/3/6",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 1,
				username: "用户2",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "漂亮，第三张是什么花啊？", //留言内容
				time: "2024.3.6",
				adress: "上海",
				reply: [
					{
						uid: 0,
						info: "我也不知道，看起来有点糊", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					},
					{
						uid: 0,
						info: "等下次遇见搜一下。", //留言内容
						time: "2024/3/7",
						id: 0,
						password: 123456,
						account: "admin", //校园账号
						username: "更与行人别",
						roleId: 1, //1-管理员  0-普通用户
						description: "人生如逆旅，我亦是行人。",
						img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e", //头像
						adress: "四川", //地址
						phone: "18980530858",
						email: "2822592790@qq.com",
						birthday: "2001-10-27",
						sex: 2,
						school: 1,
						backgroundImg: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
					}
				]
			},
			{
				uid: 3,
				username: "用户3",
				userPhoto: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				info: "你用什么手机拍的照啊？", //留言内容
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
			email: "2822592790@qq.com",
			birthday: "2001-10-27",
			Biography: `
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0蚊子对我很好\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0围着我转\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0给我唱歌\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0最重要的是\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0它还给我发红包\n

	`,

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
			email: "282292790@qq.com",

			school: 2,
			birthday: "2002-1-2",
			Biography: `
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0瘦成⚡️\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0减肥日记\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0今日减肥计划🕸️\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0挤进s码中\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0目标🎯：90斤 \n
	`,

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
			email: "282259270@qq.com",

			school: 1,
			birthday: "2000-6-7",
			Biography: `
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0❬ 祝我生日快樂 ❭ ˁ῁̬ˀ\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0浅过¹下生日“👸🏻”\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0ᕼᗩᑭᑭY ᗷIᖇTᕼᗪᗩY\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0嗨皮啵斯得 𝑡𝑜 𝑚𝑒\n`,

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
			description: "别告诉我月亮多明亮，让我看到碎玻璃上的光。",
			img: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500", //头像
			roleId: 0,
			phone: "19980834457",
			adress: "四川", //地址
			sex: 1,
			email: "222592790@qq.com",

			school: 2,
			birthday: "2002-1-2",
			Biography: `
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0❬ 祝我生日快樂 ❭ ˁ῁̬ˀ\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0浅过¹下生日“👸🏻”\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0ᕼᗩᑭᑭY ᗷIᖇTᕼᗪᗩY\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0嗨皮啵斯得 𝑡𝑜 𝑚𝑒\n`,

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
			Biography: `
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0关于夏天\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0白色T恤\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0冰镇汽水\n
	\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0西瓜和小龙虾\n`,
			roleId: 1,
			img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622210133_f97c0.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712652190&t=f9c79aa803549c9402ba43ab6e156d74", //头像
			phone: "15928778347",
			adress: "四川", //地址
			email: "28225790@qq.com",

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

	item.comment = item.comment.map((item: any) => {
		const { uid } = item;
		const finduser = user.find((item2: any) => item2.id === uid)?.userinfo || {};
		return { ...item, ...finduser, userPhoto: finduser?.img };
	});

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
