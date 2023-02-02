<template>
	<el-row class="elRow" :gutter="20">
		<el-col class="elCol" :span="5" v-for="o in 10" :key="o">
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
import { ref } from "vue";

const currentDate = ref(new Date());
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
