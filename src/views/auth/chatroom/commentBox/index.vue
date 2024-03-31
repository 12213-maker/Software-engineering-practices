<template>
	<div>
		<!-- 框 -->
		<textarea class="comment-textarea" v-model="data.commentContent" placeholder="写下点什么..." maxlength="1000" />
		<!-- 按钮 -->
		<div class="myBetween" style="margin-bottom: 10px">
			<div style="display: flex">
				<div @click="data.showEmoji = !data.showEmoji">
					<span class="myEmoji">🌕</span>
				</div>
				<!-- <div @click="openPicture()">
					<span class="myPicture">🌫️</span>
				</div> -->
			</div>

			<div style="display: flex">
				<ProButton
					:info="'提交'"
					@click="submitComment()"
					before="rgb(131, 123, 199)"
					after="linear-gradient(45deg, #f43f3b, #ec008c)"
				>
				</ProButton>
			</div>
		</div>
		<!-- 表情 -->
		<emoji @addEmoji="addEmoji" :showEmoji="data.showEmoji"></emoji>

		<!-- <el-dialog v-model="data.showPicture">
			<div class="comment-picture">
				<uploadPicture :prefix="'commentPicture'" @addPicture="addPicture" :maxSize="2" :maxNumber="1"></uploadPicture>
			</div>
		</el-dialog> -->
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { reactive } from "vue";
import ProButton from "../proButton/index.vue";
import emoji from "../emoji/index.vue";
import { ElMessage } from "element-plus";

const props = withDefaults(
	defineProps<{
		submitComment: any;
		currentUser: any;
	}>(),
	{
		currentUser: [],
		submitComment: () => {}
	}
);
const data = reactive({
	commentContent: "",
	showEmoji: false,
	showPicture: false,
	picture: {
		name: props.currentUser.username,
		url: ""
	}
});
const emit = defineEmits(["submitComment"]);
// function openPicture() {
// 	data.showPicture = true;
// }
// function addPicture(res) {
// 	data.picture.url = res;
// 	savePicture();
// }
// function savePicture() {
// 	let img = "[" + data.picture.name + "," + data.picture.url + "]";
// 	data.commentContent += img;
// 	data.picture.url = "";
// 	data.showPicture = false;
// }
// function addEmoji(key) {
// 	data.commentContent += key;
// }
function submitComment() {
	if (data.commentContent.trim() === "") {
		ElMessage({
			message: "你还没写呢~",
			type: "warning"
		});
		return;
	}
	emit("submitComment", data.commentContent.trim());
	data.commentContent = "";
}
</script>

<style scoped lang="scss">
.comment-textarea {
	border: 1px solid #dddddd;
	width: calc(100% - 40px);
	font-size: 14px;
	padding: 15px;
	min-height: 180px;
	/* 不改变大小 */
	resize: none;
	/* 不改变边框 */
	outline: none;
	border-radius: 4px;
	background-image: var("https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500");
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 100%;
	margin-bottom: 10px;
}

.comment-textarea:focus {
	border-color: orange;
}

.myEmoji {
	font-size: 19px;
	cursor: pointer;
	margin-right: 12px;
}

.myPicture {
	font-size: 18px;
	cursor: pointer;
}

.comment-picture {
	background-color: white;
	border-radius: 10px;
	padding: 30px;
}
</style>
