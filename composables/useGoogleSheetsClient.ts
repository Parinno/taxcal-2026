import { ref, readonly } from 'vue'
import { loadGapiInsideDOM } from 'gapi-script'

interface GoogleSheetsResponse {
  success: boolean
  message: string
  data?: any
}

interface GoogleSheetsConfig {
  spreadsheetId: string
  range: string
  clientId: string
  apiKey: string
}

export const useGoogleSheetsClient = () => {
  const config = useRuntimeConfig()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isAuthenticated = ref(false)
  const gapi = ref<any>(null)

  // Initialize Google API
  const initializeGapi = async () => {
    try {
      const gapiInstance = await loadGapiInsideDOM()
      gapi.value = gapiInstance
      
      await gapiInstance.load('client:auth2', async () => {
        await gapiInstance.client.init({
          apiKey: config.public.googleApiKey,
          clientId: config.public.googleClientId,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          scope: 'https://www.googleapis.com/auth/spreadsheets'
        })
      })
      
      return gapiInstance
    } catch (err) {
      console.error('Failed to initialize Google API:', err)
      throw err
    }
  }

  // Authenticate user
  const authenticate = async (): Promise<boolean> => {
    try {
      if (!gapi.value) {
        await initializeGapi()
      }

      const authInstance = gapi.value.auth2.getAuthInstance()
      const user = await authInstance.signIn()
      
      isAuthenticated.value = user.isSignedIn()
      return isAuthenticated.value
    } catch (err) {
      console.error('Authentication failed:', err)
      error.value = `Authentication failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      return false
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      if (gapi.value) {
        const authInstance = gapi.value.auth2.getAuthInstance()
        await authInstance.signOut()
        isAuthenticated.value = false
      }
    } catch (err) {
      console.error('Sign out failed:', err)
    }
  }

  // Append data to Google Sheets
  const appendData = async (
    payload: Record<string, any>,
    customConfig?: Partial<GoogleSheetsConfig>
  ): Promise<GoogleSheetsResponse> => {
    const sheetsConfig: GoogleSheetsConfig = {
      spreadsheetId: customConfig?.spreadsheetId || config.public.googleSheetsId,
      range: customConfig?.range || config.public.googleSheetsRange,
      clientId: config.public.googleClientId,
      apiKey: config.public.googleApiKey
    }
    isLoading.value = true
    error.value = null

    try {
      if (!isAuthenticated.value) {
        const authSuccess = await authenticate()
        if (!authSuccess) {
          throw new Error('Authentication required')
        }
      }

      const values = Object.values(payload)
      
      const response = await gapi.value.client.sheets.spreadsheets.values.append({
        spreadsheetId: sheetsConfig.spreadsheetId,
        range: sheetsConfig.range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [values]
        }
      })

      return {
        success: true,
        message: 'Data appended successfully to Google Sheets',
        data: response.result
      }
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

  // Save multiple rows to Google Sheets
  const saveMultipleRows = async (
    dataArray: Record<string, any>[],
    customConfig?: Partial<GoogleSheetsConfig>
  ): Promise<GoogleSheetsResponse> => {
    const sheetsConfig: GoogleSheetsConfig = {
      spreadsheetId: customConfig?.spreadsheetId || config.public.googleSheetsId,
      range: customConfig?.range || config.public.googleSheetsRange,
      clientId: config.public.googleClientId,
      apiKey: config.public.googleApiKey
    }
    isLoading.value = true
    error.value = null

    try {
      if (!isAuthenticated.value) {
        const authSuccess = await authenticate()
        if (!authSuccess) {
          throw new Error('Authentication required')
        }
      }

      if (dataArray.length === 0) {
        return {
          success: false,
          message: 'No data provided to save'
        }
      }

      // Get headers from the first object
      const headers = Object.keys(dataArray[0] || {})
      
      // Convert all objects to arrays
      const values = dataArray.map(obj =>
        headers.map(header => obj[header] !== undefined ? obj[header] : '')
      )
      
      // Combine headers and values
      const dataToSave = [headers, ...values]

      const response = await gapi.value.client.sheets.spreadsheets.values.update({
        spreadsheetId: sheetsConfig.spreadsheetId,
        range: sheetsConfig.range,
        valueInputOption: 'RAW',
        resource: {
          values: dataToSave
        }
      })

      return {
        success: true,
        message: `Successfully saved ${dataArray.length} rows to Google Sheets`,
        data: response.result
      }
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

  // Read data from Google Sheets
  const readData = async (customConfig?: Partial<GoogleSheetsConfig>): Promise<GoogleSheetsResponse> => {
    const sheetsConfig: GoogleSheetsConfig = {
      spreadsheetId: customConfig?.spreadsheetId || config.public.googleSheetsId,
      range: customConfig?.range || config.public.googleSheetsRange,
      clientId: config.public.googleClientId,
      apiKey: config.public.googleApiKey
    }
    isLoading.value = true
    error.value = null

    try {
      if (!isAuthenticated.value) {
        const authSuccess = await authenticate()
        if (!authSuccess) {
          throw new Error('Authentication required')
        }
      }

      const response = await gapi.value.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetsConfig.spreadsheetId,
        range: sheetsConfig.range
      })

      return {
        success: true,
        message: 'Data read successfully from Google Sheets',
        data: response.result.values || []
      }
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

  // Clear error state
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    isLoading: readonly(isLoading),
    error: readonly(error),
    isAuthenticated: readonly(isAuthenticated),
    
    // Methods
    initializeGapi,
    authenticate,
    signOut,
    appendData,
    saveMultipleRows,
    readData,
    clearError
  }
}
