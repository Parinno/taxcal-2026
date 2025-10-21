interface GoogleSheetsResponse {
  success: boolean
  message: string
  data?: any
}

/**
 * Save multiple rows to Google Sheets
 * @param dataArray - Array of objects to save
 * @param config - Google Sheets configuration
 * @returns Promise with success status and message
 */
export async function saveMultipleRowsToGoogleSheets(
  dataArray: Record<string, any>[]
): Promise<GoogleSheetsResponse> {
  try {
    if (dataArray.length === 0) {
      return {
        success: false,
        message: 'No data provided to save'
      }
    }

    // Get headers from the first object, ensuring it's defined
    const headers = dataArray[0] ? Object.keys(dataArray[0]) : []

    // Convert all objects to arrays
    const values = dataArray.map(obj =>
      headers.map(header => (obj && obj[header] !== undefined ? obj[header] : ''))
    )
    
    // Combine headers and values
    const dataToSave = [headers, ...values]
    
    const response = await $fetch('/api/google-sheets', {
      method: 'POST',
      body: {
        values: dataToSave
      }
    })
    
    return {
      success: true,
      message: `Successfully saved ${dataArray.length} rows to Google Sheets`,
      data: response
    }
  } catch (error) {
    console.error('Error saving multiple rows to Google Sheets:', error)
    return {
      success: false,
      message: `Failed to save data: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Append data to existing Google Sheets
 * @param payload - Dynamic object with key-value pairs to append
 * @param config - Google Sheets configuration
 * @returns Promise with success status and message
 */
export async function appendToGoogleSheets(
  payload: Record<string, any>
): Promise<GoogleSheetsResponse> {
  try {
    const values = Object.values(payload)
    
    const response = await $fetch('/api/google-sheets/append', {
      method: 'POST',
      body: {
        values: [values]
      }
    })
    
    return {
      success: true,
      message: 'Data appended successfully to Google Sheets',
      data: response
    }
  } catch (error) {
    console.error('Error appending to Google Sheets:', error)
    return {
      success: false,
      message: `Failed to append data: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

// Export types for use in other files
export type { GoogleSheetsResponse }
