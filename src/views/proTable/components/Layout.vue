<template>
	<el-row v-for="item in props.data" :key="item" class="elRow" :gutter="20">
		<div>{{ item.title }}</div>
		<el-col class="elCol" :span="5" v-for="item2 in 4" :key="item2">
			<div class="grid-content ep-bg-purple" />
			<el-card :body-style="{ padding: '0px' }">
				<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" />
				<div style="padding: 14px">
					<span>Yummy hamburger</span>
					<div class="bottom">
						<time class="time">{{ currentDate }}</time>
						<el-button text class="button">Operating</el-button>
					</div>
				</div>
			</el-card></el-col
		>
	</el-row>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(["data"]);
console.log(props.data);

const currentDate = ref(new Date());
</script>

<style scoped lang="scss">
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
.image {
	display: block;
	width: 100%;
}
.elRow {
	flex-wrap: wrap;
	justify-content: center;
	padding: 20px 100px;
	background-color: pink;
}
</style>
