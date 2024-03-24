<template>
	<div class="testimonial-container" :style="{ 'background-color': color }">
		<div class="progress-bar"></div>
		<div class="fas fa-quote-right fa-quote"></div>
		<div class="fas fa-quote-left fa-quote"></div>
		<p class="testimonial" style="white-space: pre-line">{{ infoValue.Biography }}</p>
		<div class="user">
			<img :src="infoValue.img" alt="user" class="user-image" />
			<div class="user-details">
				<h4 class="username">{{ infoValue.username }}</h4>
				<p class="role">{{ infoValue.adress }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="Loading">
import { ref } from "vue";
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();
const user = globalStore.user;
const infoValue = ref(user[0].userinfo);
let idx = 1;
const colorList = ["#a0cfff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"];
const color = ref(colorList[0]);

function updateTestimonial() {
	infoValue.value = user[idx].userinfo;
	color.value = colorList[idx];
	idx++;
	if (idx > user.length - 1) {
		idx = 0;
	}
}

setInterval(updateTestimonial, 10000);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
