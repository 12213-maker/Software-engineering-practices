<template>
	<div class="content-box">
		<div class="background"></div>
		<div class="userinfo">
			<div class="avatar">
				<el-avatar :size="120" :src="globalStore.userInformation.img"></el-avatar>
			</div>
			<div class="username">{{ globalStore.userInformation.username }}</div>
			<div class="desx">
				<el-tooltip class="box-item" effect="dark" :content="globalStore.userInformation.description" placement="top">
					{{ globalStore.userInformation.description }}
				</el-tooltip>
			</div>
		</div>
		<!-- 主体 -->
		<!-- <el-card shadow="always">
			<div class="avatar">
				<el-avatar :size="120" :src="globalStore.userInformation.img"></el-avatar>
			</div>
			<div class="username">{{ globalStore.userInformation.username }}</div>
			<div class="desx">
				<el-tooltip class="box-item" effect="dark" :content="globalStore.userInformation.description" placement="top">
					{{ globalStore.userInformation.description }}
				</el-tooltip>
			</div>
		</el-card> -->
		<!-- <div class="body">
			<div v-if="!ischangepage" class="left">
				<div class="comment" @click="changerouter(item)" v-infinite-scroll="load" v-for="item in article" :key="item.img">
					<div class="avatar">
						<div class="avatarimage1" v-if="item.userPhoto">
							<img class="image" :src="item.userPhoto" alt="" />
						</div>
						<div class="avatarimage" v-else><img src="../../../assets/lnl_images/Snipaste_2023-02-05_19-41-13.png" alt="" /></div>
						<span class="username">{{ item.create }}</span>
						<div class="ipschool">
							<el-tag size="small" round v-if="item.subject === 1" class="ml-2" type="warning">表白</el-tag>
							<el-tag size="small" round v-else-if="item.subject === 2" class="ml-2" type="danger">日常</el-tag>
							<el-tag size="small" round v-else-if="item.subject === 3" class="ml-2">知识</el-tag>
							<el-tag size="small" round class="ml-2" type="success" v-else>趣玩</el-tag>
						</div>
					</div>
					<div class="usercomment">
						{{ item.content }}
					</div>
					<div class="imageOter" v-if="item.photo">
						<img class="image" :src="item.photo[0]" alt="" />
					</div>
					<div class="timecontanerall">
						<div class="timecontaner">
							<span class="time">{{ item.time }}</span>

							<div v-if="params.school === 1">
								<el-icon><School /></el-icon>{{ "西南石油大学（成都校区）" }}
							</div>
							<div v-else>
								<el-icon><School /></el-icon>{{ "西南石油大学（南充校区）" }}
							</div>
						</div>
						<div v-if="id === item.uid">
							<el-button :icon="Delete" @click.stop="deletedongati(item.id)" size="small">删除</el-button>
						</div>
					</div>
				</div>
			</div>
			<Editpage @returnback="returnback" @refreshpage="refreshpage" :changeParams="changeParams" v-else />

			<div class="right">
				<div class="selfinformation">
					<el-card shadow="always">
						<div class="avatar">
							<el-avatar :size="120" :src="globalStore.userInformation.img"></el-avatar>
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
							{{ `你好，欢迎来到${value === 1 ? "西南石油大学（成都校区）" : "西南石油大学（南充校区）"}动态推荐！` }}
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
							<el-tag size="large" class="ml-2" type="warning" @click="changeType(1)">表白</el-tag>
							<el-tag size="large" class="ml-2" @click="changeType(4)">趣玩</el-tag>
							<el-tag size="large" class="ml-2" @click="changeType(2)">日常</el-tag>
							<el-tag size="large" class="ml-2" type="success" @click="changeType(3)">知识</el-tag>
						</div>
						<div class="tags" v-else>
							<el-tag size="large" class="ml-2" type="danger">全部</el-tag>
							<el-tag size="large" class="ml-2" type="warning">表白</el-tag>
							<el-tag size="large" class="ml-2">趣玩</el-tag>
							<el-tag size="large" class="ml-2">日常</el-tag>
							<el-tag size="large" class="ml-2" type="success">知识</el-tag>
						</div>
					</el-card>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script setup lang="ts" name="authMenu">
// import { Edit, Delete, Back } from "@element-plus/icons-vue";
// // import { deletecommunity } from "@/api/modules/lnl-paly";
import { GlobalStore } from "@/stores";
// import { computed, onMounted, reactive, ref, watch } from "vue";
// import { ElMessage, ElMessageBox } from "element-plus";
// import Editpage from "../edit/index.vue";
// // import Card from "../Card/index.vue";

const globalStore = GlobalStore();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
