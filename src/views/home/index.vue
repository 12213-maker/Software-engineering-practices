<template>
	<div class="dataVisualize-box">
		<div class="card top-box">
			<div class="top-title">热门旅游地区</div>
			<el-tabs v-model="tabActive" class="demo-tabs">
				<el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name">
					<div class="top-content">
						<el-row :gutter="40">
							<el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
								<div class="item-left sle" :style="{ backgroundImage: `url(${item.url})` }">
									<span class="left-title">游客访问总数</span>
									<div class="img-box">
										<img src="./images/today.png" alt="" />
									</div>
									<span class="left-number">848.132w</span>
								</div>
							</el-col>
							<el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
								<div class="item-center">
									<div v-for="(item2, index) in item.cities" :key="index" class="gitee-traffic traffic-box">
										<div class="traffic-img" :style="{ backgroundImage: `url(${item2.url})` }">
											<img :src="getIcon(item2.url)" alt="" />
										</div>
										<span class="item-value">{{ item2.tourists }}</span>
										<span class="traffic-name sle">{{ item2.name }}</span>
										<el-rate disabled v-model="value1" score-template="{value} points" />
									</div>
								</div>
							</el-col>
							<el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
								<div class="item-right">
									<div class="book-echarts">
										<el-carousel class="carousel">
											<el-carousel-item class="carouselItem" v-for="city in item.cities" :key="city">
												<img :src="getIcon(city.url)" alt="" />
												<h3 class="small justify-center" text="2xl">
													<div class="titile">{{ city.name }}</div>
													{{ city.des }}
												</h3>
											</el-carousel-item>
										</el-carousel>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="card bottom-box">
			<div class="bottom-title">数据来源</div>
			<div class="bottom-tabs">
				<el-tabs v-model="tabActive2" class="demo-tabs">
					<el-tab-pane v-for="item in tab1" :key="item.name" :label="item.label" :name="item.name">
						<div class="curve-echarts">
							<Curve ref="curveRef" :curveData="curveData" />
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, onMounted } from "vue";
import Curve from "./components/curve.vue";

const tabActive = ref(1);
const tabActive2 = ref(1);
const curveRef = ref();
const value1 = ref(5);

onMounted(() => {
	// console.log(curveRef.value, "curveref");
	// curveRef.value.initChart(curveData);
});

