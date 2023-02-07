<template>
	<div>
		<Layout :type="type" :params="params" />
	</div>
</template>

<script setup lang="ts" name="useProTableDetail">
import { reactive } from "vue";
import Layout from "../components/layout.vue";
const type = reactive(["中餐", "火锅", "小吃", "其它"]);
const params = reactive({ type1: 1, city: "成都" });
</script>
