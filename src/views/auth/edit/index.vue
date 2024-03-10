<template>
	<div class="left">
		<div class="leftinner" :style="{ height: item.data.img ? '' : '51vh' }">
			<div class="comment">
				<div class="avatar">
					<div class="avatarimage1" v-if="item.data.img">
						<img class="image" :src="item.data.img" alt="" />
					</div>
					<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
					<span class="username">{{ item.data.username }}</span>
					<div class="timecontaner">
						<span class="time">{{ item.data.time }}</span>
					</div>
					<div v-if="isSelfPage" class="ipschool">
						<el-tag size="large" round v-if="item.data.subject === 1" class="ml-2" type="warning">表白</el-tag>
						<el-tag size="large" round v-else-if="item.data.subject === 4" class="ml-2" type="danger">趣玩</el-tag>
						<el-tag size="large" round v-else-if="item.data.subject === 2" class="ml-2">日常</el-tag>
						<el-tag size="large" round class="ml-2" type="success" v-else>知识</el-tag>
					</div>

					<div v-if="id === item.data.uid && isSelfPage" class="timecontanerall">
						<div>
							<el-button plain type="primary" @click="deletedongati(item.data.id)">删除动态</el-button>
						</div>
					</div>
				</div>

				<div class="usercomment">
					<el-input v-if="!isSelfPage" v-model="title" placeholder="文章标题" style="margin-bottom: 20px; width: 400px" />
					<el-input v-if="!isSelfPage" v-model="textarea" :rows="7" type="textarea" placeholder="Please input" />
					<div v-else class="usercommentsize">
						{{ item.data.content }}
					</div>
				</div>

				<div v-if="!isSelfPage" class="imageOter uploadone">
					<!-- 上传图片 -->
					<div>
						<el-upload
							list-type="picture-card"
							:before-upload="beforeAvatarUpload"
							:on-change="change"
							:auto-upload="false"
							:limit="2"
						>
							<el-icon><Plus /></el-icon>

							<template #file="{ file }">
								<div>
									<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
								</div>
							</template>
						</el-upload>
					</div>

					<div class="btnsss">
						<!-- 选择tag -->
						<el-select class="selecttag" v-model="value" placeholder="Select">
							<el-option v-for="(item2, index) in options" :key="item2.value" :label="item2.label" :value="item2.value">
								<el-tag size="large" round v-if="index + 1 === 1" class="ml-2" type="warning">{{ item2.label }}</el-tag>
								<el-tag size="large" round v-else-if="index + 1 === 4" class="ml-2" type="danger">{{ item2.label }}</el-tag>
								<el-tag size="large" round v-else-if="index + 1 === 2" class="ml-2">{{ item2.label }}</el-tag>
								<el-tag size="large" round class="ml-2" type="success" v-else>{{ item2.label }}</el-tag>
							</el-option>
						</el-select>
						<el-select class="ipschool" v-model="value2" placeholder="Select">
							<el-option v-for="item3 in options2" :key="item3.value" :label="item3.label" :value="item3.value" />
						</el-select>

						<!-- 发布取消按钮 -->
						<div v-if="!isSelfPage" class="btns">
							<el-button :icon="Delete" type="primary" @click="emit('returnback')">取消</el-button>
							<el-button :icon="Position" type="primary" @click="inputstatus">发布</el-button>
						</div>
					</div>
				</div>

				<div class="imageOter" v-else>
					<div class="imgimg">
						<img v-for="item2 in item.data.photo" :key="item2" class="image" :src="item2" alt="" />
					</div>
				</div>

				<!-- 点赞转发 -->
				<div class="bottom" v-if="isSelfPage">
					<div>
						<el-icon><Share /></el-icon>转发
					</div>
					<div>
						<el-icon><ChatLineSquare /></el-icon>{{ item.data.comment.length }}
					</div>
					<div>
						<el-icon><Star /></el-icon>{{ item.data.stars }}
					</div>
				</div>
			</div>
			<el-card v-if="isSelfPage">
				<div class="mybottom">
					<div class="mycomment">
						<div class="img"><img class="image" :src="userInformation.img" alt="" /></div>
						<div class="input"><el-input v-model="input" style="width: 100%" size="large" placeholder="发布你的评论" /></div>
						<div class="btn" @click="submit"><el-button size="large">发布</el-button></div>
					</div>
					<div class="allcomment" v-for="(item2, index2) in item.data.comment" :key="index2">
						<div class="topcoment">
							<div class="userinfo">
								<div class="avatarimage1" v-if="item2.img">
									<img class="image" :src="item2.img" alt="" />
								</div>
								<div class="avatarimage" v-else>
									<img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" />
								</div>
								<span class="username"
									><span class="name">{{ item2.username }}</span
									><span class="time">{{ item2.time }}</span></span
								>
							</div>
							<div class="commentinfo">
								<div class="info">{{ item2.info }}</div>
							</div>
							<div class="bottom">
								<div>
									<el-icon><ChatLineSquare /></el-icon>
								</div>
								<div>
									<el-icon><Star /></el-icon>
								</div>
							</div>
						</div>
						<div class="reply">
							<el-steps style="max-width: 600px" space="30" v-if="item2.reply" direction="vertical" :active="0">
								<el-step
									:title="item3.username"
									v-for="(item3, index) in item2.reply"
									:key="index"
									space="30"
									:description="item3.info"
									:icon="User"
								/>

								<!-- <el-step title="Step 2" space="30" /> -->
								<!-- <el-step title="Step 3" space="30" /> -->
							</el-steps>
						</div>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { reactive, ref } from "vue";
