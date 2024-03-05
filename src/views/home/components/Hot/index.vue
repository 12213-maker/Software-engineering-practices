<template>
	<div class="campus-side">
		<div class="campus-side-main">
			<div class="woo-divider-main woo-divider-x"><!----></div>
			<div class="campus-side-card">
				<div v-for="(item, keys) in simpleHotList" :key="keys" class="campus-side-panel" style="padding: 0 18px">
					<el-link :href="'c/' + item.contentId" target="_blank"
						><div class="con woo-box-flex woo-box-alignCenter">
							<div class="side-rank-num">{{ keys + 1 }}</div>
							<div class="info">{{ item.content }}</div>
							<!-- <div class="side-f12" style="margin-right: 10px; color: #333">
								{{ item.content }}
							</div> -->
							<div class="side-f12" style="color: #939393">
								{{ item.loveCount }}
							</div>
						</div>
					</el-link>
					<div class="woo-divider-main woo-divider-x"><!----></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="Loading">
const simpleHotList = [
	{
		contentId: 1,
		content: "黄龙风景名胜区属青藏高原东部边缘向四川景名胜区属青藏高原东部边缘向四景名胜区属青藏高原东部边缘向四",
		loveCount: 23433
	},
	{ contentId: 2, content: "布达拉宫位于中国西藏自治区首府拉  ", loveCount: 23433 },
	{
		contentId: 3,
		content: "e work delivered. He will go the extra mile to m",
		loveCount: 23433
	},
	{
		contentId: 4,
		content: "e work delivered. He wil work delivered. He will go the extra milt you are happy",
		loveCount: 23433
	},
	{ contentId: 5, content: " work delivered. He will go the extra mil", loveCount: 23433 },
	{ contentId: 6, content: "d. He wil work delivered. He will go", loveCount: 23433 },
	{ contentId: 7, content: "d. He wil work delivered. He will go", loveCount: 23433 },
	{ contentId: 8, content: "d. He wil work delivered. He will go", loveCount: 23433 },
	{ contentId: 9, content: "d. He wil work delivered. He will go", loveCount: 23433 },
	{ contentId: 10, content: "d. He wil work delivered. He will go", loveCount: 23433 }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
