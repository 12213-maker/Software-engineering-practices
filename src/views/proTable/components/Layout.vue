<template>
	<div>
		<div class="input">
			<div class="selectstyle">
				<el-select @change="changeselect" v-model="select" class="m-2" placeholder="Select" size="large">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<el-input v-model="input2" width="200px" class="w-50 m-2" placeholder="Type something" />
		</div>
		<div class="buttons">
			<div class="type">
				类型：
				<el-button type="success" @click="changeType('/proTable/lnl-eat')">美食</el-button>
				<el-button type="primary" @click="changeType('/proTable/lnl-play')">娱乐</el-button>
				<el-button type="warning" @click="changeType('/proTable/lnl-view')">景点</el-button>
				<el-button type="danger" @click="changeType('/proTable/lnl-slpee')">住宿</el-button>
			</div>
			<div class="sort">
				排序：<el-button type="success">评分</el-button>
				<el-button type="primary">距离</el-button>
				<el-button type="warning">Warning</el-button>
				<el-button type="danger">Danger</el-button>
			</div>
		</div>
		<el-row v-for="(item, index) in dataValue" :key="item" class="elRow" :gutter="20">
			<div class="elRowOuter">
				<div class="more">
					<span class="eltitle showmore" @click="routerpush(props.params.type1, index)"
						>{{ item[index].type1Name || "其它" }}
					</span>
					<div class="showmore" @click="routerpush(props.params.type1, index)">
						更多<el-icon><ArrowRight /></el-icon>
					</div>
				</div>
				<div class="elcolouter">
					<el-col class="elCol" :span="5" v-for="item2 in item" :key="item2">
						<div class="grid-content ep-bg-purple" />
						<el-card :body-style="{ padding: '0px' }">
							<div class="imgOuter">
								<img :src="getIcon(item2.picture)" class="image" />
							</div>
							<div style="padding: 14px">
								<div class="item2des">{{ item2.name }}</div>
								<el-rate disabled v-model="item2.score" score-template="{value} points" />
							</div> </el-card
					></el-col>
				</div>
			</div>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { placeList } from "@/api/modules/lnl-paly";
import { placelistvalue } from "@/api/interface/index";

const input2 = ref("");
const select = ref("1");
const router = useRouter();
const props = defineProps<{ type: Array<string>; params: placelistvalue }>();

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

interface DataValue {
	id: number;
	name: string;
	score: number;
	picture: string;
	type1Name?: string;
}
let dataValue = reactive<Array<Array<DataValue>>>([]);

const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

const changeselect = () => {
	// data.splice(0, data.length, ...data2);
};

const changeType = (value: string) => {
	router.push(value);
};

const routerpush = (type1: number, type2: number) => {
	router.push({ path: "/proTable/lnl-showmore", query: { type1, type2: type2 + 1 } });
};

onMounted(async () => {
	const { data } = await placeList(props.params);
	dataValue.push(...(data as any));
	dataValue = dataValue.map((item, index) => {
		return item.map(item2 => {
			return { ...item2, type1Name: props.type[index], picture: `https://73d529c6.r3.cpolar.top/img/place/${item2.picture}` };
		});
	});
});
</script>

<style scoped lang="scss">
.input {
	display: flex;
	width: 50%;
	padding: 20px 0;
	margin: auto;
	overflow: hidden;
	.selectstyle {
		margin: 0 20px;
	}
}
.buttons {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 75%;
	height: 53px;
	padding-top: 30px;
	margin: auto;
	font-size: 20px;
	color: #6d6d6d;
	background-color: #e3e5ea;
	border-radius: 20px;
	.type {
		margin: 0 40px;
	}
	.sort {
		margin: 0 40px;
	}
}
.elRow {
	position: relative;
	flex-wrap: wrap;
	justify-content: center;
	padding: 20px 80px;
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
		height: 300px;
		background-color: #e0dbdb;
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
