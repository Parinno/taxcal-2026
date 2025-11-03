import { google } from 'googleapis'
import { GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL, GOOGLE_SHEETS_ID,GOOGLE_SHEETS_RANGE } from '@/config/google'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

   // Get spreadsheetId and range from environment variables
   const spreadsheetId = GOOGLE_SHEETS_ID
   const range = GOOGLE_SHEETS_RANGE

   const { values, headers } = body

   if (!spreadsheetId || !range) {
     throw createError({
       statusCode: 500,
       statusMessage: 'Missing environment variables: GOOGLE_SHEETS_ID or GOOGLE_SHEETS_RANGE must be set'
     })
   }

   if (!values) {
     throw createError({
       statusCode: 400,
       statusMessage: 'Missing required parameter: values'
     })
   }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({ 
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Extract sheet name from range (e.g., "Sheet1!A1:Z" -> "Sheet1", "A1:Z" -> null)
    const rangeParts = range.includes('!') ? range.split('!') : [null, range]
    const sheetName = rangeParts[0]
    
    // Build header range (first row of the sheet)
    const headerRange = sheetName ? `${sheetName}!1:1` : '1:1'

    // Check if sheet is empty (no headers exist)
    let needsHeaders = false
    if (headers && Array.isArray(headers) && headers.length > 0) {
      try {
        const currentData = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: headerRange
        })
        
        // If first row is empty or doesn't exist, we need to add headers
        needsHeaders = !currentData.data.values || currentData.data.values.length === 0
      } catch (error: any) {
        // If range doesn't exist or is empty, we need to add headers
        if (error.code === 400 || error.message?.includes('Unable to parse range')) {
          needsHeaders = true
        } else {
          throw error
        }
      }
    }

    // Get cookie from request
    const finnakies = getCookie(event, 'finnakies') || ''

    // Add headers if needed
    if (needsHeaders && headers) {
      const headerRow = [...headers, 'finnakies', 'createdAt']
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: headerRange,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headerRow]
        }
      })
    }

    // Append to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: values.map((row: any[]) => [
          ...(Array.isArray(row) ? row : []),
          finnakies,
          new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })
        ])
      }
    })

    return {
      success: true,
      headersAdded: needsHeaders,
      updatedRows: response.data.updates?.updatedRows,
      updatedColumns: response.data.updates?.updatedColumns,
      updatedCells: response.data.updates?.updatedCells
    }
  } catch (error) {
    console.error('Google Sheets API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Google Sheets API error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
})
