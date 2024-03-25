<template>
	<div>
		<!-- title -->
		<div style="height: 60px; background-color: #fcfcfc">
			<template v-if="isEmpty(currentChatFriendId)">
				<span style="line-height: 60px; margin-left: 20px; font-size: 18px">
					{{ friends[currentChatFriendId].remark }}
				</span>
			</template>
			<template v-else-if="isEmpty(currentChatGroupId)">
				<span style="line-height: 60px; margin-left: 20px; font-size: 18px">
					{{ groups[currentChatGroupId].groupName }}
				</span>
				<span style="line-height: 60px; margin-left: 20px; font-size: 12px; color: var(--greyFont)"> 当前在线人数：4 </span>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { ref } from "vue";

const currentChatGroupId = ref(0);
const currentChatFriendId = ref(0);
const friends = ref({});
const groups = ref({});

const isEmpty = (value: any) => {
	if (
		typeof value === "undefined" ||
		value === null ||
		(typeof value === "string" && value.trim() === "") ||
		(Array.prototype.isPrototypeOf(value) && value.length === 0) ||
		(Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)
	) {
		return true;
	} else {
		return false;
	}
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
