<template>
  <div class="max-w-2xl mx-auto">
    <!-- Section Title -->
    <h2 class="text-2xl font-bold text-gray-800 mb-8">
      รายการลดหย่อนภาษี : กองทุนอื่นๆ
    </h2>

    <!-- Form Fields -->
    <div class="space-y-8 mb-12">
      <!-- Government Pension Fund (กบข.) -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          กองทุนบำเหน็จบำนาญข้าราชการ (กบข.)
        </label>
        <div class="relative">
          <input
            type="number"
            v-model="formData.governmentPensionFund"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
        <p class="text-sm text-emerald-600 mt-2">
          ไม่เกิน 15% ของรายได้ทั้งปี และรวมกับกองทุนอื่นไม่เกิน 500,000 บาท
        </p>
      </div>

      <!-- National Savings Fund (กอช.) -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          กองทุนออมแห่งชาติ (กอช.)
        </label>
        <div class="relative">
          <input
            type="number"
            v-model="formData.nationalSavingsFund"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
        <p class="text-sm text-emerald-600 mt-2">
          ไม่เกิน 13,200 บาท และรวมกับกองทุนอื่นและเบี้ยประกันชีวิตแบบบำนาญแล้ว ไม่เกิน 500,000 บาท
        </p>
      </div>

      <!-- Private School Teachers' Provident Fund -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          กองทุนครูเอกชน
        </label>
        <div class="relative">
          <input
            type="number"
            v-model="formData.privateTeachersFund"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
        <p class="text-sm text-emerald-600 mt-2">
          ไม่เกิน 15% ของรายได้ทั้งปี และรวมกับกองทุนอื่นและเบี้ยประกันชีวิตแบบบำนาญแล้ว ไม่เกิน 500,000 บาท
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

      <!-- Calculate Tax Button -->
      <button
        @click="handleNext"
        class="bg-gradient-to-r from-teal-500 to-emerald-400 text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        คำนวณภาษี
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
      governmentPensionFund: '',
      nationalSavingsFund: '',
      privateTeachersFund: ''
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
