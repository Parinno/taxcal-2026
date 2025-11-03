<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">Example Input Form</h1>
          <p class="mt-2 text-sm text-gray-600">
            This form demonstrates how to save dynamic data to Google Sheets
          </p>
        </div>

        <div class="p-6">
          <!-- Success/Error Messages -->
          <div v-if="message" :class="[
            'mb-6 p-4 rounded-md',
            messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          ]">
            {{ message }}
          </div>

          <!-- Form -->
          <form @submit.prevent="handleAppend" class="space-y-6">
            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label for="age" class="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  id="age"
                  v-model="formData.age"
                  type="number"
                  min="0"
                  max="120"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your age"
                />
              </div>
            </div>

            <!-- Address Information -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                id="address"
                v-model="formData.address"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your address"
              ></textarea>
            </div>

            <!-- Additional Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="occupation" class="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  id="occupation"
                  v-model="formData.occupation"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your occupation"
                />
              </div>

              <div>
                <label for="income" class="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (THB)
                </label>
                <input
                  id="income"
                  v-model="formData.income"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your monthly income"
                />
              </div>
            </div>

            <!-- Custom Fields Section -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Custom Fields</h3>
              <div class="space-y-4">
                <div v-for="(field, index) in customFields" :key="index" class="flex gap-4">
                  <input
                    v-model="field.key"
                    type="text"
                    placeholder="Field name"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    v-model="field.value"
                    type="text"
                    placeholder="Field value"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    @click="removeCustomField(index)"
                    class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
                <button
                  type="button"
                  @click="addCustomField"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Add Custom Field
                </button>
              </div>
            </div>

            <!-- Submit Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                :disabled="isLoading"
                class="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Appending...' : 'Append to Google Sheets' }}
              </button>

              <button
                type="button"
                @click="resetForm"
                class="flex-1 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset Form
              </button>
            </div>
          </form>

          <!-- Data Preview -->
          <div v-if="Object.keys(formData).length > 0" class="mt-8 border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Data Preview</h3>
            <div class="bg-gray-50 p-4 rounded-md">
              <pre class="text-sm text-gray-700">{{ JSON.stringify(combinedData, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useGoogleSheets } from '@/composables/useGoogleSheets'

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  age: '',
  address: '',
  occupation: '',
  income: ''
})

// Custom fields
const customFields = ref<Array<{ key: string; value: string }>>([])

// UI state
const isLoading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Computed property for combined data
const combinedData = computed(() => {
  const data = { ...formData.value }
  
  // Add custom fields
  customFields.value.forEach(field => {
    if (field.key && field.value) {
      data[field.key as keyof typeof data] = field.value as any
    }
  })
  
  return data
})

// Methods
const addCustomField = () => {
  customFields.value.push({ key: '', value: '' })
}

const removeCustomField = (index: number) => {
  customFields.value.splice(index, 1)
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    occupation: '',
    income: ''
  }
  customFields.value = []
  message.value = ''
}

const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const handleAppend = async () => {
  isLoading.value = true
  message.value = ''

  try {
    const result = await useGoogleSheets(combinedData.value)
    
    if (result.success) {
      showMessage(result.message, 'success')
    } else {
      showMessage(result.message, 'error')
    }
  } catch (error) {
    showMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
  } finally {
    isLoading.value = false
  }
}

// Set page title
useHead({
  title: 'Example Input Form - Google Sheets Integration'
})
</script>
