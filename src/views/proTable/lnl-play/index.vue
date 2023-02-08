<template>
	<div>
		<Layout :type="type" :params="params" />
	</div>
</template>

<script setup lang="ts" name="useProTableDetail">
import { reactive } from "vue";
import Layout from "../components/layout.vue";
const type = reactive(["游乐园", "公园", "商场", "其它"]);
const params = reactive({ type1: 2, city: "成都" });
</script>
