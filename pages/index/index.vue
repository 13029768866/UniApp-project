<template>
	
	<view class="page">
		<!-- 轮播图 -->
		<swiper class="carousel" circular="true" indicator-color="rgba(255,255,255,.6)" indicator-active-color="#fff" :indicator-dots="true"
		 :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="carousel in carouselList">
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
	</view>
	
	
</template>

<script>
	import env from '../../app/env.js'
	export default {
		data() {
			return {
				carouselList: [],	//	轮播图
				hotSuperheroList: [],	// 热门板块	
				hotSuperTrailer: []
			}
		},
		onLoad() {									
			this.init()			
		},
		methods: {
			init(){
				this.getIndexBanner();
				this.getIndexHot();
				this.getIndexTrailer();
			},
			// 请求轮播图数据
			async getIndexBanner(){
				let res = await this.$api.banner({qq:'466481615'});
				console.log(res);
				this.carouselList = res.data.data;
			},
			// 请求热门模块数据 
			async getIndexHot(){
				let res = await this.$api.hot({qq:'466481615'});
				console.log(res);
				this.hotSuperheroList = res.data.data;
			},
			//  请求热门预告
			async getIndexTrailer(){
				let res = await this.$api.trailer({qq:'466481615'});
				console.log(res)
				this.hotSuperTrailer = res.data.data;
			}
		}
	}
</script>

<style>
	/*  隐藏滚动条 */
	scroll-view ::-webkit-scrollbar{
	       width: 0;
	       height: 0;
	       color: transparent;
	    }
	.carousel {
		width: 100vw;
		height: 440upx;
	}
	/* 热门板块 */
	.super_hot{
		margin-top: 12upx;
		padding: 20upx;
	}
	
	.hot_title_wrapper{
		display: flex;
		align-items: center;
	}
	.hot_title{
		font-size: 20px;
		margin-left: 20upx;
		font-weight: 700;
	}
	.hot_icon{
		width: 30upx;
		height: 30upx;
	}
	.hot_produce{
		width: 100%;
	}
	.hot_pro_wrapper{
		display: flex;
		margin-top: 20upx;
	}
	.hot_pro_item{
		margin-left: 20upx;
	}
	.hot_pro_img{
		width: 200upx;
		height: 270upx;
	}
	.movie_name{
		width: 200upx;
		margin-top: 10upx;
		font-size: 14px;
	}
	.movie_score_wrapper{
		display: flex;
		align-items: center;
		margin-top: 6upx;
	}
	.star_icon{
		width: 20upx;
		height: 20upx;		
	}
	.movie_score{
		font-size: 12px;
		color: #ccc;
		margin-left: 8upx;
	}
	/* 热门预告 */
	.hot-movies{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20upx 20upx 20upx;
	}
	.hot-movie-single{
		width: 350upx;
		height: 220upx;
		margin-top: 10upx;
	}
</style>
