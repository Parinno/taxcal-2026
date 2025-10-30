<template>
  <div class="space-y-6 mx-4" data-test-id="tax-calculator__tax-summary--container">
    <!-- Tax Year Summary Card -->
    <div class="bg-white border border-gray-200 rounded-xl p-6" data-test-id="tax-calculator__tax-summary--tax-year-card">
      <h3 class="text-xl font-bold text-gray-800 mb-2" data-test-id="tax-calculator__tax-summary--tax-year-title">สรุปปีภาษี 2568</h3>
      <span class="text-sm text-gray-500">ประมาณการภาษีประจำปีก่อนวางแผนภาษี RMF, ThaiESG</span>
      
      <!-- Tax Payable -->
      <div class="text-left mb-4 mt-4 bg-gray-100 rounded-2xl p-4" data-test-id="tax-calculator__tax-summary--tax-payable-section">
        <div class="text-md font-bold text-gray-800 mb-2" data-test-id="tax-calculator__tax-summary--tax-payable-label">
          {{ taxSummaryData.netTaxPayable >= 0 ? 'ภาษีที่ต้องจ่ายเพิ่ม' : 'ภาษีที่ได้รับคืน' }}
        </div>
        <div class="flex items-end gap-2">
          <div class="text-2xl font-bold" :class="taxSummaryData.netTaxPayable >= 0 ? '' : 'text-green-600'"
            data-test-id="tax-calculator__tax-summary--tax-payable-amount">
            {{ formatCurrencyWithDecimals(Math.abs(taxSummaryData.netTaxPayable)) }}
          </div>
          <div class="text-md font-semibold text-gray-500" data-test-id="tax-calculator__tax-summary--tax-payable-currency">THB</div>
        </div>
        <div v-if="taxSummaryData.maxTaxRate > 0" class="text-sm text-gray-600 mt-2">
          อัตราภาษีสูงสุด 
          <span class="font-semibold px-2 py-1 rounded-full" style="background-color: #00E76B;">{{ taxSummaryData.maxTaxRate }}%</span>
        </div>
        <div v-else class="text-sm text-gray-500 mt-2">
          ยังไม่อยู่ในเกณฑ์ที่ต้องเสียภาษี
        </div>
      </div>

      <!-- Detailed Breakdown -->
      <div class="space-y-3 border-gray-300 text-sm" data-test-id="tax-calculator__tax-summary--breakdown-section">
        <span class="text-gray-600 font-bold">การคำนวณภาษี</span>
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
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--tax-amount-row">
          <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--tax-amount-label">ภาษีจากเงินได้สุทธิ</span>
          <span data-test-id="tax-calculator__tax-summary--tax-amount-value">{{ formatCurrencyWithDecimals(taxSummaryData.taxAmount) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--withholding-tax-row">
          <span class="text-gray-500" data-test-id="tax-calculator__tax-summary--withholding-tax-label">หัก ภาษีหัก ณ ที่จ่าย</span>
          <span data-test-id="tax-calculator__tax-summary--withholding-tax-value">{{ formatCurrencyWithDecimals(taxSummaryData.withholdingTax) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 font-bold">{{ (taxSummaryData.netTaxPayable >= 0 ? 'จ่ายภาษีเพิ่ม' : 'ได้รับคืนภาษี') }}</span>
          <span class="font-semibold">{{ formatCurrencyWithDecimals(Math.abs(taxSummaryData.netTaxPayable)) }}</span>
        </div>
      </div>
    </div>

    <!-- Tax Planning Card -->
    <div v-if="taxSummaryData.maxTaxRate > 0" class="bg-white border border-gray-200 rounded-xl p-6" data-test-id="tax-calculator__tax-summary--tax-planning-card">
      <h3 class="text-xl font-bold text-gray-800 mb-1" data-test-id="tax-calculator__tax-summary--tax-planning-title">วางแผนลดหย่อนภาษี</h3>
      <div class="text-sm text-gray-500 mb-4">ประมาณการภาษีประจำปี</div>
      
      <!-- Additional Investment -->
      <div class="text-left mb-1" data-test-id="tax-calculator__tax-summary--additional-investment-section">
        <div class="text-sm text-gray-700 mb-1 font-bold" data-test-id="tax-calculator__tax-summary--additional-investment-label">เงินลงทุนเพิ่ม</div>
        <div class="font-bold flex items-end gap-2" data-test-id="tax-calculator__tax-summary--additional-investment-amount">
          <span class="text-gray-800 text-2xl">{{ formatCurrencyWithDecimals(taxSummaryData.totalInvestment) }}</span>
          <span class="text-md text-gray-500" data-test-id="tax-calculator__tax-summary--additional-investment-currency">THB</span>
        </div>
      </div>

      <!-- Tax Savings -->
      <div class="text-left mb-4 flex items-center gap-2" data-test-id="tax-calculator__tax-summary--tax-savings-section">
        <div class="text-md text-gray-700 font-medium" data-test-id="tax-calculator__tax-summary--tax-savings-label">ประหยัดภาษีเพิ่มขึ้น</div>
        <div class="text-md text-green-600" data-test-id="tax-calculator__tax-summary--tax-savings-amount">
          +{{ formatCurrencyWithDecimals(taxSummaryData.taxSavings) }}
        </div>
      </div>

      <!-- Investment Breakdown -->
      <div class="space-y-3 mb-6 border-t border-gray-300 pt-4 text-sm" data-test-id="tax-calculator__tax-summary--investment-breakdown">
        <div class="flex justify-between items-center" data-test-id="tax-calculator__tax-summary--rmf-investment-row">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-purple-500 rounded-full" data-test-id="tax-calculator__tax-summary--rmf-indicator"></div>
            <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--rmf-investment-label">RMF</span>
          </div>
          <span class="font-medium" data-test-id="tax-calculator__tax-summary--rmf-investment-value">{{ formatCurrencyWithDecimals(taxSummaryData.rmfInvestment) }}</span>
        </div>
        <div class="flex justify-between items-center" data-test-id="tax-calculator__tax-summary--thai-esg-investment-row">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-green-500 rounded-full" data-test-id="tax-calculator__tax-summary--thai-esg-indicator"></div>
            <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--thai-esg-investment-label">ThaiESG</span>
          </div>
          <span class="font-medium" data-test-id="tax-calculator__tax-summary--thai-esg-investment-value">{{ formatCurrencyWithDecimals(taxSummaryData.thaiEsgInvestment) }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <button class="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
        data-test-id="tax-calculator__tax-summary--view-funds-button">
        <span data-test-id="tax-calculator__tax-summary--view-funds-text">ดูกองทุนประหยัดภาษี</span>
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-test-id="tax-calculator__tax-summary--view-funds-icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatCurrencyTHB, formatCurrencyTHBWithDecimals } from '~/utils/format'
import { useTaxCalculator } from '~/composables/useTaxCalculator'

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
const { calculateTaxSummary } = useTaxCalculator()

// Calculate tax summary data
const taxSummaryData = computed(() => 
  calculateTaxSummary(
    props.calculationData,
    props.taxPlanning,
    props.rmfInvestment,
    props.thaiEsgInvestment
  )
)

// Format currency helper
const formatCurrency = (amount) => formatCurrencyTHB(amount)
const formatCurrencyWithDecimals = (amount) => formatCurrencyTHBWithDecimals(amount)
</script>

<style scoped>
/* Custom styles if needed */
</style>
