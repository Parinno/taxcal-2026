<template>
  <!-- Moved from the floating panel: there RMF/ThaiESG were always 0, here it follows the inputs above -->
  <div class="bg-white border border-gray-200 rounded-xl p-6" data-test-id="tax-calculator__tax-planning-card--container">
    <h3 class="text-xl font-bold text-gray-800 mb-1" data-test-id="tax-calculator__tax-planning-card--title">วางแผนลดหย่อนภาษี</h3>
    <div class="text-sm text-gray-500 mb-4" data-test-id="tax-calculator__tax-planning-card--description">ประมาณการภาษีประจำปี</div>

    <!-- Additional Investment -->
    <div class="text-left mb-1" data-test-id="tax-calculator__tax-planning-card--additional-investment-section">
      <div class="text-sm text-gray-700 mb-1 font-bold" data-test-id="tax-calculator__tax-planning-card--additional-investment-label">เงินลงทุนเพิ่ม</div>
      <div class="font-bold flex items-end gap-2" data-test-id="tax-calculator__tax-planning-card--additional-investment-amount">
        <span class="text-gray-800 text-2xl" data-test-id="tax-calculator__tax-planning-card--additional-investment-amount-value">{{ formatCurrencyTHBWithDecimals(rmfInvestment + thaiEsgInvestment) }}</span>
        <span class="text-md text-gray-500" data-test-id="tax-calculator__tax-planning-card--additional-investment-currency">THB</span>
      </div>
    </div>

    <!-- Tax Savings -->
    <div class="text-left mb-4 flex items-center gap-2" aria-live="polite" data-test-id="tax-calculator__tax-planning-card--tax-savings-section">
      <div class="text-md text-gray-700 font-medium" data-test-id="tax-calculator__tax-planning-card--tax-savings-label">ประหยัดภาษีเพิ่มขึ้น</div>
      <div class="text-md text-green-600" data-test-id="tax-calculator__tax-planning-card--tax-savings-amount">
        +{{ formatCurrencyTHBWithDecimals(taxSavings) }}
      </div>
    </div>

    <!-- Investment Breakdown -->
    <div class="space-y-3 border-t border-gray-300 pt-4 text-sm" data-test-id="tax-calculator__tax-planning-card--investment-breakdown">
      <div class="flex justify-between items-center" data-test-id="tax-calculator__tax-planning-card--rmf-investment-row">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 bg-purple-500 rounded-full" data-test-id="tax-calculator__tax-planning-card--rmf-indicator"></div>
          <span class="text-gray-600" data-test-id="tax-calculator__tax-planning-card--rmf-investment-label">RMF</span>
        </div>
        <span class="font-medium" data-test-id="tax-calculator__tax-planning-card--rmf-investment-value">{{ formatCurrencyTHBWithDecimals(rmfInvestment) }}</span>
      </div>
      <div class="flex justify-between items-center" data-test-id="tax-calculator__tax-planning-card--thai-esg-investment-row">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 bg-green-500 rounded-full" data-test-id="tax-calculator__tax-planning-card--thai-esg-indicator"></div>
          <span class="text-gray-600" data-test-id="tax-calculator__tax-planning-card--thai-esg-investment-label">ThaiESG</span>
        </div>
        <span class="font-medium" data-test-id="tax-calculator__tax-planning-card--thai-esg-investment-value">{{ formatCurrencyTHBWithDecimals(thaiEsgInvestment) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrencyTHBWithDecimals } from '~/utils/format'

defineProps({
  rmfInvestment: {
    type: Number,
    default: 0
  },
  thaiEsgInvestment: {
    type: Number,
    default: 0
  },
  taxSavings: {
    type: Number,
    default: 0
  }
})
</script>
