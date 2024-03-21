<template>
	<div class="myButton">
		<div :style="beforeColor">{{ props.info }}</div>
		<div :style="afterColor">{{ props.info }}</div>
		<div :style="afterColor">{{ props.info }}</div>
	</div>
</template>

<script setup lang="ts" name="login">
import { reactive } from "vue";

const props = withDefaults(defineProps<{ info: any; before: any; after: any }>(), {
	info: "确定",
	before: "",
	after: ""
});
const beforeColor = reactive({ background: props.before });
const afterColor = reactive({ background: props.after });
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
