<template>
	<div id="container"></div>
</template>
<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref, shallowRef } from "@vue/reactivity";
import { onMounted } from "vue";
// import { LocationInformation } from "@element-plus/icons-vue";

const map = shallowRef(null);
const marker = ref("");
const initMap = () => {
	AMapLoader.load({
		key: "418d3f67ccf2389a00ca712f62869a1f", // 申请好的Web端开发者Key，首次调用 load 时必填
		version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: [""] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	})
		.then(AMap => {
			map.value = new AMap.Map("container", {
				//设置地图容器id
				viewMode: "2D", //是否为3D地图模式
				zoom: 14, //初始化地图级别
				center: [104.184071, 30.826166], //中心点坐标  新都
				resizeEnable: true
			});
			(map.value as any).on("click", function (e: any) {
				// 构造点标记
				marker.value = new AMap.Marker({
					icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
					position: [e.lnglat.getLng(), e.lnglat.getLat()]
				});
				// 构造矢量圆形
				let circle = new AMap.Circle({
					center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
					radius: 1000, //半径
					strokeColor: "#F33", //线颜色
					strokeOpacity: 1, //线透明度
					strokeWeight: 3, //线粗细度
					fillColor: "#ee2200", //填充颜色
					fillOpacity: 0.35 //填充透明度
				});
				// 单独将点标记添加到地图上
				(map.value as any).remove(marker.value);
				// (map.value as any).add(marker.value);
				(map.value as any).add([marker.value, circle]);
			});
		})
		.catch(e => {
			console.log(e);
		});
};

onMounted(() => {
	initMap();
});
</script>
<style scoped lang="scss">
#container {
	width: 100%;
	height: 600px;
	padding: 0;
	margin: 0;
}
.clickposition {
	position: relative;
	top: 18px;
	right: -1400px;
}
</style>
