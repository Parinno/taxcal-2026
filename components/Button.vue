<template>
	<a
		:class="[
			'a-button inline-flex items-center justify-center gap-2',
			`is-button--${color}`,
			`${size ? `is-button--${size}` : ''}`,
			`${padding ? `is-button-padding--${padding}` : ''}`,
			{ 'is-button--hover': hover },
			{ 'is-button--border': border },
			{ 'active font-semibold': active },
			{ outlined: outlined },
			{ disabled: disabled },
			borderClass,
			bgClass
		]"
		v-bind="attrs"
	>
		<slot></slot> 
	</a>
</template>

<script setup lang="ts">
defineProps({
	color: {
		type: String,
		default: 'default',
		validator: (val: string): boolean => ['default', 'primary', 'gray', 'orange','white'].includes(val)
	},
	border: { type: Boolean, default: false },
	hover: { type: Boolean, default: false },
	active: { type: Boolean, default: false },
	size: { type: String, default: '' },
	padding: { type: String, default: '' },
	disabled: { type: Boolean, default: false },
	borderClass: { type: String, default: '' },
	bgClass: { type: String, default: '' },
	type: { type: String, default: 'button' },
	outlined: { type: Boolean, default: false }
})

const attrs = useAttrs()
</script>

<style scoped>
.a-button {
	@apply cursor-pointer px-2 py-2 text-xs md:px-6 md:py-3 md:text-base;
}

.a-button.is-button--default {
	@apply bg-button-secondary text-text-secondary;
}

.a-button.is-button--default.is-button--hover {
	@apply hover:bg-button-secondary-hover;
}

.a-button.is-button--default.is-button--border {
	@apply border border-button-secondary;
}

.a-button.is-button--default.active {
	@apply bg-button-secondary-active text-text-primary;
}

.a-button.is-button--gray {
	@apply bg-button-secondary-active;
}

.a-button.is-button--gray.outlined {
	@apply border border-button-secondary-active text-text-primary;
}

.a-button.is-button--gray.is-button--hover {
	@apply hover:bg-button-secondary-hover;
}

.a-button.is-button--gray.is-button--border {
	@apply border border-button-secondary-active;
}

.a-button.is-button--gray.active {
	@apply bg-button-secondary-active;
}

.a-button.is-button--primary {
	@apply bg-button-primary text-text-on-color;
}

.a-button.is-button--primary.outlined {
	@apply border border-button-brand bg-transparent text-button-brand;
}

.a-button.is-button--primary.is-button--hover {
	@apply hover:bg-button-brand;
}

.a-button.is-button--primary.is-button--border {
	@apply border border-button-brand;
}

.a-button.is-button--primary.active {
	@apply bg-button-brand;
}

.a-button.is-button--orange {
	@apply bg-button-brand;
}

.a-button.is-button--orange.outlined {
	@apply border border-button-brand bg-transparent text-button-brand;
}

.a-button.is-button--orange.is-button--hover {
	@apply hover:bg-button-brand-hover;
}

.a-button.is-button--orange.is-button--border {
	@apply border border-button-brand;
}

.a-button.is-button--orange.active {
	@apply bg-button-brand-active;
}

.a-button.is-button--white.is-button--hover {
	@apply hover:bg-button-secondary-active;
}

.a-button.is-button--white.is-button--border {
	@apply border border-button-primary-hover;
}

.a-button.is-button--white.active {
	@apply bg-button-secondary-active;
}

.a-button.is-button--xs,
.a-button.is-button-padding--xs {
	@apply px-2 py-2 text-xs;
}

.a-button.is-button--xs-2,
.a-button.is-button-padding--xs-2 {
	@apply px-2 py-1;
}

.a-button.is-button--xs-px,
.a-button.is-button-padding--xs-px {
	@apply px-6 py-2;
}

.a-button.is-button--sm,
.a-button.is-button-padding--sm {
	@apply px-4 py-2 text-sm;
}

.a-button.is-button--sm-2,
.a-button.is-button-padding--sm-2 {
	@apply px-3 py-1;
}

.a-button.is-button--md,
.a-button.is-button-padding--md {
	@apply px-6 py-3 text-base;
}

.a-button.disabled {
	@apply pointer-events-none cursor-not-allowed bg-opacity-50;
}
</style>
