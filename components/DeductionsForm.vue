<template>
  <div class="max-w-2xl mx-auto">
    <!-- Form Fields -->
    <!-- Basic Deductions Section -->
    <div>
      <h2 class="font-bold text-color-primary mb-[16px] text-[20px]"> ค่าลดหย่อนพื้นฐาน</h2>

      <!-- Personal Deduction -->
      <div class="space-y-4 mb-[20px]">
        <div>
          <label class="block text-gray-800 font-medium text-[15px]">
            ลดหย่อนส่วนบุคคล
          </label>
          <p class="text-sm text-gray-500 mb-2 text-[15px]">Description</p>
          <div class="relative">
            <input type="text" v-model="formData.personalDeduction" placeholder="กรอกจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
          </div>
        </div>
      </div>
    </div>

    <!-- Savings/Investment Deductions Section -->
    <div class="space-y-4 pt-[16px] mb-[20px]">
      <h2 class="font-bold text-color-primary mb-[16px] text-[20px]">ค่าลดหย่อนการออม/การลงทุน</h2>

      <div class="space-y-6 mb-[20px]">
        <!-- Social Security Fund -->
        <div class="mb-6">
          <label class="block text-gray-800 font-medium text-[15px]">
            เงินประกันสังคม
          </label>
          <div class="relative">
            <input type="text" v-model="formData.socialSecurity" placeholder="กรอกจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
              <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
            </div>
            <p class="text-[15px] text-color-secondary">
              ไม่เกิน 9,000 บาท
            </p>
          </div>
        </div>

        <!-- Provident Fund (PVD) -->
        <div>
          <label class="block text-gray-800 font-medium text-[15px]">
            ค่าลดหย่อนกองทุนสำรองเลี้ยงชีพ (PVD)
          </label>
          <div class="relative">
            <input type="text" v-model="formData.providentFund" placeholder="กรอกจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
              <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
            </div>
            <p class="text-[15px] text-color-secondary">
              ไม่เกิน 15% ของเงินเดือน (ไม่รวมเงินสมทบจากนายจ้าง)
            </p>
          </div>
        </div>

        <!-- ThaiESGX Fund -->
        <div>
          <label class="block text-gray-800 font-medium text-[15px]">
            กองทุน ThaiESGX
          </label>
          <div class="relative">
            <input type="text" v-model="formData.thaiESGX" placeholder="กรอกจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
          </div>
        </div>

        <!-- ThaiESGX Fund (Transferred from LTF) -->
        <div class="mb-6">
          <label class="block text-gray-800 font-medium mb-2">
            กองทุน ThaiESGX (Thai ESGX โอนจาก LTF)
          </label>
          <p class="text-sm text-gray-500 mb-2 text-[15px]">(Thai ESGX โอนจาก LTF)</p>
          <div class="relative">
            <input type="text" v-model="formData.thaiESGXTransferred" placeholder="กรอกจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
          </div>
        </div>

        <!-- Other Deductions -->
        <div>
          <label class="block text-gray-800 font-medium mb-2">
            ค่าลดหย่อนอื่นๆ
          </label>
          <div class="relative">
            <input type="text" v-model="formData.otherDeduction" placeholder="ระบุจำนวนเงิน"
              class="flex flex-row items-center px-4 py-2 gap-2 w-[616px] h-14 bg-[rgba(1,23,43,0.03)] rounded-2xl border-none outline-none font-medium text-xl leading-8 text-[rgba(1,23,43,0.35)] placeholder:text-[rgba(1,23,43,0.35)] placeholder:font-medium placeholder:text-xl placeholder:leading-8 focus:bg-[rgba(1,23,43,0.05)] focus:text-[rgba(1,23,43,0.8)]" />
          </div>
          <div class="flex items-center mt-2">
            <div class="w-4 h-4 rounded-full flex items-center justify-center mr-1">
              <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
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
