<template>
  <div class="min-h-screen bg-white">
    <!-- Main Container -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          โปรแกรมคำนวณภาษี
        </h1>
        <p class="text-lg text-gray-700">
          เครื่องมือคำนวณภาษีบุคคลธรรมดาประจำปี 2568
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="flex justify-center items-center mb-12">
        <div class="flex items-center space-x-8">
          <!-- Step 1 -->
          <div class="flex flex-col items-center">
            <div :class="`w-12 h-12 rounded-full ${getStepClasses(1).circle} flex items-center justify-center mb-2`">
              <span :class="`${getStepClasses(1).number} font-semibold text-lg`">1</span>
            </div>
            <span :class="`${getStepClasses(1).text} font-medium text-sm`">รายรับ</span>
          </div>

          <!-- Connector -->
          <div class="w-16 h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300"></div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center">
            <div :class="`w-12 h-12 rounded-full ${getStepClasses(2).circle} flex items-center justify-center mb-2`">
              <span :class="`${getStepClasses(2).number} font-semibold text-lg`">2</span>
            </div>
            <span :class="`${getStepClasses(2).text} font-medium text-sm`">ลดหย่อนครอบครัว</span>
          </div>

          <!-- Connector -->
          <div class="w-16 h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300"></div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center">
            <div :class="`w-12 h-12 rounded-full ${getStepClasses(3).circle} flex items-center justify-center mb-2`">
              <span :class="`${getStepClasses(3).number} font-semibold text-lg`">3</span>
            </div>
            <span :class="`${getStepClasses(3).text} font-medium text-sm text-center`">
              กองทุนสำรองเลี้ยงชีพ<br>
              เงินประกันสังคม และที่อยู่อาศัย
            </span>
          </div>

          <!-- Connector -->
          <div class="w-16 h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300"></div>

          <!-- Step 4 -->
          <div class="flex flex-col items-center">
            <div :class="`w-12 h-12 rounded-full ${getStepClasses(4).circle} flex items-center justify-center mb-2`">
              <span :class="`${getStepClasses(4).number} font-semibold text-lg`">4</span>
            </div>
            <span :class="`${getStepClasses(4).text} font-medium text-sm`">ประกัน</span>
          </div>

          <!-- Connector -->
          <div class="w-16 h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300"></div>

          <!-- Step 5 -->
          <div class="flex flex-col items-center">
            <div :class="`w-12 h-12 rounded-full ${getStepClasses(5).circle} flex items-center justify-center mb-2`">
              <span :class="`${getStepClasses(5).number} font-semibold text-lg`">5</span>
            </div>
            <span :class="`${getStepClasses(5).text} font-medium text-sm`">กองทุนอื่น ๆ</span>
          </div>

          <!-- Connector -->
          <div class="w-16 h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300"></div>

          <!-- Step 6 -->
          <div class="flex flex-col items-center">
            <div :class="`w-12 h-12 rounded-full ${getStepClasses(6).circle} flex items-center justify-center mb-2`">
              <span :class="`${getStepClasses(6).number} font-semibold text-lg`">6</span>
            </div>
            <span :class="`${getStepClasses(6).text} font-medium text-sm`">คำนวณภาษี</span>
          </div>
        </div>
      </div>

      <!-- Page Content Slot -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'

// Provide current step to child components
const currentStep = ref(1)
provide('currentStep', currentStep)

// Helper function to get step classes
const getStepClasses = (step) => {
  const isActive = currentStep.value === step
  const isCompleted = currentStep.value > step
  
  if (isActive) {
    return {
      circle: 'bg-emerald-500',
      text: 'text-emerald-500',
      number: 'text-white'
    }
  } else if (isCompleted) {
    return {
      circle: 'bg-emerald-500',
      text: 'text-emerald-500',
      number: 'text-white'
    }
  } else {
    return {
      circle: 'bg-gray-200',
      text: 'text-gray-500',
      number: 'text-gray-500'
    }
  }
}
</script>

<style scoped>
/* Layout-specific styles */
</style>
