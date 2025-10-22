<template>
  <div class="max-w-6xl mx-auto">
    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Side - Tax Calculation and Planning -->
      <div class="space-y-8">
        <!-- Tax Calculation Section -->
        <div>
          <h3 class="text-2xl font-bold text-gray-800 mb-6">คำนวณภาษี</h3>
          
          <!-- Tax Payable -->
          <div class="text-center mb-8">
            <div class="text-lg text-gray-700 mb-2">ภาษีที่ต้องจ่ายเพิ่ม</div>
            <div class="text-4xl font-bold text-gray-800">
              {{ formatCurrency(additionalTaxPayable) }}({{ formatCurrency(taxReduction) }})
            </div>
          </div>

          <!-- Income Summary -->
          <div class="grid grid-cols-2 gap-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 mb-2">รายได้ทั้งปี</div>
              <div class="text-2xl font-bold text-gray-800">
                {{ formatCurrency(calculationData.totalIncome) }}
              </div>
            </div>
            <div class="text-center">
              <div class="text-sm text-gray-600 mb-2">รายได้สุทธิ</div>
              <div class="text-2xl font-bold text-gray-800">
                {{ formatCurrency(calculationData.taxableIncome) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Tax Planning Section -->
        <div>
          <h3 class="text-2xl font-bold text-gray-800 mb-6">วางแผนลดหย่อนภาษี</h3>
          
          <!-- Empty gray area -->
          <div class="bg-gray-200 h-40 rounded-lg mb-6"></div>
          
          <!-- Investment Options -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-800">RMF</span>
              <span class="text-2xl font-bold text-gray-800">+{{ formatCurrency(rmfInvestment) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-800">Thai ESG</span>
              <span class="text-2xl font-bold text-gray-800">+{{ formatCurrency(thaiEsgInvestment) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Tax Year Summary and Planning -->
      <div class="space-y-6">
        <!-- Tax Year Summary Card -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6">สรุปปีภาษี 2568</h3>
          
          <!-- Tax Payable -->
          <div class="text-center mb-6">
            <div class="text-lg text-gray-700 mb-2">ภาษีที่ต้องจ่าย</div>
            <div class="text-3xl font-bold text-red-600">
              {{ formatCurrency(finalTaxAmount) }}
              <span class="text-lg text-gray-500">THB</span>
            </div>
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">เงินได้</span>
              <span class="font-semibold">{{ formatCurrency(calculationData.totalIncome) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">หักค่าใช้จ่าย</span>
              <span class="font-semibold">{{ formatCurrency(expenses) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">ค่าลดหย่อน</span>
              <span class="font-semibold">{{ formatCurrency(totalDeductions) }}</span>
              <span class="text-xs text-gray-500">(ไม่รวม RMF, ThaiESGX)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">เงินได้สุทธิ</span>
              <span class="font-semibold">{{ formatCurrency(calculationData.taxableIncome) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">ค่าภาษี</span>
              <span class="font-semibold">{{ formatCurrency(calculationData.taxAmount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">ภาษีหัก ณ ที่จ่าย</span>
              <span class="font-semibold">{{ formatCurrency(withholdingTax) }}</span>
            </div>
          </div>
        </div>

        <!-- Tax Planning Card -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6">วางแผนลดหย่อนภาษี</h3>
          
          <!-- Additional Investment -->
          <div class="text-center mb-6">
            <div class="text-lg text-gray-700 mb-2">เงินลงทุนเพิ่ม</div>
            <div class="text-3xl font-bold text-emerald-600">
              {{ formatCurrency(totalAdditionalInvestment) }}
              <span class="text-lg text-gray-500">THB</span>
            </div>
          </div>

          <!-- Tax Savings -->
          <div class="text-center mb-6">
            <div class="text-lg text-gray-700 mb-2">ประหยัดภาษีเพิ่มขึ้น</div>
            <div class="text-3xl font-bold text-emerald-600">
              {{ formatCurrency(taxSavings) }}
            </div>
          </div>

          <!-- Investment Breakdown -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">RMF</span>
              <span class="font-semibold">{{ formatCurrency(rmfInvestment) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Thai ESG</span>
              <span class="font-semibold">{{ formatCurrency(thaiEsgInvestment) }}</span>
            </div>
          </div>

          <!-- Action Button -->
          <button class="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center">
            <span>ดูกองทุนประหยัดภาษี</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatCurrencyTHB } from '~/utils/format'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      totalIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      taxAmount: 0
    })
  }
})

const emit = defineEmits(['update:modelValue', 'back', 'recalculate'])

// Use the calculation data
const calculationData = computed(() => props.modelValue)

// Investment amounts (these would typically come from form inputs)
const rmfInvestment = ref(200000)
const thaiEsgInvestment = ref(10000)

// Additional calculations
const expenses = computed(() => 100000) // Example value
const withholdingTax = computed(() => 10000) // Example value
const totalDeductions = computed(() => 200000) // Example value

// Total additional investment
const totalAdditionalInvestment = computed(() => {
  return rmfInvestment.value + thaiEsgInvestment.value
})

// Tax savings calculation (simplified)
const taxSavings = computed(() => {
  return 15000 // Fixed value as shown in image
})

// Additional tax payable (after deductions)
const additionalTaxPayable = computed(() => {
  return 21000 // Fixed value as shown in image
})

// Tax reduction amount
const taxReduction = computed(() => {
  return -5000 // Fixed value as shown in image (negative value)
})

// Final tax amount
const finalTaxAmount = computed(() => {
  return 26000 // Fixed value as shown in image
})

// Format currency helper
const formatCurrency = (amount) => formatCurrencyTHB(amount)

const handleBack = () => {
  emit('back')
}

const handleRecalculate = () => {
  emit('recalculate')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
