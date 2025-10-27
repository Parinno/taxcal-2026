import { type GoogleSheetsResponse } from '@/utils/googleSheets'
import { useGoogleSheetsClient } from './useGoogleSheetsClient'

export const useGoogleSheets = () => {
  const { 
    isLoading, 
    error, 
    isAuthenticated,
    authenticate,
    signOut,
    appendData: clientAppendData,
    saveMultipleRows: clientSaveMultipleRows,
    readData: clientReadData,
    clearError: clientClearError
  } = useGoogleSheetsClient()

  /**
   * Append data to Google Sheets with loading state management
   */
  const appendData = async (
    payload: Record<string, any>
  ): Promise<GoogleSheetsResponse> => {
    return await clientAppendData(payload)
  }

  /**
   * Save multiple rows to Google Sheets with loading state management
   */
  const saveMultipleRows = async (
    dataArray: Record<string, any>[]
  ): Promise<GoogleSheetsResponse> => {
    return await clientSaveMultipleRows(dataArray)
  }

  /**
   * Read data from Google Sheets
   */
  const readData = async (): Promise<GoogleSheetsResponse> => {
    return await clientReadData()
  }

  return {
    // State
    isLoading,
    error,
    isAuthenticated,
    
    // Methods
    authenticate,
    signOut,
    appendData,
    saveMultipleRows,
    readData,
    clearError: clientClearError
  }
}
