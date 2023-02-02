<template>
	<div>
		<Layout :data="data" />
	</div>
</template>

<script setup lang="ts" name="useProTableDetail">
import { reactive } from "vue";
import Layout from "../components/layout.vue";
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
	{ title: "肉食精选", foods: [{ url: "", des: "红烧肉", origin: "猪肉，蔬菜" }] },
	{ title: "健康素食", foods: [{ url: "", des: "红烧肉", origin: "猪肉，蔬菜" }] },
	{ title: "烘焙", foods: [{ url: "", des: "红烧肉", origin: "猪肉，蔬菜" }] }
]);
</script>
