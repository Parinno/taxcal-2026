import { appendToGoogleSheets, saveMultipleRowsToGoogleSheets, type GoogleSheetsResponse } from '@/utils/googleSheets'

export const useGoogleSheets = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Append data to Google Sheets with loading state management
   */
  const appendData = async (
    payload: Record<string, any>
  ): Promise<GoogleSheetsResponse> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await appendToGoogleSheets(payload)
      
      if (!result.success) {
        error.value = result.message
      }
      
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Save multiple rows to Google Sheets with loading state management
   */
  const saveMultipleRows = async (
    dataArray: Record<string, any>[]
  ): Promise<GoogleSheetsResponse> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await saveMultipleRowsToGoogleSheets(dataArray)
      
      if (!result.success) {
        error.value = result.message
      }
      
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Clear error state
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Methods
    appendData,
    saveMultipleRows,
    clearError
  }
}
