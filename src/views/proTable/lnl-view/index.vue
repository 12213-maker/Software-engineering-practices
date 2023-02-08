<template>
	<div>
		<Layout :type="type" :params="params" />
	</div>
</template>

<script setup lang="ts" name="useProTableDetail">
import { reactive } from "vue";
import Layout from "../components/layout.vue";
const type = reactive(["自然风景", "博物馆", "纪念地", "其它"]);
const params = reactive({ type1: 3, city: "成都" });
</script>
