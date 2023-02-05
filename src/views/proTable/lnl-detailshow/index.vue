<template>
	<div>
		<div class="outer">
			<div class="container">
				<el-carousel class="carousel">
					<el-carousel-item class="carouselItem" v-for="city in data" :key="city">
						<img :src="getIcon(city.url)" alt="" />
						<h3 class="small justify-center" text="2xl">
							<div class="titile">{{ city.name }}</div>
							{{ city.des }}
						</h3>
					</el-carousel-item>
				</el-carousel>
				<div class="describe">
					<el-descriptions class="margin-top" title="" :column="1" size="large" border>
						<template #extra>
							<div class="title">
								{{ data2.name }}
								<el-rate disabled allow-half v-model="data2.score" score-template="{value} points" />
								<span class="score">{{ data2.score }}</span>
							</div>
						</template>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<office-building />
									</el-icon>
									城市
								</div>
							</template>
							{{ data2.city }}
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<iphone />
									</el-icon>
									电话
								</div>
							</template>
							{{ data2.phone }}
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<location />
									</el-icon>
									地址
								</div>
							</template>
							{{ data2.position }}
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<div class="cell-item">
									<el-icon>
										<office-building />
									</el-icon>
									介绍
								</div>
							</template>
							<div class="information">
								{{ data2.information }}
							</div>
						</el-descriptions-item>
					</el-descriptions>
				</div>
			</div>
			<div class="bottom">
				<div class="total">
					<div>
						<span style="padding-right: 50px">{{ `评论（${comment.length}）` }}</span>
						<span>最新 | 热评</span>
					</div>
					<el-button type="primary" round :icon="ChatLineRound" @click="dialogVisible = true">评论</el-button>
				</div>
				<div class="comment" v-for="item in comment" :key="item.id">
					<div class="avatar">
						<div class="avatarimage"><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.username }}</span>
						<el-rate disabled allow-half v-model="item.score" score-template="{value} points" />
						<span class="score">{{ item.score }}分</span>
					</div>
					<div class="usercomment">
						{{ item.comment }}
					</div>
					<div class="imageOter">
						<img v-for="picture in item.pictures" class="image" :key="picture" :src="getIcon(picture)" alt="" />
					</div>
					<div class="timecontaner">
						<span>{{ item.time }}</span>
						<div>
							<el-button round :icon="Star" @click="changeMyLike(trunTrue, item.id)" v-if="!item.myLike">{{
								item.likes
							}}</el-button>
							<el-button type="warning" round @click="changeMyLike(trunFalse, item.id)" v-else :icon="StarFilled">{{
								item.likes
							}}</el-button>
							<el-button type="danger" round :icon="Warning">举报</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog align-center draggable v-model="dialogVisible" title="评论" width="30%">
			<el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="giveAComment(false)">取消</el-button>
					<el-button type="primary" @click="giveAComment(true)"> 发送 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { Star, StarFilled, Warning, ChatLineRound } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
// import { ElMessageBox } from "element-plus";

