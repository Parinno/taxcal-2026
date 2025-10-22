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

      <!-- Page Content Slot -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import StepIndicator from '~/components/StepIndicator.vue'

// Current step state - provide to child components
const currentStep = ref(1)
provide('currentStep', currentStep)
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


</style>
