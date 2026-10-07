<template>
  <div class="max-w-4xl mx-auto" data-test-id="tax-calculator__tax-planning-result--container" data-fn-location="tax-planning-result">
    <!-- Main Content -->
    <div class="space-y-8">

      <!-- Upsell: RMF / ThaiESG planning. Only when there is tax to save; its output is the planning card below -->
      <section v-if="taxPlanningResult.beforeTaxRate > 0" class="space-y-6"
        aria-labelledby="tax-planning-result-upsell-title"
        data-test-id="tax-calculator__tax-planning-result--upsell">
        <div>
          <h2 id="tax-planning-result-upsell-title" class="text-2xl font-bold text-gray-800"
            data-test-id="tax-calculator__tax-planning-result--upsell-title">อยากประหยัดภาษีเพิ่ม?</h2>
          <p class="text-sm text-gray-500 mt-1 text-pretty"
            data-test-id="tax-calculator__tax-planning-result--upsell-description">
            เงินลงทุนใน RMF และ ThaiESG นำไปลดหย่อนภาษีได้ตามเงื่อนไข กรอกจำนวนเงินเพื่อดูภาษีที่จะประหยัดได้
          </p>
        </div>

        <!-- Investment Planning Section -->
        <div class="space-y-6"
          data-test-id="tax-calculator__tax-planning-result--investment-planning">
          <div class="flex justify-end">
            <button type="button" class="text-[15px] font-medium text-color-primary underline"
              data-test-id="tax-calculator__tax-planning-result--max-all-button"
              data-fn-action="tax_planning_max_all" @click="setRmf(rmfMaxValue); setThaiEsg(thaiEsgMaxValue)">
              ใช้สิทธิ์สูงสุดทั้งหมด
            </button>
          </div>
          <!-- RMF Investment -->
          <div class="space-y-3" data-test-id="tax-calculator__tax-planning-result--rmf-investment">
            <div class="flex items-center gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-purple-500 rounded-full"
                    data-test-id="tax-calculator__tax-planning-result--rmf-indicator"></div>
                  <div class="font-medium text-gray-800" data-test-id="tax-calculator__tax-planning-result--rmf-title">RMF
                  </div>
                </div>
                <div class="text-sm text-gray-500" data-test-id="tax-calculator__tax-planning-result--rmf-description">
                </div>
              </div>
              <div class="ml-auto flex items-center gap-2">
                <div
                  class="flex items-right gap-2 relative bg-gray-100 rounded-lg px-3 py-2 w-32 md:w-64 focus-within:ring-2 focus-within:ring-gray-500">
                  <input type="text" v-model="rmfInvestmentFormatted" @input="updateRmfInvestment"
                    data-test-id="tax-calculator__tax-planning-result--rmf-input"
                    data-fn-action="tax_planning_rmf_input"
                    class="w-full text-right font-medium bg-gray-100 focus:outline-none" />
                  <span class="text-gray-700">฿</span>
                </div>
              </div>
            </div>

            <!-- RMF Slider -->
            <div class="relative">
              <input type="range" v-model="rmfSliderValue" @input="updateRmfFromSlider" min="0" :max="rmfMaxValue"
                step="1000" data-test-id="tax-calculator__tax-planning-result--rmf-slider"
                data-fn-action="tax_planning_rmf_slider"
                class="w-full h-2 bg-gray-300 appearance-none cursor-pointer slider" />
            </div>

            <div class="flex items-center gap-2 text-sm text-gray-600"
              data-test-id="tax-calculator__tax-planning-result--rmf-info">
              <div class="w-4 h-4 rounded-full flex items-center justify-center">
                <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
              </div>
              <span class="text-sm text-gray-500">ไม่เกิน 30% รายได้ทั้งปี สูงสุด 500,000 บาท
                เมื่อรวมกับกองทุนกลุ่มเกษียณอื่น</span>
            </div>
          </div>

          <!-- ThaiESG Investment -->
          <div class="space-y-3" data-test-id="tax-calculator__tax-planning-result--thai-esg-investment">
            <div class="flex items-center gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"
                    data-test-id="tax-calculator__tax-planning-result--thai-esg-indicator"></div>
                  <div class="font-medium text-gray-800"
                    data-test-id="tax-calculator__tax-planning-result--thai-esg-title">ThaiESG</div>
                </div>
                <div class="text-sm text-gray-500"
                  data-test-id="tax-calculator__tax-planning-result--thai-esg-description"></div>
              </div>
              <div class="ml-auto flex items-center gap-2">
                <div
                  class="flex items-right gap-2 relative bg-gray-100 rounded-lg px-3 py-2 w-32 md:w-64 focus-within:ring-2 focus-within:ring-gray-500">
                  <input type="text" v-model="thaiEsgInvestmentFormatted" @input="updateThaiEsgInvestment"
                    data-test-id="tax-calculator__tax-planning-result--thai-esg-input"
                    data-fn-action="tax_planning_thai_esg_input"
                    class="w-full text-right font-medium bg-gray-100 focus:outline-none" />
                  <span class="text-gray-700">฿</span>
                </div>
              </div>
            </div>

            <!-- ThaiESG Slider -->
            <div class="relative">
              <input type="range" v-model="thaiEsgSliderValue" @input="updateThaiEsgFromSlider" min="0"
                :max="thaiEsgMaxValue" step="1000" data-test-id="tax-calculator__tax-planning-result--thai-esg-slider"
                data-fn-action="tax_planning_thai_esg_slider"
                class="w-full h-2 bg-gray-200 appearance-none cursor-pointer slider" />
            </div>

            <div class="flex items-center gap-2 text-sm text-gray-600"
              data-test-id="tax-calculator__tax-planning-result--thai-esg-info">
              <div class="w-4 h-4 rounded-full flex items-center justify-center">
                <i class="fa fa-info-circle" style="color: #01172BA6;"></i>
              </div>
              <span class="text-sm text-gray-500">ไม่เกิน 30% รายได้ทั้งปี สูงสุด 300,000 บาท</span>
            </div>
          </div>
        </div>

        <TaxPlanningCard :rmf-investment="rmfInvestment" :thai-esg-investment="thaiEsgInvestment"
          :tax-savings="taxSavings" />
      </section>

      <!-- Recommended Tax Funds Section -->
      <div class="mt-8" data-test-id="tax-calculator__tax-planning-result--recommended-funds-section">
        <RecommendedTaxFunds :rmf-investment="rmfInvestment" @fund-click="handleFundClick" @view-all="handleViewAll" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { formatCurrencyTHB } from '~/utils/format'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import RecommendedTaxFunds from '~/components/RecommendedTaxFunds.vue'
import TaxPlanningCard from '~/components/TaxPlanningCard.vue'

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

const emit = defineEmits(['update:rmfInvestment', 'update:thaiEsgInvestment'])

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
const taxSavings = computed(() => taxPlanningResult.value.taxSavings)
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

// Slider and input methods - ensure proper number conversion
const updateRmfFromSlider = () => {
  rmfInvestment.value = Number(rmfSliderValue.value) || 0
  rmfInvestmentFormatted.value = formatCurrencyTHB(rmfInvestment.value)
}

const updateThaiEsgFromSlider = () => {
  thaiEsgInvestment.value = Number(thaiEsgSliderValue.value) || 0
  thaiEsgInvestmentFormatted.value = formatCurrencyTHB(thaiEsgInvestment.value)
}

// Keep model, slider and formatted input in sync
const setRmf = (value) => {
  rmfInvestment.value = value
  rmfSliderValue.value = value
  rmfInvestmentFormatted.value = formatCurrencyTHB(value)
}

const setThaiEsg = (value) => {
  thaiEsgInvestment.value = value
  thaiEsgSliderValue.value = value
  thaiEsgInvestmentFormatted.value = formatCurrencyTHB(value)
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
