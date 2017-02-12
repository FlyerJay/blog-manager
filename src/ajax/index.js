import config from "./config"
const R = {};
R.getBlogList = function(vue,params,callback){
	this.url = "/blog"
	vue.$http.get(config.server+this.url,{
		params:params,
	}).then(res=>{
		callback(res.body)
	})
}

R.addBlog = function(vue,params,callback){
	this.url = "/blog"
	vue.$http.post(config.server+this.url,{
		params:params,
	}).then(res=>{
		callback(res.body)
	})
}

R.updateBlog = function(vue,params,callback){
	this.url = "/blog/"+params.id
	vue.$http.patch(config.server+this.url,{
		params:params,
	}).then(res=>{
		callback(res.body)
	})
}

R.getBlog = function(vue,params,callback){
	this.url = "/blog/"+params.id;
	vue.$http.get(config.server+this.url).then(res=>{
		callback(res.body)
	})
}

R.deleteBlog = function(vue,params,callback){
	this.url = "/blog/"+params.id;
	vue.$http.delete(config.server+this.url).then(res=>{
		callback(res.body)
	})
}

R.getCatalogList = function(vue,params,callback){
	this.url = "/catalog"
	vue.$http.get(config.server+this.url,{
		params:params,
	}).then(res=>{
		callback(res.body)
	})
}

R.addCatalog = function(vue,params,callback){
	this.url = "/catalog"
	vue.$http.post(config.server+this.url,{
		params:params,
	}).then(res=>{
		callback(res.body)
	})
}

R.updateCatalog = function(vue,params,callback){
	this.url = "/catalog/"+params.catalogId
	vue.$http.patch(config.server+this.url,{
		params:params,
	}).then(res=>{
		callback(res.body)
	})
}

R.deleteCatalog = function(vue,params,callback){
	this.url = "/catalog/"+params.catalogId
	vue.$http.delete(config.server+this.url).then(res=>{
		callback(res.body)
	})
}
export default R;