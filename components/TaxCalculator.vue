<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import IncomeForm from '~/components/IncomeForm.vue'
import DeductionsForm from '~/components/DeductionsForm.vue'
import TaxPlanningResult from '~/components/TaxPlanningResult.vue'
import TaxSummary from '~/components/TaxSummary.vue'
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

// Investment data state
const rmfInvestment = ref(0)
const thaiEsgInvestment = ref(0)

// Handlers for investment data updates
const handleRmfInvestmentUpdate = (value) => {
  rmfInvestment.value = value
}

const handleThaiEsgInvestmentUpdate = (value) => {
  thaiEsgInvestment.value = value
}


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
  thaiESGXTransferred: '',
  otherDeduction: ''
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

// Form validation errors
const incomeErrors = ref({})

// Validation functions
const validateIncomeForm = () => {
  const errors = {}
  const fields = ['salary', 'bonus', 'otherIncome', 'withholdingTax']
  
  // Check if at least one income field has value
  const hasIncome = incomeData.value.salary || incomeData.value.bonus || incomeData.value.otherIncome
  if (!hasIncome) {
    errors.salary = 'กรุณากรอกเงินเดือน'
    errors.bonus = 'กรุณากรอกโบนัส'
    errors.otherIncome = 'กรุณากรอกรายได้อื่นๆ'
    return errors
  }
  
  // Validate each field
  fields.forEach(field => {
    const value = incomeData.value[field]
    if (value && value.toString().trim() !== '') {
      // Check if value is a valid number
      const numValue = parseFloat(value.toString().replace(/,/g, ''))
      if (isNaN(numValue)) {
        errors[field] = 'กรุณากรอกตัวเลขที่ถูกต้อง'
      } else if (numValue < 0) {
        errors[field] = 'ไม่สามารถกรอกค่าลบได้'
      } else if (numValue > 999999999) {
        errors[field] = 'จำนวนเงินสูงเกินไป (ไม่เกิน 999,999,999 บาท)'
      }
    }
  })
  
  return errors
}

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
    // Validate income form
    const errors = validateIncomeForm()
    incomeErrors.value = errors
    
    // If there are errors, don't proceed
    if (Object.keys(errors).length > 0) {
      return
    }
    
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    calculateTax()
    currentStep.value = 3
  }
  
  // Scroll to top after step change
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Handle back button click
const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    // Scroll to top after step change
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
  // Scroll to top after step change
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Handle step click from StepIndicator
const handleStepClick = (stepId) => {
  // Only allow navigation to completed steps or the next step
  if (stepId <= currentStep.value || stepId === currentStep.value + 1) {
    // If trying to go to step 2 from step 1, validate income form first
    if (currentStep.value === 1 && stepId === 2) {
      const errors = validateIncomeForm()
      incomeErrors.value = errors
      
      // If there are errors, don't proceed
      if (Object.keys(errors).length > 0) {
        return
      }
    }
    
    // If trying to go to step 3 from step 2, calculate tax first
    if (currentStep.value === 2 && stepId === 3) {
      calculateTax()
    }
    
    currentStep.value = stepId
    // Scroll to top after step change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Clear errors when user starts typing
const clearIncomeErrors = () => {
  incomeErrors.value = {}
}
// Tax planning calculations for TaxSummary
const { calculateTaxPlanning } = useTaxCalculator()

const taxPlanning = computed(() => {
  if (currentStep.value === 3) {
    return calculateTaxPlanning(
      calculationData.value,
      rmfInvestment.value,
      thaiEsgInvestment.value
    )
  }
  return {
    totalInvestment: 0,
    taxSavings: 0,
    beforeTaxAmount: 0,
    afterTaxAmount: 0,
    finalTaxAmount: 0,
    finalNetTaxPayable: 0,
    taxReduction: 0
  }
})

</script>

<template>
  <HeaderContent />
  <div class="sm:container xs:mx-auto xs:w-full xs:px-3 md:mx-auto md:max-w-7xl lg:max-w-[1272px] pb-[32px]">
    <div class="flex justify-between w-full">
      <div class="w-[288px]"></div>
      <div class="w-[648px] px-[16px]">
        <StepIndicator :current-step="currentStep" @step-click="handleStepClick" />
        <component :is="currentComponent" v-model="currentFormData" :errors="currentStep === 1 ? incomeErrors : {}"
          @submit="handleNext" @back="handleBack" @recalculate="handleRecalculate"
          @update:rmf-investment="handleRmfInvestmentUpdate" @update:thai-esg-investment="handleThaiEsgInvestmentUpdate"
          @clear-errors="clearIncomeErrors" />
        <!-- Navigation Buttons -->
        <div class="line-separator">

        </div>
        <div class="navigation-buttons pb-[16px]">
          <button class="btn-back" @click="handleBack" :disabled="currentStep <= 1">
            ย้อนกลับ
          </button>
          <button v-if="currentStep < 3" class="btn-next" @click="handleNext">
            ต่อไป
            <i class="fas fa-arrow-right pl-4"></i>
          </button>
        </div>
      </div>
      <div class="w-[336px]">
        <TaxSummary v-if="currentStep === 3" :calculation-data="calculationData" :tax-planning="taxPlanning"
          :rmf-investment="rmfInvestment" :thai-esg-investment="thaiEsgInvestment" />
      </div>
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
  padding: 0px 0px 32px 0px;
}

.navigation-buttons:has(.btn-back:only-child) {
  justify-content: center;
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
  margin: 2rem auto;

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
