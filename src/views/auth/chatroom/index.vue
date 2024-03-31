<template>
	<div class="friend-wrap">
		<div class="friend-box">
			<div class="friend-aside">
				<div>
					<!-- 头像 -->
					<div>
						<img object-fit="cover" @click="changeAvatar(1)" class="user-thumb" :src="currentUser.img" />
					</div>
					<!-- 聊天 -->
					<div id="chat" class="friend-chat aside-active" @click="isActive($event, 'aside-active', 1)">
						<div>
							<svg viewBox="0 0 1024 1024" width="24" height="24">
								<path
									d="M355.76 85.68A175.808 175.808 0 0 1 496 16c67.616 0 126.368 38.208 155.84 94.192a31.712 31.712 0 0 0 47.872 9.744C731.712 94.736 772.144 80 816 80c105.968 0 192 86.032 192 192s-86.032 192-192 192c-93.36 0-171.232-66.768-188.448-155.12a175.632 175.632 0 0 1-140.144 58.912C459.44 469.328 366.368 544 256 544 123.536 544 16 436.464 16 304S123.536 64 256 64c35.584 0 69.376 7.76 99.76 21.68z"
									fill="#CBE9EA"
								></path>
								<path
									d="M16 400.8A128.864 128.864 0 0 1 144.8 272h734.4A128.864 128.864 0 0 1 1008 400.8v305.6a128.864 128.864 0 0 1-128.8 128.8h-161.6L809.6 1008 568.8 835.2H144.8A128.864 128.864 0 0 1 16 706.4v-305.6z"
									fill="#FFD140"
								></path>
								<path
									d="M144.8 835.2c-21.408 0 459.952-30.704 678.288-44.56A112 112 0 0 0 928 678.864V412.064a144 144 0 0 0-42.688-102.32L847.2 272C918.288 272 1008 329.712 1008 400.8v305.6a128.864 128.864 0 0 1-128.8 128.8h-161.6L809.6 1008 568.8 835.2H144.8z"
									fill="#D9B236"
								></path>
								<path d="M288 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF"></path>
								<path d="M288 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF"></path>
								<path d="M512 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF"></path>
								<path d="M736 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF"></path>
								<path
									d="M585.616 225.312A120.064 120.064 0 0 1 472 384a119.408 119.408 0 0 1-74.272-25.776A144.048 144.048 0 0 1 272 432c-79.472 0-144-64.528-144-144 0-26.224 7.024-50.832 19.296-72.016"
									fill="#CBE9EA"
								></path>
								<path
									d="M585.616 225.312c3.264-12.4 6.384 25.152 6.384 38.688 0 66.224-53.776 120-120 120a119.408 119.408 0 0 1-74.272-25.776A144.048 144.048 0 0 1 272 432c-79.472 0-144-64.528-144-144 0-26.224 17.84-96.464 19.296-72.016 10.784 179.808 167.712 183.392 250.432 94.992 67.824 66.656 166.24-3.392 187.888-85.664z"
									fill="#ADC6C7"
								></path>
							</svg>
						</div>
						<div class="friend-text">聊天</div>
					</div>
					<!-- 好友 -->
					<div class="friend-chat" @click="isActive($event, 'aside-active', 2)">
						<div>
							<svg viewBox="0 0 1024 1024" width="24" height="24">
								<path
									d="M560.6 476.7c-76 0-137.9-61.9-137.9-137.9s61.9-137.9 137.9-137.9 137.9 61.9 137.9 137.9-61.8 137.9-137.9 137.9zM800 715.2"
									fill="#62A8EA"
								></path>
								<path
									d="M801.6 715.5c9.2 0 16.6-7.5 16.6-16.6 0-34.5-6.8-68-20.2-99.6-12.9-30.5-31.3-57.9-54.9-81.3-23.5-23.5-50.9-42-81.3-54.9-31.6-13.4-65.1-20.2-99.6-20.2a16 16 0 0 0-3.9 0.5c-33.7 0.3-66.4 7.1-97.2 20.1-30.5 12.9-57.9 31.4-81.3 54.9-23.5 23.5-42 50.9-54.9 81.3-13.4 31.6-20.2 65.1-20.2 99.6 0 9.2 7.4 16.6 16.6 16.6 9.2 0.1 471.1-0.4 480.3-0.4z"
									fill="#62A8EA"
								></path>
								<path
									d="M490.6 476.7c-76 0-137.9-61.9-137.9-137.9s61.9-137.9 137.9-137.9 137.9 61.9 137.9 137.9-61.8 137.9-137.9 137.9z m0-242.6c-57.7 0-104.6 47-104.6 104.6 0 57.7 46.9 104.7 104.6 104.7 57.7 0 104.6-47 104.6-104.6 0.1-57.7-46.8-104.7-104.6-104.7zM295.7 467.2c-2 0-4-0.3-6-1.1-23.5-9.1-43.7-24.9-58.2-45.7-14.9-21.3-22.8-46.4-22.8-72.4 0-69.8 56.8-126.6 126.6-126.6 9.2 0 16.6 7.5 16.6 16.6 0 9.2-7.4 16.6-16.6 16.6-51.5 0-93.3 41.8-93.3 93.3 0 38.3 24 73.3 59.7 87.1 8.6 3.3 12.8 13 9.5 21.5-2.5 6.7-8.9 10.7-15.5 10.7z m434.3 248c-9.2 0-16.6-7.4-16.6-16.6 0-71-32.7-136.2-89.8-178.7-7.4-5.5-8.9-15.9-3.4-23.3s15.9-8.9 23.3-3.4c31.3 23.3 57.3 54 75 88.7 18.7 36.3 28.1 75.6 28.1 116.7 0 9.1-7.5 16.6-16.6 16.6z m0 0"
									fill="#333333"
								></path>
								<path
									d="M171.2 645.9c-0.7 0-1.4-0.1-2.1-0.1-9.1-1.1-15.6-9.4-14.4-18.6 5.1-40.8 19.3-78.6 42.2-112.4 22-32.2 51.4-59.4 85.4-78.8 8-4.5 18.2-1.7 22.7 6.3s1.7 18.2-6.3 22.7c-61.9 35.2-102.4 95.8-111.1 166.3-0.9 8.5-8 14.6-16.4 14.6z m80.1 70.1c-9.2 0-16.6-7.5-16.6-16.6 0-34.5 6.8-68 20.2-99.6 12.9-30.5 31.3-57.9 54.9-81.3 23.5-23.5 50.9-42 81.3-54.9 31.6-13.4 65.1-20.2 99.6-20.2 9.2 0 16.6 7.4 16.6 16.6 0 9.2-7.5 16.6-16.6 16.6-122.8 0-222.7 99.9-222.7 222.7 0 9.2-7.5 16.7-16.7 16.7z m0 0"
									fill="#333333"
								></path>
								<path
									d="M769.3 218.3h-40c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7h40c2.6 0 4.7 2.1 4.7 4.7 0.1 2.6-2.1 4.7-4.7 4.7z"
									fill="#62A8EA"
								></path>
								<path
									d="M749.3 237.3c-2.9 0-5.2-2.3-5.2-5.2v-36.9c0-2.9 2.3-5.2 5.2-5.2 2.9 0 5.2 2.3 5.2 5.2v36.9c0 2.8-2.3 5.2-5.2 5.2z"
									fill="#62A8EA"
								></path>
							</svg>
						</div>
						<div class="friend-text">好友</div>
					</div>
					<!-- 群聊 -->
					<div class="friend-chat" @click="isActive($event, 'aside-active', 3)">
						<div>
							<svg viewBox="0 0 1024 1024" width="24" height="24">
								<path
									d="M966.08 738.12l-54.26-182.22c16.74-37.82 25.24-77.78 25.24-118.82 0-177.22-160.46-321.38-357.68-321.38s-357.68 144.16-357.68 321.38c0 2.26 0.02 4.58 0.08 6.92C137.28 486.36 80 567.54 80 660.56c0 31.38 6.42 61.94 19.12 90.88l-41.2 138.3a9.94 9.94 0 0 0 2.26 9.66 10.006 10.006 0 0 0 9.48 2.96l140.96-31.02c43.42 24.2 93.42 36.98 144.84 36.96 113.74 0 211.6-62.32 253.6-150.98 56.54-4.18 111.48-20.5 159.52-47.46l185.76 40.88c3.46 0.76 7.06-0.36 9.48-2.96a10.036 10.036 0 0 0 2.26-9.66z m-610.62 150.18c-49.28 0.02-97.08-12.52-138.26-36.22-1.52-0.88-3.24-1.32-4.98-1.32-0.72 0-1.44 0.08-2.16 0.22l-128.12 28.2 37.4-125.58c0.68-2.32 0.52-4.82-0.5-7.02-12.5-27.34-18.84-56.28-18.84-86.02 0-125.6 114.6-227.76 255.46-227.76 140.88 0 255.48 102.16 255.48 227.76 0 125.58-114.6 227.74-255.48 227.74z m413.68-198.8a9.992 9.992 0 0 0-7.14 1.1c-43.4 24.98-93 40.68-144.32 45.88 8.6-23.94 13.26-49.44 13.26-75.92 0-136.62-123.58-247.76-275.48-247.76-40.52 0-79.04 7.92-113.74 22.12 1.3-165.2 152.26-299.22 337.66-299.22 186.2 0 337.68 135.2 337.68 301.38 0 39.4-8.4 77.74-24.98 113.96a10.12 10.12 0 0 0-0.5 7.02l50.48 169.5-172.92-38.06z"
									fill="#23130D"
								></path>
								<path
									d="M355.46 432.8C214.6 432.8 100 534.96 100 660.56c0 29.74 6.34 58.68 18.84 86.02 1.02 2.2 1.18 4.7 0.5 7.02l-37.4 125.58 128.12-28.2c0.72-0.14 1.44-0.22 2.16-0.22 1.74 0 3.46 0.44 4.98 1.32 41.18 23.7 88.98 36.24 138.26 36.22 140.88 0 255.48-102.16 255.48-227.74 0-125.6-114.6-227.76-255.48-227.76z m-82.96 96.28h143.44c5.52 0 10 4.46 10 10 0 5.52-4.48 10-10 10h-143.44c-5.52 0-10-4.48-10-10 0-5.54 4.48-10 10-10zM498.18 784.8H190.26c-5.52 0-10-4.46-10-10 0-5.52 4.48-10 10-10h307.92c5.52 0 10 4.48 10 10 0 5.54-4.48 10-10 10z m0-58.92H190.26c-5.52 0-10-4.48-10-10s4.48-10 10-10h307.92c5.52 0 10 4.48 10 10s-4.48 10-10 10z m0-58.94H190.26c-5.52 0-10-4.48-10-10s4.48-10 10-10h307.92c5.52 0 10 4.48 10 10s-4.48 10-10 10z m0-58.94H190.26c-5.52 0-10-4.48-10-10s4.48-10 10-10h307.92c5.52 0 10 4.48 10 10s-4.48 10-10 10z"
									fill="#EC7063"
								></path>
								<path
									d="M942.06 727.56l-172.92-38.06a9.992 9.992 0 0 0-7.14 1.1c-43.4 24.98-93 40.68-144.32 45.88 8.6-23.94 13.26-49.44 13.26-75.92 0-136.62-123.58-247.76-275.48-247.76-40.52 0-79.04 7.92-113.74 22.12 1.3-165.2 152.26-299.22 337.66-299.22 186.2 0 337.68 135.2 337.68 301.38 0 39.4-8.4 77.74-24.98 113.96a10.12 10.12 0 0 0-0.5 7.02l50.48 169.5z"
									fill="#F9C139"
								></path>
								<path
									d="M942.06 727.56l-172.92-38.06a9.992 9.992 0 0 0-7.14 1.1c-43.4 24.98-93 40.68-144.32 45.88 8.6-23.94 13.26-49.44 13.26-75.92 0-136.62-123.58-247.76-275.48-247.76-40.52 0-79.04 7.92-113.74 22.12 0.66-82.68 38.78-157.56 99.98-211.72-44.9 50.8-71.92 114.74-72.46 184.2 34.7-14.2 73.22-22.12 113.74-22.12 151.9 0 275.48 111.14 275.48 247.76 0 26.48-4.66 51.98-13.26 75.92 51.32-5.2 100.92-20.9 144.32-45.88 2.16-1.24 4.7-1.64 7.14-1.1l134.7 29.64 10.7 35.94z"
									fill="#23130D"
									opacity=".2"
								></path>
								<path
									d="M425.94 539.08c0 5.52-4.48 10-10 10h-143.44c-5.52 0-10-4.48-10-10 0-5.54 4.48-10 10-10h143.44c5.52 0 10 4.46 10 10zM508.18 598c0 5.52-4.48 10-10 10H190.26c-5.52 0-10-4.48-10-10s4.48-10 10-10h307.92c5.52 0 10 4.48 10 10zM508.18 656.94c0 5.52-4.48 10-10 10H190.26c-5.52 0-10-4.48-10-10s4.48-10 10-10h307.92c5.52 0 10 4.48 10 10zM508.18 715.88c0 5.52-4.48 10-10 10H190.26c-5.52 0-10-4.48-10-10s4.48-10 10-10h307.92c5.52 0 10 4.48 10 10zM508.18 774.8c0 5.54-4.48 10-10 10H190.26c-5.52 0-10-4.46-10-10 0-5.52 4.48-10 10-10h307.92c5.52 0 10 4.48 10 10z"
									fill="#FFFFFF"
								></path>
							</svg>
						</div>
						<div class="friend-text">群聊</div>
					</div>
				</div>
				<div class="friend-set">
					<!-- 朋友圈 -->
					<div @click.stop="openFriendCircle(currentUser.id, currentUser.img)" style="margin-bottom: 15px">
						<svg viewBox="0 0 1024 1024" width="24" height="24">
							<path
								d="M512 1024C229.230021 1024 0 794.769979 0 512S229.230021 0 512 0s512 229.230021 512 512-229.230021 512-512 512z m0.42935-800.000537a279.249308 279.249308 0 0 0-32.561912 1.915975c-26.152788 2.948562-51.221468 9.458583-74.787421 18.912872 0 0 194.316344 191.608218 199.490012 198.731137V239.228512c-5.79086-1.964277-11.707304-3.733199-17.67205-5.379757-23.735547-6.361895-48.707623-9.848218-74.467556-9.848218z m202.969895 83.240252c-7.789484-7.760503-15.950356-14.934943-24.378499-21.587723a286.849878 286.849878 0 0 0-66.285216-39.300562s1.429736 272.315304 0 281.01179l145.044126-144.496704a293.183866 293.183866 0 0 0-8.728687-16.21226c-12.300881-21.220629-27.433325-41.288453-45.65065-59.413468z m63.669401 98.298633S586.82499 599.134457 579.626935 604.290952h205.088738c1.970717-5.770465 3.748226-11.667589 5.373317-17.609795 6.40805-23.703346 9.911547-48.510122 9.911547-74.202432 0-10.979556-0.691254-21.810985-1.951397-32.445987a282.689476 282.689476 0 0 0-18.980494-74.49439zM493.867472 625.806759l145.040905 144.497778a287.548646 287.548646 0 0 0 16.293837-8.69434c21.298985-12.20857 41.414038-27.312034 59.65605-45.487497 7.761577-7.739036 14.938164-15.893468 21.642466-24.290482 16.341065-20.537962 29.531774-42.764344 39.439027-66.050147 0 0-273.31891 1.427589-282.072285 0.024688z m-74.417107-45.38982v204.353476a294.790709 294.790709 0 0 0 17.673123 5.356143c23.764528 6.386583 48.686155 9.872906 74.470776 9.872905 10.991363 0 21.862507-0.68696 32.512537-1.914901a286.830558 286.830558 0 0 0 74.788495-18.938633c0.023614 0-194.270189-191.555623-199.444931-198.72899z m-20.411304-85.230289L254.046457 639.682281c2.713493 5.527883 5.647027 10.932327 8.727614 16.235874 12.252579 21.271078 27.409711 41.31314 45.651724 59.46499 7.764797 7.76265 15.950356 14.909182 24.378499 21.566255 20.630273 16.335698 42.892075 29.425509 66.309903 39.297342 0 0-1.479111-272.339992-0.07621-281.060092z m-165.155958-57.744369c-6.384436 23.678658-9.883639 48.511195-9.88364 74.203505 0 10.952721 0.691254 21.808839 1.947103 32.4213 2.959296 26.083019 9.441409 51.063681 19.006256 74.495463 0 0 192.223262-193.597182 199.420243-198.731136H239.258566c-1.97179 5.745778-3.74608 11.665442-5.375463 17.610868z m133.531102-173.947975c-21.346214 12.232184-41.461266 27.338868-59.654976 45.463883-7.837786 7.787338-14.986465 15.941769-21.66608 24.290482-16.368973 20.537962-29.531774 42.789031-39.463715 66.098448 0 0 273.367212-1.449057 282.095899-0.049375L383.705895 254.80104c-5.519296 2.748914-10.967748 5.624486-16.29169 8.694339z"
								fill="#07C160"
							></path>
						</svg>
					</div>

					<!-- 设置 -->
					<div @click.stop="changeAside()">
						<svg viewBox="0 0 1024 1024" width="24" height="24">
							<path
								d="M767.1296 808.6528c16.8448 0 32.9728 2.816 48.0256 8.0384 20.6848 7.1168 43.52 1.0752 57.1904-15.9744a459.91936 459.91936 0 0 0 70.5024-122.88c7.8336-20.48 1.0752-43.264-15.9744-57.088-49.6128-40.192-65.0752-125.3888-31.3856-185.856a146.8928 146.8928 0 0 1 30.3104-37.9904c16.2304-14.5408 22.1696-37.376 13.9264-57.6a461.27104 461.27104 0 0 0-67.5328-114.9952c-13.6192-16.9984-36.4544-22.9376-57.0368-15.8208a146.3296 146.3296 0 0 1-48.0256 8.0384c-70.144 0-132.352-50.8928-145.2032-118.7328-4.096-21.6064-20.736-38.5536-42.4448-41.8304-22.0672-3.2768-44.6464-5.0176-67.6864-5.0176-21.4528 0-42.5472 1.536-63.232 4.4032-22.3232 3.1232-40.2432 20.48-43.52 42.752-6.912 46.6944-36.0448 118.016-145.7152 118.4256-17.3056 0.0512-33.8944-2.9696-49.3056-8.448-21.0432-7.4752-44.3904-1.4848-58.368 15.9232A462.14656 462.14656 0 0 0 80.4864 348.16c-7.6288 20.0192-2.7648 43.008 13.4656 56.9344 55.5008 47.8208 71.7824 122.88 37.0688 185.1392a146.72896 146.72896 0 0 1-31.6416 39.168c-16.8448 14.7456-23.0912 38.1952-14.5408 58.9312 16.896 41.0112 39.5776 79.0016 66.9696 113.0496 13.9264 17.3056 37.2736 23.1936 58.2144 15.7184 15.4112-5.4784 32-8.4992 49.3056-8.4992 71.2704 0 124.7744 49.408 142.1312 121.2928 4.9664 20.48 21.4016 36.0448 42.24 39.168 22.2208 3.328 44.9536 5.0688 68.096 5.0688 23.3984 0 46.4384-1.792 68.864-5.1712 21.3504-3.2256 38.144-19.456 42.7008-40.5504 14.8992-68.8128 73.1648-119.7568 143.7696-119.7568z"
								fill="#8C7BFD"
							></path>
							<path
								d="M511.8464 696.3712c-101.3248 0-183.7568-82.432-183.7568-183.7568s82.432-183.7568 183.7568-183.7568 183.7568 82.432 183.7568 183.7568-82.432 183.7568-183.7568 183.7568z m0-265.1648c-44.8512 0-81.3568 36.5056-81.3568 81.3568S466.9952 593.92 511.8464 593.92s81.3568-36.5056 81.3568-81.3568-36.5056-81.3568-81.3568-81.3568z"
								fill="#FFE37B"
							></path>
						</svg>
					</div>
				</div>
			</div>

			<!-- 二排 -->
			<div class="friend-bode" id="body-group">
				<div class="body-left" v-show="imUtilData.showBodyLeft">
					<!-- 搜索 -->
					<div>
						<el-input v-model="data.showFriendValue" round placeholder="搜索" class="im-input" />
					</div>
					<!-- 聊天 -->
					<div class="aside-list" v-show="data.type === 1">
						<!-- 系统消息 -->
						<div class="im-user im-active" @click="isActive($event, 'im-active', null, 1)">
							<div>
								<svg viewBox="0 0 1024 1024" width="40" height="40">
									<path
										d="M462.7968 127.2832L338.0736 251.2896a69.72416 69.72416 0 0 1-49.2032 20.2752H173.1072c-59.2896 0-107.3152 48.0256-107.3152 107.3152v264.6528c0 59.2896 48.0256 107.3152 107.3152 107.3152h121.7536c19.2 0 37.5296 7.8848 50.7392 21.8624l115.712 122.4192c43.3664 45.8752 120.4736 15.2064 120.4736-47.9232V176.7936c0-62.0544-74.9568-93.2352-118.9888-49.5104z"
										fill="#8C7BFD"
									></path>
									<path
										d="M682.3424 732.672c-15.9744 0-31.6928-7.424-41.6768-21.4016-16.4352-22.9888-11.1616-54.9888 11.8272-71.424 40.6528-29.1328 64.9216-76.288 64.9216-126.2592 0-51.6096-25.6-99.6864-68.4032-128.6656-23.4496-15.8208-29.5936-47.6672-13.7728-71.0656 15.8208-23.4496 47.6672-29.5936 71.0656-13.7728 71.0656 48.0256 113.5104 127.8464 113.5104 213.504 0 82.8928-40.2944 161.1776-107.7248 209.5104a51.03616 51.03616 0 0 1-29.7472 9.5744z"
										fill="#FFE37B"
									></path>
									<path
										d="M792.4736 838.7072c-13.824 0-27.648-5.5808-37.7344-16.5888-19.0976-20.8384-17.7152-53.248 3.1232-72.3456 67.072-61.5424 105.5232-149.0432 105.5232-240.0256 0-90.1632-35.9936-174.0288-101.376-236.1344-20.48-19.456-21.3504-51.8656-1.8432-72.3968 19.456-20.48 51.8656-21.3504 72.3968-1.8432 85.9648 81.664 133.2736 191.8976 133.2736 310.3744 0 119.6032-50.5344 234.5472-138.7008 315.4432a51.06176 51.06176 0 0 1-34.6624 13.5168z"
										fill="#FFE37B"
									></path>
								</svg>
							</div>

							<div class="im-user-right">
								<div>系统消息</div>
							</div>
						</div>

						<div style="overflow-y: scroll; height: calc(100% - 70px)">
							<!-- 群聊天 -->
							<div
								class="im-user im-group-current"
								v-for="(item, index) in data.groupChats"
								:key="index"
								v-show="groupData.groups[item].groupName.includes(data.showFriendValue) || isEmpty(data.showFriendValue)"
								@click="isActive($event, 'im-active', null, 2, item, 1)"
							>
								<div>
									<!-- <n-badge :value="data.groupMessageBadge[item]" :max="99">
										<n-avatar object-fit="cover" :size="40" :src="groupData.groups[item].avatar" />
									</n-badge> -->
									<img :src="groupData.groups[item].avatar" style="width: 40px; height: 40px" alt="" />
								</div>
								<div class="im-user-right">
									<div>{{ groupData.groups[item].groupName }}</div>
									<div class="im-down" v-if="!isEmpty(data.groupMessages[item])">
										{{ data.groupMessages[item][data.groupMessages[item].length - 1].content.substr(0, 8) }}
									</div>
								</div>
							</div>

							<!-- 聊天 -->
							<div
								class="im-user im-user-current"
								v-for="(item, index) in data.imChats"
								:key="index"
								v-show="friendData.friends[item].remark.includes(data.showFriendValue) || isEmpty(data.showFriendValue)"
								@click="isActive($event, 'im-active', null, 2, item, 2)"
							>
								<div>
									<!-- <n-badge :value="data.imMessageBadge[item]" :max="99">
										<n-avatar object-fit="cover" :size="40" :src="friendData.friends[item].avatar" />
									</n-badge> -->
									<img :src="friendData.friends[item].avatar" style="width: 40px; height: 40px" alt="" />
								</div>
								<div class="im-user-right">
									<div>{{ friendData.friends[item].remark }}</div>
									<div class="im-down" v-if="!isEmpty(data.imMessages[item])">
										{{ data.imMessages[item][data.imMessages[item].length - 1].content.substr(0, 8) }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 好友 -->
					<div class="aside-list" v-show="data.type === 2">
						<!-- 添加好友 -->
						<div class="im-user friend-active" @click="isActive($event, 'friend-active', null, 3)">
							<div>
								<svg viewBox="0 0 1024 1024" width="40" height="40">
									<path
										d="M0 0m512 0l0 0q512 0 512 512l0 0q0 512-512 512l0 0q-512 0-512-512l0 0q0-512 512-512Z"
										fill="#FF8B38"
									></path>
									<path
										d="M503.808 251.4688c88.7808 0 160.7552 71.9616 160.7552 160.7552 0 88.7808-71.9744 160.7552-160.768 160.7552-88.7808 0-160.7424-71.9744-160.7424-160.768 0-88.7808 71.9616-160.7424 160.7552-160.7424z m0 38.4a122.3552 122.3552 0 1 0 0 244.7104 122.3552 122.3552 0 0 0 0-244.7104zM377.9584 570.88l29.312 24.8064-90.4192 106.8416a19.2 19.2 0 0 0 12.7232 31.5136l1.9328 0.0896h204.992v38.4H331.52a57.6 57.6 0 0 1-45.824-92.4928l1.856-2.304 90.4192-106.8544zM750.08 651.3536v38.4H573.5168v-38.4z"
										fill="#FFFFFF"
									></path>
									<path d="M680.9984 587.776v165.5552h-38.4V587.776z" fill="#FFFFFF"></path>
								</svg>
							</div>

							<div class="im-friend">好友请求</div>
						</div>

						<div style="margin: 0 30px 0 30px">
							<!-- <n-divider dashed> {{ Object.keys(friendData.friends).length }}位联系人 </n-divider> -->
							<div>{{ Object.keys(friendData.friends).length }}位联系人</div>
						</div>

						<!-- 好友列表 -->
						<div style="overflow-y: scroll; height: calc(100% - 140px)">
							<div
								class="im-user"
								v-for="(item, index) in Object.values(friendData.friends).reverse()"
								:key="index"
								v-show="item.remark.includes(data.showFriendValue) || isEmpty(data.showFriendValue)"
								@click="isActive($event, 'friend-active', null, 4, item)"
							>
								<div>
									<img
										object-fit="cover"
										style="cursor: pointer; width: 40px; height: 40px"
										@click.stop="openFriendCircle(item.friendId, item.avatar)"
										:src="item.avatar"
									/>
								</div>
								<div class="im-friend">
									{{ item.remark }}
								</div>
							</div>
						</div>
					</div>
					<!-- 群聊 -->
					<div class="aside-list" v-show="data.type === 3">
						<div style="margin: 0 30px 0 30px">
							<div>{{ Object.keys(groupData.groups).length }}个群聊</div>
						</div>

						<div
							class="im-user-group"
							v-for="(item, index) in Object.values(groupData.groups).reverse()"
							:key="index"
							v-show="item.groupName.includes(data.showFriendValue) || isEmpty(data.showFriendValue)"
							@click="isActive($event, 'im-group', null, 5, item)"
						>
							<div>
								<img object-fit="cover" style="width: 45px; height: 45px" :src="item.avatar" />
							</div>
							<div class="im-user-right">
								<div>{{ item.groupName }}</div>
								<div class="im-down">
									<span class="group-tag" v-if="item.masterFlag || item.adminFlag">
										<template v-if="item.masterFlag"> 群主 </template>
										<template v-else-if="item.adminFlag"> 管理员 </template>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 系统消息 -->
				<div class="body-right" style="width: 1000px" v-if="data.subType === 1">
					<div style="height: 60px; background-color: #fcfcfc">
						<span style="line-height: 60px; margin-left: 20px; font-size: 18px">系统消息</span>
					</div>
					<div style="background: #f3f3f3; overflow-y: scroll; height: calc(100% - 60px)">
						<div class="msg-one" v-for="(item, index) in imUtilData.systemMessages" :key="index">
							<div>
								<svg viewBox="0 0 1024 1024" width="50" height="50">
									<path
										d="M752.768 955.392H257.92c-112.384 0-203.392-91.008-203.392-203.392V257.152C54.528 144.768 145.536 53.76 257.92 53.76h494.848C865.152 53.76 956.16 144.768 956.16 257.152v494.848c0 112.384-91.008 203.392-203.392 203.392z"
										fill="#FF4D3C"
									></path>
									<path
										d="M616.576 765.952H370.56c-67.968 0-123.008-55.04-123.008-123.008V396.8c0-67.968 55.04-123.008 123.008-123.008h166.272c9.984 0 18.176 8.064 18.176 18.176 0 9.984-8.064 18.176-18.176 18.176H370.56c-47.872 0-86.656 38.784-86.656 86.656v246.016c0 47.872 38.784 86.656 86.656 86.656h246.016c47.872 0 86.656-38.784 86.656-86.656V469.12c0-9.984 8.064-18.176 18.176-18.176 9.984 0 18.176 8.064 18.176 18.176v173.824c0 67.968-55.04 123.008-123.008 123.008z"
										fill="#FFFFFF"
									></path>
									<path
										d="M694.784 312.704m-113.408 0a113.408 113.408 0 1 0 226.816 0 113.408 113.408 0 1 0-226.816 0Z"
										fill="#FFFFFF"
									></path>
								</svg>
							</div>

							<div style="margin-left: 10px">
								<div class="system-date">
									{{ item.createTime }}
								</div>
								<div class="system-content">
									{{ item.content }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 聊天 -->
			<Chat
				class="body-right"
				v-if="data.subType === 2 && (!isEmpty(data.currentChatFriendId) || !isEmpty(data.currentChatGroupId))"
				:currentChatFriendId="data.currentChatFriendId"
				:currentChatGroupId="data.currentChatGroupId"
				:friends="friendData.friends"
				:groups="groupData.groups"
				:imageList="imUtilData.imageList"
				:imMessages="data.imMessages"
				:groupMessages="data.groupMessages"
				@sendMsg="sendMsg"
				@openFriendCircle="openFriendCircle"
			></Chat>

			<div class="body-right" v-if="data.subType === 3">
				<div style="height: 60px; background-color: #fcfcfc">
					<span style="line-height: 60px; margin-left: 20px; font-size: 18px"> 好友请求 </span>
				</div>
				<div class="friend-request">
					<div style="margin: 20px; display: flex" v-for="(item, index) in friendData.friendRequests" :key="index">
						<div>
							<img object-fit="cover" style="width: 50px; height: 50px" :src="item.avatar" />
						</div>

						<div style="display: flex; flex: 1">
							<div style="margin-left: 10px">
								<div style="font-size: 16px; margin-bottom: 4px">
									{{ item.username }}
								</div>
								<div style="font-size: 12px; color: #797979">{{ item.remark }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ item.createTime }}</div>
							</div>
							<div class="request-status">
								<el-button
									@click="changeFriendStatus(item.friendId, 1, index)"
									size="small"
									type="primary"
									style="margin-right: 10px"
								>
									通过
								</el-button>
								<el-button @click="changeFriendStatus(item.friendId, -1, index)" size="small" type="error"> 拒绝 </el-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="body-right" v-if="data.subType === 4 && !isEmpty(friendData.currentFriendId)">
				<div style="height: 60px; background-color: #fcfcfc">
					<span style="line-height: 60px; margin-left: 20px; font-size: 18px">
						{{ friendData.friends[friendData.currentFriendId].remark }}
					</span>
				</div>
				<div style="background: #f3f3f3; height: calc(100% - 60px)">
					<div class="myCenter">
						<div class="friend-info">
							<div style="display: flex; align-items: center">
								<img
									object-fit="cover"
									style="width: 60px; height: 60px"
									:src="friendData.friends[friendData.currentFriendId].avatar"
								/>

								<span style="margin: 0 5px 0 15px; font-size: 16px">{{
									friendData.friends[friendData.currentFriendId].remark
								}}</span>
								<span style="cursor: pointer; margin-top: 6px" @click="changeDataType(1)">
									<svg viewBox="0 0 1024 1024" width="20" height="20">
										<path
											d="M929.909189 827.019236H93.990821c-16.598379 0-29.997071 13.398692-29.99707 29.997071s13.398692 29.997071 29.99707 29.997071h835.918368c16.598379 0 29.997071-13.398692 29.99707-29.997071 0-16.498389-13.398692-29.997071-29.99707-29.997071z"
											fill="#FF6600"
											opacity=".502"
										></path>
										<path
											d="M705.931061 198.080656c3.099697 0 8.999121 0.799922 14.098624 5.899424l28.297236 28.297237c5.099502 5.099502 5.899424 10.998926 5.899424 14.098623 0 3.099697-0.799922 8.999121-5.899424 14.098623L392.161703 616.739772l-86.991505 28.997168 27.597305-82.791915 358.964945-358.964945c5.099502-5.199492 11.098916-5.899424 14.198613-5.899424m0-59.994141c-20.497998 0-40.896006 7.799238-56.594473 23.397715L281.672493 529.148325l-0.699932-0.699931-70.693096 212.079289 212.079289-70.693097 0.699932 0.699932 367.664095-367.664095c31.196953-31.196953 31.196953-81.892003 0-113.088956l-28.297237-28.297237c-15.598477-15.598477-35.996485-23.397715-56.494483-23.397715z"
											fill="#FF6600"
										></path>
										<path
											d="M578.626494 230.803461L621.049351 188.381603l141.40619 141.406191-42.421857 42.421857z"
											fill="#FF6600"
										></path>
									</svg>
								</span>
							</div>

							<div style="margin-top: 4px; cursor: pointer" @click="removeFriend(friendData.currentFriendId)">
								<span style="vertical-align: -4px; margin-right: 2px">
									<svg viewBox="0 0 1024 1024" width="20" height="20">
										<path
											d="M920 242.82H768v-75.45C768 128 736.66 96 698 96H326c-38.66 0-70 32-70 71.37v75.45H104c-22.09 0-40 18.26-40 40.79 0 22.52 17.91 40.78 40 40.78h88v532.24c0 39.42 31.34 71.37 70 71.37h500c38.66 0 70-32 70-71.37V324.39h88c22.09 0 40-18.26 40-40.78 0-22.53-17.91-40.79-40-40.79z m-584-24.47c0-22.52 17.91-40.78 40-40.78h272c22.09 0 40 18.26 40 40.78v24.47H336z m416 587.3c0 22.52-17.91 40.78-40 40.78H312c-22.09 0-40-18.26-40-40.78V324.39h480z"
											fill="#999999"
										></path>
										<path
											d="M360 424a40 40 0 0 0-40 40v240a40 40 0 0 0 80 0V464a40 40 0 0 0-40-40zM512 424a40 40 0 0 0-40 40v240a40 40 0 0 0 80 0V464a40 40 0 0 0-40-40zM624 464v240a40 40 0 0 0 80 0V464a40 40 0 0 0-80 0z"
											fill="#999999"
										></path>
									</svg>
								</span>
								<span style="color: #797979">删除好友</span>
							</div>
						</div>
					</div>

					<!-- <n-divider /> -->

					<div class="myCenter">
						<div style="width: 65%; font-size: 16px">
							<div style="margin-bottom: 10px">
								<span class="friend-label">用户名</span>
								<span>{{ friendData.friends[friendData.currentFriendId].username }}</span>
							</div>
							<div style="margin-bottom: 10px">
								<span class="friend-label"> 性&nbsp;&nbsp;&nbsp;别 </span>
								<span>
									<template v-if="friendData.friends[friendData.currentFriendId].gender === 1"> 男 </template>
									<template v-else-if="friendData.friends[friendData.currentFriendId].gender === 2"> 女 </template>
									<template v-else> 薛定谔的猫 </template>
								</span>
							</div>
							<div>
								<span class="friend-label">简&nbsp;&nbsp;&nbsp;介</span>
								<span>{{
									isEmpty(friendData.friends[friendData.currentFriendId].introduction)
										? "暂无简介"
										: friendData.friends[friendData.currentFriendId].introduction
								}}</span>
							</div>
						</div>
					</div>

					<!-- <n-divider /> -->

					<div class="myCenter sendMsg">
						<el-button @click="sendFriendMessage()" type="info"> 发消息 </el-button>
					</div>
				</div>
			</div>

			<!-- 群 -->
			<GroupInfo
				class="body-right"
				v-if="data.subType === 5 && !isEmpty(groupData.currentGroupId)"
				:groups="groupData.groups"
				:currentGroupId="groupData.currentGroupId"
				:groupMessages="data.groupMessages"
				:user="globalStore.user"
				@exitGroup="exitGroup"
				@dissolveGroup="dissolveGroup"
				@changeDataType="changeDataType"
				@sendGroupMessage="sendGroupMessage"
				@changeAvatar="changeAvatar"
			></GroupInfo>

			<!-- 头像修改弹出框 -->
			<!-- <n-modal v-model:show="showAvatarDialog">
				<div style="padding: 40px; background: var(--white); border-radius: 5px; width: 20%">
					<div style="margin: 0 0 25px; text-align: center; font-size: 18px">上传图片</div>
					<uploadPicture :prefix="avatarPrefix" @addPicture="submitAvatar" :maxSize="1" :maxNumber="1"></uploadPicture>
				</div>
			</n-modal> -->

			<!-- 修改信息 -->
			<!-- <n-modal :auto-focus="false" v-model:show="changeModal">
					<div style="background-color: var(--white); padding: 20px; border-radius: 5px">
						<div style="text-align: center; font-size: 20px; padding: 20px">修改信息</div>
						<div>
							<n-input v-model:value="changeData" maxlength="30" show-count clearable />
						</div>
						<div class="myCenter" style="margin-top: 30px">
							<el-button @click="submitChange()" type="info"> 提交 </el-button>
						</div>
					</div>
				</n-modal> -->

			<!-- 朋友圈 -->
			<el-dialog
				v-model="friendCircleData.showFriendCircle"
				top="20px"
				style="height: 620px; overflow-y: scroll; overflow-x: hidden"
				title="朋友圈"
				center
				append-to-body
				width="800"
				id="eldialog"
			>
				<div style="background-color: white; border-radius: 10px">
					<div class="treeHole-wrap">
						<TreeHole
							:avatar="friendCircleData.weiYanAvatar"
							:treeHoleList="friendCircleData.treeHoleList"
							:id="currentUser.id"
							@launch="launch"
							@deleteTreeHole="deleteTreeHole"
						></TreeHole>
					</div>
					<div class="pagination-wrap">
						<ProButton
							:info="'关闭'"
							@click="cleanFriendCircle()"
							before="black"
							after="linear-gradient(45deg, #f43f3b, #ec008c)"
						>
						</ProButton>
						<ProButton
							:info="'下一页'"
							style="margin-left: 20px"
							@click="pageWeiYan()"
							v-if="friendCircleData.pagination.total !== friendCircleData.treeHoleList.length"
							before="linear-gradient(45deg, #f43f3b, #ec008c)"
							after="#e73c7e"
						>
						</ProButton>
						<ProButton
							:info="'随笔'"
							style="margin-left: 20px"
							v-if="currentUser.id === friendCircleData.pagination.userId"
							@click="launch()"
							before="rgb(131, 123, 199)"
							after="linear-gradient(45deg, #f43f3b, #ec008c)"
						>
						</ProButton>
						<ProButton
							:info="'加好友'"
							style="margin-left: 20px"
							v-else-if="isEmpty(friendData.friends[friendCircleData.pagination.userId])"
							@click="addFriend()"
							before="rgb(131, 123, 199)"
							after="linear-gradient(45deg, #f43f3b, #ec008c)"
						>
						</ProButton>
					</div>
				</div>
				<el-dialog v-model="friendCircleData.weiYanDialogVisible" width="500" title="随笔" append-to-body>
					<div class="weiyan-edit">
						<div class="myCenter" style="padding-bottom: 20px">
							<el-radio-group v-model="friendCircleData.isPublic">
								<el-radio-button :label="true">公开</el-radio-button>
								<el-radio-button :label="false">私密</el-radio-button>
							</el-radio-group>
						</div>
						<CommentBox @submitComment="submitWeiYan" :currentUser="currentUser"></CommentBox>
					</div>
				</el-dialog>
			</el-dialog>

			<!-- 发朋友动态 -->
			<!-- <el-dialog v-model="friendCircleData.weiYanDialogVisible">
				<div class="weiyan-edit">
					<div class="myCenter" style="padding-bottom: 20px">
						<el-radio-group v-model="friendCircleData.isPublic">
							<el-radio-button :label="true">公开</el-radio-button>
							<el-radio-button :label="false">私密</el-radio-button>
						</el-radio-group>
					</div>
					<commentBox @submitComment="submitWeiYan"></commentBox>
				</div>
			</el-dialog> -->

			<!-- 绑定邮箱 -->
			<!-- <n-modal v-model:show="emailVisible">
					<div class="email-wrap">
						<div class="email-title">请绑定邮箱，接收留言通知</div>
						<div>
							<div style="margin-bottom: 5px">邮箱：</div>
							<n-input v-model:value="email"></n-input>
							<div style="margin-top: 10px; margin-bottom: 5px">验证码：</div>
							<n-input v-model:value="code"></n-input>
							<div style="margin-top: 10px; margin-bottom: 5px">密码：</div>
							<n-input v-model:value="password" type="password" show-password-on="mousedown"></n-input>
						</div>
						<div class="myCenter" style="margin-top: 30px">
							<ProButton
								:info="codeString"
								@click="getCode()"
								:before="$constant.before_color_1"
								:after="$constant.after_color_1"
								style="margin-right: 20px"
							>
							</ProButton>
							<ProButton
								:info="'提交'"
								@click="submitDialog()"
								:before="$constant.before_color_2"
								:after="$constant.after_color_2"
							>
							</ProButton>
						</div>
					</div>
				</n-modal> -->
		</div>
	</div>

	<div id="outerImg">
		<div id="innerImg" style="position: absolute"><img id="bigImg" src="" /></div>
	</div>
</template>

<script setup lang="ts" name="authMenu">
import { GlobalStore } from "@/stores";
import { nextTick, reactive } from "vue";
import { ElDialog, ElMessageBox, ElMessage } from "element-plus";

import Chat from "./chat/index.vue";
import TreeHole from "./treeHole/index.vue";
import ProButton from "./ProButton/index.vue";
import GroupInfo from "./groupInfo/index.vue";
import CommentBox from "./commentBox/index.vue";

const globalStore = GlobalStore();
const currentUser = globalStore.userInformation;
const article = globalStore.article;

let friendData = reactive({
	//好友请求
	friendRequests: [
		{
			username: "username1",
			remark: "remark1",
			createTime: "2024.3.31",
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500",
			friendId: "friendId1"
		},
		{
			username: "username2",
			remark: "remark2",
			createTime: "2024.3.31",
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500",
			friendId: "friendId2"
		},
		{
			username: "username3",
			remark: "remark3",
			createTime: "2024.3.31",
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500",
			friendId: "friendId3"
		}
	],
	//好友列表
	friends: [
		{
			username: "username1",
			gender: 1,
			friendId: 0,
			introduction: "introduction1",
			remark: "user1",
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500"
		},
		{
			username: "username2",
			gender: 2,
			friendId: 1,
			introduction: "introduction2",

			remark: "user2",
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500"
		},
		{
			username: "username3",
			friendId: 2,
			gender: 1,
			introduction: "introduction3",

			remark: "user3",
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500"
		}
	],
	//当前朋友信息
	currentFriendId: null
});

let groupData = reactive({
	//群组列表
	groups: [
		{
			id: 0,
			inType: true,
			groupName: "group1",
			masterUserId: 0,
			groupType: 1,
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500",
			introduction: "introduce1",
			notice: "notice1",
			createTime: "createTime1",
			masterFlag: false,
			adminFlag: true
		},
		{
			id: 1,
			inType: 1,
			groupName: "group2",
			masterUserId: 1,
			groupType: 1,
			avatar: "https://img2.baidu.com/it/u=986259122,812426950&fm=253&fmt=auto&app=120&f=JPEG?w=506&h=500",
			introduction: "introduce2",
			notice: "notice2",
			createTime: "createTime2",
			masterFlag: true,
			adminFlag: true
		}
	],
	//当前群信息
	currentGroupId: null
});

let data = reactive({
	//消息列表
	imMessages: [
		[
			{
				content: "content111",
				fromId: 1,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26"
			},
			{
				content: "12content",
				fromId: 2,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26"
			}
		],
		[
			{
				content: "content111",
				fromId: 2,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26"
			},
			{
				content: "2222",
				fromId: 1,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26"
			}
		],
		[
			{
				content: "3333",
				fromId: 0,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26"
			},
			{
				content: "content111",
				fromId: 2,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26"
			},
			{
				content: "mushrrom",
				fromId: 0,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26"
			}
		]
	],
	//消息标记
	imMessageBadge: {},
	//聊天列表
	imChats: [0, 1, 2],
	//当前聊天信息
	currentChatFriendId: null,

	//群消息列表
	groupMessages: [
		[
			{
				content: "content111",
				fromId: 1,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26",
				username: "lnl"
			},
			{
				content: "content111",
				fromId: 2,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26",
				username: "lnl"
			},
			{
				content: "gengyuxinrtenm",
				fromId: 0,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26",
				username: "lnl"
			}
		],
		[
			{
				content: "content111",
				fromId: 1,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26",
				username: "lnl"
			},
			{
				content: "content111",
				fromId: 2,
				avatar:
					"https://ts1.cn.mm.bing.net/th/id/R-C.541d315de4b11e79e0bcb84f35ccf30b?rik=V96LdUGfUZJu5g&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f812f74e3a664e1c2b1e0e8cde0480e8c&ehk=o55Cw49jjhzmX%2bO%2fvYRXQsoMo3R%2f%2fuXTqpx%2bM88E63M%3d&risl=&pid=ImgRaw&r=0",
				createTime: "2024.3.26",
				username: "lnl"
			}
		]
	],
	//群消息标记
	groupMessageBadge: {},
	//群聊天列表
	groupChats: [0, 1],
	//当前群聊天信息
	currentChatGroupId: null,

	type: 1, //1：聊天 ，2：好友 ，3：群聊
	subType: 1,
	showFriendValue: ""
});

let friendCircleData = reactive({
	showFriendCircle: false,
	treeHoleList: [],
	weiYanDialogVisible: false,
	isPublic: true,
	weiYanAvatar: "",
	weiYanUsername: "",
	pagination: {
		current: 1,
		size: 10,
		total: 0,
		userId: null
	}
});

let changeDataData = reactive({
	//修改信息
	changeData: "",
	changeType: null,
	changeModal: false,

	avatarType: null,
	avatarPrefix: "",
	showAvatarDialog: false
});

//群消息列表-用户信息
// const userGroupMessages = data.groupMessages.map((item: any) => {
// 	const {} = item;
// });
// console.log(userGroupMessages, "userGroupMessages");

let imUtilData = reactive({
	//系统消息
	systemMessages: [
		{ createTime: "2024.3.20 08:44", content: "欢迎大家光临" },
		{ createTime: "2024.3.21 11:25", content: "系统提示，关注眼部健康" }
	],
	showBodyLeft: true,
	//表情包
	imageList: []
});

const changeAvatar = (value: any) => {
	console.log(value);
};
const removeFriend = (currentFriendId: any) => {
	ElMessageBox.confirm("你确定删除" + friendData.friends[currentFriendId].remark + "?", "警告", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	})
		.then(() => {
			data.subType === 1;
			friendData.currentFriendId = null;
			ElMessage({
				message: "删除成功！",
				type: "success"
			});
			isActive(null, "im-active", 1, null, null, null);
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "删除取消"
			});
		});
};
const openFriendCircle = (userId, avatar, username) => {
	friendCircleData.pagination.userId = userId;
	friendCircleData.weiYanAvatar = avatar;
	friendCircleData.weiYanUsername = username;
	getWeiYan();
};
function getWeiYan() {
	const newweiyan = article.filter(item => {
		return item.uid === friendCircleData.pagination.userId;
	});
	friendCircleData.treeHoleList = friendCircleData.treeHoleList.concat(newweiyan);
	friendCircleData.pagination.total = newweiyan.length;
	friendCircleData.showFriendCircle = true;
}
const deleteTreeHole = () => {};
const cleanFriendCircle = () => {};
const pageWeiYan = () => {};
const launch = () => {
	friendCircleData.weiYanDialogVisible = true;
};
const addFriend = () => {
	ElMessageBox.alert("确认提交好友申请，添加 " + friendCircleData.weiYanUsername + " 为好友？", "好友申请", {
		confirmButtonText: "OK",
		callback: () => {
			ElMessage({
				type: "success",
				message: `提交成功！`
			});
		}
	});
};
const changeAside = () => {
	imUtilData.showBodyLeft = !imUtilData.showBodyLeft;
	mobileRight();
};
const sendFriendMessage = async () => {
	for (let i = 0; i < data.imChats.length; i++) {
		if (data.imChats[i] === friendData.currentFriendId) {
			data.imChats.splice(i, 1);
			break;
		}
	}
	data.imChats.splice(0, 0, friendData.currentFriendId);
	await nextTick();
	isActive(document.getElementById("chat"), "aside-active", 1);
	isActive(document.getElementsByClassName("im-user-current")[0], "im-active", null, 2, friendData.currentFriendId, 2);
	getMessages(friendData.currentFriendId);
};
function getMessages(friendId, current = 1, size = 100) {
	console.log(friendId, current, size);
	if (!data.imMessages.hasOwnProperty(friendId)) {
		// $http
		// 	.get($constant.baseURL + "/imChatUserMessage/listFriendMessage", {
		// 		friendId: friendId,
		// 		current: current,
		// 		size: size
		// 	})
		// 	.then(res => {
		// 		if (!$common.isEmpty(res.data) && !$common.isEmpty(res.data.records)) {
		// 			res.data.records.forEach(message => {
		// 				message.content = parseMessage(message.content);
		// 			});
		// 			data.imMessages[friendId] = res.data.records;
		// 		} else {
		// 			data.imMessages[friendId] = [];
		// 		}
		// 		nextTick(() => {
		// 			let msgContainer = document.getElementsByClassName("msg-container");
		// 			if (msgContainer && msgContainer.length > 0) {
		// 				msgContainer[0].scrollTop = msgContainer[0].scrollHeight;
		// 			}
		// 			imgShow();
		// 		});
		// 	})
		// 	.catch(error => {
		// 		ElMessage({
		// 			message: error.message,
		// 			type: "error"
		// 		});
		// 	});
	}
}
const submitWeiYan = content => {
	let weiYan = {
		content: content,
		isPublic: friendCircleData.isPublic,
		time: new Date().toLocaleDateString()
	};
	friendCircleData.pagination.current = 1;
	friendCircleData.pagination.size = 10;
	friendCircleData.treeHoleList.unshift(weiYan);
	friendCircleData.weiYanDialogVisible = false;
	getWeiYan();

	// $http
	// 	.post($constant.baseURL + "/weiYan/saveWeiYan", weiYan)
	// 	.then(res => {
	// 		friendCircleData.pagination.current = 1;
	// 		friendCircleData.pagination.size = 10;
	// 		friendCircleData.treeHoleList = [];
	// 		friendCircleData.weiYanDialogVisible = false;
	// 		getWeiYan();
	// 	})
	// 	.catch(error => {
	// 		ElMessage({
	// 			message: error.message,
	// 			type: "error"
	// 		});
	// 	});
};
const exitGroup = () => {};
const dissolveGroup = () => {};
async function sendGroupMessage() {
	for (let i = 0; i < data.groupChats.length; i++) {
		if (data.groupChats[i] === groupData.currentGroupId) {
			data.groupChats.splice(i, 1);
			break;
		}
	}
	data.groupChats.splice(0, 0, groupData.currentGroupId);
	await nextTick();
	isActive(document.getElementById("chat"), "aside-active", 1);
	isActive(document.getElementsByClassName("im-group-current")[0], "im-active", null, 2, groupData.currentGroupId, 1);
	getGroupMessages(groupData.currentGroupId);
	if (groupData.groups[groupData.currentGroupId].groupType === 2) {
		// $http
		// 	.get($constant.baseURL + "/imChatGroup/addGroupTopic", { id: groupData.currentGroupId })
		// 	.then(res => {})
		// 	.catch(error => {
		// 		ElMessage({
		// 			message: error.message,
		// 			type: "error"
		// 		});
		// 	});
	}
}
function getGroupMessages(groupId, current = 1, size = 100) {
	console.log(groupId, current, size);
	if (!data.groupMessages.hasOwnProperty(groupId)) {
		// $http
		// 	.get($constant.baseURL + "/imChatUserGroupMessage/listGroupMessage", {
		// 		groupId: groupId,
		// 		current: current,
		// 		size: size
		// 	})
		// 	.then(res => {
		// 		if (!$common.isEmpty(res.data) && !$common.isEmpty(res.data.records)) {
		// 			res.data.records.forEach(message => {
		// 				message.content = parseMessage(message.content);
		// 			});
		// 			data.groupMessages[groupId] = res.data.records;
		// 		} else {
		// 			data.groupMessages[groupId] = [];
		// 		}
		// 		nextTick(() => {
		// 			let msgContainer = document.getElementsByClassName("msg-container");
		// 			if (msgContainer && msgContainer.length > 0) {
		// 				msgContainer[0].scrollTop = msgContainer[0].scrollHeight;
		// 			}
		// 			imgShow();
		// 		});
		// 	})
		// 	.catch(error => {
		// 		ElMessage({
		// 			message: error.message,
		// 			type: "error"
		// 		});
		// 	});
	}
}
const changeDataType = type => {
	closeModal();
	changeDataData.changeType = type;
	changeDataData.changeModal = true;
};
function closeModal() {
	changeDataData.avatarType = null;
	changeDataData.avatarPrefix = "";

	changeDataData.changeData = "";
	changeDataData.changeType = null;
}
const sendMsg = (val: any) => {
	//通过messageType判断是个人消息（1）还是群组消息 （2）
	const value = JSON.parse(val);
	const { messageType, toId, groupId } = value;
	// console.log(JSON.parse(value), messageType, "messageType");
	if (messageType == 1) {
		console.log("friend-sendMsg", value);
		data.imMessages[toId].push({ ...value, createTime: getTime() });
	} else {
		console.log("group-sendMsg", value);
		data.groupMessages[groupId].push({ ...value, createTime: getTime() });
	}
};
const getTime = () => {
	let d = new Date();
	let str =
		(d.getMonth() + 1 >= 10 ? +(d.getMonth() + 1) : "0" + (d.getMonth() + 1)) +
		"-" +
		(d.getDate() >= 10 ? d.getDate() : "0" + d.getDate()) +
		" " +
		(d.getHours() >= 10 ? d.getHours() : "0" + d.getHours()) +
		":" +
		(d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes()) +
		":" +
		(d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds());
	return str;
};
// const submitAvatar = () => {};
const isActive = (e, className, type, subType, current, imType) => {
	if (!isEmpty(type)) {
		data.type = type;
		let actives = ["im-active", "friend-active", "im-group"];
		for (let activeClass of actives) {
			for (let tab of document.getElementsByClassName(activeClass)) {
				tab.classList.remove(activeClass);
			}
		}
	}
	if (!isEmpty(subType)) {
		data.subType = subType;
		if (subType === 4 && !isEmpty(current)) {
			friendData.currentFriendId = current.friendId;
		}
		if (subType === 5 && !isEmpty(current)) {
			groupData.currentGroupId = current.id;
		}

		if (subType === 2 && !isEmpty(current) && !isEmpty(imType)) {
			if (imType === 1) {
				data.currentChatFriendId = null;
				data.currentChatGroupId = current;
				data.groupMessageBadge[current] = 0;
			} else if (imType === 2) {
				data.currentChatGroupId = null;
				data.currentChatFriendId = current;
				data.imMessageBadge[current] = 0;
			}
		}
		nextTick(() => {
			let msgContainer = document.getElementsByClassName("msg-container");
			if (msgContainer && msgContainer.length > 0) {
				msgContainer[0].scrollTop = msgContainer[0].scrollHeight;
			}
			// imgShow();
			mobileRight();
			hiddenBodyLeft();
		});
	}
};
function hiddenBodyLeft() {
	if (mobile()) {
		// $(".body-right").click(function () {
		// 	imUtilData.showBodyLeft = false;
		// 	mobileRight();
		// });
	}
}
function mobileRight() {
	if (imUtilData.showBodyLeft && mobile()) {
		$(".body-right").addClass("mobile-right");
	} else if (!imUtilData.showBodyLeft && mobile()) {
		$(".body-right").removeClass("mobile-right");
	}
}
function mobile() {
	let flag = navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	);
	return flag && flag.length && flag.length > 0;
}
// const imgShow = () => {
// 	$(".message img").click(function () {
// 		let src = $(this).attr("src");
// 		$("#bigImg").attr("src", src);

