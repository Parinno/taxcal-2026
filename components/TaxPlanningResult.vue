<template>
  <div class="max-w-4xl mx-auto" data-test-id="tax-calculator__tax-planning-result--container">
    <!-- Main Content -->
    <div class="space-y-8">

      <!-- Tax Planning Header -->
       <div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2" data-test-id="tax-calculator__tax-planning-result--planning-title">คำนวณและวางแผนภาษี</h3>
      </div>

      <!-- Tax Summary Card -->
      <div class="bg-gray-100 rounded-2xl px-6 pt-6 pb-2 mb-8" data-test-id="tax-calculator__tax-planning-result--tax-summary-card">
        <div class="text-left mb-4">
          <div class="text-lg font-bold text-gray-800 mb-2" data-test-id="tax-calculator__tax-planning-result--tax-summary-title">
            {{ (beforeTaxAmount - taxSavings) >= 0 ? 'ภาษีที่ต้องจ่ายเพิ่ม' : 'ภาษีที่ได้รับคืน' }}
          </div>
          <div class="flex items-center gap-2">
            <div class="text-4xl font-bold mb-2"
              :class="(beforeTaxAmount - taxSavings) >= 0 ? '' : 'text-green-600'"
              data-test-id="tax-calculator__tax-planning-result--tax-amount">
              {{ formatCurrencyWithDecimals(Math.abs(beforeTaxAmount - taxSavings)) }}
            </div>
            <div class="text-md text-gray-500 font-semibold" data-test-id="tax-calculator__tax-planning-result--tax-currency">THB</div>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span class="text-sm text-gray-500">อัตราภาษีสูงสุด</span>
            <span class="font-semibold px-2 py-1 rounded-full" :style="taxPlanningResult.afterTaxRate > 0 ? 'background-color: #00E76B;' : 'background-color: #D3DFE5;'">{{ taxPlanningResult.afterTaxRate }}%</span>
          </div>
          <div v-if="taxPlanningResult.beforeTaxRate > 0">
            <div class="text-sm border-t border-gray-300 pt-4 mt-4">
              วางแผนกองทุน RMF, ThaiESG เพื่อประหยัดภาษีเพิ่มขึ้นสูงสุด {{ formatCurrency(maxTaxSavings) }} บาท พร้อมเปรียบเทียบผลต่างทางภาษีก่อนและหลังการลงทุน
            </div>
            <div class="flex justify-between items-center bg-gray-50 rounded-2xl p-4 mt-4">
              <div class="text-sm text-gray-600 flex flex-col items-center w-1/2">
                <div class="text-sm text-gray-500 font-bold">ก่อน</div>
                <div class="text-sm text-gray-500">{{ (beforeTaxAmount >= 0 ? 'จ่ายภาษีเพิ่ม' : 'ได้รับคืนภาษี') }}</div>
                <div class="text-sm" :class="beforeTaxAmount >= 0 ? '' : 'text-green-600'">{{ formatCurrencyWithDecimals(Math.abs(beforeTaxAmount)) }}</div>
                <div class="text-sm text-gray-500">
                  อัตราภาษีสูงสุด
                  <span class="font-bold text-gray-800">{{ taxPlanningResult.beforeTaxRate }}%</span>
                </div>
              </div>
              <div class="text-sm text-gray-600 flex flex-col items-center">
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div class="text-sm text-gray-600 flex flex-col items-center w-1/2">
                <div class="text-sm text-green-600 font-bold">หลัง</div>
                <div class="text-sm text-gray-500">{{ (beforeTaxAmount - taxSavings >= 0 ? 'จ่ายภาษีเพิ่ม' : 'เงินคืนภาษี') }}</div>
                <div class="text-sm" :class="beforeTaxAmount - taxSavings >= 0 ? '' : 'text-green-600'">{{ formatCurrencyWithDecimals(Math.abs(beforeTaxAmount - taxSavings)) }}</div>
                <div class="text-sm text-gray-500">
                  อัตราภาษีสูงสุด
                  <span class="font-bold text-gray-800">{{ taxPlanningResult.afterTaxRate }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex items-center gap-2 text-sm text-gray-600 border-t border-gray-300 pt-4 mt-4">
              <div class="w-4 h-4 rounded-full flex items-center justify-center">
                <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
              </div>
              <span class="text-sm text-gray-500">ยังไม่อยู่ในเกณฑ์ที่ต้องเสียภาษี</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Investment Planning Section -->
      <div v-if="taxPlanningResult.beforeTaxRate > 0" class="space-y-6" data-test-id="tax-calculator__tax-planning-result--investment-planning">
        <!-- RMF Investment -->
        <div class="space-y-3" data-test-id="tax-calculator__tax-planning-result--rmf-investment">
          <div class="flex items-center gap-3">
            <div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-purple-500 rounded-full" data-test-id="tax-calculator__tax-planning-result--rmf-indicator"></div>
                <div class="font-medium text-gray-800" data-test-id="tax-calculator__tax-planning-result--rmf-title">RMF</div>
              </div>
              <div class="text-sm text-gray-500" data-test-id="tax-calculator__tax-planning-result--rmf-description">Description</div>
            </div>
            <div class="ml-auto flex items-center gap-2">
              <div class="flex items-right gap-2 relative bg-gray-100 rounded-lg px-3 py-2 w-32 md:w-64 focus-within:ring-2 focus-within:ring-gray-500">
                <input type="text" v-model="rmfInvestmentFormatted" @input="updateRmfInvestment"
                  data-test-id="tax-calculator__tax-planning-result--rmf-input"
                  class="w-full text-right font-medium bg-gray-100 focus:outline-none" />
                <span class="text-gray-700">฿</span>
              </div>
            </div>
          </div>

          <!-- RMF Slider -->
          <div class="relative">
            <input type="range" v-model="rmfSliderValue" @input="updateRmfFromSlider" min="0" :max="rmfMaxValue"
              step="1000" 
              data-test-id="tax-calculator__tax-planning-result--rmf-slider"
              class="w-full h-2 bg-gray-300 appearance-none cursor-pointer slider" />
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600" data-test-id="tax-calculator__tax-planning-result--rmf-info">
            <div class="w-4 h-4 rounded-full flex items-center justify-center">
              <i class="fa fa-info-circle" style="color: #01172BA6;"></i> 
            </div>
            <span class="text-sm text-gray-500">ไม่เกิน 30% รายได้ทั้งปี สูงสุด 500,000 บาท เมื่อรวมกับกองทุนกลุ่มเกษียณอื่น</span>
          </div>
        </div>

        <!-- ThaiESG Investment -->
        <div class="space-y-3" data-test-id="tax-calculator__tax-planning-result--thai-esg-investment">
          <div class="flex items-center gap-3">
            <div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500 rounded-full" data-test-id="tax-calculator__tax-planning-result--thai-esg-indicator"></div>
                <div class="font-medium text-gray-800" data-test-id="tax-calculator__tax-planning-result--thai-esg-title">ThaiESG</div>
              </div>
              <div class="text-sm text-gray-500" data-test-id="tax-calculator__tax-planning-result--thai-esg-description">Description</div>     
            </div>
            <div class="ml-auto flex items-center gap-2">
              <div class="flex items-right gap-2 relative bg-gray-100 rounded-lg px-3 py-2 w-32 md:w-64 focus-within:ring-2 focus-within:ring-gray-500">
                <input type="text" v-model="thaiEsgInvestmentFormatted" @input="updateThaiEsgInvestment"
                  data-test-id="tax-calculator__tax-planning-result--thai-esg-input"
                  class="w-full text-right font-medium bg-gray-100 focus:outline-none" />
                <span class="text-gray-700">฿</span>
              </div>
            </div>
          </div>

          <!-- ThaiESG Slider -->
          <div class="relative">
            <input type="range" v-model="thaiEsgSliderValue" @input="updateThaiEsgFromSlider" min="0"
              :max="thaiEsgMaxValue" step="1000" 
              data-test-id="tax-calculator__tax-planning-result--thai-esg-slider"
              class="w-full h-2 bg-gray-200 appearance-none cursor-pointer slider" />
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600" data-test-id="tax-calculator__tax-planning-result--thai-esg-info">
            <div class="w-4 h-4 rounded-full flex items-center justify-center">
              <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
            </div>
            <span class="text-sm text-gray-500">ไม่เกิน 30% รายได้ทั้งปี สูงสุด 300,000 บาท</span>
          </div>
        </div>
      </div>

      <!-- Recommended Tax Funds Section -->
      <div class="mt-8">
        <RecommendedTaxFunds 
          :rmf-investment="rmfInvestment"
          @fund-click="handleFundClick"
          @view-all="handleViewAll"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { formatCurrencyTHB, formatCurrencyTHBWithDecimals } from '~/utils/format'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import RecommendedTaxFunds from '~/components/RecommendedTaxFunds.vue'

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
  calculateTaxPlanningResult
} = useTaxCalculator()

