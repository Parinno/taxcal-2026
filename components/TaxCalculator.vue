<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import AlertModal from '~/components/AlertModal.vue'
import IncomeForm from '~/components/IncomeForm.vue'
import DeductionsForm from '~/components/DeductionsForm.vue'
import TaxCalculationResult from '~/components/TaxCalculationResult.vue'
import TaxPlanningResult from '~/components/TaxPlanningResult.vue'

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
  otherIncome: ''
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
  totalDeductions: 0,
  taxableIncome: 0,
  taxAmount: 0
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

// Calculate tax function using the proper composable
const calculateTax = () => {
  const { calculateTax: calculateTaxFromComposable } = useTaxCalculator()
  
  const result = calculateTaxFromComposable(
    incomeData.value,
    deductionsData.value,
    {}, // familyData
    {}, // providentFundData
    {}, // insuranceData
    {}  // otherFundsData
  )

  calculationData.value = {
    totalIncome: result.totalIncome,
    totalDeductions: result.totalDeductions,
    taxableIncome: result.taxableIncome,
    taxAmount: result.taxAmount
  }
}

// Handle recalculate button click
const handleRecalculate = () => {
  currentStep.value = 1
}

// Handle alert close
const handleAlertClose = () => {
  showAlert.value = false
}

// Provide handlers to layout
provide('handleNext', handleNext)
provide('handleBack', handleBack)
</script>

<template>
  <component 
    :is="currentComponent"
    v-model="currentFormData" 
    @submit="handleNext"
    @back="handleBack"
    @recalculate="handleRecalculate"
  />

  <AlertModal 
    :show="showAlert" 
    @close="handleAlertClose"
    @update:show="showAlert = $event"
  />
</template>

<style scoped>
/* Custom styles if needed */
</style>


