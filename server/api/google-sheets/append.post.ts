import { google } from 'googleapis'
import { readFileSync } from 'fs'
import { join } from 'path'

// Read service account from JSON file
const serviceAccountPath = join(process.cwd(), 'service-account.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

   // Get spreadsheetId and range from environment variables
   const spreadsheetId = process.env.GOOGLE_SHEETS_ID
   const range = process.env.GOOGLE_SHEETS_RANGE

   const { values } = body

   if (!spreadsheetId || !range) {
     throw createError({
       statusCode: 500,
       statusMessage: 'Missing environment variables: GOOGLE_SHEETS_ID and GOOGLE_SHEETS_RANGE must be set'
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
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Append to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values
      }
    })

    return {
      success: true,
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
