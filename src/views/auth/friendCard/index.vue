<template>
	<div class="allCard">
		<div class="card" @click="() => props.clickFriendCard(item.id)" v-for="item in props.friendList" :key="item.id">
			<div class="card-header animated-bg" id="header"><img :src="item.img" alt="" />&nbsp;</div>
			<div class="card-content">
				<h3 :class="{ 'card-title': true, 'animated-bg': item.username ? false : true, 'animated-bg-text': true }" id="title">
					{{ item.username }}&nbsp;
				</h3>
				<p class="card-excerpt" id="excerpt">{{ item.description }} &nbsp;</p>
				<div class="author">
					<!-- <div class="profile-img animated-bg" id="profile_img"><img :src="item.img" alt="" />&nbsp;</div> -->
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
	</div>
</template>

<script setup lang="ts" name="Loading">
const props = withDefaults(defineProps<{ friendList: any; clickFriendCard: any }>(), {
	friendList: [],
	clickFriendCard: () => {}
});
console.log(props.clickFriendCard, "propsvalue");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