import { GlobalStore } from "@/stores";
import { Delete, Position, User } from "@element-plus/icons-vue";
// import { deletecommunity } from "@/api/modules/lnl-paly";
import { ElMessage, ElMessageBox } from "element-plus";

const globalStore = GlobalStore();
const userInformation = globalStore.userInformation;
const id = userInformation.id;

const emit = defineEmits(["returnback", "refreshpage"]);

//第一个定义类型，第二个默认值
const props = withDefaults(defineProps<{ changeParams: any }>(), {
	changeParams: {}
});

//isSelfPage 标识从发布动态转过来以及可以编辑动态
const isSelfPage = Object.keys(props.changeParams).length;
const textarea = ref("");
const title = ref("");
const input = ref("");

const value = ref(1);
const options = [
	{
		value: 1,
		label: "表白"
	},
	{
		value: 2,
		label: "日常"
	},
	{
		value: 3,
		label: "知识"
	},
	{
		value: 4,
		label: "趣玩"
	}
];
const value2 = ref(1);
const options2 = [
	{
		value: 1,
		label: "西南石油大学（成都校区）"
	},
	{
		value: 2,
		label: "西南石油大学（南充校区）"
	}
];

type DataType = {
	userImg: string;
	username: string;
	subject: number;
	content: string;
	img: string;
	time: string;
	uid: number;
	id: number;
};
let item = reactive<{ data: DataType }>({
	data: {
		userImg: "",
		username: "",
		subject: 1,
		content: "",
		img: "",
		time: "",
		uid: 0,
		id: 0
	}
});
if (isSelfPage) {
	Object.assign(item.data, props.changeParams);
	console.log("我是item数据", item);
} else {
	Object.assign(item.data, userInformation);
	console.log("我是发布动态数据", item.data);
}

//发布评论
const submit = () => {
	if (!input.value) return;
	const { id } = props.changeParams;
	const comment = {
		username: userInformation.username,
		img: userInformation.img,
		info: input.value,
		time: new Date().toLocaleDateString(),
		adress: "四川"
	};

	const article = globalStore.article;
	const newArticle = article.map((item: any) => {
		const articleId = item.id;
		if (id === articleId) {
			item.comment.unshift(comment);
			return item;
		}
		return item;
	});
	globalStore.setArticles(newArticle);
	globalStore.setOriginArticles(newArticle);
	input.value = "";
};

//删除动态
const deletedongati = async (value: any) => {
	ElMessageBox.confirm(`是否删除此条动态?`, "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		draggable: true
	}).then(async () => {
		// await deletecommunity({ id: value });

		const article = globalStore.article;
		const newArticle = article.filter((item: any) => {
			return item.id !== value;
		});
		globalStore.setArticles(newArticle);
		globalStore.setOriginArticles(newArticle);

		emit("returnback");
		emit("refreshpage");
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});
};
// const getIcon = (name: string) => {
// 	return new URL(name, import.meta.url).href;
// };

const imageUrl = reactive<Array<any>>([]);
const beforeAvatarUpload = (file: any) => {
	// 使图片显示
	imageUrl.push(URL.createObjectURL(file));
	console.log(imageUrl);
	return false;
};
let formdata = new FormData();
const change = async (uploadFile: any) => {
	formdata.append("file", uploadFile.raw);
};
//发送动态
const inputstatus = async () => {
	if (textarea.value === "" || title.value === "") {
		ElMessage({
			type: "warning",
			message: `请输入!`
		});
	}
	const params = {
		id: new Date().getTime(),
		uid: userInformation.id,
		username: userInformation.username,
		img: userInformation.img,
		time: new Date().toLocaleDateString(),
		title: title.value,
		stars: 0,
		comment: [],
		adress: "四川",
		photo: [
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg",
			"https://p4.itc.cn/images01/20210611/ead4451f926b4b189011e19646944486.jpeg"
		], //文章图片
		content: textarea.value,
		subject: value.value,
		// file: formdata.get("file"),
		school: value2.value,
		...userInformation
	};

	// await postcommunity(params);

	const article = globalStore.article;
	article.unshift(params);
	globalStore.setArticles(article);
	globalStore.setOriginArticles(article);

	ElMessage({
		type: "success",
		message: `发布成功!`
	});
	emit("returnback");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
