<template>
  <div class="max-w-2xl mx-auto">
    <!-- Section Title -->
    <h2 class="text-2xl font-bold text-gray-800 mb-8">
      รายการลดหย่อนภาษี : ครอบครัว
    </h2>

    <!-- Form Fields -->
    <div class="space-y-8 mb-12">
      <!-- Marital Status -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          สถานะสมรส
        </label>
        <div class="flex items-center space-x-4">
          <select v-model="formData.maritalStatus"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors">
            <option value="">กรุณาเลือกสถานะ</option>
            <option value="single">โสด</option>
            <option value="divorced">หย่า</option>
            <option value="married_separate">คู่สมรสมีเงินได้(แยกยื่น)</option>
            <option value="married_joint">คู่สมรสไม่มีเงินได้</option>
          </select>
        </div>
      </div>

      <!-- Personal Deduction -->
      <div>
        <label class="block text-gray-800 font-medium mb-2">
          ลดหย่อนส่วนบุคคล
        </label>
        <div class="relative">
          <input type="number" v-model="formData.personalDeduction" placeholder="60000"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
        </div>
      </div>

      <!-- Additional fields only show when marital status is selected -->
      <template v-if="formData.maritalStatus">
        <!-- Spouse Income Status (for married) -->
        <div v-if="formData.maritalStatus === 'married_separate' || formData.maritalStatus === 'married_joint'">
          <label class="block text-gray-800 font-medium mb-2">
            สถานะคู่สมรส
          </label>
          <div class="flex items-center space-x-4">
            <input type="text" v-model="formData.spouseIncomeStatus" placeholder="คู่สมรสไม่มีเงินได้"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
            <input type="checkbox" v-model="formData.spouseNoIncome"
              class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
          </div>
          <p class="text-sm text-emerald-600 mt-2">
            ลดหย่อนคู่สมรสไม่มีรายได้ 60,000 บาท
          </p>
        </div>

        <!-- Parental Deduction (Self) -->
        <div>
          <label class="block text-gray-800 font-medium mb-2">
            ลดหย่อนบิดา-มารดา (ตนเอง)
          </label>
          <div class="flex space-x-6">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.parentsSelf.father"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">บิดา</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.parentsSelf.mother"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">มารดา</span>
            </label>
          </div>
        </div>

        <!-- Parental Deduction (Spouse) - only for married -->
        <div v-if="formData.maritalStatus === 'married_separate' || formData.maritalStatus === 'married_joint'">
          <label class="block text-gray-800 font-medium mb-2">
            ลดหย่อนบิดา-มารดา (คู่สมรส)
          </label>
          <div class="flex space-x-6">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.parentsSpouse.father"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">บิดา</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.parentsSpouse.mother"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">มารดา</span>
            </label>
          </div>
        </div>

        <!-- Parental Deduction Info -->
        <div class="bg-emerald-50 p-4 rounded-lg">
          <p class="text-sm text-emerald-600">
            คนละ 30,000 บาท (บิดามารดาต้องมีอายุเกิน 60 ปี และมีเงินได้ไม่เกิน 30,000 บาทต่อปี) (ได้ทั้งบิดา
            มารดาของตนเอง และคู่สมรส)
          </p>
        </div>

        <!-- Child Deduction - not for single status -->
        <div v-if="formData.maritalStatus !== 'single'">
          <label class="block text-gray-800 font-medium mb-2">
            บุตรคนที่ 1 (เกิดปีใดก็ตาม)
          </label>
          <div class="flex space-x-6">
            <label class="flex items-center space-x-2">
              <input type="radio" v-model="formData.hasChild" :value="true"
                class="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
              <span class="text-gray-700">มี</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="radio" v-model="formData.hasChild" :value="false"
                class="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
              <span class="text-gray-700">ไม่มี</span>
            </label>
          </div>
          <p class="text-sm text-emerald-600 mt-2">
            ลดหย่อน 30,000 บาท
          </p>
        </div>

        <!-- Disabled/Incapacitated Deduction (No Income) -->
        <div>
          <label class="block text-gray-800 font-medium mb-2">
            ลดหย่อนผู้พิการหรือทุพพลภาพ (ไม่มีเงินได้)
          </label>
          <div class="flex space-x-6">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.disabledNoIncome.father"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">บิดา</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.disabledNoIncome.mother"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">มารดา</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.disabledNoIncome.relative"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">ญาติ (เช่น พี่,น้อง ฯลฯ)</span>
            </label>
          </div>
        </div>

        <!-- Disabled/Incapacitated Deduction (Spouse No Income) - only for married -->
        <div v-if="formData.maritalStatus === 'married_separate' || formData.maritalStatus === 'married_joint'">
          <label class="block text-gray-800 font-medium mb-2">
            ลดหย่อนผู้พิการหรือทุพพลภาพ (คู่สมรสไม่มีเงินได้)
          </label>
          <div class="flex space-x-6">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.disabledSpouseNoIncome.spouse"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">คู่สมรส</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.disabledSpouseNoIncome.father"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">บิดา</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.disabledSpouseNoIncome.mother"
                class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <span class="text-gray-700">มารดา</span>
            </label>
          </div>
        </div>

        <!-- Disabled Deduction Info -->
        <div class="bg-emerald-50 p-4 rounded-lg">
          <p class="text-sm text-emerald-600">
            กรณีบิดา, มารดา, คู่สมรส, บิดาคู่สมรส, มารดาคู่สมรส และบุตรของตนเอง หากเป็นผู้อื่นได้เพียง 1 คนเท่านั้น
            ลดหย่อนได้คนละ 60,000 บาท (ต้องมีบัตรประจำตัวคนพิการ และไม่มีรายได้)
          </p>
        </div>
      </template>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between">
      <!-- Back Button -->
      <button @click="handleBack"
        class="px-8 py-3 border-2 border-emerald-500 text-emerald-500 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
        ย้อนกลับ
      </button>

      <!-- Next Button -->
      <button @click="handleNext"
        class="bg-gradient-to-r from-teal-500 to-emerald-400 text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
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
      maritalStatus: '',
      spouseIncomeStatus: '',
      spouseNoIncome: false,
      personalDeduction: 60000,
      parentsSelf: {
        father: false,
        mother: false
      },
      parentsSpouse: {
        father: false,
        mother: false
      },
      hasChild: false,
      disabledNoIncome: {
        father: false,
        mother: false,
        relative: false
      },
      disabledSpouseNoIncome: {
        spouse: false,
        father: false,
        mother: false
      }
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
