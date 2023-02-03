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
				<div class="more">
					<span class="eltitle">{{ item.title }} </span>
					<!-- <div>
						更多<el-icon><ArrowRight /></el-icon>
					</div> -->
				</div>
				<div class="elcolouter">
					<el-col class="elCol" :span="5" v-for="item2 in item.foods" :key="item2">
						<div class="grid-content ep-bg-purple" />
						<el-card :body-style="{ padding: '0px' }">
							<div class="imgOuter">
								<img :src="getIcon(item2.url)" class="image" />
							</div>
							<div style="padding: 14px">
								<div class="item2des">{{ item2.des }}</div>
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
		title: "西藏",
		foods: [
			{
				url: "../../../assets/lnl_images/23151340944_3865x2899.jpg",
				des: "布达拉宫位于中国西藏自治区首府拉萨市区西北的玛布日山上，是一座宫堡式建筑群，一说为吐蕃王朝赞普松赞干布为迎娶尺尊公主和文成公主而兴建 [17]  [24]  ；另一说为，作为松赞干布迁都拉萨后的王宫而建。 [25]  于17世纪重建后，成为历代达赖喇嘛的冬宫居所，为西藏政教合一的统治中心。1961年，布达拉宫成为了中华人民共和国国务院第一批全国重点文物保护单位之一。1994年，布达拉宫被列为世界文化遗产。布达拉宫的主体建筑为白宫和红宫两部分。",
				origin: "1221"
			},
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "白烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "蓝烧肉", origin: "猪肉，蔬菜" },
			{ url: "https://st-cn.meishij.net/r/24/14/6816024/s6816024_166754799981431.jpg", des: "绿烧肉", origin: "猪肉，蔬菜" }
		]
	},
	// {
	// 	id: 1,
	// 	type1: 1,
	// 	type2: 1,
	// 	name: "阳光家常菜(岷山路店)",
	// 	picture: "../../../assets/lnl_images/23151340944_3865x2899.jpg",
	// 	score: 0.0,
	// 	position: "成都市新都区岷山南路二段100号",
	// 	phone: "028-2237890",
	// 	information: "家常菜，人均25元，营业时间9:00-22:00",
	// 	number: "B03460NX2R",
	// 	city: "成都",
	// 	placePictures: null
	// },
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
		height: 300px;
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
		/* .more {
			display: flex;
			justify-content: space-between;
			background-color: pink;
		} */
		.elcolouter {
			position: relative;
			top: -30px;
			display: flex;
			justify-content: center;
			.item2des {
				/* background-color: pink; */
				height: 65px;
				overflow: hidden;
			}
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
