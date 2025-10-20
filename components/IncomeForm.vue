<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({ salary: '', bonus: '', otherIncome: '' })
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

// Two-way binding helper
const formData = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleNext = () => {
  emit('submit')
}
</script>

<template>
    <div class="max-w-2xl mx-auto">
        <!-- Section Title -->
        <h2 class="text-2xl font-bold text-gray-800 mb-8">รายรับ</h2>

        <!-- Form Fields -->
        <div class="space-y-6 mb-12">
            <!-- Salary Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    เงินเดือน (บาท)
                </label>
                <div class="relative">
                    <input type="number" v-model="formData.salary" placeholder="เงินเดือนของคุณเดือนละ"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
            </div>

            <!-- Bonus Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    โบนัส (บาท)
                </label>
                <div class="relative">
                    <input type="number" v-model="formData.bonus" placeholder="ระบุโบนัสที่คุณได้รับในปี"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
            </div>

            <!-- Other Income Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    รายได้อื่นๆ เช่น การขายของออนไลน์, รับจ้างฟรีแลนซ์ (บาท)
                </label>
                <div class="relative">
                    <input type="number" v-model="formData.otherIncome" placeholder="ระบุรายได้ทั้งปี"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
            </div>
        </div>

        <!-- Next Button -->
        <div class="text-center">
            <button @click="handleNext"
                class="bg-gradient-to-r from-teal-500 to-emerald-400 text-white font-semibold py-4 px-12 rounded-lg hover:from-teal-600 hover:to-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
                ถัดไป
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>

