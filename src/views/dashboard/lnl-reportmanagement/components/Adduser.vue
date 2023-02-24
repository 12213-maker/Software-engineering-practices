<template>
	<el-form ref="loginFormRef2" :rules="loginRules" :model="positionForm" label-width="120px">
		<el-form-item prop="type1" label="地点大类">
			<el-select v-model="positionForm.type1" class="m-2" placeholder="Select">
				<el-option v-for="item in selectChoices.type1" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-form-item>
		<el-form-item prop="type2" label="地点小类">
			<el-select v-model="positionForm.type2" class="m-2" placeholder="Select">
				<el-option
					v-for="item in positionForm.type1 ? selectChoices.type2[positionForm.type1 - 1] : selectChoices.type2[0]"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</el-form-item>
		<el-form-item prop="name" label="地点名称">
			<el-input v-model="positionForm.name" />
		</el-form-item>
		<el-form-item label="评分" props="score">
			<el-rate v-model="positionForm.score" />
		</el-form-item>
		<el-form-item prop="position" label="位置">
			<el-input v-model="positionForm.position" />
		</el-form-item>
		<el-form-item prop="phone" label="联系电话">
			<el-input v-model="positionForm.phone" />
		</el-form-item>
		<el-form-item prop="information" label="介绍">
			<el-input v-model="positionForm.information" type="textarea" />
		</el-form-item>
		<el-form-item prop="number" label="地点编号">
			<el-input v-model="positionForm.number" />
		</el-form-item>
		<el-form-item prop="city" label="城市名">
			<el-select v-model="positionForm.city" class="m-2" placeholder="Select">
				<el-option v-for="item in selectCity" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-form-item>
		<el-form-item prop="files" label="图片">
			<el-upload
				:on-remove="handleRemove"
				:on-change="onImgChange"
				:before-upload="beforeAvatarUpload"
				list-type="picture-card"
				:auto-upload="false"
			>
				<el-icon><Plus /></el-icon>
				<template #file="{ file }">
					<div>
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
					</div>
				</template>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button @click="chanagevisible">取消</el-button>
			<el-button type="primary" @click="onSubmit">新增</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { postPlaceAddPlace } from "@/api/modules/lnl-paly";
import { ElNotification } from "element-plus";
import { getTimeState } from "@/utils/util";
import { reactive, ref } from "vue";
const emits = defineEmits(["change_dialog_visible", "refreshdata"]);
const props = defineProps<{
	compname?: string;
}>();
console.log(props.compname);

let loginFormRef2 = ref();
type positionType = {
	type1: number | undefined;
	type2: number | undefined;
	name: string;
	score: number | undefined;
	position: string;
	phone: string;
	information: string;
	number: string;
	city: string;
	files: Array<any>;
};
let positionForm = reactive<positionType>({
	type1: undefined,
	type2: undefined,
	name: "",
	score: undefined,
	position: "",
	phone: "",
	information: "",
	number: "",
	city: "",
	files: []
});
const selectCity = [
	{
		label: "成都",
		value: "成都"
	},
	{
		label: "重庆",
		value: "重庆"
	}
];
const selectChoices = {
	type1: [
		{
			label: "美食",
			value: 1
		},
		{
			label: "娱乐",
			value: 2
		},
		{
			label: "景点",
			value: 3
		},
		{
			label: "住宿",
			value: 4
		}
	],
	type2: [
		[
			{
				value: "1",
				label: "中餐"
			},
			{
				value: "2",
				label: "火锅"
			},
			{
				value: "3",
				label: "小吃"
			},
			{
				value: "4",
				label: "其它"
			}
		],
		[
			{
				value: "1",
				label: "游乐园"
			},
			{
				value: "2",
				label: "公园"
			},
			{
				value: "3",
				label: "商场"
			},
			{
				value: "4",
				label: "其它"
			}
		],
		[
			{
				value: "1",
				label: "自然风景"
			},
			{
				value: "2",
				label: "博物馆"
			},
			{
				value: "3",
				label: "纪念地"
			},
			{
				value: "4",
				label: "其它"
			}
		],
		[
			{
				value: "1",
				label: "酒店"
			},
			{
				value: "2",
				label: "名宿"
			}
		]
	],
	order: [
		{ label: "评分降序", value: 1 },
		{ label: "评分升序", value: 2 }
	]
};

//表单验证
let checkPhone = (rule: any, value: any, callback: any) => {
	let reg = /^1[345789]\d{9}$/;
	if (!reg.test(value)) {
		callback(new Error("请输入11位手机号"));
	} else {
		callback();
	}
};
const loginRules = reactive({
	type1: [{ required: true, message: "请选择", trigger: "blur" }],
	type2: [{ required: true, message: "请选择", trigger: "blur" }],
	name: [{ required: true, message: "请输入", trigger: "blur" }],
	score: [{ required: true, message: "请选择", trigger: "blur" }],
	position: [{ required: true, message: "请选择", trigger: "blur" }],
	phone: [{ validator: checkPhone, message: "请输入正确的手机号", trigger: "blur" }],
	information: [{ required: true, message: "请输入", trigger: "blur" }],
	number: [{ required: true, message: "长度为10", min: 10, max: 10, trigger: "blur" }],
	city: [{ required: true, message: "请输入", trigger: "blur" }]
});
const imageUrl = reactive<Array<any>>([]);
const beforeAvatarUpload = (file: any) => {
	// 使图片显示
	imageUrl.push(URL.createObjectURL(file));
	console.log(imageUrl);
	return false;
};

//删除图片
const handleRemove = (uploadFile: any, uploadFiles: any) => {
	console.log(uploadFile, uploadFiles);
};

let formdata = new FormData();
//处理图片
const onImgChange = (uploadFile: any) => {
	formdata.append("file", uploadFile.raw);
};

const onSubmit = async () => {
	const valid = await loginFormRef2.value.validate();

	if (valid) {
		try {
			const { code } = await postPlaceAddPlace({
				...positionForm,
				files: formdata.getAll("file"),
				location: "104.184071,30.826166"
			});
			emits("refreshdata");
			if (Number(code) === 200) {
				ElNotification({
					title: getTimeState(),
					message: `新增：${positionForm.name}成功`,
					type: "success",
					duration: 3000
				});
			} else {
				ElNotification({
					title: getTimeState(),
					message: `已有此地点`,
					type: "warning",
					duration: 3000
				});
			}
		} catch (err) {
			ElNotification({
				title: getTimeState(),
				message: `已有此地点`,
				type: "warning",
				duration: 3000
			});
			console.log(err);
		} finally {
			chanagevisible();
			return;
		}
	}
	return;
};

const chanagevisible = () => {
	emits("change_dialog_visible", false);
};
</script>
