<template>
	<!-- 用户信息背景 -->
	<!-- <nav id="nav" class="gird-header" style="display: none">
		<div class="ui container">
			<div class="ui inverted secondary stackable menu">
				<h2 class="ui olive header item" style="font-family: STSong">{{ userInformation.username }}</h2>
				<a href="#" class="active m-item item"><i class="home icon"></i>首页</a>
				<a href="#" class="m-item item"><i class="clone outline icon"></i>分类</a>
				<a href="#" class="m-item item"><i class="clock icon"></i>时间轴</a>
				<a href="#" class="m-item item"><i class="music icon"></i>音乐盒</a>
				<a href="#" class="m-item item"><i class="book icon"></i>留言板</a>
				<a href="#" class="m-item item"><i class="pencil alternate icon"></i>友人帐</a>
				<a href="#" class="olive m-item item"><i class="image icon"></i>照片墙</a>
				<a href="#" class="m-item item"><i class="info icon"></i>关于我</a>
				<div class="right m-item item">
					<form name="search" action="#" method="post" target="_blank">
						<div class="ui icon transparent input m-margin-tb-tiny" style="color: white">
							<input style="color: white" type="text" name="query" placeholder="Search...." />
							<i onclick="document.forms['search'].submit()" class="search link icon"></i>
						</div>
					</form>
				</div>
			</div>
		</div>
		<a href="#" class="ui menu toggle black icon button m-right-top m-mobile-hide" style="display: none">
			<i class="sidebar icon"></i>
		</a>
	</nav> -->

	<!--顶部图片-->
	<div class="m-bg-class_outer" style="width: 100%; height: 750px" v-if="!detailinfo">
		<img
			:src="userInformation.img"
			:th:src="userInformation.img"
			alt=""
			class="ui m-bg image"
			style="width: 100%; height: 100%"
		/>
		<div class="m-bg-class_cover" align="center">
			<div class="m-margin-top-maxx" align="center">
				<img
					class="ui circular image"
					align="center"
					:src="userInformation.img"
					th:src="@{/images/me.jpg}"
					style="width: 150px; height: 150px"
				/>
			</div>
			<div class="m-font-size-title-large" align="center">{{ userInformation.username }}</div>

			<div class="" align="center">
				<a href="#" class="ui tencent circular icon button"><i class="user icon"></i></a>
				<a href="#" class="ui wechat circular icon button"><i class="weixin icon"></i></a>
				<a href="#" class="ui qq circular icon button" data-content="316392836" data-position="bottom center"
					><i class="qq icon"></i
				></a>
				<a
					href="https://github.com/oneStarLR/"
					target="_blank"
					class="ui github circular icon button"
					data-content="点击跳转GitHub"
					data-position="bottom center"
					><i class="github icon"></i
				></a>
				<a
					href="https://blog.csdn.net/One_L_Star"
					target="_blank"
					class="ui csdn circular icon button"
					data-content="点击跳转CSDN"
					data-position="bottom center"
					><i class="copyright outline icon"></i
				></a>
				<a href="#" class="ui email circular icon button" data-content="onestarlr@hotmail.com" data-position="bottom center"
					><i class="envelope icon"></i
				></a>
			</div>

			<div class="ui tencent-qr flowing popup transition hidden">
				<img :src="userInformation.img" th:src="@{/images/oneStar.jpg}" alt="" class="ui rounded image" style="width: 110px" />
				<div align="center">公众号</div>
			</div>
			<div class="ui wechat-qr flowing popup transition hidden">
				<img
					:src="userInformation.img"
					th:src="@{/images/oneStarWechat.jpg}"
					alt=""
					class="ui rounded image"
					style="width: 110px"
				/>
				<div align="center">微信</div>
			</div>
			<div class="ui qq-qr flowing popup transition hidden">
				<img :src="userInformation.img" th:src="@{/images/qq.jpg}" alt="" class="ui rounded image" style="width: 110px" />
				<div align="center">QQ</div>
			</div>

			<h3 class="m-font-size-text" align="center">{{ userInformation.description }}</h3>
			<hr style="width: 30%" />
			<!-- <h5 class="m-font-size-text-init-title m-margin-top-large">“大圣，此去欲何?”</h5>
			<h5 class="m-font-size-text-init-title">“踏南天，碎凌霄”</h5>
			<h5 class="m-font-size-text-init-title">“若一去不回……”</h5>
			<h5 class="m-font-size-text-init-title">“便一去不回”</h5> -->
			<div id="waypoint" class="ui m-margin-top-large" align="center">
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==1} ? 'active'"
					><i class="home icon"></i>首页</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==2} ? 'active'"
					><i class="clone outline icon"></i>分类</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==4} ? 'active'"
					><i class="clock icon"></i>时间轴</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==5} ? 'active'"
					><i class="music icon"></i>音乐盒</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==6} ? 'active'"
					><i class="book icon"></i>留言板</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==7} ? 'active'"
					><i class="pencil alternate icon"></i>友人帐</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==8} ? 'active'"
					><i class="image icon"></i>照片墙</a
				>
				<a
					href="#"
					class="ui circular icon button m-opacity-small m-item item m-mobile-hide m-index-btn"
					th:classappend="${n==9} ? 'active'"
					><i class="info icon"></i>关于我</a
				>
			</div>
			<div class="hiddenDiv"></div>
		</div>
	</div>

	<!-- 我的关注 -->
	<div class="ui m-padded-tb-large" v-if="!detailinfo">
		<div class="ui m-container-small m-opacity">
			<div class="ui secondary segment" align="center"><i class="bookmark icon"></i>关注</div>
		</div>
		<!-- 我的关注 -->
		<FriendCard :friendList="myBlogInfo.follow" :clickFriendCard="clickFriendCard" />
	</div>

	<!--中间内容-->
	<div class="m-padded-tb-big animated fadeIn" v-if="myArticle.length != 0 && !detailinfo">
		<div class="ui container">
			<div class="ui stackable grid">
				<!--博客内容-->
				<div class="ui vertical segment">
					<div class="ui m-container-small m-opacity">
						<div class="ui secondary segment" align="center"><i class="bookmark icon"></i>文章</div>
					</div>
					<!--博文列表-->
					<div
						class="ui padded segment m-padded-tb-large m-opacity bowenliebiao"
						style="
							 {
								background-color: rgb(240, 242, 245);
							}
						"
					>
						<div
							@click="() => clickarticle(item)"
							v-for="(item, index) in myArticle"
							:key="index"
							style="
								 {
									margin: 20px 0;
									cursor: pointer;
								}
							"
							class="ui large aligned mobile reversed stackable grid"
						>
							<div class="five wide column" v-if="index % 2 === 0" style="overflow: hidden; height: 350px">
								<img :src="item.photo[0]" alt="" class="ui rounded image" />
							</div>
							<!--博文信息-->
							<div class="eleven wide column bowenxinxi">
								<h3 class="ui header">
									<a href="#" target="_blank" class="m-black">{{ item.title }}</a>
								</h3>
								<p class="m-text m-margin-top-max">
									{{ item.content }}
								</p>
								<div class="ui m-margin-top-max grid">
									<div class="eleven wide column">
										<div class="ui mini horizontal link list">
											<div class="item">
												<img :src="userInformation.img" alt="" class="ui avatar image" />
												<div class="content">
													<a href="#" target="_blank" class="header">{{ userInformation.username }}</a>
												</div>
											</div>
											<div class="item">
												<i class="calendar icon"></i><span>{{ item.time }}</span>
											</div>
											<div class="item">
												<i class="eye icon"></i> <span>{{ item.stars }}</span>
											</div>
											<div class="item">
												<i class="comment outline icon"></i> <span>{{ item.comment.length || 0 }}</span>
											</div>
										</div>
									</div>
									<div class="right aligned five wide column">
										<a href="#" target="_blank" class="ui teal basic label m-padded-tiny m-text-thin">好文</a>
									</div>
								</div>
							</div>
							<!--博文图片-->
							<div class="five wide column" style="overflow: hidden" v-if="index % 2 !== 0">
								<img :src="item.photo[0]" alt="" class="ui rounded image" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 文章具体内容 -->
	<div v-if="detailinfo">
		<!-- 封面 -->
		<div class="article-head my-animation-slide-top">
			<!-- 背景图片 -->
			<!-- <el-image class="article-image my-el-image" v-once lazy :src="currentAricle.img" fit="cover"> </el-image> -->
			<div class="article-image my-el-image">
				<img class="articleimg" :src="currentAricle.img" alt="" />
			</div>
			<!-- 文章信息 -->
			<div class="article-info-container">
				<div class="article-title">{{ currentAricle.title }}</div>
				<div class="article-info">
					<svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
						<path
							d="M510.4 65.5l259.69999999 0 1e-8 266.89999999c0 147.50000001-116.2 266.89999999-259.7 266.90000001-143.4 0-259.7-119.5-259.7-266.90000001 0.1-147.5 116.3-266.9 259.7-266.89999999z"
							fill="#FF9FCF"
						></path>
						<path
							d="M698.4 525.2l-13 0c53-48.4 86.5-117.8 86.5-195.20000001 0-10.2-0.7-20.3-1.8-30.19999999C613.8 377.50000001 438.6 444.9 266 437.7c15 33.4 36.7 63.1 63.5 87.5l-5.3 0c-122.6 0-225.5 88.1-248.8 204.1C340 677.2 597.7 609.2 862.2 585.7c-44.3-37.6-101.5-60.5-163.8-60.5z"
							fill="#FF83BB"
						></path>
						<path
							d="M862.2 585.7C597.7 609.2 340 677.2 75.4 729.3c-3.2 16.1-5 32.6-5 49.6 0 99.8 81.7 181.5 181.5 181.5l518.6 0c99.8 0 181.5-81.7 181.5-181.5 0.1-77.2-35-146.5-89.8-193.2z"
							fill="#FF5390"
						></path>
						<path
							d="M770.1 299.8C755.1 168 643.3 65.5 507.4 65.5c-146.1 0-264.5 118.4-264.5 264.5 0 38.4 8.3 74.8 23.1 107.7 172.6 7.2 347.8-60.2 504.1-137.9z"
							fill="#FF9FCF"
						></path>
						<path
							d="M436.4 282.1c0 24.1-19.6 43.7-43.7 43.7S349 306.2 349 282.1s19.6-43.7 43.7-43.7c24.19999999 0 43.7 19.6 43.7 43.7z"
							fill="#FFFFFF"
						></path>
						<path d="M625 282.1m-43.7 0a43.7 43.7 0 1 0 87.4 0 43.7 43.7 0 1 0-87.4 0Z" fill="#FFFFFF"></path>
					</svg>
					<span>&nbsp;{{ currentAricle.username }}</span>
					<span>·</span>
					<svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
						<path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#409EFF"></path>
						<path
							d="M654.222222 256c-17.066667 0-28.444444 11.377778-28.444444 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444444 28.444445s28.444444-11.377778 28.444445-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444445-28.444444zM369.777778 256c-17.066667 0-28.444444 11.377778-28.444445 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444445 28.444445s28.444444-11.377778 28.444444-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444444-28.444444z"
							fill="#FFFFFF"
						></path>
						<path
							d="M725.333333 312.888889H711.111111v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-170.666666v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-14.222222c-22.755556 0-42.666667 19.911111-42.666667 42.666667v341.333333c0 22.755556 19.911111 42.666667 42.666667 42.666667h426.666666c22.755556 0 42.666667-19.911111 42.666667-42.666667v-341.333333c0-22.755556-19.911111-42.666667-42.666667-42.666667zM426.666667 654.222222h-56.888889c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444444 28.444445s-11.377778 28.444444-28.444444 28.444444z m227.555555 0h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444445s-11.377778 28.444444-28.444445 28.444444z m0-113.777778h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444444h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444444s-11.377778 28.444444-28.444445 28.444444z"
							fill="#FFFFFF"
						></path>
					</svg>
					<span>&nbsp;{{ currentAricle.time }}</span>
					<span>·</span>
					<svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
						<path d="M14.656 512a497.344 497.344 0 1 0 994.688 0 497.344 497.344 0 1 0-994.688 0z" fill="#FF0000"></path>
						<path
							d="M374.976 872.64c-48.299-100.032-22.592-157.44 14.421-211.37 40.448-58.966 51.115-117.611 51.115-117.611s31.659 41.386 19.115 106.005c56.149-62.72 66.816-162.133 58.325-200.405 127.317 88.746 181.59 281.002 108.181 423.381C1016 652.501 723.093 323.2 672.277 285.867c16.939 37.333 20.054 100.032-14.101 130.474-58.027-219.84-201.664-265.002-201.664-265.002 16.96 113.536-61.781 237.397-137.344 330.24-2.816-45.163-5.632-76.544-29.483-119.808-5.333 82.176-68.373 149.269-85.29 231.445-22.912 111.637 17.237 193.173 170.581 279.424z"
							fill="#FFFFFF"
						></path>
					</svg>
					<span>&nbsp;{{ currentAricle.stars }}</span>
					<span>·</span>
					<svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
						<path
							d="M113.834667 291.84v449.194667a29.013333 29.013333 0 0 0 28.842666 29.013333h252.928v90.453333l160.597334-90.453333h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333h-665.6a29.013333 29.013333 0 0 0-29.696 29.013333z"
							fill="#FFDEAD"
						></path>
						<path
							d="M809.130667 262.826667h-665.6a29.013333 29.013333 0 0 0-28.842667 29.013333v40.106667a29.013333 29.013333 0 0 1 28.842667-29.013334h665.6a29.013333 29.013333 0 0 1 29.013333 29.013334V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333z"
							fill="#FFF3DB"
						></path>
						<path
							d="M556.202667 770.048h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V362.837333s-59.733333 392.533333-724.309333 314.709334v63.488a29.013333 29.013333 0 0 0 28.842666 29.013333h253.098667v90.453333z"
							fill="#F2C182"
						></path>
						<path
							d="M619.008 632.32l101.888-35.157333-131.754667-76.117334 29.866667 111.274667zM891.904 148.992a61.44 61.44 0 0 0-84.138667 22.528l-19.968 34.133333 106.666667 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-22.528-84.138667z"
							fill="#69BAF9"
						></path>
						<path d="M775.338667 198.775467l131.669333 76.032-186.026667 322.218666-131.6864-76.032z" fill="#F7FBFF"></path>
						<path
							d="M775.168 198.826667l-5.290667 9.216 59.221334 34.133333a34.133333 34.133333 0 0 1 12.458666 46.592l-139.946666 242.346667a34.133333 34.133333 0 0 1-46.762667 12.629333l-59.050667-34.133333-6.656 11.434666 88.746667 51.2L720.896 597.333333l186.026667-322.56z"
							fill="#D8E3F0"
						></path>
						<path
							d="M616.448 622.592l2.56 9.728 101.888-35.157333-44.885333-25.941334-59.562667 51.370667zM891.904 148.992c-1.024 0-2.218667-0.853333-3.242667-1.536A61.610667 61.610667 0 0 1 887.466667 204.8l-19.968 34.133333-73.728-42.496-5.12 8.704 106.666666 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-23.381333-83.626667z"
							fill="#599ED4"
						></path>
						<path
							d="M265.898667 417.621333H494.933333a17.066667 17.066667 0 1 0 0-34.133333H265.898667a17.066667 17.066667 0 1 0 0 34.133333zM265.898667 533.504H494.933333a17.066667 17.066667 0 0 0 0-34.133333H265.898667a17.066667 17.066667 0 0 0 0 34.133333z"
							fill="#3D3D63"
						></path>
						<path
							d="M959.488 354.645333a99.84 99.84 0 0 0-23.722667-127.488 78.677333 78.677333 0 0 0-142.848-64.170666l-11.605333 20.138666a17.066667 17.066667 0 0 0-20.821333 7.168l-32.085334 55.466667H142.677333a46.250667 46.250667 0 0 0-45.909333 46.08v449.194667a46.08 46.08 0 0 0 45.909333 46.08h236.032v73.386666a17.066667 17.066667 0 0 0 8.362667 14.848 17.066667 17.066667 0 0 0 8.704 2.218667 17.066667 17.066667 0 0 0 8.362667-2.218667l156.672-88.234666h248.32a46.08 46.08 0 0 0 46.08-46.08V398.677333L921.6 283.306667a17.066667 17.066667 0 0 0-4.266667-21.504l1.877334-3.413334a65.365333 65.365333 0 0 1 10.410666 79.189334l-53.077333 91.989333a56.832 56.832 0 0 0 20.821333 77.653333 17.066667 17.066667 0 0 0 24.234667-6.314666 17.066667 17.066667 0 0 0-6.997333-23.04 23.04 23.04 0 0 1-8.362667-31.061334z m-138.410667 386.389334a11.946667 11.946667 0 0 1-11.946666 11.946666H556.202667a17.066667 17.066667 0 0 0-8.362667 2.218667l-134.997333 76.117333v-61.269333a17.066667 17.066667 0 0 0-17.066667-17.066667H142.677333a11.946667 11.946667 0 0 1-11.776-11.946666V291.84a11.946667 11.946667 0 0 1 11.776-11.946667h565.930667L574.464 512a17.066667 17.066667 0 0 0-1.706667 12.970667L597.333333 615.253333H265.898667a17.066667 17.066667 0 1 0 0 34.133334h352.938666a17.066667 17.066667 0 0 0 5.802667 0l102.4-35.328a17.066667 17.066667 0 0 0 9.216-7.509334l85.333333-147.968z m-204.8-184.661334l63.829334 36.864-49.322667 17.066667z m206.848-170.666666v1.365333l-108.373333 186.709333-102.4-59.050666L781.482667 221.866667l102.4 59.050666z m76.458667-161.28L887.466667 244.224l-76.970667-44.373333 11.264-19.797334a44.544 44.544 0 1 1 77.141333 44.544z"
							fill="#3D3D63"
						></path>
					</svg>
					<span>&nbsp;{{ currentAricle.comment.length }}</span>
					<span>·</span>
					<svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
						<path
							d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z"
							fill="#FF713C"
						></path>
						<path
							d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z"
							fill="#885F44"
						></path>
					</svg>
					<span>&nbsp;{{ currentAricle.stars }}</span>
				</div>
			</div>

			<div class="article-info-news" @click="() => (detailinfo = false)">
				<svg width="30" height="30" viewBox="0 0 1024 1024">
					<path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01"></path>
					<path
						d="M989.866667 512c0 263.918933-213.947733 477.866667-477.866667 477.866667S34.133333 775.918933 34.133333 512 248.081067 34.133333 512 34.133333s477.866667 213.947733 477.866667 477.866667z"
						fill="#FF7744"
					></path>
					<path
						d="M512 221.866667A51.2 51.2 0 0 1 563.2 273.066667v187.733333H750.933333a51.2 51.2 0 0 1 0 102.4h-187.733333V750.933333a51.2 51.2 0 0 1-102.4 0v-187.733333H273.066667a51.2 51.2 0 0 1 0-102.4h187.733333V273.066667A51.2 51.2 0 0 1 512 221.866667z"
						fill="#FFFFFF"
					></path>
				</svg>
			</div>
		</div>

		<!-- 文章 -->
		<div style="background: white">
			<div class="article-container my-animation-slide-bottom">
				<!-- 最新进展 -->
				<div v-if="isEmpty(treeHoleList)" class="process-wrap">
					<el-collapse accordion value="1">
						<el-collapse-item title="最新进展" name="1">
							<process :treeHoleList="treeHoleList" @deleteTreeHole="deleteTreeHole"></process>
						</el-collapse-item>
					</el-collapse>

					<hr />
				</div>

				<!-- 文章内容 -->
				<div class="entry-content">
					<div style="font-size: 18px; margin-bottom: 30px">
						{{ currentAricle.content }}
					</div>

					<div style="display: flex; flex-direction: row; flex-wrap: wrap">
						<div style="flex: 1" class="articleimg" v-for="(item2, index) in currentAricle.photo" :key="index">
							<img :src="item2" alt="" />
						</div>
					</div>
				</div>
				<!-- 最后更新时间 -->
				<div class="article-update-time">
					<span>文章最后更新于 {{ currentAricle.time }}</span>
				</div>
				<!-- 分类 -->
				<div class="article-sort">
					<span @click="$router.push({ path: '/sort', query: { sortId: article.sortId, labelId: article.labelId } })">{{
						currentAricle.time + " ▶ " + currentAricle.time
					}}</span>
				</div>
				<!-- 作者信息 -->
				<blockquote>
					<div>作者：{{ currentAricle.username }}</div>
					<div>版权声明：转载请注明文章出处</div>
				</blockquote>
				<!-- 订阅 -->
				<div class="myCenter" id="article-like" @click="subscribeLabel()">
					<i class="el-icon-thumb article-like-icon" :class="{ 'article-like': subscribe }"></i>
				</div>

				<!-- 评论 -->
				<!-- <div v-if="currentAricle.comment.length !== 0">
					<Commenti :type="'article'" :source="currentAricle.id" :userId="currentAricle.userId"></Commenti>
				</div> -->
			</div>

			<div id="toc" class="toc"></div>
		</div>
	</div>

	<!--  -->

	<!--置顶图标-->
	<div class="m-padded-tb-large m-fixed m-right-bottom">
		<a href="#" class="ui icon button"><i class="chevron up icon"></i> </a>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { GlobalStore } from "@/stores";
