<template>
	<div>
		<div class="buttons">
			<div class="selectstyle littlebox">
				<span>城市：</span>
				<el-select @change="changeselect" v-model="select" class="m-2" placeholder="Select" size="default">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<div class="selectstyletype littlebox">
				<span>类型：</span>
				<el-select @change="changeselectType" v-model="selectType" class="m-2" placeholder="Select" size="default">
					<el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<div class="sort littlebox">
				排序：<el-button @click="sortbyposition(2)"
					><el-icon><Compass /></el-icon>距离</el-button
				><el-button @click="sortbyposition(1)">
					<el-icon><Star /></el-icon>评分</el-button
				>
				<!-- <el-button @click="checkposition">
					<el-icon><Location /></el-icon>点击定位</el-button
				> -->
			</div>
			<div class="input littlebox">
				<div class="inputtitle">搜索：</div>
				<div class="inputwidth"><el-input @change="searchtitle" v-model="input2" class="w-50 m-2" placeholder="精确搜索" /></div>
			</div>

			<div class="littlebox"><el-button type="primary" :icon="Delete" @click="reset">重置</el-button></div>
		</div>

		<el-row v-infinite-scroll="load" class="elRow" :gutter="20">
			<el-col @click="detailshow(item.id)" class="elCol" :span="6" v-for="item in dataValue.data1" :key="item">
				<el-card :body-style="{ padding: '0px' }">
					<div class="imgOuter">
						<img :src="getIcon(`https://48fb906.r5.cpolar.top/img/place/${item.picture}`)" class="image" />
						<!-- <img v-lazy="getIcon(`https://48fb906.r5.cpolar.top/img/place/${item.picture}`)" /> -->
					</div>
					<div style="padding: 14px">
						<el-descriptions class="margin-top" :title="item.name" :column="1" size="small" border>
							<el-descriptions-item>
								<template #label>
									<div class="cell-item">
										<el-icon>
											<office-building />
										</el-icon>
										评分
									</div>
								</template>
								<el-rate disabled allow-half v-model="item.score" score-template="{value} points" />
								<span class="score">{{ item.score }}</span>
							</el-descriptions-item>
							<el-descriptions-item>
								<template #label>
									<div class="cell-item">
										<el-icon>
											<office-building />
										</el-icon>
										location
									</div>
								</template>
								<el-tooltip popper-class="tool-tip" effect="dark" :content="item.position" placement="top">
									<div class="posiclass">{{ item.position }}</div>
								</el-tooltip>
							</el-descriptions-item>
							<el-descriptions-item>
								<template #label>
									<div class="cell-item">
										<el-icon>
											<iphone />
										</el-icon>
										联系方式
									</div>
								</template>
								{{ item.phone }}
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
								<el-tooltip popper-class="tool-tip" effect="dark" :content="item.information" placement="top">
									<div class="infoclass">{{ item.information }}</div>
								</el-tooltip>
							</el-descriptions-item>
						</el-descriptions>
					</div>
				</el-card>
			</el-col>
			<el-divider v-if="infiniteValue.current < infiniteValue.pages"> 加载中 </el-divider>
			<el-divider v-if="infiniteValue.current >= infiniteValue.pages"> 没有更多了 </el-divider>
		</el-row>
		<!-- <el-dialog v-model="positiondialog" title="定位" top="55px" width="66%" :fullscreen="true"
			><Map @gotPositionReturn="gotPositionReturn"
		/></el-dialog> -->
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { placeMore } from "@/api/modules/lnl-paly";
import { PlaceMore } from "@/api/interface";
import { Delete } from "@element-plus/icons-vue";
// import Map from "@/utils/mapcontainer/index.vue";

const input2 = ref("");
const select = ref("1");
const selectType = ref();
const router = useRouter();
const route = useRoute();
const infiniteValue = reactive({
	current: 0,
	pages: 1
});
// const positiondialog = ref(false);

interface DataValueInterface {
	city: string;
	id: number;
	information: string;
	name: string;
	phone: string;
	picture: string;
	placePictures?: any;
	position: string;
	score: number;
}
let dataValue = reactive<{ data1: Array<DataValueInterface>; data: DataValueInterface }>({
	data1: [],
	data: {
		city: "",
		id: 0,
		information: "",
		name: "",
		phone: "",
		picture: "",
		placePictures: "",
		position: "",
		score: 5
	}
});

// const gotPositionReturn = () => {
// 	positiondialog.value = false;
// };

const options = [
	{
		value: "1",
		label: "成都"
	},
	{
		value: "2",
		label: "重庆"
	}
];
const optionsType = [
	{
		value: "1",
		label: "酒店"
	},
	{
		value: "2",
		label: "名宿"
	}
];

const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

const changeselect = () => {};

