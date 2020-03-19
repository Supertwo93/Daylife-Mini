<template>
	<view>

		<web-view :webview-styles="webviewStyles" src="https://sgz.wdttsh.com/app/appNavigation/appNavigation"></web-view>
		
	</view>
	
</template>

<script>
	export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        }
    }
</script>

<style>
</style>
