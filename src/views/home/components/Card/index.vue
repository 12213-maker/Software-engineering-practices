<template>
	<div class="card" style="cursor: pointer" v-for="item in tab" :key="item.label" @click="clickrouter">
		<div class="card-header animated-bg" id="header"><img :src="item.photo[0]" alt="" />&nbsp;</div>
		<div class="card-content">
			<h3 :class="{ 'card-title': true, 'animated-bg': item.title ? false : true }" id="title">{{ item.title }}&nbsp;</h3>
			<p class="card-excerpt" id="excerpt">{{ item.content }} &nbsp;</p>
			<div class="author">
				<div class="profile-img animated-bg" id="profile_img"><img :src="item.img" alt="" />&nbsp;</div>
				<div class="author-info">
					<strong :class="{ 'animated-bg': item.username ? false : true, ' animated-bg-text': true }" id="name"
						>{{ item.username }}&nbsp;</strong
					>
					<small :class="{ 'animated-bg': item.time ? false : true, ' animated-bg-text': true }" id="date"
						>{{ item.time }}&nbsp;</small
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="Loading">
import { GlobalStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter();
const globalStore = GlobalStore();
const article = globalStore.article;
const tab = article.slice(0, 9);

const clickrouter = () => {
	router.push("/auth/menu");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
