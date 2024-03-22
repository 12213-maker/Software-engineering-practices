<template>
	<div class="testimonial-container" style="background-color: rgb(176 231 233)">
		<div class="progress-bar"></div>
		<div class="fas fa-quote-right fa-quote"></div>
		<div class="fas fa-quote-left fa-quote"></div>
		<p class="testimonial">{{ infoValue.description }}</p>
		<div class="user">
			<img :src="infoValue.img" alt="user" class="user-image" />
			<div class="user-details">
				<h4 class="username">{{ infoValue.username }}</h4>
				<p class="role">{{ infoValue.adress }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="Loading">
import { ref } from "vue";
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();
const user = globalStore.user;
const infoValue = ref({
	username: "Miyah Myles",
	adress: "Marketing",
	img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6",
	description:
		" worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time."
});
let idx = 1;

function updateTestimonial() {
	infoValue.value = user[idx];
	idx++;
	if (idx > user.length - 1) {
		idx = 0;
	}
}

setInterval(updateTestimonial, 10000);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
