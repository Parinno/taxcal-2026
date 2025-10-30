interface GoogleSheetsResponse {
  success: boolean
  message: string
  data?: any
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
    const headers = Object.keys(payload)
    const values = Object.values(payload)
    
    const response = await $fetch('/api/google-sheets/append', {
      method: 'POST',
      body: {
        headers,
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
