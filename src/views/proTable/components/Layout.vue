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
		<el-row v-for="item in data" :key="item" class="elRow" :gutter="20">
			<div class="elRowOuter">
				<span class="eltitle">{{ item.title }}</span>
				<div class="elcolouter">
					<el-col class="elCol" :span="5" v-for="item2 in item.foods" :key="item2">
						<div class="grid-content ep-bg-purple" />
						<el-card :body-style="{ padding: '0px' }">
							<div class="imgOuter">
								<img :src="getIcon(item2.url)" class="image" />
							</div>
							<div style="padding: 14px">
								<span>{{ item2.des }}</span>
								<div class="bottom">
									<time class="time">{{ item2.origin }}</time>
									<br />
									<el-rate disabled v-model="value1" score-template="{value} points" />
								</div>
							</div> </el-card
					></el-col>
				</div>
			</div>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const input2 = ref("");
const value1 = ref(5);
const select = ref("1");
const router = useRouter();
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

const data = reactive([
	{
		title: "时令佳肴",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	},
	{
		title: "肉食精选",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	},
	{
		title: "健康素食",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	},
	{
		title: "烘焙",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	}
]);

const data2 = [
	{
		title: "时令佳肴重庆",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	},
	{
		title: "肉食精选重庆",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	},
	{
		title: "健康素食重庆",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	},
	{
		title: "快乐烘焙重庆",
		foods: [
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166762750061060.jpg", des: "红烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	}
];

const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};

const changeselect = () => {
	data.splice(0, data.length, ...data2);
	console.log(data);
};

const changeType = (value: string) => {
	console.log(value);
	router.push(value);
};
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
		height: 360px;
		background-color: pink;
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
		.elcolouter {
			position: relative;
			top: -30px;
			display: flex;
			justify-content: center;
		}
		.eltitle {
			position: relative;
			bottom: 15px;
			left: 100px;
			font-size: 24px;
			color: #6d6d6d;
		}
	}
}
</style>
