<template>
	<NuxtLayout>
		<div id="error-layout" class="error-bg" :style="{ '--bg-page': errorBackground(error?.statusCode) }">
			<section class="container xs:mx-auto xs:w-full md:mx-auto md:max-w-7xl lg:max-w-[1280px]">
				<Error500 v-if="error?.statusCode === 500 || error?.statusCode === '500'"></Error500>
				<Error503 v-else-if="error?.statusCode === 503 || error?.statusCode === '503'"></Error503>
				<Error404 v-else></Error404>
			</section>
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
import Error404 from '@/components/templates/error/404.vue'
import Error500 from '@/components/templates/error/500.vue'
import Error503 from '@/components/templates/error/503.vue'

defineProps({
	error: { type: Object, default: () => {} }
})

const config = useRuntimeConfig()
const errorBg = `${config.public.url.scontent}/page-assets/image/error-bg-image.png`

function errorBackground(code: number | string | undefined): string {
	if (code === 503 || code === '503') return `url('${errorBg}')`
	else return ''
}
</script>

<style scoped>
#error-layout.error-bg {
	padding-top: 64px;
	background: linear-gradient(180deg, #f7a501 0%, #f7a50160 25%, #f9fafb50 50%), var(--bg-page);
	background-size: cover;
	background-position: 50%;
	background-attachment: fixed;
	background-repeat: no-repeat;
	padding-bottom: 64px;
}
</style>
