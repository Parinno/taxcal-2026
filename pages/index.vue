

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import AlertModal from '~/components/AlertModal.vue'
import IncomeForm from '~/components/IncomeForm.vue'
import FamilyDeductionsForm from '~/components/FamilyDeductionsForm.vue'
import ProvidentFundForm from '~/components/ProvidentFundForm.vue'
import InsuranceForm from '~/components/InsuranceForm.vue'
import OtherFundsForm from '~/components/OtherFundsForm.vue'
import TaxCalculationResult from '~/components/TaxCalculationResult.vue'

// Define layout
definePageMeta({
  layout: 'tax-calculator'
})

// Current step state
const currentStep = ref(1)

// Inject currentStep from layout and update it
const layoutCurrentStep = inject('currentStep')
watch(currentStep, (newStep) => {
  layoutCurrentStep.value = newStep
}, { immediate: true })

// Form data for each step
const incomeData = ref({
  salary: '',
  bonus: '',
  otherIncome: ''
})

const familyData = ref({
  maritalStatus: '',
  spouseIncomeStatus: '',
  spouseNoIncome: false,
  personalDeduction: 60000,
  parentsSelf: {
    father: false,
    mother: false
  },
  parentsSpouse: {
    father: false,
    mother: false
  },
  hasChild: false,
  disabledNoIncome: {
    father: false,
    mother: false,
    relative: false
  },
  disabledSpouseNoIncome: {
    spouse: false,
    father: false,
    mother: false
  }
})

const providentFundData = ref({
  providentFund: '',
  socialSecurity: '',
  housingInterest: ''
})

const insuranceData = ref({
  lifeInsurance: '',
  healthInsurance: '',
  parentsHealthInsurance: '',
  pensionLifeInsurance: ''
})

const otherFundsData = ref({
  governmentPensionFund: '',
  nationalSavingsFund: '',
  privateTeachersFund: ''
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
      return FamilyDeductionsForm
    case 3:
      return ProvidentFundForm
    case 4:
      return InsuranceForm
    case 5:
      return OtherFundsForm
    case 6:
      return TaxCalculationResult
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
      return familyData.value
    case 3:
      return providentFundData.value
    case 4:
      return insuranceData.value
    case 5:
      return otherFundsData.value
    case 6:
      return calculationData.value
    default:
      return incomeData.value
  }
})

// Handle next button click
const handleNext = () => {
  if (currentStep.value === 1) {
    // Check if at least one income field is filled
    const hasIncome = incomeData.value.salary || incomeData.value.bonus || incomeData.value.otherIncome
    
    if (!hasIncome) {
      showAlert.value = true
      return
    }
    
    console.log('Income data:', incomeData.value)
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    console.log('Family deductions data:', familyData.value)
    currentStep.value = 3
  } else if (currentStep.value === 3) {
    console.log('Provident fund data:', providentFundData.value)
    currentStep.value = 4
  } else if (currentStep.value === 4) {
    console.log('Insurance data:', insuranceData.value)
    currentStep.value = 5
  } else if (currentStep.value === 5) {
    console.log('Other funds data:', otherFundsData.value)
    // Calculate tax when moving to step 6
    calculateTax()
    currentStep.value = 6
  } else if (currentStep.value === 6) {
    console.log('Final calculation completed')
    // This is the last step, maybe trigger final calculation or show a "finish" message
  }
}

// Handle back button click
const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Calculate tax function
const { calculateTax: calculateTaxCore } = useTaxCalculator()
const calculateTax = () => {
  const result = calculateTaxCore(
    incomeData.value,
    familyData.value,
    providentFundData.value,
    insuranceData.value,
    otherFundsData.value
  )
  calculationData.value = result
}

// Handle recalculate button click
const handleRecalculate = () => {
  // Reset to step 1
  currentStep.value = 1
}

// Handle alert close
const handleAlertClose = () => {
  showAlert.value = false
}
</script>

<template>
  <!-- Dynamic Component based on current step -->
  <component 
    :is="currentComponent"
    v-model="currentFormData" 
    @submit="handleNext"
    @back="handleBack"
    @recalculate="handleRecalculate"
  />

  <!-- Alert Modal -->
  <AlertModal 
    :show="showAlert" 
    @close="handleAlertClose"
    @update:show="showAlert = $event"
  />
</template>

<style scoped>
/* Custom styles if needed */
</style>
