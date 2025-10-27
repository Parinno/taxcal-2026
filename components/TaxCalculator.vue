<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import IncomeForm from '~/components/IncomeForm.vue'
import DeductionsForm from '~/components/DeductionsForm.vue'
import TaxPlanningResult from '~/components/TaxPlanningResult.vue'
import HeaderContent from '~/components/HeaderContent.vue'
import StepIndicator from '~/components/StepIndicator.vue'

// Current step state
const currentStep = ref(1)

// Inject currentStep from layout and update it
const layoutCurrentStep = inject('currentStep')
watch(currentStep, (newStep) => {
  if (layoutCurrentStep) {
    layoutCurrentStep.value = newStep
  }
}, { immediate: true })


// Form data for each step
const incomeData = ref({
  salary: '',
  bonus: '',
  otherIncome: '',
  withholdingTax: ''
})

const deductionsData = ref({
  personalDeduction: 60000,
  socialSecurity: '',
  providentFund: '',
  thaiESGX: '',
  thaiESGXTransferred: ''
})


const calculationData = ref({
  totalIncome: 0,
  totalExpenses: 0,
  totalDeductions: 0,
  totalDeductionsAndExpenses: 0,
  taxableIncome: 0,
  taxAmount: 0,
  withholdingTax: 0,
  netTaxPayable: 0
})

// Alert modal state
const showAlert = ref(false)

// Current component based on step
const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      return IncomeForm
    case 2:
      return DeductionsForm
    case 3:
      return TaxPlanningResult
    default:
      return IncomeForm
  }
})

// Current form data based on step
const currentFormData = computed(() => {
  switch (currentStep.value) {
    case 1:
      return incomeData.value
    case 2:
      return deductionsData.value
    case 3:
      return calculationData.value
    default:
      return incomeData.value
  }
})

// Handle next button click
const handleNext = () => {
  if (currentStep.value === 1) {
    const hasIncome = incomeData.value.salary || incomeData.value.bonus || incomeData.value.otherIncome
    if (!hasIncome) {
      showAlert.value = true
      return
    }
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    calculateTax()
    currentStep.value = 3
  }
}

// Handle back button click
const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Calculate tax function using the simplified composable
const calculateTax = () => {
  const { calculateTaxFromForms } = useTaxCalculator()

  const result = calculateTaxFromForms(
    incomeData.value,
    deductionsData.value
  )

  calculationData.value = {
    totalIncome: result.totalIncome,
    totalExpenses: result.totalExpenses,
    totalDeductions: result.totalDeductions,
    totalDeductionsAndExpenses: result.totalDeductionsAndExpenses,
    taxableIncome: result.taxableIncome,
    taxAmount: result.taxAmount,
    withholdingTax: result.withholdingTax,
    netTaxPayable: result.netTaxPayable
  }
}

// Handle recalculate button click
const handleRecalculate = () => {
  currentStep.value = 1
}

</script>

<template>
  <HeaderContent />
  <div class="sm:container xs:mx-auto xs:w-full xs:px-3 md:mx-auto md:max-w-7xl lg:max-w-[1272px] pb-[32px]">
    <div class="flex justify-between w-full">
      <div class="w-[288px]"></div>
      <div class="w-[648px] px-[16px]">
        <StepIndicator :current-step="currentStep" />
        <component :is="currentComponent" v-model="currentFormData" @submit="handleNext" @back="handleBack"
          @recalculate="handleRecalculate" />
        <!-- Navigation Buttons -->
        <div class="line-separator">

        </div>
        <div class="navigation-buttons pb-[16px]">
          <button class="btn-back" @click="handleBack" :disabled="currentStep <= 1">
            ย้อนกลับ
          </button>
          <button class="btn-next" @click="handleNext" :disabled="currentStep >= 3">
            ต่อไป
            <i class="fas fa-arrow-right size-[20px]"></i>
          </button>
        </div>
      </div>
      <div class="w-[336px]"></div>
    </div>
  </div>
</template>

<style scoped>
/* Navigation Buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 616px;
  padding: 20px 0px 32px 0px;
}

.btn-back {
  background: #E9EFF2;
  color: var(--color-primary);
  border: none;
  border-radius: 200px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 154px;
  height: 48px;
}

.btn-back:hover {
  background: #D3DFE6;
  /* transform: translateY(-1px); */
}

.btn-next {
  background: var(--color-primary);
  color: #FFFFFF;
  border: none;
  border-radius: 200px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer !important;
  transition: all 0.2s ease;
  min-width: 154px;
  height: 48px;
}

.btn-next:hover {
  background: #001A2E;
  /* transform: translateY(-1px); */
}

.btn-next:disabled {
  background: #D3DFE6;
  color: rgba(1, 23, 43, 0.4);
  cursor: not-allowed;
  transform: none;
}

.line-separator {
  border-top: 1px solid #e1e3e6;
  margin: auto;
}

/* Responsive adjustments for buttons */
@media (max-width: 640px) {
  .navigation-buttons {
    flex-direction: column;
    gap: 12px;
    padding: 0 8px;
  }

  .btn-back,
  .btn-next {
    width: 100%;
    max-width: 280px;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .navigation-buttons {
    padding: 0 12px;
  }
}
</style>
