# Google Sheets Integration Setup

This project includes a utility function for saving dynamic data to Google Sheets. Follow these steps to set up the integration.

## Prerequisites

1. A Google Cloud Project with Google Sheets API enabled
2. A Google Service Account with access to your Google Sheets

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 3. Generate Service Account Key

1. Click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose "JSON" format
5. Download the JSON file

### 4. Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Editor" permissions

### 5. Service Account JSON File

Your service account JSON file (`service-account.json`) is already in the project root and contains your Google Service Account credentials.

**Current Configuration:**
- Project ID: `finnomena-staging`
- Service Account Email: `finno-lead-service@finnomena-staging.iam.gserviceaccount.com`
- The JSON file is already configured and ready to use

**Important:** 
- The `service-account.json` file is already in your project root
- No additional setup is required
- Make sure to share your Google Sheet with the service account email above

### 6. Get Your Spreadsheet ID

1. Open your Google Sheet
2. The Spreadsheet ID is in the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## Usage

### Basic Usage

```typescript
import { appendToGoogleSheets } from '@/utils/googleSheets'

// Append data to Google Sheets
const appendResult = await appendToGoogleSheets(
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 25
  },
  {
    spreadsheetId: 'your-spreadsheet-id',
    range: 'Sheet1!A1:Z1000'
  }
)
```

### Advanced Usage

```typescript
import { saveMultipleRowsToGoogleSheets } from '@/utils/googleSheets'

// Save multiple rows
const dataArray = [
  { name: 'John', email: 'john@example.com' },
  { name: 'Jane', email: 'jane@example.com' }
]

const result = await saveMultipleRowsToGoogleSheets(dataArray, {
  spreadsheetId: 'your-spreadsheet-id',
  range: 'Sheet1!A1:Z1000'
})
```

## API Endpoints

The utility functions use these API endpoints:

- `POST /api/google-sheets` - Save/update data in Google Sheets
- `POST /api/google-sheets/append` - Append data to Google Sheets

## Example Page

Visit `/example-input` to see a working example of the Google Sheets integration with a form that allows you to:

- Enter dynamic form data
- Add custom fields
- Configure Google Sheets settings
- Save or append data to Google Sheets
- Preview the data before saving

## Error Handling

All functions return a response object with:

```typescript
{
  success: boolean
  message: string
  data?: any
}
```

Check the `success` field to determine if the operation was successful, and use the `message` field for user feedback.

## Security Notes

- **IMPORTANT**: The service account credentials are stored in `service-account.json`
- This file should be kept secure and not shared publicly
- The file is already in `.gitignore` to prevent accidental commits
- Regularly rotate your service account keys
- Limit service account permissions to only what's needed
- The service account is already configured for the `finnomena-staging` project