import FriendCard from "../friendCard/index.vue";
import { computed, reactive, ref, watch } from "vue";
// import Commenti from "./comment/index.vue";
// import { useRouter } from "vue-router";

// const router = useRouter();

const globalStore = GlobalStore();
const myUserId = ref(globalStore.userInformation.id);
const userInformation = ref(globalStore.userInformation);
//博客内容
const myBlogInfo = reactive<any>({});
let myArticle = reactive<any>([]);

// ----------------
const detailinfo = ref(false);
const subscribe = ref(false);
const currentAricle = ref();
const treeHoleList = ref([]);
// const articleContentHtml = ref("");
const deleteTreeHole = () => {};
const subscribeLabel = () => {};
// ----------------

//全部用户
let myUserInfo = reactive(globalStore.user.find((item: any) => item.id === myUserId.value));
let getUsers = computed(() => globalStore.user);
watch(
	getUsers,
	(newvalue: any) => {
		myUserInfo.value = newvalue.find((item: any) => item.id === myUserId.value);
		const { fans, follow } = newvalue.find((item: any) => item.id === myUserId.value) || {};
		myBlogInfo.fans = newvalue.filter((item: any) => fans.includes(item.id));
		myBlogInfo.follow = newvalue.filter((item: any) => follow.includes(item.id)).map((item: any) => item.userinfo);
	},
	{ immediate: true, deep: true }
);

