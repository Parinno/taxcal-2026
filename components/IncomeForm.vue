<script setup>
import { computed } from 'vue'

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
        <h2 class="font-bold text-color-primary mb-[16px] text-[20px]">รายได้ทั้งหมดของคุณ</h2>

        <!-- Form Fields -->
        <div class="space-y-6 mb-[20px]">
            <!-- Salary Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    เงินเดือน (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">Description</p>
                <div class="relative">
                    <input type="text" v-model="formData.salary" placeholder="เงินเดือนของคุณ"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>

            <!-- Bonus Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    โบนัส (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">Description</p>
                <div class="relative">
                    <input type="text" v-model="formData.bonus" placeholder="ระบุโบนัส"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>

            <!-- Other Income Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    รายได้อื่นๆ (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">เช่น การขายของออนไลน์, รับจ้างฟรีแลนซ์</p>
                <div class="relative">
                    <input type="text" v-model="formData.otherIncome" placeholder="ระบุรายได้ทั้งปี"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>

            <!-- Withholding Tax Input -->
            <div>
                <label class="block text-gray-800 font-medium mb-2">
                    ภาษีหัก ณ ที่จ่าย (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-3">Description</p>
                <div class="relative">
                    <input type="text" v-model="formData.withholdingTax" placeholder="ระบุภาษีทั้งปี"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