const tab = [
	{
		label: "四川",
		cities: [
			{ name: "九寨沟黄龙", url: "", des: "", tourists: 1221 },
			{ name: "青城山都江堰", url: "", des: "", tourists: 1221 },
			{ name: "峨眉乐山", url: "", des: "", tourists: 1221 },
			{ name: "四姑娘山", url: "", des: "", tourists: 1221 }
		],
		url: "https://img1.baidu.com/it/u=399418045,3672495203&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=934",
		name: 1
	},
	{
		label: "云南",
		cities: [
			{ name: "丽江", url: "", des: "", tourists: 1221 },
			{ name: "西双版纳", url: "", des: "", tourists: 1221 },
			{ name: "大理", url: "", des: "", tourists: 1221 },
			{ name: "昆明", url: "", des: "", tourists: 1221 }
		],
		url: "https://img1.baidu.com/it/u=4278221815,4014350372&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
		name: 2
	},
	{
		label: "重庆",
		cities: [
			{ name: "大足石刻", url: "", des: "", tourists: 1221 },
			{ name: "酉阳桃花源", url: "", des: "", tourists: 1221 },
			{ name: "洪崖洞", url: "", des: "", tourists: 1221 },
			{ name: "凤凰古城", url: "", des: "", tourists: 1221 }
		],
		url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201910%2F19%2F20191019090541_niytw.thumb.700_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677823664&t=ab6dddefb77d855e2de1a23b2bd78399",
		name: 3
	},
	{
		label: "西藏",
		cities: [
			{
				name: "布达拉宫",
				url: "../../assets/lnl_images/23151340944_3865x2899.jpg",
				des: "布达拉宫位于中国西藏自治区首府拉萨市区西北的玛布日山上，是一座宫堡式建筑群，一说为吐蕃王朝赞普松赞干布为迎娶尺尊公主和文成公主而兴建 [17]  [24]  ；另一说为，作为松赞干布迁都拉萨后的王宫而建。 [25]  于17世纪重建后，成为历代达赖喇嘛的冬宫居所，为西藏政教合一的统治中心。1961年，布达拉宫成为了中华人民共和国国务院第一批全国重点文物保护单位之一。1994年，布达拉宫被列为世界文化遗产。布达拉宫的主体建筑为白宫和红宫两部分。",
				tourists: 1221
			},
			{
				name: "南迦巴瓦峰",
				url: "../../assets/lnl_images/c8177f3e6709c93d40cebc4a983df8dcd100544a.jpg",
				des: "它是西藏最古老的佛教“雍仲本教”的圣地，有“西藏众山之父”之称。同时，紧邻着的雅鲁藏布大峡谷绕着他转了一个马蹄形的弯，随后通向印度洋方向延伸出去。南迦巴瓦峰别称“木卓巴尔山”，其巨大的三角形峰体终年积雪，云雾缭绕，从不轻易露出真面目，所以它也被称为“羞女峰”。南迦巴瓦在藏语中有多种解释，一为“雷电如火燃烧”，一为“直刺天空的长矛”，还有一为“天山掉下来的石头”。后一个名字来源于《格萨尔王传》中的“门岭一战”，在这段中将南迦巴瓦峰描绘成“状若长矛，直刺苍穹”。",
				tourists: 1221
			},
			{
				name: "纳木措",
				url: "../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
				des: "纳木措，位于西藏自治区中部，是西藏第二大湖泊，也是中国第三大的咸水湖。湖面海拔4718米，形状近似长方形，东西长70多千米，南北宽30多千米，面积约1961km²。 [1] 早期的科学考察认为，纳木措的最大深度为33米，但最近两年对湖泊的重新测量发现，纳木措最深处超过了120米。蓄水量768亿立方米，为世界上海拔最高的大型湖泊。",
				tourists: 1221
			},
			{
				name: "巴松措",
				url: "../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg",
				des: "巴松措又名措高湖，藏语中是“绿色的水”的意思，长约18公里，湖面面积约27平方公里，最深处达120米，湖面海拔3480米。位于距工布江达县巴河镇约36千米的巴河上游的高峡深谷里，是红教的一处著名神湖和圣地。",
				tourists: 1221
			}
		],
		url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F31%2F20181231151301_an4h3.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677824635&t=2e7d997c31a4e390d07754e70f7138b0",
		name: 4
	},
	{
		label: "厦门",
		cities: [
			{
				name: "厦门方特梦幻王国",
				url: "",
				des: "",
				tourists: 1221
			},
			{ name: "厦门园林植物园", url: "", des: "", tourists: 1221 },
			{ name: "椰风寨", url: "", des: "", tourists: 1221 },
			{ name: "菽庄花园", url: "", des: "", tourists: 1221 }
		],
		url: "https://kr.shanghai-jiuxin.com/file/2021/0304/6ec2fe6b445df7478e2fd484c0378ee9.jpg",
		name: 5
	}
];

const tab1 = [
	{ label: "总游客排行榜", name: 1 }
	// { label: "2023春节游客排行榜", name: 2 }
];
const curveData = [
	{ value: 5387, spotName: "四川" },
	{ value: 4514, spotName: "云南" },
	{ value: 4135, spotName: "江苏" },
	{ value: 3375, spotName: "河南" },
	{ value: 3334, spotName: "湖北" },
	{ value: 2531, spotName: "浙江" },
	{ value: 2087, spotName: "福建" },
	{ value: 1567, spotName: "湖南" },
	{ value: 1154, spotName: "吉林" },
	{ value: 1104, spotName: "黑龙江" },
	{ value: 1022, spotName: "辽宁" },
	{ value: 1012, spotName: "甘肃" },
	{ value: 1002, spotName: "上海" }
];

const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
