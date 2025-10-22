<template>
  <div class="max-w-6xl mx-auto">
    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Side - Tax Planning and Investment -->
      <div class="space-y-8">
        <!-- Tax Summary Section -->
        <div class="text-center mb-8">
          <div class="text-lg text-gray-700 mb-2">ภาษีที่ต้องจ่ายเพิ่ม</div>
          <div class="text-4xl font-bold text-gray-800">
            {{ formatCurrency(beforeTaxAmount - taxSavings) }}({{ formatCurrency(-taxSavings) }})
          </div>
        </div>

        <!-- Income Summary -->
        <div class="grid grid-cols-2 gap-8 mb-8">
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

        <!-- Tax Planning Header -->
        <div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">วางแผนลดหย่อนภาษี</h3>
          <p class="text-sm text-gray-600 mb-6">
            แสดงผลเปรียบเทียบภาษี 'ก่อน-หลัง' การซื้อกองทุนเพื่อประหยัดภาษีได้สูงสุด
          </p>
        </div>

        <!-- Tax Comparison Section -->
        <div class="bg-gray-100 rounded-lg p-6">
          <div class="text-lg font-bold text-gray-800 mb-4">จำนวนเงินภาษีที่ต้องจ่าย</div>
          
          <!-- Before Tax Planning -->
          <div class="flex justify-between items-center mb-3">
            <div>
              <div class="font-medium text-gray-800">ก่อนวางแผนภาษี</div>
              <div class="text-sm text-gray-600">(จ่ายภาษีเพิ่ม)</div>
            </div>
            <div class="text-xl font-bold text-gray-800">
              {{ formatCurrency(beforeTaxAmount) }}
            </div>
          </div>
          
          <!-- After Tax Planning -->
          <div class="flex justify-between items-center">
            <div>
              <div class="font-medium text-gray-800">หลังวางแผนภาษี</div>
              <div class="text-sm text-gray-600">(จ่ายภาษีเพิ่ม/คืนเงินภาษี)</div>
            </div>
            <div class="text-xl font-bold text-gray-800">
              {{ formatCurrency(afterTaxAmount) }}
            </div>
          </div>
        </div>

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
                <input 
                  type="text" 
                  v-model="rmfInvestmentFormatted"
                  @input="updateRmfInvestment"
                  class="w-32 px-3 py-2 bg-gray-100 rounded-lg text-right font-medium"
                />
              </div>
            </div>
            
            <!-- RMF Slider -->
            <div class="relative">
              <input 
                type="range" 
                v-model="rmfSliderValue"
                @input="updateRmfFromSlider"
                min="0" 
                :max="rmfMaxValue"
                step="1000"
                class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
              />
              <div class="absolute left-0 top-0 w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
            
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                <span class="text-white text-xs">i</span>
              </div>
              <span>ไม่เกิน 30% รายได้ทั้งปีสูงสุด 300,000 บาท และไม่รวมกับกองทุนกลุ่มเกษียณ</span>
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
                <input 
                  type="text" 
                  v-model="thaiEsgInvestmentFormatted"
                  @input="updateThaiEsgInvestment"
                  class="w-32 px-3 py-2 bg-gray-100 rounded-lg text-right font-medium"
                />
              </div>
            </div>
            
            <!-- ThaiESG Slider -->
            <div class="relative">
              <input 
                type="range" 
                v-model="thaiEsgSliderValue"
                @input="updateThaiEsgFromSlider"
                min="0" 
                :max="thaiEsgMaxValue"
                step="1000"
                class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
              />
              <div class="absolute left-0 top-0 w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
            
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                <span class="text-white text-xs">i</span>
              </div>
              <span>ไม่เกิน 30% รายได้ทั้งปีสูงสุด 300,000 บาท และไม่รวมกับกองทุนกลุ่มเกษียณ</span>
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
              {{ formatCurrency(calculationData.netTaxPayable || (calculationData.taxAmount - calculationData.withholdingTax)) }}
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
              {{ formatCurrency(totalInvestmentAmount) }}
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

const emit = defineEmits(['update:modelValue', 'back', 'recalculate'])

// Use the calculation data
const calculationData = computed(() => props.modelValue)

// Use tax calculator composable
const { 
  calculateTaxPlanning,
  getInvestmentLimits
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
const finalTaxAmount = computed(() => taxPlanning.value.finalNetTaxPayable)
const totalAdditionalInvestment = computed(() => taxPlanning.value.totalInvestment)
const totalInvestmentAmount = computed(() => taxPlanning.value.totalInvestment)
const totalInvestmentDisplay = computed(() => taxPlanning.value.totalInvestment)
const taxSavingsDisplay = computed(() => taxPlanning.value.taxSavings)
const finalTaxDisplay = computed(() => taxPlanning.value.finalNetTaxPayable)

// Additional calculations
const additionalTaxPayable = computed(() => {
  return Math.max(0, calculationData.value.taxAmount - withholdingTax.value)
})

// Format currency helper
const formatCurrency = (amount) => formatCurrencyTHB(amount)

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
  background: transparent;
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
