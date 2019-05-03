<template>
	<wzj-pulldown-refresh
			ref="wzjPulldownRefresh"
			:top = "0"	
			@refresh="onPulldownReresh"
	>
		<view class="page">
			<!-- 轮播图 -->
			<swiper class="carousel" circular="true" indicator-color="rgba(255,255,255,.6)" indicator-active-color="#fff" :indicator-dots="true"
			 :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item 
					v-for="carousel in carouselList"
					:key ="carousel.id"
				>
					<image 
						:src="carousel.image" 
						class="carousel"></image>
				</swiper-item>
			</swiper>
			
			<!-- 热门板块 -->
			<view class="page_module super_hot">
				<view class="hot_title_wrapper">
					<image class="hot_icon" src="../../static/icos/hot.png"></image>
					<view class="hot_title">热门超英</view>
				</view>
				<scroll-view scroll-x="true" class="page_module hot_produce">
					<view class="hot_pro_wrapper">
						<view 
							class="hot_pro_item"
							v-for="superhero in hotSuperheroList"
							:key = 'superhero.id'
						>
							<image :src="superhero.cover" class="hot_pro_img"></image>
							<view class="movie_name ell">
								{{superhero.name}}
							</view>
							<view class="movie_score_wrapper">
								<image src="../../static/icos/star-yellow.png" class="star_icon"></image>
								<image src="../../static/icos/star-yellow.png" class="star_icon"></image>
								<image src="../../static/icos/star-yellow.png" class="star_icon"></image>
								<image src="../../static/icos/star-yellow.png" class="star_icon"></image>
								<image src="../../static/icos/star-gray.png" class="star_icon"></image>
								<view class="movie_score">
									{{superhero.score}}
								</view>
							</view>
						</view>					
					</view>		
				</scroll-view>
			</view>
			<!-- 热门预告 -->
			<view class="page_module super_hot">
				<view class="hot_title_wrapper">
					<image class="hot_icon" src="../../static/icos/interest.png"></image>
					<view class="hot_title">热门预告</view>
				</view>			
			</view>
			<view class="hot-movies page_module">
				<video 
					v-for="trailer in hotSuperTrailer"
					:src="trailer.trailer"
					:key = "trailer.id"
					:poster=" trailer.poster"
					class="hot-movie-single"
					controls
				>
					
				</video>
			</view>
			
			<!-- 猜你喜欢 -->
			<view class="page_module super_hot">
				<view class="hot_title_wrapper">
					<image class="hot_icon" src="../../static/icos/guess-u-like.png"></image>
					<view class="hot_title">猜你喜欢</view>
				</view>			
			</view>
			
			<view class="page_module guess-u-like">
				<view 
					class="single-like-movie"
					v-for="(guessLike,gIdx) in guessLikeList"
					:key = "guessLike.id"
				>
					<image 
					:src="guessLike.cover"
					class="like-movie"></image>
					<view class="movie-des">
						<view class="movie-title">{{guessLike.name}}</view>
						<view class="movie-info">{{guessLike.basicInfo}}</view>
						<view class="movie-info">{{guessLike.releaseDate}}</view>
					</view>
					<!-- 点赞功能 -->
					<view 
					:data-gIdx="gIdx"
					class="movie-oper"
					@click="prasieMe"
					>
						<image class="praise-ico" src="../../static/icos/praise.png"></image>
						<view class="praise-me">
							点赞
						</view>
						<!-- 点赞动画 -->
						<view 
						:animation="animationDataArr[gIdx]"
						class="praise-me animation-opacity">
							+1
						</view>
					</view>
				</view>
			</view>
		</view>
	</wzj-pulldown-refresh>
	
	
	
</template>

<script>
	import wzjPulldownRefresh from '@/components/wzj-pulldown-refresh/wzj-pulldown-refresh.vue'
	export default {
		components:{
			wzjPulldownRefresh
		},
		data() {
			return {
				carouselList: [],	//	轮播图
				hotSuperheroList: [],	// 热门板块	
				hotSuperTrailer: []	,	// 热门预告
				animationData:{},		// 动画数据
				animationDataArr:[],
				guessLikeList: []	// 猜你喜欢
				
			}
		},
		onLoad() {	
			// #ifdef APP-PLUS || MP-WEIXIN
			// 页面创建时创建临时对象动画
			this.animation = uni.createAnimation();
			// #endif
			this.init()			
		},
		onUnload(){
			// 页面关闭清楚动画
			this.animationData = {}
		}		
		,
		methods: {
			init(){
				this.getIndexBanner();
				this.getIndexHot();
				this.getIndexTrailer();
				this.getGuessULike()
			},
			// 通过方法的方式实现下拉刷新
			onPulldownReresh(){			
				this.loadData('refresh');
			},
			loadData(type){					
				setTimeout(() => {	
					if(type === 'refresh'){
						this.getGuessULike()
						this.$refs.wzjPulldownRefresh && this.$refs.wzjPulldownRefresh.endPulldownRefresh();
					}															
				},1000)
			},
			// 请求轮播图数据
			async getIndexBanner(){
				let res = await this.$api.banner({qq:'466481615'});
				// console.log(res);
				this.carouselList = res.data.data;
			},
			// 请求热门模块数据 
			async getIndexHot(){
				let res = await this.$api.hot({qq:'466481615'});
				// console.log(res);
				this.hotSuperheroList = res.data.data;
			},
			//  请求热门预告
			async getIndexTrailer(){
				let res = await this.$api.trailer({qq:'466481615'});
				// console.log(res)
				this.hotSuperTrailer = res.data.data;
			},
			// 请求猜你细化年数据
			async getGuessULike(){
				let res = await this.$api.guess({qq:'466481615'});
				console.log(res)
				this.guessLikeList = res.data.data;
			},
			// 实现点赞动画效果
			
			prasieMe(e){
				// #ifdef APP-PLUS || MP-WEIXIN
				
				// 通过自定义属性传递当前索引
				let gIdx = e.currentTarget.dataset.gidx
				// return;
				this.animation.translateY(-60).opacity(1).step({dutation:500})
				// 导出动画数据到view组件，实现动画效果
				this.animationData = this.animation;
				this.animationDataArr[gIdx] = this.animationData.export();
				
				// 还原动画
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({dutation:0});
					this.animationData = this.animation;
					this.animationDataArr[gIdx] = this.animationData.export();
				}.bind(this),600)
				
				// #endif
			}
			
		}
	}
</script>

<style>
@import url(index.css)
</style>
