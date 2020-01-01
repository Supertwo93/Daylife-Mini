<template>
	<view>
		<view>{{data}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				data:''
			}
		},
		onLoad(options){
			this.data = options.data
		}
	}
</script>

<style>
</style>
