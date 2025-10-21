<template>
  <div class="max-w-4xl mx-auto">
    <!-- Section Title -->
    <h2 class="text-2xl font-bold text-gray-800 mb-8">
      สรุปผลการคำนวณภาษี
    </h2>

    <!-- Top Summary Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div class="grid grid-cols-2 gap-8">
        <!-- Total Net Income (Taxable Income) -->
        <div class="text-center">
          <div class="text-lg text-gray-700 mb-2">รวมเงินได้สุทธิ</div>
          <div class="text-3xl font-bold text-emerald-600">
            {{ formatCurrency(calculationData.taxableIncome) }}
            <span class="text-lg text-gray-500">บาท</span>
          </div>
        </div>

        <!-- Tax Payable -->
        <div class="text-center">
          <div class="text-lg text-gray-700 mb-1">ภาษีที่ต้องจ่าย</div>
          <div class="text-sm text-gray-500 mb-2">(ก่อนลดหย่อนด้วย RMF / ThaiESG / Thai ESGX)</div>
          <div class="text-3xl font-bold text-red-600">
            {{ formatCurrency(calculationData.taxAmount) }}
            <span class="text-lg text-gray-500">บาท</span>
          </div>
        </div>
      </div>
    </div>

    <!-- RMF/ThaiESG Investment Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">
        ลดหย่อนภาษีกับกองทุน RMF / ThaiESG / Thai ESGX
      </h3>

      <!-- Investment Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 font-semibold text-gray-700">จำนวนที่คุณลงทุนได้สูงสุด (บาท)</th>
              <th class="text-right py-3 px-4 font-semibold text-gray-700">จำนวนที่ต้องการจะลงทุน (บาท)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- RMF Investment -->
            <tr>
              <td class="py-4 px-4">
                <div class="font-semibold text-gray-800 mb-2">ลงทุน RMF</div>
                <div class="text-sm text-red-600 mb-1">
                  RMF 30% ของรายได้ทั้งปี และรวมกับ กองทุนกลุ่มเกษียณ ไม่เกิน 500,000 บาท
                </div>
                <div class="text-xs text-gray-500">
                  (กองทุนสำรองเลี้ยงชีพ, ประกันชีวิตบำนาญ, กองทุนออมแห่งชาติ, กองทุน ครูเอกชน, กองทุนบำเหน็จบำนาญข้าราชการ)
                </div>
                <div class="text-lg font-bold text-emerald-600 mt-2">{{ formatCurrency(investmentRecommendations.rmfMax) }}</div>
              </td>
              <td class="py-4 px-4 text-right">
                <input
                  type="number"
                  v-model="formData.rmfInvestment"
                  placeholder="ระบุจำนวนเงิน"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <div class="text-xs text-red-600 mt-1">*จำนวนเงินลงทุนแนะนำในการลดหย่อนภาษี</div>
              </td>
            </tr>

            <!-- ThaiESG Investment -->
            <tr>
              <td class="py-4 px-4">
                <div class="font-semibold text-gray-800 mb-2">ลงทุน ThaiESG</div>
                <div class="text-sm text-red-600 mb-1">
                  ThaiESG 30% ของรายได้ทั้งปี ไม่เกิน 300,000 บาท และไม่รวมกับกองทุนกลุ่มเกษียณ
                </div>
                <div class="text-lg font-bold text-emerald-600 mt-2">{{ formatCurrency(investmentRecommendations.thaiEsgMax) }}</div>
              </td>
              <td class="py-4 px-4 text-right">
                <input
                  type="number"
                  v-model="formData.thaiEsgInvestment"
                  placeholder="ระบุจำนวนเงิน"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <div class="text-xs text-red-600 mt-1">*จำนวนเงินลงทุนแนะนำในการลดหย่อนภาษี</div>
              </td>
            </tr>

            <!-- Thai ESGX Investment -->
            <tr>
              <td class="py-4 px-4">
                <div class="font-semibold text-gray-800 mb-2">ลงทุน Thai ESGX</div>
                <div class="text-sm text-red-600 mb-1">
                  Thai ESGX 30% ของรายได้ทั้งปี ไม่เกิน 300,000 บาท และไม่รวมกับกองทุนกลุ่มเกษียณ
                </div>
                <div class="text-lg font-bold text-emerald-600 mt-2">{{ formatCurrency(investmentRecommendations.thaiEsgxMax) }}</div>
              </td>
              <td class="py-4 px-4 text-right">
                <input
                  type="number"
                  v-model="formData.thaiEsgxInvestment"
                  placeholder="ระบุจำนวนเงิน"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <div class="text-xs text-red-600 mt-1">*จำนวนเงินลงทุนแนะนำในการลดหย่อนภาษี</div>
              </td>
            </tr>

            <!-- LTF Transfer -->
            <tr>
              <td class="py-4 px-4">
                <div class="font-semibold text-gray-800 mb-2">โอนย้าย LTF มา Thai ESGX</div>
                <div class="text-sm text-gray-600 mb-1">
                  ปี 2568 ลดหย่อนสูงสุด 300,000 บาท<br>
                  ปี 2569 - 2572 ลดหย่อนสูงสุดปีละ 50,000 บาท
                </div>
                <div class="text-lg font-bold text-emerald-600 mt-2">{{ formatCurrency(investmentRecommendations.ltfMax) }}</div>
              </td>
              <td class="py-4 px-4 text-right">
                <input
                  type="number"
                  v-model="formData.ltfTransfer"
                  placeholder="ระบุจำนวนเงิน"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <div class="text-xs text-red-600 mt-1">*จำนวนเงินลงทุนแนะนำในการลดหย่อนภาษี</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total Investment -->
      <div class="border-t border-gray-200 pt-4 mt-4">
        <div class="flex justify-between items-center">
          <span class="font-bold text-gray-800">ลงทุนรวม</span>
          <span class="text-lg font-bold text-emerald-600">{{ formatCurrency(totalInvestment) }}</span>
        </div>
      </div>
    </div>

    <!-- Tax Savings Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h4 class="text-lg font-bold text-emerald-600 mb-4">ภาษีที่ประหยัดไปได้</h4>
      <div class="text-sm text-gray-500 mb-4">หลังลดหย่อน RMF / ThaiESG / Thai ESGX</div>
      
      <div class="grid grid-cols-2 gap-6">
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-2">เมื่อลงทุนสูงสุด</div>
          <div class="text-3xl font-bold text-red-600">{{ formatCurrency(maxTaxSavingsFromInvestments) }}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-2">เมื่อลงทุนตามจำนวนเงินของคุณ</div>
          <div class="text-3xl font-bold text-emerald-600">{{ formatCurrency(taxSavingsFromInvestments) }}</div>
        </div>
      </div>
    </div>

    <!-- Donations Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h4 class="text-lg font-bold text-gray-800 mb-4">เงินบริจาค</h4>
      
      <div class="grid grid-cols-2 gap-6">
        <!-- Education/Sports/Social/Hospital Donations -->
        <div>
          <div class="font-semibold text-gray-800 mb-2">เงินบริจาคเพื่อการศึกษา การกีฬา การพัฒนาสังคม และโรงพยาบาลรัฐ</div>
          <input
            type="number"
            v-model="formData.educationSportsSocialHospital"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none mb-2"
          />
          <div class="text-sm text-gray-600">ลดหย่อน 2 เท่าของเงินที่จ่ายจริง แต่ไม่เกิน 10% ของเงินได้สุทธิ</div>
        </div>

        <!-- General Donations -->
        <div>
          <div class="font-semibold text-gray-800 mb-2">เงินบริจาคทั่วไป</div>
          <input
            type="number"
            v-model="formData.generalDonation"
            placeholder="ระบุจำนวนเงิน"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none mb-2"
          />
          <div class="text-sm text-gray-600">ตามที่จ่ายจริง แต่ไม่เกิน 10% ของเงินได้สุทธิ</div>
        </div>
      </div>
    </div>

    <!-- Remaining Tax Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-800 mb-4">เหลือภาษีที่ต้องจ่าย</h4>
      <div class="text-sm text-gray-500 mb-4">หลังลดหย่อนเงินบริจาค</div>
      
      <div class="grid grid-cols-2 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-red-600">{{ formatCurrency(taxAmountAfterMaxInvestment) }}</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-emerald-600">{{ formatCurrency(finalTaxAmount) }}</div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between">
      <!-- Back Button -->
      <button
        @click="handleBack"
        class="px-8 py-3 border-2 border-emerald-500 text-emerald-500 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
      >
        ย้อนกลับ
      </button>

      <!-- Start Over Button -->
      <button
        @click="handleRecalculate"
        class="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-emerald-500 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        เริ่มทำใหม่
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
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

