<script setup>
import { computed, ref, watch } from 'vue'
import {
	formatNumberWithSeparatorsPreserveDecimals,
	parseNumberFromFormattedWithDecimals,
	sanitizeAndFormatNumberInputWithDecimals
} from '~/utils/format'

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
		default: () => ({
			salary: '',
			bonus: '',
			otherIncome: '',
			withholdingTax: ''
		})
	},
	errors: {
		type: Object,
		default: () => ({})
	}
})

const emit = defineEmits(['update:modelValue', 'submit', 'clear-errors'])

// Two-way binding helper
const formData = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:modelValue', val)
})

const handleNext = () => {
	emit('submit')
}

// Clear errors when user starts typing
const handleInput = () => {
	emit('clear-errors')
}

const displaySalary = ref('')
const displayBonus = ref('')
const displayOtherIncome = ref('')
const displayWithholdingTax = ref('')

// Salary display <-> model
watch(
	() => formData.value.salary,
	(newVal) => {
		displaySalary.value = formatNumberWithSeparatorsPreserveDecimals(newVal)
	},
	{ immediate: true }
)

watch(displaySalary, (newVal) => {
	const parsed = parseNumberFromFormattedWithDecimals(newVal)
	if (parsed !== formData.value.salary) {
		formData.value.salary = parsed
	}
})

// Bonus display <-> model
watch(
	() => formData.value.bonus,
	(newVal) => {
		displayBonus.value = formatNumberWithSeparatorsPreserveDecimals(newVal)
	},
	{ immediate: true }
)

watch(displayBonus, (newVal) => {
	const parsed = parseNumberFromFormattedWithDecimals(newVal)
	if (parsed !== formData.value.bonus) {
		formData.value.bonus = parsed
	}
})

// Other income display <-> model
watch(
	() => formData.value.otherIncome,
	(newVal) => {
		displayOtherIncome.value = formatNumberWithSeparatorsPreserveDecimals(newVal)
	},
	{ immediate: true }
)

watch(displayOtherIncome, (newVal) => {
	const parsed = parseNumberFromFormattedWithDecimals(newVal)
	if (parsed !== formData.value.otherIncome) {
		formData.value.otherIncome = parsed
	}
})

// Withholding tax display <-> model
watch(
	() => formData.value.withholdingTax,
	(newVal) => {
		displayWithholdingTax.value = formatNumberWithSeparatorsPreserveDecimals(newVal)
	},
	{ immediate: true }
)

watch(displayWithholdingTax, (newVal) => {
	const parsed = parseNumberFromFormattedWithDecimals(newVal)
	if (parsed !== formData.value.withholdingTax) {
		formData.value.withholdingTax = parsed
	}
})

// Sanitize input to allow only digits and commas, then normalize formatting
const onAmountInput = (which, e) => {
	emit('clear-errors')
	const formatted = sanitizeAndFormatNumberInputWithDecimals(e.target.value)
	switch (which) {
		case 'salary':
			displaySalary.value = formatted
			break
		case 'bonus':
			displayBonus.value = formatted
			break
		case 'otherIncome':
			displayOtherIncome.value = formatted
			break
		case 'withholdingTax':
			displayWithholdingTax.value = formatted
			break
	}
}
</script>

