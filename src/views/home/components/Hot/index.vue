<template>
	<div class="campus-side">
		<div class="campus-side-main">
			<div class="woo-divider-main woo-divider-x"><!----></div>
			<div class="campus-side-card">
				<div
					@click="clickchange"
					v-for="(item, keys) in simpleHotList"
					:key="keys"
					class="campus-side-panel"
					style="padding: 0 18px"
				>
					<div
						class="con woo-box-flex woo-box-alignCenter"
						style="display: flex; flex-direction: row; justify-content: space-between"
					>
						<div>
							<div class="side-rank-num">{{ keys + 1 }}</div>
							<div class="info">{{ item.title }}</div>
						</div>
						<!-- <div class="side-f12" style="color: #939393">
							{{ item.stars }}
						</div> -->
						<div>
							<svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
								<path d="M14.656 512a497.344 497.344 0 1 0 994.688 0 497.344 497.344 0 1 0-994.688 0z" fill="#FF0000"></path>
								<path
									d="M374.976 872.64c-48.299-100.032-22.592-157.44 14.421-211.37 40.448-58.966 51.115-117.611 51.115-117.611s31.659 41.386 19.115 106.005c56.149-62.72 66.816-162.133 58.325-200.405 127.317 88.746 181.59 281.002 108.181 423.381C1016 652.501 723.093 323.2 672.277 285.867c16.939 37.333 20.054 100.032-14.101 130.474-58.027-219.84-201.664-265.002-201.664-265.002 16.96 113.536-61.781 237.397-137.344 330.24-2.816-45.163-5.632-76.544-29.483-119.808-5.333 82.176-68.373 149.269-85.29 231.445-22.912 111.637 17.237 193.173 170.581 279.424z"
									fill="#FFFFFF"
								></path>
							</svg>
							{{ item.stars }} 热度
						</div>
					</div>
					<div class="woo-divider-main woo-divider-x"><!----></div>
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
const simpleHotList = article.sort((a: any, b: any) => b.stars - a.stars).slice(0, 10);

const clickchange = () => {
	router.push("/auth/menu");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
