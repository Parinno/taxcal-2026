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
                <label class="block text-gray-800 font-medium text-[15px]">
                    เงินเดือน (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-2 text-[15px]">ระบบจะคำนวณคูณ 12 เดือน เมื่อคำนวณภาษี</p>
                <div class="relative">
                    <input type="text" v-model="formData.salary" placeholder="กรอกจำนวนเงิน"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>

            <!-- Bonus Input -->
            <div>
                <label class="block text-gray-800 font-medium text-[15px]">
                    โบนัส (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-2 text-[15px]">รวมโบนัสทั้งหมดที่ได้รับในปี</p>
                <div class="relative">
                    <input type="text" v-model="formData.bonus" placeholder="กรอกจำนวนเงิน"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>

            <!-- Other Income Input -->
            <div>
                <label class="block text-gray-800 font-medium text-[15px]">
                    รายได้อื่นๆ (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-2 text-[15px]">เช่น การขายของออนไลน์, รับจ้างฟรีแลนซ์</p>
                <div class="relative">
                    <input type="text" v-model="formData.otherIncome" placeholder="กรอกรายได้ทั้งปี"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>

            <!-- Withholding Tax Input -->
            <div>
                <label class="block text-gray-800 font-medium text-[15px]">
                    ภาษีหัก ณ ที่จ่าย (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-2 text-[15px]">รายได้อื่นๆ นอกจากเงินเดือน และโบนัส หรือคุณสามารถกรอกรายได้รวมทั้งปีที่ตรงนี้ได้</p>
                <div class="relative">
                    <input type="text" v-model="formData.withholdingTax" placeholder="กรอกภาษีทั้งปี"
                        class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

