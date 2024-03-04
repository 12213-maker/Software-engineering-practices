<template>
	<div class="card">
		<div class="card-header animated-bg" id="header">&nbsp;</div>

		<div class="card-content">
			<h3 class="card-title animated-bg animated-bg-text" id="title">&nbsp;</h3>
			<p class="card-excerpt" id="excerpt">
				&nbsp;
				<span class="animated-bg animated-bg-text">&nbsp;</span>
				<span class="animated-bg animated-bg-text">&nbsp;</span>
				<span class="animated-bg animated-bg-text">&nbsp;</span>
			</p>
			<div class="author">
				<div class="profile-img animated-bg" id="profile_img">&nbsp;</div>
				<div class="author-info">
					<strong class="animated-bg animated-bg-text" id="name">&nbsp;</strong>
					<small class="animated-bg animated-bg-text" id="date">&nbsp;</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="Loading">
const header = document.getElementById("header");
const title = document.getElementById("title");
const excerpt = document.getElementById("excerpt");
const profile_img = document.getElementById("profile_img");
const name = document.getElementById("name");
const date = document.getElementById("date");

const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bg_texts = document.querySelectorAll(".animated-bg-text");

setTimeout(getData, 2500);

function getData() {
	header.innerHTML =
		'<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />';
	title.innerHTML = "Lorem ipsum dolor sit amet";
	excerpt.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis";
	profile_img.innerHTML = '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" />';
	name.innerHTML = "John Doe";
	date.innerHTML = "Oct 08, 2020";

	animated_bgs.forEach(bg => bg.classList.remove("animated-bg"));
	animated_bg_texts.forEach(bg => bg.classList.remove("animated-bg-text"));
}
</script>

<style scoped lang="scss">
/* @import "./index.scss"; */
</style>
