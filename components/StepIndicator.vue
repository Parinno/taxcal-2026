<template>
  <div class="progress-container max-w-[288px] md:max-w-[648px]" data-test-id="tax-calculator__step-indicator--container" data-fn-location="step-indicator">
    <div 
      v-for="(step, index) in steps" 
      :key="step.id"
      class="step-frame"
      :class="{ 'step-frame-last': index === steps.length - 1 }"
      :data-test-id="`tax-calculator__step-indicator--step-${step.id}`"
    >
      <div class="step-row">
        <div class="step-status">
          <div 
            class="step-circle"
            :class="getStepClasses(step.id).circle"
            @click="handleStepClick(step.id)"
            :data-test-id="`tax-calculator__step-indicator--step-${step.id}-circle`"
            :data-fn-action="`step_click`"
            :data-fn-params="JSON.stringify({ step_id: step.id, step_title: step.title })"
          >
            <span 
              class="step-number"
              :class="getStepClasses(step.id).number"
              :data-test-id="`tax-calculator__step-indicator--step-${step.id}-number`"
            >
              {{ getStepIcon(step.id) }}
            </span>
          </div>
        </div>
        <div 
          v-if="index < steps.length - 1"
          class="step-line" 
          :class="getStepLineClasses(step.id)"
          :data-test-id="`tax-calculator__step-indicator--step-${step.id}-line`"
        ></div>
      </div>
      <div class="step-content">
        <div class="step-text">
          <div class="step-caption text-color-information" :data-test-id="`tax-calculator__step-indicator--step-${step.id}-caption`">{{ step.caption }}</div>
          <div class="step-detail text-color-primary" :data-test-id="`tax-calculator__step-indicator--step-${step.id}-title`">{{ step.title }}</div>
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

// Emits
const emit = defineEmits(['step-click'])

// Steps configuration
const steps = [
  { id: 1, caption: 'ขั้นตอนที่ 1', title: 'รายได้' },
  { id: 2, caption: 'ขั้นตอนที่ 2', title: 'ค่าลดหย่อน' },
  { id: 3, caption: 'ขั้นตอนที่ 3', title: 'คำนวณภาษี' }
]

// Helper function to get step classes
const getStepClasses = (step) => {  
  const isActive = props.currentStep === step
  const isCompleted = props.currentStep > step
  const isClickable = step <= props.currentStep || step === props.currentStep + 1

  let circleClass = ''
  
  if (isCompleted) {
    circleClass = 'step-circle-completed'
  } else if (isActive) {
    circleClass = 'step-circle-active'
  } else if (step === 2) {
    circleClass = 'step-circle-white'
  } else {
    circleClass = 'step-circle-gray'
  }

  // Add disabled class if step is not clickable
  if (!isClickable) {
    circleClass += ' step-circle-disabled'
  }

  return {
    circle: circleClass
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

// Handle step click
const handleStepClick = (stepId) => {
  // Only allow clicking on completed steps or the next step
  const isClickable = stepId <= props.currentStep || stepId === props.currentStep + 1
  
  if (isClickable) {
    emit('step-click', stepId)
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
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  user-select: none;
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
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
}

.step-circle-active::before {
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

.step-circle-active .step-number {
  color: #10B981;
  font-weight: 600;
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

/* Disabled state for steps that cannot be clicked */
.step-circle-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.step-circle-disabled:hover {
  transform: none;
  box-shadow: none;
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
/* Mobile - below 400px (sm) */
@media (max-width: 399px) {
  .progress-container {
    gap: 4px;
    padding: 24px 0px;
  }

  .step-frame {
    margin: 0px -1px;
  }

  .step-frame-last {
    width: 70px;
  }

  .step-row {
    width: 110px;
    gap: 8px;
  }

  .step-line {
    width: 70px;
  }

  .step-content {
    width: 120px;
  }

  .step-status {
    width: 32px;
    height: 32px;
  }

  .step-number {
    font-size: 11px;
  }

  .step-detail {
    font-size: 14px;
  }

  .step-caption {
    font-size: 10px;
  }
}

/* Small screens - 400px to 599px (sm) */
@media (min-width: 400px) and (max-width: 599px) {
  .progress-container {
    gap: 6px;
    padding: 28px 0px;
  }

  .step-frame {
    margin: 0px -1px;
  }

  .step-frame-last {
    width: 80px;
  }

  .step-row {
    width: 140px;
    gap: 10px;
  }

  .step-line {
    width: 90px;
  }

  .step-content {
    width: 140px;
  }

  .step-status {
    width: 38px;
    height: 38px;
  }

  .step-number {
    font-size: 12px;
  }

  .step-detail {
    font-size: 16px;
  }

  .step-caption {
    font-size: 11px;
  }
}

/* Medium screens - 600px and above (md) */
/* Base styles already handle this size, no overrides needed */
</style>
