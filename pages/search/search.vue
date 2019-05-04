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
			v-model="val" 
			placeholder="搜索预告"
			maxlength="10"
			confirm-type="search"
			@confirm="searchMe"
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
				searchList: [],
				val: "",
				keywords:"",
				page: 1,		//当前页
				totalPages: 1,	// 总页数
				pageSize: 12 	// 每页默认条数
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
				 let res = await this.$api.search({qq:'466481615',keywords:this.keywords,page:this.page,pageSize:this.pageSize})
// 				let res =  this.$api.search({qq:'466481615',keywords:'',page:'',pageSize:''}).then((res) =>{
// 					console.log(res)
// 					this.searchList = res.data.data.rows
// 				})
				// console.log(res)
				this.searchList = res.data.data.rows
			},
			searchMe(e){
				// 获取搜索内容				
				this.keywords = this.val;
				// console.log(this.keywords)								
				this.getSearchList()
			}
		}
	}
</script>

<style>
@import url('search.css')
</style>
