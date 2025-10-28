import { google } from 'googleapis'

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
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Update the spreadsheet
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values
      }
    })

    return {
      success: true,
      updatedRows: response.data.updatedRows,
      updatedColumns: response.data.updatedColumns,
      updatedCells: response.data.updatedCells
    }
  } catch (error) {
    console.error('Google Sheets API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Google Sheets API error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
})
