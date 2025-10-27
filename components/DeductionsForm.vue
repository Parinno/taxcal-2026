<template>
  <div class="max-w-2xl mx-auto">
    <!-- Form Fields -->
    <div class="space-y-8">
      <!-- Basic Deductions Section -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-6">
          ค่าลดหย่อนพื้นฐาน
        </h3>
        
        <!-- Personal Deduction -->
        <div>
          <label class="block text-gray-800 font-medium mb-2">
            ลดหย่อนส่วนบุคคล
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="formData.personalDeduction"
              placeholder="60000"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]"
            />
          </div>
          <p class="text-sm text-gray-500 mt-1">
            Description
          </p>
        </div>
      </div>

      <!-- Savings/Investment Deductions Section -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-6">
          ค่าลดหย่อนการออม/การลงทุน
        </h3>
        
        <!-- Social Security Fund -->
        <div class="mb-6">
          <label class="block text-gray-800 font-medium mb-2">
            เงินประกันสังคม
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="formData.socialSecurity"
              placeholder="ระบุจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]"
            />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center mr-2">
              <span class="text-white text-xs">i</span>
            </div>
            <p class="text-sm text-gray-600">
              ไม่เกิน 9,000 บาท
            </p>
          </div>
        </div>

        <!-- Provident Fund (PVD) -->
        <div class="mb-6">
          <label class="block text-gray-800 font-medium mb-2">
            ค่าลดหย่อนกองทุนสำรองเลี้ยงชีพ (PVD)
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="formData.providentFund"
              placeholder="ระบุจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]"
            />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center mr-2">
              <span class="text-white text-xs">i</span>
            </div>
            <p class="text-sm text-gray-600">
              ไม่เกิน 15% ของเงินเดือน (ไม่รวมเงินสมทบจากนายจ้าง)
            </p>
          </div>
        </div>

        <!-- ThaiESGX Fund -->
        <div class="mb-6">
          <label class="block text-gray-800 font-medium mb-2">
            กองทุน ThaiESGX
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="formData.thaiESGX"
              placeholder="ระบุจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]"
            />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center mr-2">
              <span class="text-white text-xs">i</span>
            </div>
            <p class="text-sm text-gray-600">
              ไม่เกิน 30% รายได้ทั้งปีสูงสุด 300,000 บาท
            </p>
          </div>
        </div>

        <!-- ThaiESGX Fund (Transferred from LTF) -->
        <div class="mb-6">
          <label class="block text-gray-800 font-medium mb-2">
            กองทุน ThaiESGX (Thai ESGX โอนจาก LTF)
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="formData.thaiESGXTransferred"
              placeholder="ระบุจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]"
            />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center mr-2">
              <span class="text-white text-xs">i</span>
            </div>
            <p class="text-sm text-gray-600">
              ไม่เกิน 30% รายได้ทั้งปีสูงสุด 300,000 บาท
            </p>
          </div>
        </div>

        <!-- Other Deductions -->
        <div>
          <label class="block text-gray-800 font-medium mb-2">
            ค่าลดหย่อนอื่นๆ
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="formData.otherDeduction"
              placeholder="ระบุจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]"
            />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center mr-2">
              <span class="text-white text-xs">i</span>
            </div>
            <p class="text-sm text-gray-600">
              เช่น ช้อปดีมีคืน ดอกเบี้ยบ้าน อุปการะบิดามารดา ค่าคลอดบุตร และอื่นๆ ที่สามารถหักได้ตามกฎหมาย
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
      personalDeduction: 60000,
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
