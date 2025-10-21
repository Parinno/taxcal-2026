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
    const hasIncome = incomeData.value.salary || incomeData.value.bonus || incomeData.value.otherIncome
    if (!hasIncome) {
      showAlert.value = true
      return
    }
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    currentStep.value = 3
  } else if (currentStep.value === 3) {
    currentStep.value = 4
  } else if (currentStep.value === 4) {
    currentStep.value = 5
  } else if (currentStep.value === 5) {
    calculateTax()
    currentStep.value = 6
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
    familyData.value,
    providentFundData.value,
    insuranceData.value,
    otherFundsData.value
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


