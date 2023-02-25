<template>
	<div>
		<div class="buttons">
			<div class="selectstyle">
				<el-select @change="changeselect" v-model="select" class="m-2" placeholder="Select" size="default">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<div class="input"><el-input v-model="input2" width="200px" class="w-50 m-2" placeholder="Type something" /></div>
			<div class="sort">
				排序：<el-button type="success">评分</el-button>
				<el-button type="primary">距离</el-button>
			</div>
		</div>
		<el-row v-infinite-scroll="load" class="elRow" :gutter="20">
			<el-col @click="detailshow(item.id)" class="elCol" :span="6" v-for="item in dataValue.data1" :key="item">
				<el-card :body-style="{ padding: '0px' }">
					<div class="imgOuter">
						<img :src="getIcon(` http://127.0.0.1:8080/img/place/${item.picture}`)" class="image" />
						<!-- <img v-lazy="getIcon(` http://127.0.0.1:8080/img/place/${item.picture}`)" /> -->
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
								<span class="score"> {{ (item.score + "").slice(0, 3) }} </span>
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
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { placeMore } from "@/api/modules/lnl-paly";
import { PlaceMore } from "@/api/interface";

const input2 = ref("");
const select = ref("1");
const router = useRouter();
const route = useRoute();
const infiniteValue = reactive({
	current: 0,
	pages: 1
});

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

const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

const changeselect = () => {};

const detailshow = (id: any) => {
	router.push({ path: "/proTable/lnl-detailshow", query: { id, type1: route.query.type1 } });
};

//申请接口数据
const apiParams = reactive<PlaceMore>({
	type1: 0,
	type2: 0,
	order: 1,
	name: "",
	city: "成都",
	page: 1,
	limit: 8
});
const apireturndataback = async (params: any) => {
	const res = (await placeMore(params)) as any;
	//current当前页数 ， pages一共有多少页数
	infiniteValue.current = res.data.current;
	infiniteValue.pages = res.data.pages;
	dataValue.data1.push(...res.data.records);
};

//懒加载
const load = async () => {
	if (infiniteValue.current < infiniteValue.pages) {
		const params = { ...apiParams, ...route.query, page: apiParams.page++ };
		await apireturndataback(params);
	} else return;
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
	justify-content: center;
	width: 90%;
	height: 53px;
	padding-top: 30px;
	margin: auto;
	margin-top: 30px;
	margin-bottom: 20px;
	font-size: 20px;
	color: #6d6d6d;
	background-color: #e3e5ea;
	border-radius: 20px;
	.type {
		margin: 0 40px;
	}
	.input {
		width: 40%;
		margin: 0 40px;
	}
	.in .sort {
		margin: 0 40px;
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
