<template>
	<div class="content-box">
		<div class="backgroundtrue"></div>
		<!-- 主体 -->
		<div class="body">
			<div v-if="!ischangepage" class="left">
				<div class="comment" @click="changerouter(item)" v-infinite-scroll="load" v-for="item in showData.data" :key="item.img">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.userImg">
							<el-avatar :size="50" :src="getIcon('https://48fb906.r5.cpolar.top/img/user/' + item.userImg)"></el-avatar>
						</div>
						<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.username }}</span>
						<div class="ipschool">
							<el-tag size="large" round v-if="item.subject === 1" class="ml-2" type="warning">校内美食推荐</el-tag>
							<el-tag size="large" round v-else-if="item.subject === 4" class="ml-2" type="danger">周末游线路推荐</el-tag>
							<el-tag size="large" round v-else-if="item.subject === 2" class="ml-2">校园周边地点推荐</el-tag>
							<el-tag size="large" round class="ml-2" type="success" v-else>一日游线路推荐</el-tag>
						</div>
					</div>
					<div class="usercomment">
						{{ item.content }}
					</div>
					<div class="imageOter" v-if="item.img">
						<img class="image" :src="getIcon('https://48fb906.r5.cpolar.top/img/community/' + item.img)" alt="" />
					</div>
					<div class="timecontanerall">
						<div class="timecontaner">
							<span class="time">{{ item.time }}</span>

							<div v-if="params.school === 1">
								<el-icon><School /></el-icon>{{ "西南石油大学（成都校区）" }}
							</div>
							<div v-else>
								<el-icon><School /></el-icon>{{ "成都理工大学" }}
							</div>
						</div>
						<div v-if="id === item.uid">
							<el-button :icon="Delete" @click.stop="deletedongati(item.id)" size="small">删除</el-button>
						</div>
					</div>
				</div>
				<el-divider v-if="infiniteValue.current < infiniteValue.pages"> 加载中 </el-divider>
				<el-divider v-if="infiniteValue.current >= infiniteValue.pages"> 没有更多了 </el-divider>
			</div>
			<Editpage @returnback="returnback" @refreshpage="refreshpage" :changeParams="changeParams" v-else />
			<div class="right">
				<div class="selfinformation">
					<el-card shadow="always">
						<div class="avatar">
							<el-avatar
								:size="120"
								:src="getIcon('https://48fb906.r5.cpolar.top/img/user/' + globalStore.userInformation.img)"
							></el-avatar>
						</div>
						<div class="username">{{ globalStore.userInformation.username }}</div>
						<div class="desx">
							<el-tooltip class="box-item" effect="dark" :content="globalStore.userInformation.description" placement="top">
								{{ globalStore.userInformation.description }}
							</el-tooltip>
						</div>
						<div class="button" @click="changerouter('userSelf')">
							<el-button type="primary" :icon="!ischangepage ? Edit : Back">{{ !ischangepage ? "发布动态" : "返回" }}</el-button>
						</div>
					</el-card>
				</div>
				<div class="notice" v-if="!ischangepage">
					<el-card shadow="always">
						<div class="switchschool">
							<div>
								<el-icon color="rgb(98, 79, 60)"><Promotion /></el-icon>公告
							</div>
							<el-select v-model="value" @change="changeSchool()" class="m-2" placeholder="Select" size="small">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</div>
						<div class="noticeinfo">
							{{ `你好，欢迎来到${value === 1 ? "西南石油大学（成都校区）" : "成都理工大学"}动态推荐！` }}
						</div></el-card
					>
				</div>
				<div class="notice" v-else>
					<el-card shadow="always">
						<div class="switchschool">
							<div>
								<el-icon color="rgb(98, 79, 60)"><Promotion /></el-icon>公告
							</div>
						</div>
						<div class="noticeinfo">
							{{ `你好，欢迎来到用户页面，详情见右侧！` }}
						</div></el-card
					>
				</div>

				<div class="tag">
					<el-card shadow="always">
						<div class="tagtitle">动态主题</div>
						<div class="tags" v-if="!ischangepage">
							<el-tag size="large" class="ml-2" type="danger" @click="changeType(0)">全部</el-tag>
							<el-tag size="large" class="ml-2" type="warning" @click="changeType(1)">校内美食</el-tag>
							<el-tag size="large" class="ml-2" @click="changeType(4)">周末游线路</el-tag>
							<el-tag size="large" class="ml-2" @click="changeType(2)">校园周边地点</el-tag>
							<el-tag size="large" class="ml-2" type="success" @click="changeType(3)">一日游线路推荐</el-tag>
						</div>
						<div class="tags" v-else>
							<el-tag size="large" class="ml-2" type="danger">全部</el-tag>
							<el-tag size="large" class="ml-2" type="warning">校内美食</el-tag>
							<el-tag size="large" class="ml-2">周末游线路</el-tag>
							<el-tag size="large" class="ml-2">校园周边地点</el-tag>
							<el-tag size="large" class="ml-2" type="success">一日游线路推荐</el-tag>
						</div>
					</el-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { Edit, Delete, Back } from "@element-plus/icons-vue";
