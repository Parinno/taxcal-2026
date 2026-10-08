<template>
	<!-- Invites friends to try the calculator (NEXT-6739). Copies the plain calculator link, nothing about the user's result -->
	<section
		class="flex items-center justify-between gap-4 flex-wrap rounded-2xl bg-gray-100 px-6 py-4"
		data-test-id="tax-calculator__tax-result-share--container"
		data-fn-location="tax-result-share"
	>
		<div class="min-w-0">
			<p class="text-sm text-gray-500">อยากรู้ไหม เพื่อนคุณได้ผลแบบไหน</p>
			<p class="text-md font-bold text-color-primary">ชวนเพื่อนมาลองคำนวณภาษี</p>
		</div>
		<button
			type="button"
			class="copy-link-button"
			data-test-id="tax-calculator__tax-result-share--copy-link"
			data-fn-action="tax_result_share_copy_link"
			@click="copyLink"
		>
			<i :class="copied ? 'fas fa-check' : 'fas fa-link'" aria-hidden="true"></i>
			<span aria-live="polite">{{ copied ? 'คัดลอกแล้ว' : 'คัดลอกลิงก์' }}</span>
		</button>
	</section>
</template>

<script setup>
import { ref } from 'vue'

const config = useRuntimeConfig()

// The page's canonical URL, encoded so chat apps detect the whole Thai path as one link
const calculatorUrl = encodeURI(`${config.public.url.base}/tax/คำนวณภาษี`)

const copied = ref(false)
let resetTimer

const copyLink = async () => {
	await navigator.clipboard.writeText(calculatorUrl)
	copied.value = true
	clearTimeout(resetTimer)
	resetTimer = setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scoped>
/* Same look as the calculator's back button: the secondary action */
.copy-link-button {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	background: #e9eff2;
	color: var(--color-primary);
	border-radius: 200px;
	padding: 0 20px;
	min-height: 44px;
	font-size: 15px;
	font-weight: 500;
	transition: background 0.2s ease;
}

.copy-link-button:hover {
	background: #d3dfe6;
}
</style>
