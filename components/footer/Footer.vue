<template>
	<footer class="footer-finno">
		<header-finnomena-new-footer 
			:show-social-links="showSocialLinks"
			:show-company-info="showCompanyInfo"
			:custom-links="customLinks"
		/>
	</footer>
</template>

<script setup lang="ts">
interface CustomLink {
	label: string
	url: string
	target?: '_blank' | '_self'
}

interface Props {
	showSocialLinks?: boolean
	showCompanyInfo?: boolean
	customLinks?: CustomLink[]
}

const props = withDefaults(defineProps<Props>(), {
	showSocialLinks: true,
	showCompanyInfo: true,
	customLinks: () => []
})

// Reactive data for dynamic updates
const { showSocialLinks, showCompanyInfo, customLinks } = toRefs(props)

// Error handling for web component
onMounted(() => {
	const footerElement = document.querySelector('header-finnomena-new-footer')
	if (!footerElement) {
		console.warn('Footer web component not found')
	}
})
</script>