// 		/** 获取当前点击图片的真实大小，并显示弹出层及大图 */
// 		$("<img/>")
// 			.attr("src", src)
// 			.load(function () {
// 				let windowW = $(window).width(); //获取当前窗口宽度
// 				let windowH = $(window).height(); //获取当前窗口高度
// 				let realWidth = this.width; //获取图片真实宽度
// 				let realHeight = this.height; //获取图片真实高度
// 				let imgWidth, imgHeight;
// 				let scale = 0.8; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

// 				if (realHeight > windowH * scale) {
// 					//判断图片高度
// 					imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
// 					imgWidth = (imgHeight / realHeight) * realWidth; //等比例缩放宽度
// 					if (imgWidth > windowW * scale) {
// 						//如宽度仍大于窗口宽度
// 						imgWidth = windowW * scale; //再对宽度进行缩放
// 					}
// 				} else if (realWidth > windowW * scale) {
// 					//如图片高度合适，判断图片宽度
// 					imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
// 					imgHeight = (imgWidth / realWidth) * realHeight; //等比例缩放高度
// 				} else {
// 					//如果图片真实高度和宽度都符合要求，高宽不变
// 					imgWidth = realWidth;
// 					imgHeight = realHeight;
// 				}
// 				$("#bigImg").css("width", imgWidth); //以最终的宽度对图片缩放

// 				let w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
// 				let h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
// 				$("#innerImg").css({ top: h, left: w }); //设置top和left属性
// 				$("#outerImg").fadeIn("fast"); //淡入显示
// 			});

// 		$("#outerImg").click(function () {
// 			//再次点击淡出消失弹出层
// 			$(this).fadeOut("fast");
// 		});
// 	});
// };
const changeFriendStatus = (value: any, a: any, b: any) => {
	console.log(value, a, b);
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
@import "./index.scss";
</style>