const dialogVisible = ref(false);
const textarea = ref("");
const data = [
	{
		name: "布达拉宫",
		url: "../../../assets/lnl_images/23151340944_3865x2899.jpg",
		des: "布达拉宫位于中国西藏自治区首府拉萨市区西北的玛布日山上，是一座宫堡式建筑群，一说为吐蕃王朝赞普松赞干布为迎娶尺尊公主和文成公主而兴建 [17]  [24]  ；另一说为，作为松赞干布迁都拉萨后的王宫而建。 [25]  于17世纪重建后，成为历代达赖喇嘛的冬宫居所，为西藏政教合一的统治中心。1961年，布达拉宫成为了中华人民共和国国务院第一批全国重点文物保护单位之一。1994年，布达拉宫被列为世界文化遗产。布达拉宫的主体建筑为白宫和红宫两部分。",
		tourists: 1221
	},
	{
		name: "南迦巴瓦峰",
		url: "../../../assets/lnl_images/c8177f3e6709c93d40cebc4a983df8dcd100544a.jpg",
		des: "它是西藏最古老的佛教“雍仲本教”的圣地，有“西藏众山之父”之称。同时，紧邻着的雅鲁藏布大峡谷绕着他转了一个马蹄形的弯，随后通向印度洋方向延伸出去。南迦巴瓦峰别称“木卓巴尔山”，其巨大的三角形峰体终年积雪，云雾缭绕，从不轻易露出真面目，所以它也被称为“羞女峰”。南迦巴瓦在藏语中有多种解释，一为“雷电如火燃烧”，一为“直刺天空的长矛”，还有一为“天山掉下来的石头”。后一个名字来源于《格萨尔王传》中的“门岭一战”，在这段中将南迦巴瓦峰描绘成“状若长矛，直刺苍穹”。",
		tourists: 1221
	},
	{
		name: "纳木措",
		url: "../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
		des: "纳木措，位于西藏自治区中部，是西藏第二大湖泊，也是中国第三大的咸水湖。湖面海拔4718米，形状近似长方形，东西长70多千米，南北宽30多千米，面积约1961km²。 [1] 早期的科学考察认为，纳木措的最大深度为33米，但最近两年对湖泊的重新测量发现，纳木措最深处超过了120米。蓄水量768亿立方米，为世界上海拔最高的大型湖泊。",
		tourists: 1221
	},
	{
		name: "巴松措",
		url: "../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg",
		des: "巴松措又名措高湖，藏语中是“绿色的水”的意思，长约18公里，湖面面积约27平方公里，最深处达120米，湖面海拔3480米。位于距工布江达县巴河镇约36千米的巴河上游的高峡深谷里，是红教的一处著名神湖和圣地。",
		tourists: 1221
	}
];
const data2 = {
	id: 4,
	type1: 1,
	type2: 1,
	name: "阳光家常菜(岷山路店)",
	picture: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg",
	score: 4.5,
	position: " 成都市新都区岷山南路二段100号",
	phone: 18980530856,
	information:
		"000000000000000000000000022222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222200000000000000000000000000000家常菜，人均25元，营业时间9:00-22:00",
	number: "B03460NX2R",
	city: "成都",
	placePictures: null
};
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
const comment = reactive([
	{
		id: 2,
		pid: 1,
		uid: 2,
		score: 4,
		comment:
			"好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。好吃，家常菜味道好。v",
		time: "2023-02-04 11:29:26",
		likes: 225,
		username: "木子曰李",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: true
	},
	{
		id: 3,
		pid: 1,
		uid: 2,
		score: 4.5,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 4,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 5,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 6,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	},
	{
		id: 7,
		pid: 1,
		uid: 2,
		score: 4,
		comment: "好吃，家常菜味道好。",
		time: "2023-02-04 11:29:26",
		likes: 0,
		username: "cjw",
		userImg: "default",
		pictures: [
			"../../../assets/lnl_images/23151340944_3865x2899.jpg",
			"../../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
			"../../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg"
		],
		myLike: false
	}
]);
const changeMyLike = (flag: any, ide: any) => {
	console.log(flag, ide);
	comment.map(item => {
		if (item.id === ide) {
			item.myLike = !item.myLike;
		}
	});
};
const giveAComment = (flag: any) => {
	if (flag) {
		console.log(textarea.value);
		textarea.value = "";
	}
	dialogVisible.value = false;
};
</script>

<style scoped lang="scss">
.outer {
	padding: 20px 130px;
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 300px;
		overflow: hidden;
		border-radius: 10px;
		.carousel {
			width: 44%;
			height: 100%;
			border-radius: 10px;
			.carouselItem {
				width: 100%;
				height: 100%;
				font-size: 16px;
				img {
					position: absolute;
					width: 100%;
					height: 100%;
				}
				.small {
					position: absolute;
					padding: 0 15px;
					padding-top: 10px;
					font-size: 17px;
					.titile {
						padding-bottom: 20px;
						font-size: 22px;
					}
				}
			}
		}
		.describe {
			width: 55%;
			height: 100%;
			overflow: hidden;
			border-radius: 10px;
			.margin-top {
				position: relative;
				height: 100%;
				background-color: rgb(245 247 250);
				border-radius: 10px;
				.title {
					position: relative;
					top: 5px;
					left: -50%;
					font-size: 22px;
					font-weight: 700;
				}
				.cell-item {
					width: 60px;
				}
				.information {
					width: 42vw;
					height: 80px;
				}
			}
		}
	}
	.bottom {
		margin-top: 40px;
		overflow: hidden;
		background-color: rgb(245 247 250);
		border-radius: 10px;
		box-shadow: 0 0 50px 0 #dbdbdb;
		.total {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20px;
			padding-top: 10px;
			font-size: 20px;
			line-height: 40px;
			color: #4f4f4f;
		}
		.comment {
			padding: 20px;
			padding-left: 70px;
			margin: 10px;
			color: #4f4f4f;
			background-color: white;
			border-radius: 10px;
			.avatar {
				position: relative;
				left: -60px;
				display: flex;
				align-items: center;
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
}
</style>
