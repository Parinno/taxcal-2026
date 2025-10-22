<template>
  <div class="min-h-screen bg-white">
    <!-- Main Container -->
    <div class="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <!-- Header Section -->
      <div class="text-center mb-8 md:mb-12">
        <h1 class="header-title">
          คำนวณภาษีและวางแผนลดหย่อนภาษี
        </h1>
        <p class="header-subtitle">
          คำนวณภาษีเงินได้สำหรับบุคคลธรรมดาได้เงินคืนภาษีสูงสุด
        </p>
      </div>

      <!-- Progress Steps -->
      <StepIndicator :current-step="currentStep" />

      <!-- Page Content -->
      <component 
        :is="currentComponent"
        v-model="currentFormData" 
        @submit="handleNext"
        @back="handleBack"
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

      
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue'
import StepIndicator from '~/components/StepIndicator.vue'
import IncomeForm from '~/components/IncomeForm.vue'
import DeductionsForm from '~/components/DeductionsForm.vue'
import TaxPlanningResult from '~/components/TaxPlanningResult.vue'

// Current step state
const currentStep = ref(1)
provide('currentStep', currentStep)

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
      alert('กรุณากรอกข้อมูลรายได้')
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

// Calculate tax function
const calculateTax = () => {
  // Basic tax calculation logic
  const totalIncome = parseFloat(incomeData.value.salary || 0) + 
                     parseFloat(incomeData.value.bonus || 0) + 
                     parseFloat(incomeData.value.otherIncome || 0)
  
  const totalDeductions = parseFloat(deductionsData.value.personalDeduction || 0) +
                        parseFloat(deductionsData.value.socialSecurity || 0) +
                        parseFloat(deductionsData.value.providentFund || 0)
  
  const taxableIncome = Math.max(0, totalIncome - totalDeductions)
  
  // Simple tax calculation (this should be replaced with proper tax calculation)
  let taxAmount = 0
  if (taxableIncome > 0) {
    taxAmount = taxableIncome * 0.1 // 10% for simplicity
  }
  
  calculationData.value = {
    totalIncome,
    totalDeductions,
    taxableIncome,
    taxAmount
  }
}

</script>

<style scoped>
/* Layout-specific styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Header Title */
.header-title {
  width: 616px;
  height: 48px;
  font-family: 'Finnomena Trek', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 34px;
  line-height: 48px;
  color: rgba(1, 23, 43, 0.87);
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0 auto;
  text-align: center;
}

/* Header Subtitle */
.header-subtitle {
  width: 616px;
  height: 24px;
  font-family: 'Finnomena Trek', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 17px;
  line-height: 24px;
  letter-spacing: 0.16px;
  color: rgba(1, 23, 43, 0.65);
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0 auto;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .header-title {
    width: 100%;
    max-width: 616px;
    font-size: 28px;
    line-height: 40px;
    height: auto;
  }
  
  .header-subtitle {
    width: 100%;
    max-width: 616px;
    font-size: 15px;
    line-height: 22px;
    height: auto;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .header-title {
    width: 100%;
    max-width: 616px;
  }
  
  .header-subtitle {
    width: 100%;
    max-width: 616px;
  }
}

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
  font-family: 'Finnomena Trek', 'Inter', sans-serif;
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
  font-family: 'Finnomena Trek', 'Inter', sans-serif;
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
