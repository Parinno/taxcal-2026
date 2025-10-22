<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import AlertModal from '~/components/AlertModal.vue'
import IncomeForm from '~/components/IncomeForm.vue'
import DeductionsForm from '~/components/DeductionsForm.vue'
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
  
  // Prepare family data from deductionsData
  const familyData = {
    maritalStatus: deductionsData.value.maritalStatus || '',
    spouseIncomeStatus: deductionsData.value.spouseIncomeStatus || '',
    spouseNoIncome: deductionsData.value.spouseNoIncome || false,
    personalDeduction: deductionsData.value.personalDeduction || 60000,
    parentsSelf: deductionsData.value.parentsSelf || { father: false, mother: false },
    parentsSpouse: deductionsData.value.parentsSpouse || { father: false, mother: false },
    hasChild: deductionsData.value.hasChild || false,
    disabledNoIncome: deductionsData.value.disabledNoIncome || { father: false, mother: false, relative: false },
    disabledSpouseNoIncome: deductionsData.value.disabledSpouseNoIncome || { spouse: false, father: false, mother: false }
  }

  // Prepare provident fund data
  const providentFundData = {
    providentFund: deductionsData.value.providentFund || '',
    socialSecurity: deductionsData.value.socialSecurity || '',
    housingInterest: deductionsData.value.housingInterest || ''
  }

  // Prepare insurance data
  const insuranceData = {
    lifeInsurance: deductionsData.value.lifeInsurance || '',
    healthInsurance: deductionsData.value.healthInsurance || '',
    parentsHealthInsurance: deductionsData.value.parentsHealthInsurance || '',
    pensionLifeInsurance: deductionsData.value.pensionLifeInsurance || ''
  }

  // Prepare other funds data
  const otherFundsData = {
    governmentPensionFund: deductionsData.value.governmentPensionFund || '',
    nationalSavingsFund: deductionsData.value.nationalSavingsFund || '',
    privateTeachersFund: deductionsData.value.privateTeachersFund || ''
  }
  
  const result = calculateTaxFromComposable(
    incomeData.value,
    familyData,
    providentFundData,
    insuranceData,
    otherFundsData
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

  <!-- Navigation Buttons -->
  <div class="navigation-buttons">
    <button 
      class="btn-back"
      @click="handleBack"
      :disabled="currentStep <= 1"
    >
      ย้อนกลับ
    </button>
    <button 
      class="btn-next"
      @click="handleNext"
      :disabled="currentStep >= 3"
    >
      ต่อไป
    </button>
  </div>

  <AlertModal 
    :show="showAlert" 
    @close="handleAlertClose"
    @update:show="showAlert = $event"
  />
</template>

<style scoped>
/* Navigation Buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 616px;
  margin: 32px auto 0;
  padding: 0 16px;
}

.btn-back {
  background: #E9EFF2;
  color: #01172B;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.btn-back:hover {
  background: #D3DFE6;
  transform: translateY(-1px);
}

.btn-next {
  background: #01172B;
  color: #FFFFFF;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.btn-next:hover {
  background: #001A2E;
  transform: translateY(-1px);
}

.btn-next:disabled {
  background: #D3DFE6;
  color: rgba(1, 23, 43, 0.4);
  cursor: not-allowed;
  transform: none;
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


