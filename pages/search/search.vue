<template>
	<view class="page">	
		<!-- 搜索框 -->
		<view class="search_block">
			<view class="search_ico_wrapper">
				<image src="../../static/icos/search.png" 
				class="search_ico"></image>
			</view>
			<input  
			type="text" 
			value="" 
			placeholder="搜索预告"
			maxlength="10"
			focus
			class="search_text"
			/>
		</view>
		<!-- 显示内容 -->
		<view 
			class="movie_list page_block"			
			>
			<view 
			class="movie_wrapper"
			v-for=" searchItem in searchList"
			:key = "searchItem.id"
			>
				<image :src="searchItem.poster" class="poster"></image>
			</view>						
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList: []
			};
		},
		onLoad() {
			this.init()
		},
		methods:{
			// 初始化函数
			init(){
				this.getSearchList()
			},
			// 获取第一页数据
			async getSearchList(){
				 let res = await this.$api.search({qq:'466481615',keywords:'',page:'',pageSize:''})
// 				let res =  this.$api.search({qq:'466481615',keywords:'',page:'',pageSize:''}).then((res) =>{
// 					console.log(res)
// 					this.searchList = res.data.data.rows
// 				})
				// console.log(res)
				this.searchList = res.data.data.rows
			}
		}
	}
</script>

<style>
@import url('search.css')
</style>
