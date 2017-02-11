<template>
  	<div class="app">
	  	<el-col :span="4" class="navibar">
			<el-menu default-active="2" class="el-menu-vertical-demo" mode="vertical" theme="dark" @select="handleSelect">
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-message"></i>基础设置</template>
					<el-menu-item index="cataloglist">分类设置</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-message"></i>内容管理</template>
					<el-menu-item index="bloglist">文章管理</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-col>
		<el-col class="tabpage"  :span="20">
			<transition name="page-slide">
				<router-view></router-view>
			</transition>
		</el-col>
  	</div>
</template>
<script>
export default {
	name: 'app',
  	data () {
    	return {

    	}
  	},
	methods:{
		handleSelect:function(index){
			this.$router.push(index);
		}
	}
}
</script>
<style>
	#manager,.app{
		height: 100%;
		overflow:hidden;
	}
	.navibar{
		height:100%;
		background:#1f2d3d;

	}
</style>
