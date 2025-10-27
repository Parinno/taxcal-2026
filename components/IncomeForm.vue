<script setup>
import { computed, ref } from 'vue'

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
                <p class="text-sm text-gray-500 mb-2 text-[15px]">Description</p>
                <div class="relative">
                    <input type="text" v-model="formData.salary" placeholder="กรอกจำนวนเงิน" @input="handleInput"
                        :class="[
                            'flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 rounded-2xl outline-none text-xl leading-8 placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]',
                            errors.salary ? 'bg-white border-2 border-[#F73232] text-[#F73232]' : 'bg-[rgba(1,23,43,0.03)] border-2 border-transparent text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)]'
                        ]" />
                    <!-- Clear button -->
                    <button v-if="formData.salary" @click="formData.salary = ''" type="button"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-xmark text-white"></i>
                    </button>
                </div>
                <!-- Error message with icon -->
                <div v-if="errors.salary" class="flex items-center mt-2">
                    <div class="w-5 h-5 bg-[#F73232] rounded-full flex items-center justify-center mr-1 flex-shrink-0">
                        <i class="fa-solid fa-exclamation-circle text-white"></i>
                    </div>
                    <p class="text-[#F73232] text-sm">{{ errors.salary }}</p>
                </div>
            </div>

            <!-- Bonus Input -->
            <div>
                <label class="block text-gray-800 font-medium text-[15px]">
                    โบนัส (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-2 text-[15px]">Description</p>
                <div class="relative">
                    <input type="text" v-model="formData.bonus" placeholder="กรอกจำนวนเงิน" @input="handleInput" :class="[
                        'flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 rounded-2xl outline-none text-xl leading-8 placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]',
                        errors.bonus ? 'bg-white border-2 border-[#F73232] text-[#F73232]' : 'bg-[rgba(1,23,43,0.03)] border-2 border-transparent text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)]'
                    ]" />
                    <!-- Clear button -->
                    <button v-if="formData.bonus" @click="formData.bonus = ''" type="button"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-xmark text-white"></i>
                    </button>
                </div>
                <!-- Error message with icon -->
                <div v-if="errors.bonus" class="flex items-center mt-2">
                    <div class="w-5 h-5 bg-[#F73232] rounded-full flex items-center justify-center mr-1 flex-shrink-0">
                        <i class="fa-solid fa-exclamation-circle text-white"></i>
                    </div>
                    <p class="text-[#F73232] text-sm">{{ errors.bonus }}</p>
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
                        @input="handleInput" :class="[
                            'flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 rounded-2xl outline-none text-xl leading-8 placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]',
                            errors.otherIncome ? 'bg-white border-2 border-[#F73232] text-[#F73232]' : 'bg-[rgba(1,23,43,0.03)] border-2 border-transparent text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)]'
                        ]" />
                    <!-- Clear button -->
                    <button v-if="formData.otherIncome" @click="formData.otherIncome = ''" type="button"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-xmark text-white"></i>
                    </button>
                </div>
                <!-- Error message with icon -->
                <div v-if="errors.otherIncome" class="flex items-center mt-2">
                    <div class="w-5 h-5 bg-[#F73232] rounded-full flex items-center justify-center mr-1 flex-shrink-0">
                        <i class="fa-solid fa-exclamation-circle text-white"></i>
                    </div>
                    <p class="text-[#F73232] text-sm">{{ errors.otherIncome }}</p>
                </div>
            </div>

            <!-- Withholding Tax Input -->
            <div>
                <label class="block text-gray-800 font-medium text-[15px]">
                    ภาษีหัก ณ ที่จ่าย (บาท)
                </label>
                <p class="text-sm text-gray-500 mb-2 text-[15px]">Description</p>
                <div class="relative">
                    <input type="text" v-model="formData.withholdingTax" placeholder="กรอกภาษีทั้งปี"
                        @input="handleInput" :class="[
                            'flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 rounded-2xl outline-none text-xl leading-8 placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]',
                            errors.withholdingTax ? 'bg-white border-2 border-[#F73232] text-[#F73232]' : 'bg-[rgba(1,23,43,0.03)] border-2 border-transparent text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)]'
                        ]" />
                    <!-- Clear button -->
                    <button v-if="formData.withholdingTax" @click="formData.withholdingTax = ''" type="button"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-color-primary rounded-full flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-xmark text-white"></i>
                    </button>
                </div>
                <!-- Error message with icon -->
                <div v-if="errors.withholdingTax" class="flex items-center mt-2">
                    <div class="w-5 h-5 bg-[#F73232] rounded-full flex items-center justify-center mr-1 flex-shrink-0">
                        <i class="fa-solid fa-exclamation-circle text-white"></i>
                    </div>
                    <p class="text-[#F73232] text-sm">{{ errors.withholdingTax }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
