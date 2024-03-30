<template>
	<div class="tree-hole-container">
		<ol class="tree-hole-list" v-if="!isEmpty(props.treeHoleList)">
			<li class="tree-hole-li" v-for="(treeHole, index) in props.treeHoleList" :key="index">
				<div
					class="tree-hole-content"
					:class="{ leftTreeHole: index % 2 === 0 && !mobile(), rightTreeHole: index % 2 !== 0 || mobile() }"
				>
					<img :src="props.avatar" alt="" style="width: 36px; height: 36px" class="avatar-img" />
					<div class="tree-hole-box" :style="{ background: tree_hole_color[index % tree_hole_color.length] }">
						<div
							class="box-tag"
							v-if="index % 2 === 0 && !mobile()"
							:style="{
								'border-color': 'transparent transparent transparent ' + tree_hole_color[index % tree_hole_color.length]
							}"
						></div>
						<div
							class="box-tag"
							v-if="index % 2 !== 0 || mobile()"
							:style="{
								'border-color': 'transparent ' + tree_hole_color[index % tree_hole_color.length] + ' transparent transparent'
							}"
						></div>
						<div class="my-content" v-html="treeHole.content"></div>
						<div style="display: flex; justify-content: space-between">
							<div>😃 {{ treeHole.time }}</div>
							<div @click="props.deleteTreeHole(treeHole.id)" class="tree-hole-delete" v-if="id === treeHole.uid">
								<svg viewBox="0 0 1024 1024" width="18" height="18" style="vertical-align: -2px">
									<path
										d="M921.1392 155.392h-270.592v-48.2816c0-22.7328-18.432-41.1648-41.1648-41.1648H426.3424a41.1648 41.1648 0 0 0-41.1648 41.1648v48.2816H110.6432c-14.1312 0-25.6 11.4688-25.6 25.6s11.4688 25.6 25.6 25.6h810.496c14.1312 0 25.6-11.4688 25.6-25.6s-11.4688-25.6-25.6-25.6zM170.8032 260.0448v592.8448c0 50.8928 41.2672 92.16 92.16 92.16h500.6848c50.8928 0 92.16-41.2672 92.16-92.16V260.0448H170.8032z m249.1392 462.7968c0 14.1312-11.4688 25.6-25.6 25.6s-25.6-11.4688-25.6-25.6V443.0848c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v279.7568z m243.1488 0c0 14.1312-11.4688 25.6-25.6 25.6s-25.6-11.4688-25.6-25.6V443.0848c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v279.7568z"
										fill="#FF623E"
									></path>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ol>
		<div class="tree-hole-go">
			<i class="fa fa-paper-plane" @click="props.launch()"></i>
		</div>
	</div>
</template>

<script setup lang="ts" name="treehole">
const tree_hole_color = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab", "rgb(131, 123, 199)", "#23d5ab"];

const props = withDefaults(defineProps<{ id: any; avatar: any; treeHoleList: any; launch: any; deleteTreeHole: any }>(), {
	avatar: "",
	treeHoleList: [],
	launch: () => {},
	deleteTreeHole: () => {},
	id: ""
});
console.log(props, "tre");

const mobile = () => {
	let flag = navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	);
	return flag && flag.length && flag.length > 0;
};
const isEmpty = value => {
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

<style scoped>
@import "./index.scss";
</style>
