<template>
  <div class="space-y-6" data-test-id="tax-calculator__tax-summary--container">
    <!-- Tax Year Summary Card -->
    <div class="bg-white border border-gray-200 rounded-lg p-6" data-test-id="tax-calculator__tax-summary--tax-year-card">
      <h3 class="text-xl font-bold text-gray-800 mb-6" data-test-id="tax-calculator__tax-summary--tax-year-title">สรุปปีภาษี 2568</h3>
      
      <!-- Tax Payable -->
      <div class="text-left mb-6" data-test-id="tax-calculator__tax-summary--tax-payable-section">
        <div class="text-lg text-gray-700 mb-2" data-test-id="tax-calculator__tax-summary--tax-payable-label">ภาษีที่ต้องจ่าย</div>
        <div class="text-3xl font-bold" data-test-id="tax-calculator__tax-summary--tax-payable-amount">
          {{ formatCurrency(calculationData.netTaxPayable) }}
          <span class="text-lg text-gray-500" data-test-id="tax-calculator__tax-summary--tax-payable-currency">THB</span>
        </div>
      </div>

      <!-- Detailed Breakdown -->
      <div class="space-y-3 border-t border-gray-300 pt-4" data-test-id="tax-calculator__tax-summary--breakdown-section">
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--total-income-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--total-income-label">เงินได้</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--total-income-value">{{ formatCurrency(calculationData.totalIncome) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--total-expenses-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--total-expenses-label">หักค่าใช้จ่าย</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--total-expenses-value">{{ formatCurrency(calculationData.totalExpenses) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--total-deductions-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--total-deductions-label">ค่าลดหย่อน</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--total-deductions-value">{{ formatCurrency(calculationData.totalDeductions) }}</span>
        </div>
        <span class="text-xs text-gray-500" data-test-id="tax-calculator__tax-summary--deductions-note">(ไม่รวม RMF, ThaiESG)</span>
        <div class="flex justify-between border-t border-gray-300 pt-4" data-test-id="tax-calculator__tax-summary--taxable-income-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--taxable-income-label">เงินได้สุทธิ</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--taxable-income-value">{{ formatCurrency(calculationData.taxableIncome) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--tax-amount-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--tax-amount-label">ค่าภาษี</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--tax-amount-value">{{ formatCurrency(calculationData.taxAmount) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--withholding-tax-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--withholding-tax-label">ภาษีหัก ณ ที่จ่าย</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--withholding-tax-value">{{ formatCurrency(calculationData.withholdingTax) }}</span>
        </div>
      </div>
    </div>

    <!-- Tax Planning Card -->
    <div class="bg-white border border-gray-200 rounded-lg p-6" data-test-id="tax-calculator__tax-summary--tax-planning-card">
      <h3 class="text-xl font-bold text-gray-800 mb-6" data-test-id="tax-calculator__tax-summary--tax-planning-title">วางแผนลดหย่อนภาษี</h3>
      
      <!-- Additional Investment -->
      <div class="text-left mb-2" data-test-id="tax-calculator__tax-summary--additional-investment-section">
        <div class="text-lg text-gray-700 mb-2" data-test-id="tax-calculator__tax-summary--additional-investment-label">เงินลงทุนเพิ่ม</div>
        <div class="text-3xl font-bold" data-test-id="tax-calculator__tax-summary--additional-investment-amount">
          {{ formatCurrencyWithDecimals(taxPlanning.totalInvestment) }}
          <span class="text-lg text-gray-500" data-test-id="tax-calculator__tax-summary--additional-investment-currency">THB</span>
        </div>
      </div>

      <!-- Tax Savings -->
      <div class="text-left mb-6 flex items-center gap-2" data-test-id="tax-calculator__tax-summary--tax-savings-section">
        <div class="text-lg text-gray-700" data-test-id="tax-calculator__tax-summary--tax-savings-label">ประหยัดภาษีเพิ่มขึ้น</div>
        <div class="text-lg font-bold" data-test-id="tax-calculator__tax-summary--tax-savings-amount">
          {{ formatCurrency(taxPlanning.taxSavings) }}
        </div>
      </div>

      <!-- Investment Breakdown -->
      <div class="space-y-3 mb-6 border-t border-gray-300 pt-4" data-test-id="tax-calculator__tax-summary--investment-breakdown">
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--rmf-investment-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--rmf-investment-label">RMF</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--rmf-investment-value">{{ formatCurrency(Number(rmfInvestment)) }}</span>
        </div>
        <div class="flex justify-between" data-test-id="tax-calculator__tax-summary--thai-esg-investment-row">
          <span class="text-gray-600" data-test-id="tax-calculator__tax-summary--thai-esg-investment-label">Thai ESG</span>
          <span class="font-semibold" data-test-id="tax-calculator__tax-summary--thai-esg-investment-value">{{ formatCurrency(Number(thaiEsgInvestment)) }}</span>
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
import { formatCurrencyTHB } from '~/utils/format'

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


// Format currency helper
const formatCurrency = (amount) => formatCurrencyTHB(amount)
const formatCurrencyWithDecimals = (amount) => formatCurrencyTHBWithDecimals(amount)
</script>

<style scoped>
/* Custom styles if needed */
</style>