import { community, deletecommunity } from "@/api/modules/lnl-paly";
import { GlobalStore } from "@/stores";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Editpage from "../edit/index.vue";

const globalStore = GlobalStore();
const ischangepage = ref(false);

//更新页面数据
const refreshpage = async () => {
	params.pageNum = 1;
	showData.data = [];
	await getdata();
};

let changeParams = reactive({});
//点击跳转
const changerouter = (data: any) => {
	if (!ischangepage.value) {
		changeParams = data === "userSelf" ? {} : data;
		//确认跳转
		ischangepage.value = true;
	} else {
		ischangepage.value = false;
	}
};
//点击返回
const returnback = () => {
	ischangepage.value = false;
	refreshpage();
};

const value = ref(1);
const options = [
	{
		value: 1,
		label: "西南石油大学（成都校区）"
	},
	{
		value: 2,
		label: "成都理工大学"
	}
];

const id = globalStore.userInformation.id;
const params = reactive<{ subject?: number; pageNum: number; pageSize: number; school: number }>({
	pageNum: 1,
	pageSize: 3,
	subject: 0,
	school: 1
});

//存放数据
const showData = reactive<{ data: Array<DataValueInterface> }>({ data: [] });
//获取动态数据
const getdata = async () => {
	const res = (await community(params)) as any;
	infiniteValue.current = res.data.current;
	infiniteValue.pages = res.data.pages;
	showData.data.push(...res.data.records);
};

//懒加载数据
const infiniteValue = reactive({
	current: 0,
	pages: 1
});
//懒加载
const loadmore = async () => {
	if (infiniteValue.current < infiniteValue.pages) {
		params.pageNum++;
		getdata();
	} else return;
};
//防抖
let timer = ref();
const load = () => {
	if (timer.value) {
		clearTimeout(timer.value);
	}
	timer.value = setTimeout(() => {
		console.log("继续加载");
		loadmore();
	}, 1000);
};
console.log(load);

//处理图片
const getIcon = (name: string) => {
	return new URL(name, import.meta.url).href;
};
interface DataValueInterface {
	time: string;
	subject: number;
	content: string;
	img: string;
	userImg: string;
	username: string;
	id: number;
	uid: number;
}

//改变主题
const changeType = (value: any) => {
	console.log(value);
	params.subject = value;
	params.pageNum = 1;
	showData.data = [];
	getdata();
};
//改变学校
const changeSchool = () => {
	params.school = value.value;
	params.pageNum = 1;
	showData.data = [];
	getdata();
};
//删除动态
const deletedongati = async (value: any) => {
	ElMessageBox.confirm(`是否删除此条动态?`, "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		draggable: true
	}).then(async () => {
		await deletecommunity({ id: value });
		params.pageNum = 1;
		showData.data = [];
		await getdata();
		ElMessage({
			type: "success",
			message: `删除成功!`
		});
	});
};

onMounted(() => {
	getdata();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