//全部文章
let article = ref(globalStore.article);
let getArticle = computed(() => globalStore.article);
watch(
	getArticle,
	(newvalue: any) => {
		article.value = newvalue;
		const { articles, collect, starts } = myUserInfo;
		myBlogInfo.articles = newvalue.filter((item: any) => articles.includes(item.id));
		myBlogInfo.collect = newvalue.filter((item: any) => collect.includes(item.id));
		myBlogInfo.starts = newvalue.filter((item: any) => starts.includes(item.id));
		myArticle = myBlogInfo.articles;
	},
	{ immediate: true, deep: true }
);

watch(
	myUserId,
	(newvalue: any) => {
		//关注和粉丝
		myUserInfo.value = getUsers.value.find((item: any) => item.id === newvalue);
		//当前用户
		userInformation.value = myUserInfo.value.userinfo;
		const { fans, follow } = getUsers.value.find((item: any) => item.id === newvalue) || {};
		myBlogInfo.fans = getUsers.value.filter((item: any) => fans.includes(item.id));
		myBlogInfo.follow = getUsers.value.filter((item: any) => follow.includes(item.id)).map((item: any) => item.userinfo);

		//文章收藏点赞
		article.value = getArticle.value;
		const { articles, collect, starts } = myUserInfo.value;
		myBlogInfo.articles = getArticle.value.filter((item: any) => articles.includes(item.id));
		myBlogInfo.collect = getArticle.value.filter((item: any) => collect.includes(item.id));
		myBlogInfo.starts = getArticle.value.filter((item: any) => starts.includes(item.id));
		myArticle = myBlogInfo.articles;
	},
	{ immediate: true, deep: true }
);

//点击我的关注
const clickFriendCard = (value: any) => {
	myUserId.value = value;
	console.log(value, "userId");
};

const clickarticle = (value: any) => {
	console.log(value, "currentAricle");
	currentAricle.value = value;
	detailinfo.value = true;
};

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
/* @import "./editormd.min.css"; */
@import "./index.scss";
/* @import "./index2.css"; */
@import "https://cdn.jsdelivr.net/semantic-ui/2.2.4/semantic.min.css";
</style>