// Investment amounts (these would typically come from form inputs)
const rmfInvestment = ref(0)
const thaiEsgInvestment = ref(0)

// Slider values
const rmfSliderValue = ref(0)
const thaiEsgSliderValue = ref(0)

// Formatted input values
const rmfInvestmentFormatted = ref('0')
const thaiEsgInvestmentFormatted = ref('0')

// Calculate all tax planning results using the composable
const taxPlanningResult = computed(() => 
  calculateTaxPlanningResult(
    calculationData.value,
    Number(rmfInvestment.value) || 0,
    Number(thaiEsgInvestment.value) || 0
  )
)

// Extract values from tax planning calculation
const beforeTaxAmount = computed(() => taxPlanningResult.value.beforeTaxAmount)
const afterTaxAmount = computed(() => taxPlanningResult.value.afterTaxAmount)
const taxSavings = computed(() => taxPlanningResult.value.taxSavings)
const maxTaxSavings = computed(() => taxPlanningResult.value.maxTaxSavings)
const rmfMaxValue = computed(() => taxPlanningResult.value.rmfMaxValue)
const thaiEsgMaxValue = computed(() => taxPlanningResult.value.thaiEsgMaxValue)

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
  rmfInvestmentFormatted.value = formatCurrencyTHB(rmfInvestment.value)
}

