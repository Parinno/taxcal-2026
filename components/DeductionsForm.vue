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
              type="number"
              v-model="formData.personalDeduction"
              placeholder="60000"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-gray-50"
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
              type="number"
              v-model="formData.socialSecurity"
              placeholder="ระบุจำนวนเงิน"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-gray-50"
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
              type="number"
              v-model="formData.providentFund"
              placeholder="ระบุจำนวนเงิน"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-gray-50"
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
              type="number"
              v-model="formData.thaiESGX"
              placeholder="ระบุจำนวนเงิน"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-gray-50"
            />
          </div>
        </div>

        <!-- ThaiESGX Fund (Transferred from LTF) -->
        <div>
          <label class="block text-gray-800 font-medium mb-2">
            กองทุน ThaiESGX (Thai ESGX โอนจาก LTF)
          </label>
          <div class="relative">
            <input
              type="number"
              v-model="formData.thaiESGXTransferred"
              placeholder="ระบุจำนวนเงิน"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors bg-gray-50"
            />
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
      thaiESGXTransferred: ''
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
