<template>
	<div class="outer">
		<span class="mobile btn-mobile-menu">
			<i class="social iconfont icon-list btn-mobile-menu__icon"></i>
			<i class="social iconfont icon-angleup btn-mobile-close__icon hidden"></i>
		</span>
		<header id="panel" class="panel-cover">
			<div class="panel-main">
				<div class="panel-main__inner panel-inverted">
					<div class="panel-main__content">
						<div class="ih-item circle effect right_to_left">
							<a href="#" title="" class="blog-button">
								<div class="img">
									<img
										src="https://unpkg.com/dmego-home-page@latest/assets/img/logo3.jpg"
										alt="img"
										class="js-avatar iUp profilepic"
									/>
								</div>
							</a>
						</div>
						<h1 class="panel-cover__title panel-title iUp">
							<a href="#" title="Dmego Home">Dmego</a>
						</h1>
						<p class="panel-cover__subtitle panel-subtitle iUp">Code Create Life</p>
						<hr class="panel-cover__divider iUp" />
						<p id="description" class="panel-cover__description iUp">
							如何得与凉风约, 不共尘沙一并来!
							<br />
							<strong>-「中牟道中」</strong>
						</p>
						<div class="navigation-wrapper iUp">
							<div>
								<nav class="cover-navigation cover-navigation--primary">
									<ul class="navigation">
										<li class="navigation__item">
											<a href="/" class="blog-button">首页</a>
										</li>
										<li class="navigation__item">
											<a href="https://dmego.cn" class="blog-button" target="_blank">博客</a>
										</li>
										<li class="navigation__item">
											<a href="https://r.dmego.cn" class="blog-button" target="_blank">简历</a>
										</li>
										<li class="navigation__item">
											<a href="https://dmego.cn/about/" class="blog-button" target="_blank">关于</a>
										</li>
									</ul>
								</nav>
							</div>
							<div class="iUp">
								<nav class="cover-navigation navigation--social">
									<ul class="navigation">
										<li class="navigation__item">
											<a href="https://github.com/dmego/" title="github" target="_blank">
												<i class="social iconfont icon-github"></i>
												<span class="label">github</span>
											</a>
										</li>
										<li class="navigation__item">
											<a href="http://www.cnblogs.com/dmego/" title="cnblogs" target="_blank">
												<i class="social iconfont icon-cnblogs"></i>
												<span class="label">cnblogs</span>
											</a>
										</li>

										<li class="navigation__item">
											<a href="https://www.zhihu.com/people/dmego/" title="zhihu" target="_blank">
												<i class="social iconfont icon-zhihu"></i>
												<span class="label">zhihu</span>
											</a>
										</li>
										<li class="navigation__item">
											<!-- 加密的邮箱地址, 请自行修改, 或者改用下方的明文方式 -->
											<a href="javascript:decryptEmail('ZG1lYWdvQGdtYWlsLmNvbQ==');" title="email">
												<!-- <a href="test@test.com" title="email"> -->
												<i class="social iconfont icon-email"></i>
												<span class="label">email</span>
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-cover--overlay cover-slate"></div>
			</div>
			<!-- <div class="beian iUp">
            <a class="icp" href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">XXX</a>
            <a class="gwab" href="http://www.beian.gov.cn/portal/recordQuery" target="_blank">XXX</a>
        </div> -->
			<div class="remark iUp">
				<p class="power">
					Powered By <a href="https://github.com/features/actions" target="_blank"> GitHub Actions </a> And
					<a href="https://hitokoto.cn/" target="_blank"> Hitokoto </a>
				</p>
			</div>
		</header>
	</div>
</template>

<script setup lang="ts" name="authMenu">
// const articleList: any = [
// 	{
// 		id: 6334-66808,
// 		articleCover:
// 			"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F146c162c-2c43-4323-b86d-b435e10fc1f1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712298447&t=abf160de712c33b88e3cf8b649be612e",
// 		createTime: "time",
// 		articleTitle: "title",
// 		viewCount: 123,
// 		commentCount: "comment",
// 		likeCount: 333,
// 		articleContent: "showmearticlecontent",
// 		labelId: 1,
// 		sortId: 1,
// 		sort: { sortName: 1 },
// 		label: { labelName: 2 }
// 	}
// ];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
