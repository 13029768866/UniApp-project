import http from './http.js'
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */
 


// 首页轮播图
export const banner = (data) => {
    return http.request({
        url: '/index/carousel/list',
        method: 'POST', 
        data,		
    })
}
//	首页热门超英
export const hot = (data) => {
	return http.request({
		url: '/index/movie/hot?type=superhero',
		method: 'POST',
		data,	
	});
}
// 首页热门预告
export const trailer = (data) => {
	return http.request({
		url: '/index/movie/hot?type=trailer',
		method: 'POST',
		data,	
	});
}
// 默认全部导出  import api from '@/http/api.js'
export default {	
    banner,
	hot,
	trailer
}