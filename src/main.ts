import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "@/styles/theme/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";
// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";
// errorHandler
import errorHandler from "@/utils/errorHandler";
//懒加载
import lazyPlugin from "vue3-lazy";

const app = createApp(App);
// import VueLazyLoad from "vue-lazyload";
// Vue.use(VueLazyLoad, {
// 	preLoad: 1,
// 	error: require("@/assets/images/404.png"),
// 	loading: require("@/assets/images/403.png"),
// 	attempt: 2
// });

// const $ = require("jquery");
// window.$ = $;

app.config.errorHandler = errorHandler;

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app
	.use(router)
	.use(I18n)
	.use(pinia)
	.use(directives)
	.use(ElementPlus)
	.use(lazyPlugin, {
		loading: import("@/assets/images/403.png"), // 图片加载时默认图片
		error: import("@/assets/images/404.png") // 图片加载失败时默认图片
	})
	.mount("#app");
