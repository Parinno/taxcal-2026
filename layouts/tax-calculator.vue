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
      <div class="progress-container">
        <!-- Step 1 -->
        <div class="step-frame">
          <div class="step-row">
            <div class="step-status">
              <div class="step-circle">
                <span class="step-number">1</span>
              </div>
            </div>
            <div class="step-line"></div>
          </div>
          <div class="step-content">
            <div class="step-text">
              <div class="step-caption">ขั้นตอนที่ 1</div>
              <div class="step-detail">รายได้</div>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="step-frame">
          <div class="step-row">
            <div class="step-status">
              <div class="step-circle">
                <span class="step-number">2</span>
              </div>
            </div>
            <div class="step-line"></div>
          </div>
          <div class="step-content">
            <div class="step-text">
              <div class="step-caption">ขั้นตอนที่ 2</div>
              <div class="step-detail">ค่าลดหย่อน</div>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="step-frame step-frame-last">
          <div class="step-row">
            <div class="step-status">
              <div class="step-circle">
                <span class="step-number">3</span>
              </div>
            </div>
          </div>
          <div class="step-content">
            <div class="step-text">
              <div class="step-caption">ขั้นตอนที่ 3</div>
              <div class="step-detail">คำนวนภาษี</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Content Slot -->
      <slot />

      <!-- Navigation Buttons -->
      <div class="navigation-buttons">
        <button class="btn-back">
          ย้อนกลับ
        </button>
        <button class="btn-next">
          ต่อไป
        </button>
      </div>

      
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
      circle: 'bg-emerald-500 border-2 border-emerald-500',
      text: 'text-emerald-500',
      number: 'text-white'
    }
  } else if (isCompleted) {
    return {
      circle: 'bg-emerald-500 border-2 border-emerald-500',
      text: 'text-emerald-500',
      number: 'text-white'
    }
  } else {
    return {
      circle: 'bg-gray-200 border-2 border-gray-300',
      text: 'text-gray-600',
      number: 'text-gray-600'
    }
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

/* Progress Steps */
.progress-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  margin: 0 auto 32px;
  max-width: 100%;
}

.step-frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 182.25px;
  height: 99px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px -2px;
}

.step-frame-last {
  width: 96px;
  order: 2;
}

.step-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 167px;
  height: 42px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.step-status {
  width: 42px;
  height: 42px;
  position: relative;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.step-circle {
  position: absolute;
  left: 4.76%;
  right: 4.76%;
  top: 4.76%;
  bottom: 4.76%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #D3DFE6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-circle::before {
  content: '';
  position: absolute;
  left: 13.79%;
  right: 13.79%;
  top: 13.79%;
  bottom: 13.79%;
  width: 72.42%;
  height: 72.42%;
  border-radius: 50%;
  background: #E9EFF2;
}

.step-number {
  position: absolute;
  width: 6px;
  height: 18px;
  left: calc(50% - 6px/2 - 1px);
  top: calc(50% - 18px/2);
  font-family: 'Finnomena Trek', 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: rgba(1, 23, 43, 0.6);
  z-index: 1;
}

.step-line {
  width: 117px;
  height: 0px;
  border: 2px solid #D3DFE6;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 182.25px;
  height: 49px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.step-frame-last .step-content {
  width: 96px;
}

.step-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 56px;
  height: 42px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.step-frame:nth-child(2) .step-text {
  width: 83px;
}

.step-frame-last .step-text {
  width: 81px;
}

.step-caption {
  width: 56px;
  height: 18px;
  font-family: 'Finnomena Trek', 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.32px;
  color: rgba(1, 23, 43, 0.45);
  flex: none;
  order: 0;
  flex-grow: 0;
}

.step-frame:nth-child(2) .step-caption {
  width: 58px;
}

.step-frame-last .step-caption {
  width: 58px;
}

.step-detail {
  width: 46px;
  height: 24px;
  font-family: 'Finnomena Trek', 'Inter', sans-serif;
  font-size: 17px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.16px;
  color: #01172B;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.step-frame:nth-child(2) .step-detail {
  width: 83px;
}

.step-frame-last .step-detail {
  width: 81px;
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

  .progress-container {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .step-frame {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin: 0;
  }

  .step-row {
    width: 100%;
    justify-content: center;
  }

  .step-line {
    display: none;
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

  .step-frame {
    width: 150px;
  }

  .step-frame-last {
    width: 80px;
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
