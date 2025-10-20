<template>
  <div class="max-w-2xl mx-auto">
    <!-- Section Title -->
    <h2 class="text-2xl font-bold text-gray-800 mb-8">
      รายการลดหย่อนภาษี : กองทุน เงินประกันสังคม และที่อยู่อาศัย
    </h2>

    <!-- Form Fields -->
    <div class="space-y-8 mb-12">
      <!-- Provident Fund (PVD) -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          ค่าลดหย่อนกองทุนสำรองเลี้ยงชีพ (PVD)
        </label>
        <div class="relative">
          <input
            type="number"
            v-model="formData.providentFund"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
        <p class="text-sm text-emerald-600 mt-2">
          ไม่เกิน 15% ของเงินเดือน (ไม่รวมเงินสมทบจากนายจ้าง) และไม่เกิน 500,000 บาท
        </p>
      </div>

      <!-- Social Security Fund -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          เงินประกันสังคม
        </label>
        <div class="relative">
          <input
            type="number"
            v-model="formData.socialSecurity"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
        <p class="text-sm text-emerald-600 mt-2">
          ไม่เกิน 9,000 บาท
        </p>
      </div>

      <!-- Housing Loan Interest -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          ดอกเบี้ยซื้อที่อยู่อาศัย
        </label>
        <div class="relative">
          <input
            type="number"
            v-model="formData.housingInterest"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
        <p class="text-sm text-emerald-600 mt-2">
          ไม่เกิน 100,000 บาท
        </p>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between">
      <!-- Back Button -->
      <button
        @click="handleBack"
        class="px-8 py-3 border-2 border-emerald-500 text-emerald-500 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
      >
        ย้อนกลับ
      </button>

      <!-- Next Button -->
      <button
        @click="handleNext"
        class="bg-gradient-to-r from-teal-500 to-emerald-400 text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        ถัดไป
      </button>
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
      providentFund: '',
      socialSecurity: '',
      housingInterest: ''
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
