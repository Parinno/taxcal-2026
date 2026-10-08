<template>
	<!-- Prototype only: switches the rule behind the result emoji. Remove once Ford picks one -->
	<div class="variant-picker" data-test-id="tax-calculator__result-emoji-variant-picker--container">
		<span class="variant-picker-title max-sm:hidden">Emoji</span>
		<button
			v-for="option in options"
			:key="option.id"
			type="button"
			:class="{ 'is-active': modelValue === option.id }"
			:data-test-id="`tax-calculator__result-emoji-variant-picker--${option.id}`"
			@click="emit('update:modelValue', option.id)"
		>
			{{ option.letter }}<span class="max-sm:hidden"> · {{ option.label }}</span>
		</button>
	</div>
</template>

<script setup>
defineProps({ modelValue: { type: String, required: true } })
const emit = defineEmits(['update:modelValue'])

const options = [
	{ id: 'ticket', letter: '0', label: 'ตามผลจ่าย/คืน (ticket)' },
	{ id: 'usage', letter: 'A', label: 'ตามการใช้สิทธิ์' },
	{ id: 'usage-hint', letter: 'B', label: 'A + บอกว่าลดได้อีกเท่าไหร่' }
]
</script>

<style scoped>
.variant-picker {
	position: fixed;
	left: 12px;
	bottom: 60px;
	z-index: 50;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 4px;
	max-width: calc(100vw - 24px);
	padding: 6px;
	border-radius: 12px;
	background: #01172b;
	color: #fff;
	font-size: 12px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.variant-picker-title {
	padding: 0 6px;
	opacity: 0.6;
}

.variant-picker button {
	padding: 4px 8px;
	border-radius: 8px;
	color: #fff;
	opacity: 0.7;
}

.variant-picker button.is-active {
	background: #00e76b;
	color: #01172b;
	opacity: 1;
}
</style>
