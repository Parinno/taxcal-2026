<template>
  <div class="progress-container">
    <div 
      v-for="(step, index) in steps" 
      :key="step.id"
      class="step-frame"
      :class="{ 'step-frame-last': index === steps.length - 1 }"
    >
      <div class="step-row">
        <div class="step-status">
          <div 
            class="step-circle"
            :class="getStepClasses(step.id).circle"
          >
            <span 
              class="step-number"
              :class="getStepClasses(step.id).number"
            >
              {{ getStepIcon(step.id) }}
            </span>
          </div>
        </div>
        <div 
          v-if="index < steps.length - 1"
          class="step-line" 
          :class="getStepLineClasses(step.id)"
        ></div>
      </div>
      <div class="step-content">
        <div class="step-text">
          <div class="step-caption text-color-information">{{ step.caption }}</div>
          <div class="step-detail text-color-primary">{{ step.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  currentStep: {
    type: Number,
    default: 1
  }
})

// Steps configuration
const steps = [
  { id: 1, caption: 'ขั้นตอนที่ 1', title: 'รายได้' },
  { id: 2, caption: 'ขั้นตอนที่ 2', title: 'ค่าลดหย่อน' },
  { id: 3, caption: 'ขั้นตอนที่ 3', title: 'คำนวนภาษี' }
]

// Helper function to get step classes
const getStepClasses = (step) => {
  console.log(step);
  
  const isActive = props.currentStep === step
  const isCompleted = props.currentStep > step

  if (isCompleted) {
    return {
      circle: 'step-circle-completed'
    }
  } else if (step === 2) {
    return {
      circle: 'step-circle-white'
    }
  } else {
    return {
      circle: 'step-circle-gray'
    }
  }
}

// Helper function to get step line classes
const getStepLineClasses = (step) => {
  const isCompleted = props.currentStep > step
  
  if (isCompleted) {
    return 'step-line-completed'
  } else {
    return 'step-line-inactive'
  }
}

// Helper function to get step icon (checkmark for completed steps)
const getStepIcon = (step) => {
  const isCompleted = props.currentStep > step
  
  if (isCompleted) {
    return '✓'
  } else {
    return step
  }
}
</script>

<style scoped>
/* Progress Steps */
.progress-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  /* margin: 0 auto 32px; */
  padding: 32px 0px;
  max-width: 616px;
}

.step-frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  /* width: 182.25px; */
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

/* Base styling for all steps */
.step-status {
  position: relative;
  border-radius: 50%;
}

.step-circle {
  position: absolute;
  left: 4.76%;
  right: 4.76%;
  top: 4.76%;
  bottom: 4.76%;
  border-radius: 50%;
}

.step-number {
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
}

.step-detail {
  font-weight: 500;
}

.step-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 14px;
  width: 167px;
  height: 42px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.step-status {
  width: 42px;
  height: 42px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.step-circle {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.step-circle-gray {
  background: #D3DFE6;
}

.step-circle-white {
  background: #E1E3E6;
}

.step-circle-white::before {
  content: '';
  position: absolute;
  left: 13.79%;
  right: 13.79%;
  top: 13.79%;
  bottom: 13.79%;
  width: 72.42%;
  height: 72.42%;
  border-radius: 50%;
  background: #FFFFFF;
}

.step-circle-gray::before {
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

.step-circle-active {
  background: #10B981;
  border: 2px solid #10B981;
}

.step-circle-completed {
  background: #E5FDF0;
}

.step-circle-completed::before {
  content: '';
  position: absolute;
  left: 13.79%;
  right: 13.79%;
  top: 13.79%;
  bottom: 13.79%;
  width: 72.42%;
  height: 72.42%;
  border-radius: 50%;
  background: #00E76B;
}
.step-circle-completed .step-number {
  font-family: 'Font Awesome 6 Sharp', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: var(--color-primary);
  left: calc(50% - 6px / 2 - 4px);
}

.step-number {
  position: absolute;
  width: 6px;
  height: 18px;
  left: calc(50% - 6px/2 - 1px);
  top: calc(50% - 18px/2);
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  z-index: 1;
}

.step-line {
  width: 117px;
  height: 0px;
  border: 1px solid #D3DFE6;
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: all 0.3s ease;
}

.step-line-inactive {
  border-color: #D3DFE6;
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

.step-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  /* width: 56px; */
  height: 42px;
  flex: none;
  order: 0;
  flex-grow: 0;
}


.step-caption {
  /* width: 56px; */
  height: 18px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.32px;
  color: var(--color-information);
  flex: none;
  order: 0;
  flex-grow: 0;
}

/* .step-frame:nth-child(2) .step-caption {
  width: 58px;
}

.step-frame-last .step-caption {
  width: 58px;
} */

.step-detail {
  font-weight: bold;
  font-size: 17px;
  line-height: 24px;
  color: var(--color-primary);
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: color 0.3s ease;
}
/* 
.step-frame:nth-child(2) .step-detail {
  width: 83px;
}

.step-frame-last .step-detail {
  width: 81px;
} */

/* Responsive adjustments */
@media (max-width: 640px) {
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
  .step-frame {
    width: 150px;
  }

  .step-frame-last {
    width: 80px;
  }
}
</style>