<template>
	<div class="max-w-2xl mx-auto">
		<!-- Section Title -->
		<h2
			class="font-bold text-color-primary mb-[16px] text-[20px]"
			data-test-id="tax-calculator__income-form--title"
		>
			รายได้ทั้งหมดของคุณ
		</h2>

		<!-- Form Fields -->
		<div class="space-y-6 mb-[20px]">
			<!-- Salary Input -->
			<div data-test-id="tax-calculator__income-form--salary-container">
				<label
					class="block text-gray-800 font-medium text-[15px] mb-1"
					data-test-id="tax-calculator__income-form--salary-label"
				>
					เงินเดือนทั้งปี (บาท)
				</label>
				<p
					class="text-sm text-gray-500 mb-2 text-[15px]"
					data-test-id="tax-calculator__income-form--salary-description"
				>
                    รวมเงินเดือนทั้งหมดที่ได้รับในปี
				</p>
				<div class="relative">
					<input
						type="text"
						inputmode="numeric"
						pattern="[0-9,]*"
						v-model="displaySalary"
						placeholder="กรอกจำนวนเงิน"
						@input="onAmountInput('salary', $event)"
						data-test-id="tax-calculator__income-form--salary-input"
						:class="['form-input w-full md:w-[648px]', errors.salary ? 'form-input--error' : '']"
					/>
					<!-- Clear button -->
					<button
						v-if="displaySalary"
						@click="displaySalary = ''"
						type="button"
						tabindex="-1"
						data-test-id="tax-calculator__income-form--salary-clear"
						class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors"
					>
						<i class="fa-solid fa-xmark text-white"></i>
					</button>
				</div>
				<!-- Error message with icon -->
				<div
					v-if="errors.salary"
					class="flex items-center mt-2"
					data-test-id="tax-calculator__income-form--salary-error"
				>
					<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1 flex-shrink-0">
						<i class="fa-solid fa-circle-exclamation" style="color: #f73232"></i>
					</div>
					<p class="text-[#F73232] text-sm">{{ errors.salary }}</p>
				</div>
			</div>

			<!-- Bonus Input -->
			<div data-test-id="tax-calculator__income-form--bonus-container">
				<label
					class="block text-gray-800 font-medium text-[15px] mb-1"
					data-test-id="tax-calculator__income-form--bonus-label"
				>
					โบนัส (บาท)
				</label>
				<p
					class="text-sm text-gray-500 mb-2 text-[15px]"
					data-test-id="tax-calculator__income-form--bonus-description"
				>
					รวมโบนัสทั้งหมดที่ได้รับในปี
				</p>
				<div class="relative">
					<input
						type="text"
						inputmode="numeric"
						pattern="[0-9,]*"
						v-model="displayBonus"
						placeholder="กรอกจำนวนเงิน"
						@input="onAmountInput('bonus', $event)"
						data-test-id="tax-calculator__income-form--bonus-input"
						:class="['form-input w-full md:w-[648px]', errors.bonus ? 'form-input--error' : '']"
					/>
					<!-- Clear button -->
					<button
						v-if="displayBonus"
						@click="displayBonus = ''"
						type="button"
						tabindex="-1"
						data-test-id="tax-calculator__income-form--bonus-clear"
						class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors"
					>
						<i class="fa-solid fa-xmark text-white"></i>
					</button>
				</div>
				<!-- Error message with icon -->
				<div
					v-if="errors.bonus"
					class="flex items-center mt-2"
					data-test-id="tax-calculator__income-form--bonus-error"
				>
					<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1 flex-shrink-0">
						<i class="fa-solid fa-circle-exclamation" style="color: #f73232"></i>
					</div>
					<p class="text-[#F73232] text-sm">{{ errors.bonus }}</p>
				</div>
			</div>

			<!-- Other Income Input -->
			<div data-test-id="tax-calculator__income-form--other-income-container">
				<label
					class="block text-gray-800 font-medium text-[15px] mb-1"
					data-test-id="tax-calculator__income-form--other-income-label"
				>
					รายได้อื่นๆ (บาท)
				</label>
				<p
					class="text-sm text-gray-500 mb-2 text-[15px]"
					data-test-id="tax-calculator__income-form--other-income-description"
				>
                    เช่น ฟรีแลนซ์, ขายของออนไลน์, เงินปันผล หรือรายได้อื่นๆ ตลอดทั้งปี
				</p>
				<div class="relative">
					<input
						type="text"
						inputmode="numeric"
						pattern="[0-9,]*"
						v-model="displayOtherIncome"
						placeholder="กรอกรายได้ทั้งปี"
						@input="onAmountInput('otherIncome', $event)"
						data-test-id="tax-calculator__income-form--other-income-input"
						:class="['form-input w-full md:w-[648px]', errors.otherIncome ? 'form-input--error' : '']"
					/>
					<!-- Clear button -->
					<button
						v-if="displayOtherIncome"
						@click="displayOtherIncome = ''"
						type="button"
						tabindex="-1"
						data-test-id="tax-calculator__income-form--other-income-clear"
						class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors"
					>
						<i class="fa-solid fa-xmark text-white"></i>
					</button>
				</div>
				<!-- Error message with icon -->
				<div
					v-if="errors.otherIncome"
					class="flex items-center mt-2"
					data-test-id="tax-calculator__income-form--other-income-error"
				>
					<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1 flex-shrink-0">
						<i class="fa-solid fa-circle-exclamation" style="color: #f73232"></i>
					</div>
					<p class="text-[#F73232] text-sm">{{ errors.otherIncome }}</p>
				</div>
			</div>

			<!-- Withholding Tax Input -->
			<div data-test-id="tax-calculator__income-form--withholding-tax-container">
				<label
					class="block text-gray-800 font-medium text-[15px] mb-1"
					data-test-id="tax-calculator__income-form--withholding-tax-label"
				>
					ภาษีหัก ณ ที่จ่าย (บาท)
				</label>
				<div class="relative">
					<input
						type="text"
						inputmode="numeric"
						pattern="[0-9,]*"
						v-model="displayWithholdingTax"
						placeholder="กรอกภาษีทั้งปี"
						@input="onAmountInput('withholdingTax', $event)"
						data-test-id="tax-calculator__income-form--withholding-tax-input"
						:class="['form-input w-full md:w-[648px]', errors.withholdingTax ? 'form-input--error' : '']"
					/>
					<!-- Clear button -->
					<button
						v-if="displayWithholdingTax"
						@click="displayWithholdingTax = ''"
						type="button"
						tabindex="-1"
						data-test-id="tax-calculator__income-form--withholding-tax-clear"
						class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors"
					>
						<i class="fa-solid fa-xmark text-white"></i>
					</button>
				</div>
				<!-- Error message with icon -->
				<div
					v-if="errors.withholdingTax"
					class="flex items-center mt-2"
					data-test-id="tax-calculator__income-form--withholding-tax-error"
				>
					<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1 flex-shrink-0">
						<i class="fa-solid fa-circle-exclamation" style="color: #f73232"></i>
					</div>
					<p class="text-[#F73232] text-sm">{{ errors.withholdingTax }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
