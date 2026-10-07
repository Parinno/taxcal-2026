<template>
  <div class="space-y-6 mx-4" data-test-id="tax-calculator__tax-summary--container">
    <!-- Tax Year Summary Card -->
    <div class="bg-white border border-gray-200 rounded-xl p-6" data-test-id="tax-calculator__tax-summary--tax-year-card">
      <h3 class="text-xl font-bold text-gray-800 mb-2" data-test-id="tax-calculator__tax-summary--tax-year-title">สรุปปีภาษี 2569</h3>
      <span class="text-sm text-gray-500" data-test-id="tax-calculator__tax-summary--tax-year-description">ประมาณการภาษีประจำปีก่อนวางแผนภาษี RMF, ThaiESG</span>
      
      <!-- Tax Payable -->
      <div class="text-left mb-4 mt-4 bg-gray-100 rounded-2xl p-4" data-test-id="tax-calculator__tax-summary--tax-payable-section">
        <div class="text-md font-bold text-gray-800 mb-2" data-test-id="tax-calculator__tax-summary--tax-payable-label">
          {{ taxSummaryData.netTaxPayable >= 0 ? 'ภาษีที่ต้องจ่ายเพิ่ม' : 'ภาษีที่ได้รับคืน' }}
        </div>
        <div class="flex items-start justify-between gap-4">
        <div class="flex items-end gap-2" data-test-id="tax-calculator__tax-summary--tax-payable-amount-container">
          <div class="text-2xl font-bold" :class="taxSummaryData.netTaxPayable >= 0 ? '' : 'text-green-600'"
            data-test-id="tax-calculator__tax-summary--tax-payable-amount">
            {{ formatCurrencyWithDecimals(Math.abs(taxSummaryData.netTaxPayable)) }}
          </div>
          <div class="text-md font-semibold text-gray-500" data-test-id="tax-calculator__tax-summary--tax-payable-currency">THB</div>
        </div>
        <div v-if="emojiVariant !== 'ticket'" class="text-4xl leading-none shrink-0" aria-hidden="true" data-test-id="tax-calculator__tax-summary--emoji">{{ usageEmoji[usage.level] }}</div>
        </div>
        <p v-if="emojiVariant === 'usage-hint'" class="text-sm text-gray-600 mt-3" data-test-id="tax-calculator__tax-summary--usage-hint">{{ usageHint }}</p>
        <div v-if="taxSummaryData.maxTaxRate > 0" class="text-sm text-gray-600 mt-2" data-test-id="tax-calculator__tax-summary--tax-rate-section">
          <span data-test-id="tax-calculator__tax-summary--tax-rate-label">อัตราภาษีสูงสุด</span>
          <span class="font-semibold px-2 py-1 mx-2 rounded-full" style="background-color: #00E76B;" data-test-id="tax-calculator__tax-summary--tax-rate-value">{{ taxSummaryData.maxTaxRate }}%</span>
        </div>
        <div v-else class="text-sm text-gray-500 mt-2" data-test-id="tax-calculator__tax-summary--no-tax-message">
          ยังไม่อยู่ในเกณฑ์ที่ต้องเสียภาษี
        </div>
      </div>

      <!-- Detailed Breakdown -->
      <div class="space-y-3 border-gray-300 text-sm" data-test-id="tax-calculator__tax-summary--breakdown-section">
        <span class="text-gray-600 font-bold" data-test-id="tax-calculator__tax-summary--breakdown-title">การคำนวณภาษี</span>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--total-income-row">
          <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--total-income-label">รายได้ทั้งปี</span>
          <span data-test-id="tax-calculator__tax-summary--total-income-value">{{ formatCurrencyWithDecimals(taxSummaryData.totalIncome) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--total-expenses-row">
          <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--total-expenses-label">หัก ค่าใช้จ่าย</span>
          <span data-test-id="tax-calculator__tax-summary--total-expenses-value">{{ formatCurrencyWithDecimals(taxSummaryData.totalExpenses) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--total-deductions-row">
          <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--total-deductions-label">หัก ค่าลดหย่อน</span>
          <span data-test-id="tax-calculator__tax-summary--total-deductions-value">{{ formatCurrencyWithDecimals(taxSummaryData.totalDeductions) }}</span>
        </div>
        <div class="flex justify-between border-b border-gray-300 pb-4" data-test-id="tax-calculator__tax-summary--taxable-income-row">
          <span class="text-gray-600 font-bold" data-test-id="tax-calculator__tax-summary--taxable-income-label">เงินได้สุทธิ</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--taxable-income-value">{{ formatCurrencyWithDecimals(taxSummaryData.taxableIncome) }}</span>
        </div>
        <button type="button" class="w-full flex justify-between text-left cursor-pointer" :aria-expanded="showTaxRateBreakdown" data-test-id="tax-calculator__tax-summary--tax-amount-row" @click="showTaxRateBreakdown = !showTaxRateBreakdown">
          <span class="flex items-center gap-2">
            <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--tax-amount-label">ภาษีจากเงินได้สุทธิ</span>
            <i :class="showTaxRateBreakdown ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-500 text-sm" aria-hidden="true" data-test-id="tax-calculator__tax-summary--chevron"></i>
          </span>
          <span data-test-id="tax-calculator__tax-summary--tax-amount-value">{{ formatCurrencyWithDecimals(taxSummaryData.taxAmount) }}</span>
        </button>
        <div v-show="showTaxRateBreakdown" class="bg-gray-100 rounded-lg p-4" data-test-id="tax-calculator__tax-summary--tax-breakdown-container">
          <div class="flex justify-between border-b border-gray-300 pb-4" data-test-id="tax-calculator__tax-summary--tax-breakdown-header">
            <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--tax-breakdown-title">อัตราภาษีเงินได้บุคคลธรรมดา</span>
          </div>
          <div 
            v-for="(bracket, index) in taxSummaryData.taxBreakdown" 
            :key="index"
            class="flex justify-between pt-4" 
            :data-test-id="`tax-calculator__tax-summary--tax-bracket-row-${index}`">
            <div class="flex flex-col">
              <span class="text-gray-600 font-medium" data-test-id="tax-calculator__tax-summary--tax-bracket-label">{{ bracket.label }}</span>
              <span class="text-gray-400" data-test-id="tax-calculator__tax-summary--tax-bracket-range">{{ bracket.range }}</span>
            </div>
            <span data-test-id="tax-calculator__tax-summary--tax-bracket-amount">{{ formatCurrency(bracket.taxAmount) }}</span>
          </div>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--withholding-tax-row">
          <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--withholding-tax-label">หัก ภาษีหัก ณ ที่จ่าย</span>
          <span data-test-id="tax-calculator__tax-summary--withholding-tax-value">{{ formatCurrencyWithDecimals(taxSummaryData.withholdingTax) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--final-tax-row">
          <span class="text-gray-600 font-bold" data-test-id="tax-calculator__tax-summary--final-tax-label">{{ (taxSummaryData.netTaxPayable >= 0 ? 'จ่ายภาษีเพิ่ม' : 'ได้รับคืนภาษี') }}</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--final-tax-value">{{ formatCurrencyWithDecimals(Math.abs(taxSummaryData.netTaxPayable)) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { formatCurrencyTHB, formatCurrencyTHBWithDecimals } from '~/utils/format'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import { useResultEmojiVariant, usageEmoji, usageHintText } from '~/composables/useResultEmojiVariant'

const props = defineProps({
  calculationData: {
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
  },
  taxPlanning: {
    type: Object,
    required: true,
    default: () => ({
      totalInvestment: 0,
      taxSavings: 0,
      beforeTaxAmount: 0,
      afterTaxAmount: 0,
      finalTaxAmount: 0,
      finalNetTaxPayable: 0,
      taxReduction: 0
    })
  },
  rmfInvestment: {
    type: Number,
    default: 0
  },
  thaiEsgInvestment: {
    type: Number,
    default: 0
  }
})

// Use tax calculator composable
const { calculateTaxSummary, getDeductionUsage } = useTaxCalculator()

// The tax-rate table under ภาษีจากเงินได้สุทธิ starts folded; the chevron opens it
const showTaxRateBreakdown = ref(false)

// Calculate tax summary data
const taxSummaryData = computed(() => 
  calculateTaxSummary(
    props.calculationData,
    props.taxPlanning,
    props.rmfInvestment,
    props.thaiEsgInvestment
  )
)

const { variant: emojiVariant } = useResultEmojiVariant()
// calculationData here already counts the result page's RMF/ThaiESG as deductions
const usage = computed(() => getDeductionUsage(props.calculationData, (Number(props.rmfInvestment) || 0) + (Number(props.thaiEsgInvestment) || 0)))
const usageHint = computed(() => usageHintText(usage.value))


// Format currency helper
const formatCurrency = (amount) => formatCurrencyTHB(amount)
const formatCurrencyWithDecimals = (amount) => formatCurrencyTHBWithDecimals(amount)
</script>

<style scoped>
/* Custom styles if needed */
</style>
