<template>
	<div>
		<!-- 登陆和注册 -->
		<div v-if="isEmpty(currentUser)" class="myCenter in-up-container my-animation-hideToShow">
			<!-- 背景图片 -->
			<el-image
				class="my-el-image"
				style="position: absolute"
				v-once
				lazy
				:src="$constant.random_image + new Date() + Math.floor(Math.random() * 10)"
				fit="cover"
			>
				<div slot="error" class="image-slot"></div>
			</el-image>
			<div class="in-up" id="loginAndRegist">
				<div class="form-container sign-up-container">
					<div class="myCenter">
						<h1>注册</h1>
						<input v-model="username" type="text" maxlength="30" placeholder="用户名" />
						<input v-model="password" type="password" maxlength="30" placeholder="密码" />
						<input v-model="email" type="email" placeholder="邮箱" />
						<input v-model="code" type="text" placeholder="验证码" disabled />
						<a style="margin: 0" href="#" @click="changeDialog('邮箱验证码')">获取验证码</a>
						<button @click="regist()">注册</button>
					</div>
				</div>
				<div class="form-container sign-in-container">
					<div class="myCenter">
						<h1>登录</h1>
						<input v-model="account" type="text" placeholder="用户名/邮箱/手机号" />
						<input v-model="password" type="password" placeholder="密码" />
						<a href="#" @click="changeDialog('找回密码')">忘记密码？</a>
						<button @click="login()">登录</button>
					</div>
				</div>
				<div class="overlay-container">
					<div class="overlay">
						<div class="overlay-panel myCenter overlay-left">
							<h1>已有帐号？</h1>
							<p>请登录🚀</p>
							<button class="ghost" @click="signIn()">登录</button>
						</div>
						<div class="overlay-panel myCenter overlay-right">
							<h1>没有帐号？</h1>
							<p>立即注册吧😃</p>
							<button class="ghost" @click="signUp()">注册</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 用户信息 -->
		<div v-else class="user-container myCenter my-animation-hideToShow">
			<!-- 背景图片 -->
			<el-image
				class="my-el-image"
				style="position: absolute"
				v-once
				lazy
				:src="$constant.random_image + new Date() + Math.floor(Math.random() * 10)"
				fit="cover"
			>
				<div slot="error" class="image-slot"></div>
			</el-image>
			<div class="shadow-box-mini user-info" style="display: flex">
				<div class="user-left">
					<div>
						<el-avatar
							class="user-avatar"
							@click.native="changeDialog('修改头像')"
							:size="60"
							:src="currentUser.avatar"
						></el-avatar>
					</div>
					<div class="myCenter" style="margin-top: 12px">
						<div class="user-title">
							<div>用户名：</div>
							<div>手机号：</div>
							<div>邮箱：</div>
							<div>性别：</div>
							<div>简介：</div>
						</div>
						<div class="user-content">
							<div>
								<el-input maxlength="30" v-model="currentUser.username"></el-input>
							</div>
							<div>
								<div v-if="!isEmpty(currentUser.phoneNumber)">
									{{ currentUser.phoneNumber }}
									<span class="changeInfo" @click="changeDialog('修改手机号')">修改（功能未接入）</span>
								</div>
								<div v-else><span class="changeInfo" @click="changeDialog('绑定手机号')">绑定手机号（功能未接入）</span></div>
							</div>
							<div>
								<div v-if="!isEmpty(currentUser.email)">
									{{ currentUser.email }} <span class="changeInfo" @click="changeDialog('修改邮箱')">修改</span>
								</div>
								<div v-else><span class="changeInfo" @click="changeDialog('绑定邮箱')">绑定邮箱</span></div>
							</div>
							<div>
								<el-radio-group v-model="currentUser.gender">
									<el-radio :label="0" style="margin-right: 10px">薛定谔的猫</el-radio>
									<el-radio :label="1" style="margin-right: 10px">男</el-radio>
									<el-radio :label="2">女</el-radio>
								</el-radio-group>
							</div>
							<div>
								<el-input v-model="currentUser.introduction" maxlength="60" type="textarea" show-word-limit></el-input>
							</div>
						</div>
					</div>
					<div style="margin-top: 20px">
						<proButton
							:info="'提交'"
							@click.native="submitUserInfo()"
							:before="$constant.before_color_2"
							:after="$constant.after_color_2"
						>
						</proButton>
					</div>
				</div>
				<div class="user-right"></div>
			</div>
		</div>

		<el-dialog
			:title="dialogTitle"
			v-model:visible="showDialog"
			width="30%"
			:before-close="clearDialog"
			:append-to-body="true"
			:close-on-click-modal="false"
			center
		>
			<div class="myCenter" style="flex-direction: column">
				<div>
					<div v-if="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号'">
						<div style="margin-bottom: 5px">手机号：</div>
						<el-input v-model="phoneNumber"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
						<el-input v-model="code"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">密码：</div>
						<el-input v-model="password"></el-input>
					</div>
					<div v-else-if="dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱'">
						<div style="margin-bottom: 5px">邮箱：</div>
						<el-input v-model="email"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
						<el-input v-model="code"></el-input>
						<div style="margin-top: 10px; margin-bottom: 5px">密码：</div>
						<el-input v-model="password"></el-input>
					</div>
					<div v-else-if="dialogTitle === '修改头像'">
						<uploadPicture :prefix="'userAvatar'" @addPicture="addPicture" :maxSize="1" :maxNumber="1"></uploadPicture>
					</div>
					<div v-else-if="dialogTitle === '找回密码'">
						<div class="myCenter" style="margin-bottom: 12px">
							<el-radio-group v-model="passwordFlag">
								<el-radio :label="1" style="margin-right: 10px">手机号</el-radio>
								<el-radio :label="2">邮箱</el-radio>
							</el-radio-group>
						</div>
						<div v-if="passwordFlag === 1">
							<div style="margin-bottom: 5px">手机号：</div>
							<el-input v-model="phoneNumber"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
							<el-input v-model="code"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">新密码：</div>
							<el-input maxlength="30" v-model="password"></el-input>
						</div>
						<div v-else-if="passwordFlag === 2">
							<div style="margin-bottom: 5px">邮箱：</div>
							<el-input v-model="email"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
							<el-input v-model="code"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">新密码：</div>
							<el-input maxlength="30" v-model="password"></el-input>
						</div>
					</div>
					<div v-else-if="dialogTitle === '邮箱验证码'">
						<div>
							<div style="margin-bottom: 5px">邮箱：</div>
							<el-input v-model="email"></el-input>
							<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
							<el-input v-model="code"></el-input>
						</div>
					</div>
				</div>
				<div style="display: flex; margin-top: 30px" v-show="dialogTitle !== '修改头像'">
					<proButton
						:info="codeString"
						v-show="
							dialogTitle === '修改手机号' ||
							dialogTitle === '绑定手机号' ||
							dialogTitle === '修改邮箱' ||
							dialogTitle === '绑定邮箱' ||
							dialogTitle === '找回密码' ||
							dialogTitle === '邮箱验证码'
						"
						@click.native="getCode()"
						:before="$constant.before_color_1"
						:after="$constant.after_color_1"
						style="margin-right: 20px"
					>
					</proButton>
					<proButton
						:info="'提交'"
						@click.native="submitDialog()"
						:before="$constant.before_color_2"
						:after="$constant.after_color_2"
					>
					</proButton>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="login">
import { ref } from "vue";

const username = ref("");
const account = ref("");
const password = ref("");
const phoneNumber = ref("");
const email = ref("");
// const avatar = ref("");
const showDialog = ref(false);
const code = ref("");
const dialogTitle = ref("");
const codeString = ref("验证码");
const passwordFlag = ref(null);
// const intervalCode = ref(null);

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