//搜索类型
const changeselectType = () => {
	dataValue.data1 = [];
	apiParams.page = 1;
	apiParams.type2 = selectType.value;
	console.log(apiParams);
	apireturndataback({ ...apiParams, type2: selectType.value });
};
//搜索input
const searchtitle = () => {
	dataValue.data1 = [];
	apiParams.page = 1;
	apiParams.name = input2.value;
	console.log(apiParams);
	apireturndataback({ ...apiParams });
};
//搜索距离&评分
const sortbyposition = (flag: any) => {
	dataValue.data1 = [];
	apiParams.page = 1;
	if (flag === 2) {
		apiParams.currentLocation = "104.184071, 30.826166";
		apiParams.order = 2;
	} else {
		apiParams.currentLocation = undefined;
		apiParams.order = 1;
	}
	console.log(apiParams);
	apireturndataback(apiParams);
};

const detailshow = (id: any) => {
	router.push({ path: "/proTable/lnl-detailshow", query: { id, type1: route.query.type1 } });
};

//申请接口数据
const apiParams = reactive<PlaceMore>({
	type1: 4,
	type2: undefined,
	order: 1,
	name: undefined,
	city: "成都",
	currentLocation: undefined,
	page: 0,
	limit: 4
});
const apireturndataback = async (params: any) => {
	const res = (await placeMore(params)) as any;
	//current当前页数 ， pages一共有多少页数
	infiniteValue.current = res.data.current;
	infiniteValue.pages = res.data.pages;
	dataValue.data1.push(...res.data.records);
};

//定位
// const checkposition = () => {
// 	positiondialog.value = true;
// };
//距离

//懒加载
const load = async () => {
	// if (selectType.value) {
	// 	console.log(selectType.value);
	// 	if (infiniteValue.current < infiniteValue.pages) {
	// 		const params = { ...apiParams, ...route.query, page: ++apiParams.page, type2: selectType.value };
	// 		await apireturndataback(params);
	// 	} else return;
	// } else {
	// 	if (infiniteValue.current < infiniteValue.pages) {
	// 		const params = { ...apiParams, ...route.query, page: ++apiParams.page };
	// 		await apireturndataback(params);
	// 	} else return;
	// }
	console.log(apiParams);

	if (infiniteValue.current < infiniteValue.pages) {
		const params = { ...apiParams, ...route.query, page: ++apiParams.page };
		await apireturndataback(params);
	} else return;
};

const reset = async () => {
	dataValue.data1 = [];
	input2.value = "";
	apiParams.type2 = undefined;
	apiParams.page = 1;
	apiParams.name = "";
	selectType.value = "";
	apiParams.currentLocation = "";
	apireturndataback(apiParams);
};

onMounted(() => {});
</script>

<style scoped lang="scss">
.el-descriptions {
	margin-top: 20px;
}
.cell-item {
	display: flex;
	align-items: center;
}
.margin-top {
	margin-top: 20px;
}
.buttons {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 90%;
	height: 53px;
	padding-top: 30px;
	margin: auto;
	margin-top: 30px;
	margin-bottom: 20px;
	font-size: 16px;
	font-weight: 600;
	background-color: white;
	border-radius: 10px;
	.littlebox {
		height: 53px;

		/* background-color: pink; */

		/* display: flex;
		flex-direction: row;
		align-items: center; */
	}
	.type {
		margin: 0 40px;
	}
	.input {
		display: flex;
		flex-direction: row;

		/* align-items: center; */

		/* width: 40%; */
		margin: 0 40px;
		.inputtitle {
			padding-top: 3px;
		}
		.inputwidth {
			width: 250px;
		}
	}
	.in .sort {
		/* margin: 0 40px; */
	}
}
.elRow {
	position: relative;
	flex-wrap: wrap;
	padding: 20px 80px;
	.elCol {
		margin-bottom: 20px;
		cursor: pointer;
		.score {
			position: relative;
			top: -4px;
		}
		.posiclass {
			height: 50px;
			overflow: hidden;
		}
		.infoclass {
			height: 160px;
			overflow: hidden;
		}
	}
	.el-row {
		margin-bottom: 20px;
	}
	.el-row:last-child {
		margin-bottom: 0;
	}
	.el-col {
		border-radius: 4px;
	}
	.grid-content {
		min-height: 36px;
		border-radius: 4px;
	}
	.time {
		font-size: 12px;
		color: #999999;
	}
	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 13px;
		line-height: 12px;
	}
	.button {
		min-height: auto;
		padding: 0;
	}
	.imgOuter {
		height: 330px;
		.image {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.elRowOuter {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 530px;
		padding-top: 30px;
		background-color: #e3e5ea;
		border-radius: 20px;
		.more {
			position: relative;
			bottom: 15px;
			display: flex;
			justify-content: space-between;
			padding: 0 100px;
			font-size: 24px;
			color: #6d6d6d;
			.showmore {
				cursor: pointer;
			}
		}
		.elcolouter {
			position: relative;
			top: -30px;
			display: flex;
			justify-content: center;
			.item2des {
				height: 65px;
				overflow: hidden;
			}
		}
	}
}
</style>
<style>
.tool-tip {
	max-width: 350px;
}
</style>
