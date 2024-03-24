<template>
	<!-- <div class="allCard">
		<div class="card" @click="() => props.clickFriendCard(item.id)" v-for="item in props.friendList" :key="item.id">
			<div class="card-header animated-bg" id="header"><img :src="item.img" alt="" />&nbsp;</div>
			<div class="card-content">
				<h3 :class="{ 'card-title': true, 'animated-bg': item.username ? false : true, 'animated-bg-text': true }" id="title">
					{{ item.username }}&nbsp;
				</h3>
				<p class="card-excerpt" id="excerpt">{{ item.description }} &nbsp;</p>
				<div class="author">
					<div class="author-info">
						<small :class="{ 'animated-bg': item.school ? false : true, ' animated-bg-text': true }" id="name"
							>{{ item.school === 1 ? "成都校区" : "南充校区" }}&nbsp;</small
						>
						<small :class="{ 'animated-bg': item.adress ? false : true, ' animated-bg-text': true }" id="date"
							>{{ item.adress }}&nbsp;</small
						>
					</div>
				</div>
			</div>
		</div>
	</div> -->
	<div class="eat">
		<div class="container">
			<div
				v-for="(item, index) in props.friendList"
				:key="item.id"
				:class="{ active: classActive[index], panel: true }"
				@click="
					() => {
						changeClass(index);
					}
				"
				@dblclick="() => props.clickFriendCard(item.id)"
				:style="{ 'background-image': `url(${item.img})` }"
			>
				<h2>{{ item.username }}</h2>
				<h3>{{ item.description }}</h3>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="Loading">
import { ref } from "vue";

const props = withDefaults(defineProps<{ friendList: any; clickFriendCard: any }>(), {
	friendList: [],
	clickFriendCard: () => {}
});
const classActive = ref([true, false, false, false, false]);
const changeClass = (index: any) => {
	const newClass = [false, false, false, false, false];
	newClass[index] = true;
	classActive.value = newClass;
};
</script>

<style scoped lang="scss">
@import "./index.scss";

.eat {
	.userinof {
		background-color: lightcoral;
	}
	.title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 97%;
		height: 50px;
		padding: 0 20px;
		font-size: 20px;
		.info {
			font-size: 20px;
		}
	}
	.container {
		display: flex;
		width: 60%;
		margin: auto;
	}
	.panel {
		position: relative;
		flex: 0.5;
		height: 60vh;
		margin: 10px;
		color: #ffffff;
		cursor: pointer;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border-radius: 50px;
		transition: all 700ms ease-in;
	}
	.panel h3 {
		position: absolute;
		bottom: 20px;
		left: 20px;
		margin: 0;
		font-size: 24px;
		opacity: 0;
	}
	.panel h2 {
		position: absolute;
		bottom: 60px;
		left: 20px;
		margin: 0;
		font-size: 30px;
		opacity: 0;
	}
	.panel.active {
		flex: 5;
	}
	.panel.active h3 {
		opacity: 1;
		transition: opacity 0.3s ease-in 0.4s;
	}
	.panel.active h2 {
		opacity: 1;
		transition: opacity 0.3s ease-in 0.4s;
	}

	@media (max-width: 480px) {
		.container {
			width: 100vw;
		}
		.panel:nth-of-type(4),
		.panel:nth-of-type(5) {
			display: none;
		}
	}
}
</style>
