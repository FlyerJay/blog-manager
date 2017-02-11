import config from "./config"
const R = {};
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