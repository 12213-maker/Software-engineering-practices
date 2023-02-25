<template>
	<div class="login-container flx-center">
		<div class="login-box">
			<div class="login-left">
				<img src="@/assets/lnl_images/infinity-2168510.jpg" alt="login" />
			</div>

			<!-- 轮播图 -->
			<!-- <LoginCarousel /> -->

			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/lnl_images/Snipaste_2023-01-31_17-16-21.png" alt="" />
					<h2 class="logo-text">login</h2>
				</div>
				<LoginForm />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
// import LoginCarousel from "./components/LoginCarousel.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
