<template>
	<div class="max-w-2xl mx-auto">
		<!-- Form Fields -->
		<!-- Basic Deductions Section -->
		<div data-test-id="tax-calculator__deductions-form--basic-deductions-section">
			<h2 class="font-bold text-color-primary mb-[16px] text-[20px]" data-test-id="tax-calculator__deductions-form--basic-deductions-title">ค่าลดหย่อนพื้นฐาน</h2>

			<!-- Personal Deduction -->
			<div class="space-y-4 mb-[20px]">
				<div data-test-id="tax-calculator__deductions-form--personal-deduction-container">
					<label class="block text-gray-800 font-medium text-[15px]" data-test-id="tax-calculator__deductions-form--personal-deduction-label"> ลดหย่อนส่วนบุคคล </label>
					<p class="text-sm text-gray-500 mb-2 text-[15px]" data-test-id="tax-calculator__deductions-form--personal-deduction-description">Description</p>
					<div class="relative">
						<input
							type="text"
							v-model="formData.personalDeduction"
							placeholder="กรอกจำนวนเงิน"
							data-test-id="tax-calculator__deductions-form--personal-deduction-input"
							:class="['form-input']"
						/>
            <!-- Clear button -->
            <button v-if="formData.personalDeduction" @click="formData.personalDeduction = ''" type="button" tabindex="-1"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
              <i class="fa-solid fa-xmark text-white"></i>
            </button>
					</div>
				</div>
			</div>
		</div>

		<!-- Savings/Investment Deductions Section -->
		<div class="space-y-4 pt-[16px] mb-[20px]" data-test-id="tax-calculator__deductions-form--savings-investment-section">
			<h2 class="font-bold text-color-primary mb-[16px] text-[20px]" data-test-id="tax-calculator__deductions-form--savings-investment-title">ค่าลดหย่อนการออม/การลงทุน</h2>

			<div class="space-y-6 mb-[20px]">
				<!-- Social Security Fund -->
				<div class="mb-6" data-test-id="tax-calculator__deductions-form--social-security-container">
					<label class="block text-gray-800 font-medium text-[15px]" data-test-id="tax-calculator__deductions-form--social-security-label"> เงินประกันสังคม </label>
					<div class="relative">
						<input
							type="text"
							v-model="formData.socialSecurity"
							placeholder="กรอกจำนวนเงิน"
							data-test-id="tax-calculator__deductions-form--social-security-input"
							:class="['form-input']"
						/>
					</div>
          <!-- Clear button -->
          <button v-if="formData.socialSecurity" @click="formData.socialSecurity = ''" type="button" tabindex="-1"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
            <i class="fa-solid fa-xmark text-white"></i>
          </button>
					<div class="flex items-center mt-2" data-test-id="tax-calculator__deductions-form--social-security-info">
						<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
							<i class="fa fa-info-circle" style="color: #01172ba6"></i>
						</div>
						<p class="text-[15px] text-color-secondary">ไม่เกิน 9,000 บาท</p>
					</div>
				</div>

				<!-- Provident Fund (PVD) -->
				<div data-test-id="tax-calculator__deductions-form--provident-fund-container">
					<label class="block text-gray-800 font-medium text-[15px]" data-test-id="tax-calculator__deductions-form--provident-fund-label">
						ค่าลดหย่อนกองทุนสำรองเลี้ยงชีพ (PVD)
					</label>
					<div class="relative">
						<input
							type="text"
							v-model="formData.providentFund"
							placeholder="กรอกจำนวนเงิน"
							data-test-id="tax-calculator__deductions-form--provident-fund-input"
							:class="['form-input']"
						/>
            <!-- Clear button -->
            <button v-if="formData.providentFund" @click="formData.providentFund = ''" type="button" tabindex="-1"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
              <i class="fa-solid fa-xmark text-white"></i>
            </button>
					</div>
					<div class="flex items-center mt-2" data-test-id="tax-calculator__deductions-form--provident-fund-info">
						<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
							<i class="fa fa-info-circle" style="color: #01172ba6"></i>
						</div>
						<p class="text-[15px] text-color-secondary">
							ไม่เกิน 15% ของเงินเดือน (ไม่รวมเงินสมทบจากนายจ้าง)
						</p>
					</div>
				</div>

				<!-- ThaiESGX Fund -->
				<div data-test-id="tax-calculator__deductions-form--thai-esgx-container">
					<label class="block text-gray-800 font-medium text-[15px]" data-test-id="tax-calculator__deductions-form--thai-esgx-label"> กองทุน ThaiESGX </label>
					<div class="relative">
						<input
							type="text"
							v-model="formData.thaiESGX"
							placeholder="กรอกจำนวนเงิน"
							data-test-id="tax-calculator__deductions-form--thai-esgx-input"
							:class="['form-input']"
						/>
            <!-- Clear button -->
            <button v-if="formData.thaiESGX" @click="formData.thaiESGX = ''" type="button" tabindex="-1"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
              <i class="fa-solid fa-xmark text-white"></i>
            </button>
					</div>
				</div>

				<!-- ThaiESGX Fund (Transferred from LTF) -->
				<div class="mb-6" data-test-id="tax-calculator__deductions-form--thai-esgx-transferred-container">
					<label class="block text-gray-800 font-medium mb-2" data-test-id="tax-calculator__deductions-form--thai-esgx-transferred-label">
						กองทุน ThaiESGX (Thai ESGX โอนจาก LTF)
					</label>
					<p class="text-sm text-gray-500 mb-2 text-[15px]" data-test-id="tax-calculator__deductions-form--thai-esgx-transferred-description">(Thai ESGX โอนจาก LTF)</p>
					<div class="relative">
						<input
							type="text"
							v-model="formData.thaiESGXTransferred"
							placeholder="กรอกจำนวนเงิน"
							data-test-id="tax-calculator__deductions-form--thai-esgx-transferred-input"
							:class="['form-input']"
						/>
            <!-- Clear button -->
            <button v-if="formData.thaiESGXTransferred" @click="formData.thaiESGXTransferred = ''" type="button" tabindex="-1"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
              <i class="fa-solid fa-xmark text-white"></i>
            </button>
					</div>
				</div>

				<!-- Other Deductions -->
				<div data-test-id="tax-calculator__deductions-form--other-deduction-container">
					<label class="block text-gray-800 font-medium mb-2" data-test-id="tax-calculator__deductions-form--other-deduction-label"> ค่าลดหย่อนอื่นๆ </label>
					<div class="relative">
						<input
							type="text"
							v-model="formData.otherDeduction"
							placeholder="ระบุจำนวนเงิน"
							data-test-id="tax-calculator__deductions-form--other-deduction-input"
							:class="['form-input']"
						/>
            <!-- Clear button -->
            <button v-if="formData.otherDeduction" @click="formData.otherDeduction = ''" type="button" tabindex="-1"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
              <i class="fa-solid fa-xmark text-white"></i>
            </button>
					</div>
					<div class="flex items-center mt-2" data-test-id="tax-calculator__deductions-form--other-deduction-info">
						<div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
							<i class="fa fa-info-circle" style="color: #01172ba6"></i>
						</div>
						<p class="text-sm text-gray-600">
							เช่น ช้อปดีมีคืน ดอกเบี้ยบ้าน อุปการะบิดามารดา ค่าคลอดบุตร และอื่นๆ
							ที่สามารถหักได้ตามกฎหมาย
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
		default: () => ({
			personalDeduction: '',
			socialSecurity: '',
			providentFund: '',
			thaiESGX: '',
			thaiESGXTransferred: '',
			otherDeduction: ''
		})
	}
})

const emit = defineEmits(['update:modelValue', 'submit', 'back'])

// Two-way binding helper
const formData = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:modelValue', val)
})

const handleNext = () => {
	emit('submit')
}

const handleBack = () => {
	emit('back')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
