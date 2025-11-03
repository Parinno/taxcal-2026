<template>
	<section id="error-systen" class="error-container">
		<div v-if="slots['image']" class="error-image">
			<slot name="image"></slot>
		</div>
		<div class="title"><slot name="title"></slot></div>
		<div class="error-desc"><slot name="desc"></slot></div>
		<div class="error-button__container">
			<slot name="cta"></slot>
		</div>
	</section>
</template>

<script setup lang="ts">
const slots = useSlots()
</script>
<style scoped>
#error-systen.error-container {
	width: 100%;
	padding-left: 0;
	padding-right: 0;
	padding-bottom: 60px;
	padding-top: 40px;
	text-align: center;
	letter-spacing: 0;
	color: var(--color-primary, rgba(1, 23, 43, 0.87));
}

@media (min-width: 640px) {
	#error-systen.error-container {
		padding-bottom: 120px;
		padding-top: 120px;
	}
}

@media (min-width: 768px) {
	#error-systen.error-container {
		padding-bottom: 60px;
		padding-top: 40px;
	}
}

#error-systen.error-container :deep(.error-image) img {
	margin: auto;
	max-height: 360px;
	max-width: 600px;
	width: 100%;
}

@media (min-width: 640px) {
	#error-systen.error-container :deep(.error-image) img {
		width: 90%;
	}
}

#error-systen.error-container .title {
	margin-bottom: 0.625rem;
	margin-top: 1rem;
	font-size: 1rem;
	font-weight: bold;
	line-height: 1.4;
}

#error-systen.error-container .error-desc {
	margin-bottom: 1.5rem;
	margin-top: 1rem;
	font-weight: 300;
}

@media (min-width: 475px) {
	#error-systen.error-container .error-desc {
		font-size: 0.875rem;
	}
}

@media (min-width: 768px) {
	#error-systen.error-container .error-desc {
		font-size: 1rem;
	}
}

#error-systen.error-container .error-button__container {
	padding: 0.5rem;
}

#error-systen.error-container .error-button__action {
	cursor: pointer;
	border-radius: 0.5rem;
	border: 0;
	background-color: var(--button-primary, #f7a501);
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	font-size: 0.875rem;
	font-weight: bold;
	color: white;
}
</style>
