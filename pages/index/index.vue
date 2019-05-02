<template>
	
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
			<view class="single-like-movie">
				<image class="like-movie"></image>
				<view class="movie-des">
					<view class="movie-title">魏振江牛逼魏振江牛逼</view>
					<view class="movie-info">123</view>
					<view class="movie-info">魏振江</view>
				</view>
				<!-- 点赞功能 -->
				<view class="movie-oper">
					<image class="praise-ico" src="../../static/icos/praise.png"></image>
					<view class="praise-me">
						点赞
					</view>
				</view>
			</view>
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
				hotSuperTrailer: []		// 热门预告
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
@import url(index.css)
</style>
