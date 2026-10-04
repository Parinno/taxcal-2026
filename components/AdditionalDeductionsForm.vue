<template>
	<div class="max-w-2xl mx-auto" data-fn-location="additional-deductions-form">
		<div
			class="space-y-4 mb-[20px]"
			data-test-id="tax-calculator__additional-deductions-form--section"
		>
			<div class="flex items-center justify-between mb-[16px]">
				<h2
					class="font-bold text-color-primary text-[20px]"
					data-test-id="tax-calculator__additional-deductions-form--title"
				>
					ค่าลดหย่อนเพิ่มเติม
				</h2>
				<button
					v-if="maxValues"
					type="button"
					class="text-[15px] font-medium text-color-primary underline"
					data-test-id="tax-calculator__additional-deductions-form--max-all-button"
					data-fn-action="deduction_additional_max_all"
					@click="fillAllMax"
				>
					ใช้สิทธิ์สูงสุดทั้งหมด
				</button>
			</div>

			<div class="space-y-6 mb-[20px]">
				<div
					v-for="field in fields"
					:key="field.key"
					class="mb-6"
					:data-test-id="`tax-calculator__additional-deductions-form--${field.key}-container`"
				>
					<label
						class="block text-gray-800 font-medium text-[15px]"
						:data-test-id="`tax-calculator__additional-deductions-form--${field.key}-label`"
					>
						{{ field.label }}
					</label>
					<div class="relative">
						<input
							type="text"
							inputmode="numeric"
							pattern="[0-9,]*"
							:value="display[field.key]"
							placeholder="กรอกจำนวนเงิน"
							:data-test-id="`tax-calculator__additional-deductions-form--${field.key}-input`"
							:data-fn-action="`deduction_${field.key}_input`"
							:class="['form-input w-full md:w-[648px]']"
							@input="onAmountInput(field.key, $event)"
						/>
						<!-- Clear button -->
						<button
							v-if="display[field.key]"
							@click="setValue(field.key, '')"
							type="button"
							tabindex="-1"
							:data-fn-action="`deduction_${field.key}_clear`"
							class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors"
						>
							<i class="fa-solid fa-xmark text-white"></i>
						</button>
					</div>
					<div
						class="flex items-center mt-2"
						:data-test-id="`tax-calculator__additional-deductions-form--${field.key}-info`"
					>
						<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
							<i class="fa fa-info-circle" style="color: #01172ba6"></i>
						</div>
						<p class="text-[15px] text-color-secondary">{{ field.info }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { nextTick, reactive, watch } from 'vue'
import {
	formatNumberWithSeparatorsPreserveDecimals,
	parseNumberFromFormattedWithDecimals,
	sanitizeAndFormatNumberInputWithDecimals
} from '~/utils/format'

const props = defineProps({
	modelValue: {
		type: Object,
		required: true
	},
	// Per-field max from getDeductionMaxes; prefill buttons are hidden when absent
	maxValues: {
		type: Object,
		default: undefined
	}
})

defineEmits(['update:modelValue', 'submit', 'back'])

const fields = [
	{ key: 'lifeInsurance', label: 'เบี้ยประกันชีวิต', info: 'ไม่เกิน 100,000 บาท' },
	{
		key: 'healthInsurance',
		label: 'เบี้ยประกันสุขภาพตนเอง',
		info: 'ไม่เกิน 25,000 บาท และเมื่อรวมกับประกันชีวิตไม่เกิน 100,000 บาท'
	},
	{ key: 'homeLoanInterest', label: 'ดอกเบี้ยเงินกู้ยืมเพื่อที่อยู่อาศัย', info: 'ไม่เกิน 100,000 บาท' },
	{ key: 'donation', label: 'เงินบริจาค', info: 'ไม่เกิน 10% ของเงินได้หลังหักค่าใช้จ่ายและค่าลดหย่อน' }
]

// Display values with separators while keeping numeric values in the model
const display = reactive({})

fields.forEach(({ key }) => {
	watch(
		() => props.modelValue[key],
		(newVal) => {
			display[key] = formatNumberWithSeparatorsPreserveDecimals(newVal)
		},
		{ immediate: true }
	)
})

const setValue = (key, formatted) => {
	display[key] = formatted
	// Mutate in place like DeductionsForm so the parent's computed summary updates live
	props.modelValue[key] = parseNumberFromFormattedWithDecimals(formatted)
}

const fillMax = (key) => {
	props.modelValue[key] = props.maxValues[key]
}

// Order matters: life cap depends on health, donation cap depends on all others.
// Wait a tick between so the parent recomputes maxValues.
const fillAllMax = async () => {
	fillMax('healthInsurance')
	fillMax('homeLoanInterest')
	await nextTick()
	fillMax('lifeInsurance')
	await nextTick()
	fillMax('donation')
}

const onAmountInput = (key, e) => {
	setValue(key, sanitizeAndFormatNumberInputWithDecimals(e.target.value))
}
</script>
