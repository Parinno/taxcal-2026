<template>
	<div :class="field.class" :data-test-id="`${testPrefix}--${field.testId}-container`">
		<!-- Yes/no fact, e.g. a spouse without income -->
		<label
			v-if="field.kind === 'toggle'"
			class="flex items-start gap-3 cursor-pointer min-h-[44px] py-[10px]"
			:data-test-id="`${testPrefix}--${field.testId}-label`"
		>
			<input
				type="checkbox"
				class="mt-[3px] w-5 h-5 shrink-0 accent-[var(--color-primary)]"
				:checked="Boolean(model[field.key])"
				:data-test-id="`${testPrefix}--${field.testId}-input`"
				:data-fn-action="`deduction_${field.key}_toggle`"
				@change="model[field.key] = $event.target.checked"
			/>
			<span>
				<span class="block text-gray-800 font-medium text-[15px]">{{ field.label }}</span>
				<span v-if="info" class="block text-[15px] text-color-secondary">{{ info }}</span>
			</span>
		</label>

		<!-- Number of people, the rules turn it into baht -->
		<template v-else-if="field.kind === 'count'">
			<div class="flex items-center justify-between gap-4 md:w-[648px]">
				<div class="min-w-0">
					<label
						class="block text-gray-800 font-medium text-[15px]"
						:data-test-id="`${testPrefix}--${field.testId}-label`"
					>
						{{ field.label }}
					</label>
					<p
						v-if="info"
						class="text-[15px] text-color-secondary"
						:data-test-id="`${testPrefix}--${field.testId}-info`"
					>
						{{ info }}
					</p>
				</div>
				<div class="flex items-center gap-2 shrink-0">
					<button
						type="button"
						class="stepper-button"
						:disabled="count <= 0"
						:aria-label="`ลด${field.label}`"
						:data-test-id="`${testPrefix}--${field.testId}-decrease`"
						:data-fn-action="`deduction_${field.key}_decrease`"
						@click="setCount(count - 1)"
					>
						<i class="fa-solid fa-minus"></i>
					</button>
					<span
						class="w-8 text-center text-[17px] font-semibold tabular-nums"
						aria-live="polite"
						:data-test-id="`${testPrefix}--${field.testId}-value`"
					>
						{{ count }}
					</span>
					<button
						type="button"
						class="stepper-button"
						:disabled="field.max !== undefined && count >= field.max"
						:aria-label="`เพิ่ม${field.label}`"
						:data-test-id="`${testPrefix}--${field.testId}-increase`"
						:data-fn-action="`deduction_${field.key}_increase`"
						@click="setCount(count + 1)"
					>
						<i class="fa-solid fa-plus"></i>
					</button>
				</div>
			</div>
		</template>

		<!-- Baht amount the user paid or received -->
		<template v-else>
			<label
				class="block text-gray-800 font-medium text-[15px]"
				:data-test-id="`${testPrefix}--${field.testId}-label`"
			>
				{{ field.label }}
			</label>
			<div class="relative">
				<input
					type="text"
					inputmode="numeric"
					pattern="[0-9,]*"
					:value="display"
					placeholder="กรอกจำนวนเงิน"
					:disabled="field.disabled"
					:data-test-id="`${testPrefix}--${field.testId}-input`"
					:data-fn-action="`deduction_${field.key}_input`"
					:class="['form-input w-full md:w-[648px]']"
					@input="setAmount(sanitizeAndFormatNumberInputWithDecimals($event.target.value))"
				/>
				<!-- Clear button -->
				<button
					v-if="display && !field.disabled"
					@click="setAmount('')"
					type="button"
					tabindex="-1"
					:data-fn-action="`deduction_${field.key}_clear`"
					class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors"
				>
					<i class="fa-solid fa-xmark text-white"></i>
				</button>
			</div>
			<div
				v-if="info"
				class="flex items-center mt-2"
				:data-test-id="`${testPrefix}--${field.testId}-info`"
			>
				<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
					<i class="fa fa-info-circle" style="color: #01172ba6"></i>
				</div>
				<p class="text-[15px] text-color-secondary">{{ info }}</p>
			</div>
		</template>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
	formatNumberWithSeparatorsPreserveDecimals,
	parseNumberFromFormattedWithDecimals,
	sanitizeAndFormatNumberInputWithDecimals
} from '~/utils/format'

const props = defineProps({
	// { key, testId, label, info?, kind: 'amount' | 'count' | 'toggle', max? disabled?, class?,
	//   info may be a function of the model; shownValue (model) => number replaces the model value on a locked field }
	field: { type: Object, required: true },
	// The shared deductions object; mutated in place like the step forms so the summary updates live
	model: { type: Object, required: true },
	// e.g. 'tax-calculator__deductions-form'
	testPrefix: { type: String, required: true }
})

const info = computed(() =>
	typeof props.field.info === 'function' ? props.field.info(props.model) : props.field.info
)

// Display value with separators while keeping the number in the model
const display = ref('')
watch(
	() => (props.field.shownValue ? props.field.shownValue(props.model) : props.model[props.field.key]),
	(newVal) => {
		display.value = formatNumberWithSeparatorsPreserveDecimals(newVal)
	},
	{ immediate: true }
)

const setAmount = (formatted) => {
	display.value = formatted
	props.model[props.field.key] = parseNumberFromFormattedWithDecimals(formatted)
}

const count = computed(() => Number(props.model[props.field.key]) || 0)
const setCount = (n) => {
	const max = props.field.max ?? Infinity
	props.model[props.field.key] = Math.min(Math.max(0, n), max)
}
</script>

<style scoped>
.form-input:disabled {
	background: #e9eff2;
	color: rgba(1, 23, 43, 0.55);
	cursor: not-allowed;
}

.stepper-button {
	width: 44px;
	height: 44px;
	border-radius: 200px;
	background: #e9eff2;
	color: var(--color-primary);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 0.2s ease;
}

.stepper-button:hover:not(:disabled) {
	background: #d3dfe6;
}

.stepper-button:disabled {
	color: rgba(1, 23, 43, 0.25);
	cursor: not-allowed;
}
</style>
