<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<Fullscreen id="fullscreen" />
			<Message id="message" />
		</div>
		<span class="username">{{ userinfo.username }}</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";
import { GlobalStore } from "@/stores";
import Message from "./components/Message.vue";
import { computed, ref, watch } from "vue";
const globalStore = GlobalStore();
const userinfo = ref();
userinfo.value = globalStore.userInformation;

const getProjectList = computed(() => {
	return globalStore.userInformation;
});
watch(
	getProjectList,
	(newValue: any) => {
		userinfo.value = newValue;
	},
	{ immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px 0 0;
	.header-icon {
		display: flex;
		align-items: center;
		& > * {
			margin-left: 21px;
		}
	}
	.username {
		margin: 0 20px;
		font-size: 15px;
	}
}
</style>
