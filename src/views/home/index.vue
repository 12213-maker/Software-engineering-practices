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
									<span class="left-number">4150w</span>
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
import { systemMessageunread } from "@/api/modules/lnl-paly";
import { GlobalStore } from "@/stores";

const tabActive = ref(1);
const tabActive2 = ref(1);
const curveRef = ref();
const value1 = ref(5);
const globalStore = GlobalStore();

onMounted(() => {});

const tab = [
	{
		label: "西藏",
		cities: [
			{
				name: "布达拉宫",
				url: "../../assets/lnl_images/23151340944_3865x2899.jpg",
				des: "布达拉宫位于中国西藏自治区首府拉萨市区西北的玛布日山上，是一座宫堡式建筑群，一说为吐蕃王朝赞普松赞干布为迎娶尺尊公主和文成公主而兴建 [17]  [24]  ；另一说为，作为松赞干布迁都拉萨后的王宫而建。 [25]  于17世纪重建后，成为历代达赖喇嘛的冬宫居所，为西藏政教合一的统治中心。1961年，布达拉宫成为了中华人民共和国国务院第一批全国重点文物保护单位之一。1994年，布达拉宫被列为世界文化遗产。布达拉宫的主体建筑为白宫和红宫两部分。",
				tourists: 28174
			},
			{
				name: "南迦巴瓦峰",
				url: "../../assets/lnl_images/c8177f3e6709c93d40cebc4a983df8dcd100544a.jpg",
				des: "它是西藏最古老的佛教“雍仲本教”的圣地，有“西藏众山之父”之称。同时，紧邻着的雅鲁藏布大峡谷绕着他转了一个马蹄形的弯，随后通向印度洋方向延伸出去。南迦巴瓦峰别称“木卓巴尔山”，其巨大的三角形峰体终年积雪，云雾缭绕，从不轻易露出真面目，所以它也被称为“羞女峰”。南迦巴瓦在藏语中有多种解释，一为“雷电如火燃烧”，一为“直刺天空的长矛”，还有一为“天山掉下来的石头”。后一个名字来源于《格萨尔王传》中的“门岭一战”，在这段中将南迦巴瓦峰描绘成“状若长矛，直刺苍穹”。",
				tourists: 26542
			},
			{
				name: "纳木措",
				url: "../../assets/lnl_images/a044ad345982b2b757b0ee3b37adcbef76099b26.jpg",
				des: "纳木措，位于西藏自治区中部，是西藏第二大湖泊，也是中国第三大的咸水湖。湖面海拔4718米，形状近似长方形，东西长70多千米，南北宽30多千米，面积约1961km²。 [1] 早期的科学考察认为，纳木措的最大深度为33米，但最近两年对湖泊的重新测量发现，纳木措最深处超过了120米。蓄水量768亿立方米，为世界上海拔最高的大型湖泊。",
				tourists: 35656
			},
			{
				name: "巴松措",
				url: "../../assets/lnl_images/bba1cd11728b4710b91288b6ad82d4fdfc039245853f.jpg",
				des: "巴松措又名措高湖，藏语中是“绿色的水”的意思，长约18公里，湖面面积约27平方公里，最深处达120米，湖面海拔3480米。位于距工布江达县巴河镇约36千米的巴河上游的高峡深谷里，是红教的一处著名神湖和圣地。",
				tourists: 32655
			}
		],
		url: "https://p1.itc.cn/images01/20200717/def69a4a07f34871bd63ab151e210d9f.jpeg",
		name: 1
	},
	{
		label: "云南",
		cities: [
			{
				name: "丽江",
				url: "https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
				des: "丽江市，云南省辖地级市，位于青藏高原东南缘，滇西北高原，金沙江中游，是国际知名旅游城市 、国家历史文化名城、古代“南方丝绸之路”和“茶马古道”的重要通道 。市区中心位于东经100°25'，北纬26°86'，总面积2.06万平方千米，东接四川凉山彝族自治州和攀枝花市，南连大理白族自治州剑川、鹤庆、宾川三县及楚雄彝族自治州大姚、永仁两县，西、北分别与怒江傈僳族自治州兰坪县及迪庆藏族自治州维西县毗邻。截至2022年，丽江市下辖1个市辖区，4个县。 根据第七次人口普查数据，截至2020年11月1日零时，丽江市常住人口为1253878人。",
				tourists: 36512
			},
			{
				name: "西双版纳",
				url: "https://img0.baidu.com/it/u=3457760878,2087865210&fm=253&fmt=auto&app=120&f=PNG?w=746&h=500",
				des: "西双版纳傣族自治州，是云南省的8个自治州之一，首府景洪市。西双版纳位于北纬21°10′—22°40′，东经99°55′—101°50′，处于北回归线以南的热带北部边沿，面积有19124.5平方千米，东北、西北与普洱市接壤，东南与老挝相连，西南与缅甸接壤，国境线长966.3千米，一江连六国，有4个国家级口岸。",
				tourists: 42563
			},
			{
				name: "大理",
				url: "https://img1.baidu.com/it/u=2419620762,3595692463&fm=253&fmt=auto&app=138&f=JPG?w=753&h=500",
				des: "大理白族自治州，首府驻大理市，是云南的16个地级行政区之一   ，地处云南省中部偏西，海拔2090米，东邻楚雄州，南靠普洱市、临沧市，西与保山市、怒江州相连，北接丽江市。地跨东经98°52′～101°03′，北纬24°41′～26°42′之间，东巡洱海，西及点苍山脉。总面积29459平方千米。  下辖8个县以及3个少数民族自治县。2021年末，全州户籍总人口364.54万人；少数民族人口191.98万人，占总人口的52.7%。",
				tourists: 56523
			},
			{
				name: "昆明",
				url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F2635023%2F02041fbeb8364cbfb9419a4662cf4c40.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMjYzNTAyMy8wMjA0MWZiZWI4MzY0Y2JmYjk0MTlhNDY2MmNmNGM0MC5qcGc%3D%2Fsign%2F023eaf343cd017171651099a1e42654d.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1679365799&t=e21eb0edafb8c2b5599b385813af2704",
				des: "昆明地处中国西南地区、云贵高原中部，位于东经102°10'至103°40'，北纬24°23'至26°22'之间，具有“东连黔桂通沿海，北经川渝进中原，南下越老达泰柬，西接缅甸连印巴”的独特区位，处在南北国际大通道和以深圳为起点的第三座东西向亚欧大陆桥的交汇点，是中国面向东南亚、南亚开放的门户城市，位于东盟“10+1”自由贸易区经济圈、大湄公河次区域经济合作圈、泛珠三角区域经济合作圈的交汇点  。中国昆明进出口商品交易会、中国国际旅游交易会、中国昆明国际旅游节使昆明成为中国主要的会展城市之一",
				tourists: 55621
			}
		],
		url: "https://img1.baidu.com/it/u=4278221815,4014350372&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
		name: 3
	},
	{
		label: "四川",
		cities: [
			{
				name: "九寨沟黄龙",
				url: "https://img0.baidu.com/it/u=3985163215,3814673454&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=745",
				des: "黄龙风景名胜区属青藏高原东部边缘向四川盆地的过渡地带，最高峰为岷山的主峰雪宝峰，海拔5588米，终年积雪，是中国现代冰川的最东点，其他海拔5000米以上的山峰还有6座。",
				tourists: 22435
			},
			{
				name: "青城山都江堰",
				url: "https://img1.baidu.com/it/u=4145987682,4176801528&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=411",
				des: "青城山（Mount Qingcheng），世界文化遗产青城山-都江堰的主体景区、全国重点文物保护单位、国家重点风景名胜区、国家AAAAA级旅游景区、全真龙门派圣地，十大洞天之一，中国四大道教名山之一，五大仙山之一",
				tourists: 25653
			},
			{
				name: "峨眉乐山",
				url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fbd3a8257-6d9d-4793-beb4-35866f092675%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1679365221&t=ff1c8d05454c2f741ba8c6ef9f52d4ea",
				des: "峨眉山大地构造位置地处上杨子板块本部的峨眉一瓦山断块带，为一座背斜断块山。全区构造较复杂，一级构造为峨眉山大背斜及峨眉山大断层，次级构造褶皱主要有：桂花场向斜、牛背山背斜，断层有观心坡断层、牛背山断层和报国寺断层等。主要的构造为峨眉山背斜，位于张沟一洪椿坪一带，轴向南北，长约7千米。桂花场向斜（万年寺向斜）位于纯阳殿一桂花场一带。轴向北西，长约30千米。牛背山背斜（又名挖断山背斜）位于龙门洞一雷岩一带，轴向北西，长约12千米。",
				tourists: 32565
			},
			{
				name: "四姑娘山",
				url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1468b6bc-2cd8-4509-8618-d7ae35e6fbbc%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1679365242&t=bd3c411dfec10542ba50137b788efa72",
				des: "四姑娘山（英语：Siguniang Shan），为横断山脉东部边缘邛崃山的最高峰。藏语名为石骨拉柔达，意为大神山。分别由海拔6250米、5664米、 5454米、 5355米的四座山峰组成，主峰为幺妹峰，高6250米。四座山峰从北到南“一”字排开，且长年冰雪覆盖，如同头披白纱、姿容俊俏的四位少女，山名由此而来 。誉为“蜀山皇后” ",
				tourists: 45623
			}
		],
		url: "https://img1.baidu.com/it/u=399418045,3672495203&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=934",
		name: 2
	},
	{
		label: "重庆",
		cities: [
			{
				name: "大足石刻",
				url: "https://img1.baidu.com/it/u=1565894701,1904872864&fm=253&fmt=auto&app=120&f=PNG?w=750&h=421",
				des: "大足石刻分布于该县西南、西北和东北的扇区，共23处。较集中的有宝顶山、北山等19处。其中以宝顶山摩崖造像规模最大，造像最精美。除佛像和道教造像外，也有儒、佛、道同在一龛窟中的三教造像，而以佛教造像所占比例最大。",
				tourists: 56321
			},
			{
				name: "酉阳桃花源",
				url: "https://img0.baidu.com/it/u=432316214,3537142897&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500",
				des: "酉阳桃花源景区总面积50平方千米，由古桃源、太古洞、酉州古城、桃花源森林公园、桃花源广场、桃花源风情小镇、二酉山世外桃源文化主题公园、桃源大舞台等八部分组成。集岩溶地质奇观、秦晋农耕文化、土家民俗文化、自然生态文化于一体，浓缩了中国武陵山区最美的原生态自然田园风光，传承着土家族、苗族悠久的人文历史与灿烂的民族文化",
				tourists: 46223
			},
			{
				name: "洪崖洞",
				url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F9f81e942-098a-4066-92b6-3a8159c7f483%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1679366078&t=255265ae441f5ae62ffc61fe9fe74f38",
				des: "洪崖洞是重庆市重点景观工程，建筑面积4.6万平方米，主要景点由吊脚楼、仿古商业街等景观组成  。洪崖洞一共有11层，夜晚灯光从晚上6点开灯，10点熄灯。可望吊脚群楼观洪崖滴翠，逛山城老街赏巴渝文化，烫山城火锅看两江汇流，品天下美食。形成了“一态、三绝、四街、八景”的经营形态，体现了巴渝文化休闲业态",
				tourists: 36526
			},
			{
				name: "凤凰古城",
				url: "https://img.pconline.com.cn/images/upload/upc/tx/itbbs/1905/21/c25/148822009_1558444958198.jpg",
				des: "凤凰古城建于清康熙四十三年（1704年），东门和北门古城楼尚在。城内青石板街道、江边木结构吊脚楼，以及朝阳宫、古城博物馆、杨家祠堂、沈从文故居、熊希龄故居、天王庙、大成殿、万寿宫等建筑，全都透着古城特色。",
				tourists: 66542
			}
		],
		url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201910%2F19%2F20191019090541_niytw.thumb.700_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677823664&t=ab6dddefb77d855e2de1a23b2bd78399",
		name: 4
	}
];

const tab1 = [{ label: "总游客排行榜", name: 1 }];
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
onMounted(async () => {
	const res = await systemMessageunread({});
	globalStore.setSystemMessageLength(res.data);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
