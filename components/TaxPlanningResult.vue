<template>
  <div class="max-w-4xl mx-auto">
    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Tax Summary Section -->
      <!-- <div class="text-center mb-8">
          <div class="text-lg text-gray-700 mb-2">ภาษีที่ต้องจ่ายเพิ่ม</div>
          <div class="text-4xl font-bold text-gray-800">
            {{ formatCurrency(beforeTaxAmount - taxSavings) }}({{ formatCurrency(-taxSavings) }})
          </div>
        </div> -->

      <!-- Income Summary -->
      <!-- <div class="grid grid-cols-2 gap-8 mb-8">
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
        </div> -->

      <!-- Tax Summary Card -->
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <div class="text-left mb-4">
          <div class="text-lg font-bold text-gray-800 mb-2">
            {{ (beforeTaxAmount - taxSavings) >= 0 ? 'ภาษีที่ต้องจ่ายเพิ่ม' : 'ภาษีที่ได้รับคืน' }}
          </div>
          <div class="flex items-center gap-2">
            <div class="text-4xl font-bold mb-2"
              :class="(beforeTaxAmount - taxSavings) >= 0 ? 'text-red-600' : 'text-green-600'">
              {{ formatCurrencyWithDecimals(Math.abs(beforeTaxAmount - taxSavings)) }}
            </div>
            <div class="text-sm text-gray-600">THB</div>
          </div>
          <div class="text-sm text-gray-600">
            วางแผนภาษีเพื่อเงินคืนสูงสุด {{ formatCurrency(maxTaxSavings) }} THB
          </div>
        </div>

        <!-- <div class="border-t border-gray-300 pt-4">
            <div class="flex justify-between items-center mb-2">
              <div class="text-sm text-gray-600">รายได้ทั้งปี</div>
              <div class="text-sm font-medium text-gray-800">{{ formatCurrency(calculationData.totalIncome) }}</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-600">รายได้สุทธิ</div>
              <div class="text-sm font-medium text-gray-800">{{ formatCurrency(calculationData.taxableIncome) }}</div>
            </div>
          </div> -->
      </div>

      <!-- Tax Planning Header -->
      <div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">วางแผนลดหย่อนภาษี</h3>
        <!-- <p class="text-sm text-gray-600 mb-6">
            แสดงผลเปรียบเทียบภาษี 'ก่อน-หลัง' การซื้อกองทุนเพื่อประหยัดภาษีได้สูงสุด
          </p> -->
      </div>

      <!-- Tax Comparison Section -->
      <!-- <div class="bg-gray-100 rounded-lg p-6">
          <div class="text-lg font-bold text-gray-800 mb-4">จำนวนเงินภาษีที่ต้องจ่าย</div> -->

      <!-- Before Tax Planning -->
      <!-- <div class="flex justify-between items-center mb-3">
            <div>
              <div class="font-medium text-gray-800">ก่อนวางแผนภาษี</div>
              <div class="text-sm text-gray-600">(จ่ายภาษีเพิ่ม)</div>
            </div>
            <div class="text-xl font-bold text-gray-800">
              {{ formatCurrency(beforeTaxAmount) }}
            </div>
          </div> -->

      <!-- After Tax Planning -->
      <!-- <div class="flex justify-between items-center">
            <div>
              <div class="font-medium text-gray-800">หลังวางแผนภาษี</div>
              <div class="text-sm text-gray-600">(จ่ายภาษีเพิ่ม/คืนเงินภาษี)</div>
            </div>
            <div class="text-xl font-bold text-gray-800">
              {{ formatCurrency(afterTaxAmount) }}
            </div>
          </div>
        </div> -->

      <!-- Investment Planning Section -->
      <div class="space-y-6">
        <!-- RMF Investment -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 bg-purple-500 rounded-full"></div>
            <div>
              <div class="font-medium text-gray-800">RMF</div>
              <div class="text-sm text-gray-500">Description</div>
            </div>
            <div class="ml-auto">
              <input type="text" v-model="rmfInvestmentFormatted" @input="updateRmfInvestment"
                class="w-32 px-3 py-2 bg-gray-100 rounded-lg text-right font-medium" />
            </div>
          </div>

          <!-- RMF Slider -->
          <div class="relative">
            <input type="range" v-model="rmfSliderValue" @input="updateRmfFromSlider" min="0" :max="rmfMaxValue"
              step="1000" class="w-full h-2 bg-gray-300 appearance-none cursor-pointer slider" />
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600">
            <div class="w-4 h-4 rounded-full flex items-center justify-center">
              <i class="fa fa-info-circle" style="color: #01172BA6;"></i> 
            </div>
            <span>ไม่เกิน 30% รายได้ทั้งปีสูงสุด 500,000 บาท และไม่รวมกับกองทุนกลุ่มเกษียณ</span>
          </div>
        </div>

        <!-- ThaiESG Investment -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 bg-green-500 rounded-full"></div>
            <div>
              <div class="font-medium text-gray-800">ThaiESG</div>
              <div class="text-sm text-gray-500">Description</div>
            </div>
            <div class="ml-auto">
              <input type="text" v-model="thaiEsgInvestmentFormatted" @input="updateThaiEsgInvestment"
                class="w-32 px-3 py-2 bg-gray-100 rounded-lg text-right font-medium" />
            </div>
          </div>

          <!-- ThaiESG Slider -->
          <div class="relative">
            <input type="range" v-model="thaiEsgSliderValue" @input="updateThaiEsgFromSlider" min="0"
              :max="thaiEsgMaxValue" step="1000" class="w-full h-2 bg-gray-200 appearance-none cursor-pointer slider" />
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600">
            <div class="w-4 h-4 rounded-full flex items-center justify-center">
              <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
            </div>
            <span>ไม่เกิน 30% รายได้ทั้งปีสูงสุด 300,000 บาท และไม่รวมกับกองทุนกลุ่มเกษียณ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { formatCurrencyTHB } from '~/utils/format'