const updateThaiEsgFromSlider = () => {
  thaiEsgInvestment.value = Number(thaiEsgSliderValue.value) || 0
  thaiEsgInvestmentFormatted.value = formatCurrencyTHB(thaiEsgInvestment.value)
}

const updateRmfInvestment = (event) => {
  const value = event.target.value.replace(/[^\d]/g, '')
  const numValue = Number(value) || 0
  rmfInvestment.value = Math.min(numValue, rmfMaxValue.value)
  rmfSliderValue.value = rmfInvestment.value
  rmfInvestmentFormatted.value = formatCurrencyTHB(rmfInvestment.value)
}

const updateThaiEsgInvestment = (event) => {
  const value = event.target.value.replace(/[^\d]/g, '')
  const numValue = Number(value) || 0
  thaiEsgInvestment.value = Math.min(numValue, thaiEsgMaxValue.value)
  thaiEsgSliderValue.value = thaiEsgInvestment.value
  thaiEsgInvestmentFormatted.value = formatCurrencyTHB(thaiEsgInvestment.value)
}

const handleBack = () => {
  emit('back')
}

const handleRecalculate = () => {
  emit('recalculate')
}

// Fund recommendation handlers
const handleFundClick = (fund) => {
  console.log('Fund clicked:', fund)
  // You can add navigation logic here or emit to parent
}

const handleViewAll = (tabType) => {
  console.log('View all clicked for tab:', tabType)
  // You can add navigation logic here or emit to parent
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
