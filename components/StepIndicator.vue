<template>
  <div class="progress-container">
    <!-- Step 1 -->
    <div class="step-frame">
      <div class="step-row">
        <div class="step-status">
          <div 
            class="step-circle"
            :class="getStepClasses(1).circle"
          >
            <span 
              class="step-number"
              :class="getStepClasses(1).number"
            >
              {{ getStepIcon(1) }}
            </span>
          </div>
        </div>
        <div class="step-line" :class="getStepLineClasses(1)"></div>
      </div>
      <div class="step-content">
        <div class="step-text">
          <div class="step-caption">ขั้นตอนที่ 1</div>
          <div class="step-detail" :class="getStepClasses(1).text">รายได้</div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="step-frame">
      <div class="step-row">
        <div class="step-status">
          <div 
            class="step-circle"
            :class="getStepClasses(2).circle"
          >
            <span 
              class="step-number"
              :class="getStepClasses(2).number"
            >
              {{ getStepIcon(2) }}
            </span>
          </div>
        </div>
        <div class="step-line" :class="getStepLineClasses(2)"></div>
      </div>
      <div class="step-content">
        <div class="step-text">
          <div class="step-caption">ขั้นตอนที่ 2</div>
          <div class="step-detail" :class="getStepClasses(2).text">ค่าลดหย่อน</div>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="step-frame step-frame-last">
      <div class="step-row">
        <div class="step-status">
          <div 
            class="step-circle"
            :class="getStepClasses(3).circle"
          >
            <span 
              class="step-number"
              :class="getStepClasses(3).number"
            >
              {{ getStepIcon(3) }}
            </span>
          </div>
        </div>
      </div>
      <div class="step-content">
        <div class="step-text">
          <div class="step-caption">ขั้นตอนที่ 3</div>
          <div class="step-detail" :class="getStepClasses(3).text">คำนวนภาษี</div>
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

// Helper function to get step classes
const getStepClasses = (step) => {
  const isActive = props.currentStep === step
  const isCompleted = props.currentStep > step
  
  if (isActive) {
    return {
      circle: 'step-circle-active',
      text: 'text-emerald-500',
      number: 'text-white'
    }
  } else if (isCompleted) {
    return {
      circle: 'step-circle-completed',
      text: 'text-emerald-500',
      number: 'text-white'
    }
  } else {
    return {
      circle: 'step-circle-inactive',
      text: 'text-gray-600',
      number: 'text-gray-600'
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.step-circle-inactive {
  background: #D3DFE6;
  border: 2px solid #D3DFE6;
}

.step-circle-inactive::before {
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
  background: #10B981;
  border: 2px solid #10B981;
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
  border: 2px solid #D3DFE6;
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: all 0.3s ease;
}

.step-line-inactive {
  border-color: #D3DFE6;
}

.step-line-completed {
  border-color: #10B981;
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
  font-size: 17px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.16px;
  color: #01172B;
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: color 0.3s ease;
}

.step-frame:nth-child(2) .step-detail {
  width: 83px;
}

.step-frame-last .step-detail {
  width: 81px;
}

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