import { useTaxCalculator } from '~/composables/useTaxCalculator'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      totalIncome: 0,
      totalExpenses: 0,
      totalDeductions: 0,
      totalDeductionsAndExpenses: 0,
      taxableIncome: 0,
      taxAmount: 0,
      withholdingTax: 0,
      netTaxPayable: 0
    })
  }
})

const emit = defineEmits(['update:modelValue', 'back', 'recalculate', 'update:rmfInvestment', 'update:thaiEsgInvestment'])

// Use the calculation data
const calculationData = computed(() => props.modelValue)

// Use tax calculator composable
const { 
  calculateTaxPlanning,
  getInvestmentLimits,
  computeMaxTaxSavingsFromInvestments
} = useTaxCalculator()

// Investment amounts (these would typically come from form inputs)
const rmfInvestment = ref(0)
const thaiEsgInvestment = ref(0)

// Slider values
const rmfSliderValue = ref(0)
const thaiEsgSliderValue = ref(0)

// Formatted input values
const rmfInvestmentFormatted = ref('0 ฿')
const thaiEsgInvestmentFormatted = ref('0 ฿')

// Max values for sliders using investment limits
const investmentLimits = computed(() => 
  getInvestmentLimits(calculationData.value.totalIncome)
)

const rmfMaxValue = computed(() => investmentLimits.value.rmfMax)
const thaiEsgMaxValue = computed(() => investmentLimits.value.thaiEsgMax)

// Additional calculations - use actual data from calculation
const expenses = computed(() => calculationData.value.totalExpenses || 0)
const withholdingTax = computed(() => calculationData.value.withholdingTax || 0)
const totalDeductions = computed(() => calculationData.value.totalDeductions || 0)

// Tax planning calculations using useTaxCalculator
const taxPlanning = computed(() => 
  calculateTaxPlanning(
    calculationData.value,
    Number(rmfInvestment.value) || 0,
    Number(thaiEsgInvestment.value) || 0
  )
)

// Extract values from tax planning calculation
const beforeTaxAmount = computed(() => taxPlanning.value.beforeTaxAmount)
const afterTaxAmount = computed(() => taxPlanning.value.afterTaxAmount)
const taxSavings = computed(() => taxPlanning.value.taxSavings)
const taxReduction = computed(() => taxPlanning.value.taxReduction)

// Calculate maximum possible tax savings
const maxTaxSavings = computed(() => 
  computeMaxTaxSavingsFromInvestments(
    calculationData.value.totalIncome,
    calculationData.value.taxableIncome,
    calculationData.value.taxAmount
  )
)

// Emit investment data changes to parent

// Watch for changes and emit to parent
watch(rmfInvestment, (newValue) => {
  emit('update:rmfInvestment', newValue)
}, { immediate: true })

watch(thaiEsgInvestment, (newValue) => {
  emit('update:thaiEsgInvestment', newValue)
}, { immediate: true })

// Format currency helper
const formatCurrency = (amount) => formatCurrencyTHB(amount)
const formatCurrencyWithDecimals = (amount) => formatCurrencyTHBWithDecimals(amount)

// Slider and input methods - ensure proper number conversion
const updateRmfFromSlider = () => {
  rmfInvestment.value = Number(rmfSliderValue.value) || 0
  rmfInvestmentFormatted.value = formatCurrencyTHB(rmfInvestment.value) + ' ฿'
}

const updateThaiEsgFromSlider = () => {
  thaiEsgInvestment.value = Number(thaiEsgSliderValue.value) || 0
  thaiEsgInvestmentFormatted.value = formatCurrencyTHB(thaiEsgInvestment.value) + ' ฿'
}

const updateRmfInvestment = (event) => {
  const value = event.target.value.replace(/[^\d]/g, '')
  const numValue = Number(value) || 0
  rmfInvestment.value = Math.min(numValue, rmfMaxValue.value)
  rmfSliderValue.value = rmfInvestment.value
  rmfInvestmentFormatted.value = formatCurrencyTHB(rmfInvestment.value) + ' ฿'
}

const updateThaiEsgInvestment = (event) => {
  const value = event.target.value.replace(/[^\d]/g, '')
  const numValue = Number(value) || 0
  thaiEsgInvestment.value = Math.min(numValue, thaiEsgMaxValue.value)
  thaiEsgSliderValue.value = thaiEsgInvestment.value
  thaiEsgInvestmentFormatted.value = formatCurrencyTHB(thaiEsgInvestment.value) + ' ฿'
}

const handleBack = () => {
  emit('back')
}

const handleRecalculate = () => {
  emit('recalculate')
}
</script>

<style scoped>
/* Slider styling */
.slider {
  -webkit-appearance: none;
  appearance: none;
  background: #D1D5DB;
  cursor: pointer;
}

.slider::-webkit-slider-track {
  background: #D1D5DB;
  height: 8px;
  border-radius: 4px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #374151;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-webkit-slider-thumb:hover {
  background: #1F2937;
}

.slider::-moz-range-track {
  background: #D1D5DB;
  height: 8px;
  border-radius: 4px;
  border: none;
}

.slider::-moz-range-thumb {
  background: #374151;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-thumb:hover {
  background: #1F2937;
}
</style>
