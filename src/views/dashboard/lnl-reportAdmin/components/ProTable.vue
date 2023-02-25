<template>
	<div class="search">
		<div class="input">
			<div class="title">状态:</div>
			<el-select v-model="selectStatus" class="m-2" placeholder="Select">
				<el-option v-for="item in selectStatusoption" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>

		<div>
			<el-button type="primary" :icon="Search" @click="searchinfo">搜索</el-button>
			<el-button @click="restinfo">重置</el-button>
		</div>
	</div>
	<!-- 表格内容 card -->
	<div class="card table">
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :selectedListIds="selectedListIds" :selectedList="selectedList" :isSelected="isSelected"></slot>
			</div>
			<div class="header-button-ri" v-if="toolButton">
				<el-button :icon="Operation" circle v-if="columns.length" @click="openColSetting"> </el-button>
				<el-button :icon="Search" circle v-if="searchColumns.length" @click="isShowSearch = !isShowSearch"> </el-button>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			v-loading="loading"
			ref="tableRef"
			v-bind="$attrs"
			:data="tabledata.data"
			:border="border"
			:row-key="getRowKeys"
			@selection-change="selectionChange"
		>
			<!-- 默认插槽 -->
			<slot></slot>
			<template v-for="item in tableColumns" :key="item">
				<!-- selection || index -->
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'"
					v-if="item.type == 'selection' || item.type == 'index'"
				>
				</el-table-column>
				<!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
				<el-table-column v-bind="item" :align="item.align ?? 'center'" v-if="item.type == 'expand'" v-slot="scope">
					<component :is="item.render" :row="scope.row" v-if="item.render"> </component>
					<slot :name="item.type" :row="scope.row" v-else></slot>
				</el-table-column>
				<!-- other 循环递归 -->
				<TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
					<template v-for="slot in Object.keys($slots)" #[slot]="scope">
						<slot :name="slot" :row="scope.row"></slot>
					</template>
				</TableColumn>
			</template>
			<!-- 插入表格最后一行之后的插槽 -->
			<template #append>
				<slot name="append"> </slot>
			</template>
			<!-- 表格无数据情况 -->
			<template #empty>
				<div class="table-empty">
					<slot name="empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</slot>
				</div>
			</template>
		</el-table>
		<!-- 分页组件 -->
		<slot name="pagination">
			<el-pagination
				:current-page="params.pageNum"
				:page-sizes="[1, 5, 10, 20]"
				:page-size="params.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="params.total"
				background
				@size-change="handleSizeChange2"
				@current-change="handleCurrentChange2"
			/>
		</slot>
	</div>
	<!-- 列设置 -->
	<ColSetting v-if="toolButton" ref="colRef" v-model:colSetting="colSetting" />
</template>

<script setup lang="ts" name="ProTable">
import { ref, watch, provide, onMounted, reactive } from "vue";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { BreakPoint } from "@/components/Grid/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { ElMessageBox, ElTable, TableProps } from "element-plus";
import { Operation, Search } from "@element-plus/icons-vue";
import { handleProp } from "@/utils/util";
import TableColumn from "@/components/ProTable/components/TableColumn.vue";
import ColSetting from "@/components/ProTable/components/ColSetting.vue";
import router from "@/routers";

interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
	columns: ColumnProps[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
	title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	selectId?: string; // 当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
	searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

const selectStatus = ref<any>(undefined);
const selectStatusoption = [
	{ label: "未处理", value: 0 },
	{ label: "已处理", value: 1 }
];
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	selectId: "id",
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
});

let params = reactive({
	total: 0, //总页数
	pageSize: 10, // 每页的数据条数
	pageNum: 1 //当前的页数
});
//地点params
const positionParams = reactive<{ info: undefined | string }>({
	info: undefined
});
const searchinfo = async () => {
	loading.value = true;
	params.pageNum = 1;
	const { pageNum, pageSize } = params;
	const { data } = await props.requestApi({ ...positionParams, pageNum, pageSize, info: selectStatus.value });
	tabledata.data = data.records;
	loading.value = false;
	params.total = data.total;
};
const restinfo = () => {
	positionParams.info = undefined;
	selectStatus.value = undefined;
	params.pageNum = 1;
	getdataback();
};

// 是否显示搜索模块
const isShowSearch = ref(true);

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection(props.selectId);

const tabledata = reactive<{ data: Array<object> }>({
	data: []
});
// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);
console.log(handleSizeChange, handleCurrentChange, search);

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide("enumMap", enumMap);
const setEnumMap = async (col: ColumnProps) => {
	if (!col.enum) return;
	// 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
	if (typeof col.enum !== "function") return enumMap.value.set(col.prop!, col.enum!);
	const { data } = await col.enum();
	enumMap.value.set(col.prop!, data);
};

// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(async col => {
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
		flatArr.push(col);

		// 给每一项 column 添加 isShow && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true;
		col.isFilterEnum = col.isFilterEnum ?? true;

		// 设置 enumMap
		setEnumMap(col);
	});
	return flatArr.filter(item => !item._children?.length);
};

// flatColumns
const flatColumns = ref<ColumnProps[]>();
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter(item => item.search?.el);

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.forEach((column, index) => {
	column.search!.order = column.search!.order ?? index + 2;
	if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
		searchInitParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue;
	}
});

// 排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!);

// 列设置 ==> 过滤掉不需要设置显隐的列
const colRef = ref();
const colSetting = tableColumns.value!.filter(item => {
	return item.type !== "selection" && item.type !== "index" && item.type !== "expand" && item.prop !== "operation";
});
const openColSetting = () => colRef.value.openColSetting();
const loading = ref(true);
//请求数据
const getdataback = async () => {
	loading.value = true;
	const { pageNum, pageSize } = params;
	const { data, code } = await props.requestApi({ ...positionParams, pageNum, pageSize, info: selectStatus.value });
	if (code === 0) {
		ElMessageBox.confirm(`暂无权限，请联系管理员`, "温馨提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
			draggable: true
		}).finally(async () => {
			router.push("/home/index");
		});
		return;
	}
	tabledata.data = data.records;
	loading.value = false;
	params.total = data.total;
};

//每页条数改变时触发 选择一页显示多少行
const handleSizeChange2 = (val: any) => {
	//每次改变页面数量都要重置pageNum
	params.pageNum = 1;
	params.pageSize = val;
	getdataback();
};
//当前页改变时触发 跳转其他页
const handleCurrentChange2 = (val: any) => {
	params.pageNum = val;
	getdataback();
};

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
	element: tableRef,
	tableData,
	searchParam,
	pageable,
	getTableList,
	reset,
	clearSelection,
	getdataback,
	enumMap,
	isSelected,
	selectedList,
	selectedListIds
});

onMounted(async () => {
	await getdataback();
});
</script>
<style scoped lang="scss">
.search {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 70px;
	margin-bottom: 10px;
	font-size: 15px;
	font-weight: 600;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 0 5px #eeeeee;
	.input {
		display: flex;
		padding: 0 50px;
		.title {
			display: flex;
			align-items: center;
			padding-right: 20px;
		}
		.titlespacial {
			width: 90px;
		}
		.input_elinput {
			width: 250px;
		}
	}
	.order {
		width: 270px;
		.title {
			width: 50px;
		}
	}
}
</style>
