<template>
	<div>
		<transition name="body">
			<div v-show="props.showEmoji" class="emoji-body">
				<span class="emoji-item" v-for="(value, key, index) in emojiListURL" :key="index" @click="addEmoji(key)">
					<img class="emoji" :src="value" :title="key" width="30" height="30" />
				</span>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { ref } from "vue";

const props = withDefaults(defineProps<{ addEmoji: any; showEmoji: any }>(), { addEmoji: () => {}, showEmoji: true });
const emojiListURL = ref({});
const qiniuDownload = ref("$$$$七牛云访问域名，仿照【https://file.poetize.cn/】");
const emojiList = ref([
	"衰",
	"鄙视",
	"再见",
	"捂嘴",
	"摸鱼",
	"奋斗",
	"白眼",
	"可怜",
	"皱眉",
	"鼓掌",
	"烦恼",
	"吐舌",
	"挖鼻",
	"委屈",
	"滑稽",
	"啊这",
	"生气",
	"害羞",
	"晕",
	"好色",
	"流泪",
	"吐血",
	"微笑",
	"酷",
	"坏笑",
	"吓",
	"大兵",
	"哭笑",
	"困",
	"呲牙"
]);

const getEmojiList = (emojiList: any) => {
	let emojiName;
	let url;
	let result = {};
	for (let i = 0; i < emojiList.length; i++) {
		emojiName = "[" + emojiList[i] + "]";
		let j = i + 1;
		url = qiniuDownload.value + "emoji/q" + j + ".gif";
		result[emojiName] = url;
	}
	return result;
};
emojiListURL.value = getEmojiList(emojiList.value);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