// Form data for investment inputs
const formData = ref({
  rmfInvestment: '',
  thaiEsgInvestment: '',
  thaiEsgxInvestment: '',
  ltfTransfer: '',
  educationSportsSocialHospital: '',
  generalDonation: ''
})

// Use the calculation data
const calculationData = computed(() => props.modelValue)

// Composable helpers
const {
  getInvestmentRecommendations,
  computeTotalInvestment,
  computeTaxSavingsFromInvestments,
  computeMaxTaxSavingsFromInvestments,
  computeDonationDeductions,
  computeFinalTaxAmount,
  computeTaxAmountAfterMaxInvestment,
} = useTaxCalculator()

// Calculate investment recommendations based on income
const investmentRecommendations = computed(() => {
  return getInvestmentRecommendations(calculationData.value.totalIncome)
})

// Calculate total investment
const totalInvestment = computed(() => {
  return computeTotalInvestment(
    parseFloat(formData.value.rmfInvestment) || 0,
    parseFloat(formData.value.thaiEsgInvestment) || 0,
    parseFloat(formData.value.thaiEsgxInvestment) || 0,
    parseFloat(formData.value.ltfTransfer) || 0
  )
})

// Calculate tax savings from investments
const taxSavingsFromInvestments = computed(() => {
  return computeTaxSavingsFromInvestments(
    totalInvestment.value,
    calculationData.value.taxableIncome,
    calculationData.value.taxAmount
  )
})

// Calculate maximum tax savings from investments
const maxTaxSavingsFromInvestments = computed(() => {
  return computeMaxTaxSavingsFromInvestments(
    calculationData.value.totalIncome,
    calculationData.value.taxableIncome,
    calculationData.value.taxAmount
  )
})

// Calculate donation deductions
const donationDeductions = computed(() => {
  return computeDonationDeductions(
    parseFloat(formData.value.educationSportsSocialHospital) || 0,
    parseFloat(formData.value.generalDonation) || 0,
    calculationData.value.taxableIncome
  )
})

// Calculate final tax after all deductions
const finalTaxAmount = computed(() => {
  return computeFinalTaxAmount(
    calculationData.value.taxAmount,
    calculationData.value.taxableIncome,
    totalInvestment.value,
    donationDeductions.value
  )
})

// Calculate tax amount after maximum investment savings
const taxAmountAfterMaxInvestment = computed(() => {
  return computeTaxAmountAfterMaxInvestment(
    calculationData.value.taxAmount,
    calculationData.value.taxableIncome,
    calculationData.value.totalIncome
  )
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
