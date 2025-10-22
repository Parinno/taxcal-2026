<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({ salary: '', bonus: '', otherIncome: '', withholdingTax: '' })
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
        <h2 class="text-2xl font-bold text-gray-800 mb-8">รายได้ทั้งหมดของคุณ</h2>

        <!-- Form Fields -->
        <div class="space-y-6 mb-12">
            <!-- Salary Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    เงินเดือน (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">Description</p>
                <div class="relative">
                    <input type="number" v-model="formData.salary" placeholder="เงินเดือนของคุณ"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
            </div>

            <!-- Bonus Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    โบนัส (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">Description</p>
                <div class="relative">
                    <input type="number" v-model="formData.bonus" placeholder="ระบุโบนัส"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
            </div>

            <!-- Other Income Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    รายได้อื่นๆ (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">เช่น การขายของออนไลน์, รับจ้างฟรีแลนซ์</p>
                <div class="relative">
                    <input type="number" v-model="formData.otherIncome" placeholder="ระบุรายได้ทั้งปี"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
            </div>

            <!-- Withholding Tax Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    ภาษีหัก ณ ที่จ่าย (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">Description</p>
                <div class="relative">
                    <input type="number" v-model="formData.withholdingTax" placeholder="ระบุภาษีทั้งปี"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

