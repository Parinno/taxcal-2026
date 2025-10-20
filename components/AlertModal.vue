<template>
  <!-- Overlay Background -->
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
    @click="handleOverlayClick"
  >
    <!-- Alert Box -->
    <div
      class="bg-white rounded-3xl p-8 mx-4 max-w-sm w-full shadow-2xl"
      @click.stop
    >
      <!-- Alert Message -->
      <div class="text-center mb-6">
        <p class="text-gray-800 text-lg font-medium">
          กรุณาระบุรายได้
        </p>
      </div>

      <!-- Close Button -->
      <div class="text-center">
        <button
          @click="handleClose"
          class="bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-semibold py-3 px-8 rounded-full hover:from-teal-500 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          ปิด
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close', 'update:show'])

// Local state
const isVisible = ref(props.show)

// Watch for prop changes
watch(() => props.show, (newValue) => {
  isVisible.value = newValue
})

// Handle close button click
const handleClose = () => {
  isVisible.value = false
  emit('close')
  emit('update:show', false)
}

// Handle overlay click (close on background click)
const handleOverlayClick = () => {
  handleClose()
}

// Expose methods for parent component
defineExpose({
  show: () => {
    isVisible.value = true
  },
  hide: () => {
    isVisible.value = false
  }
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
