# Google Sheets Client-Side Setup Guide

## Overview
This application now supports client-side Google Sheets integration using OAuth2 authentication. Users can authenticate with their Google account and directly interact with Google Sheets from the browser.

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create Credentials

#### API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key

#### OAuth2 Client ID
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - Your production domain
6. Copy the Client ID

### 3. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Google API Key
GOOGLE_API_KEY=your_google_api_key_here

# Google OAuth2 Client ID
GOOGLE_CLIENT_ID=your_google_client_id_here

# Google Sheets Configuration
GOOGLE_SHEETS_ID=your_google_sheets_id_here
GOOGLE_SHEETS_RANGE=Sheet1!A:Z
```

### 4. Google Sheet Setup

1. Create a new Google Sheet
2. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
3. Share the sheet with the email address from your OAuth2 Client ID
4. Give "Editor" permissions to the shared email

### 5. Usage

The application now provides a client-side Google Sheets composable:

```typescript
const { 
  isLoading, 
  error, 
  isAuthenticated,
  authenticate,
  signOut,
  appendData,
  saveMultipleRows,
  readData,
  clearError
} = useGoogleSheets()
```

#### Key Features:
- **Authentication**: Users authenticate with their Google account
- **Append Data**: Add new rows to the sheet
- **Save Multiple Rows**: Save multiple rows at once
- **Read Data**: Read data from the sheet
- **Error Handling**: Comprehensive error handling and loading states

#### Example Usage:

```typescript
// Authenticate user
await authenticate()

// Append data
const result = await appendData({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
})

// Read data
const data = await readData()
```

## Migration from Server-Side

The original server-side implementation using service accounts is still available but not recommended for client-side applications. The new client-side implementation:

- ✅ Works in browsers
- ✅ User-specific authentication
- ✅ No server-side credentials needed
- ✅ Better security (user controls their own data)
- ✅ Real-time authentication status

## Troubleshooting

### Common Issues:

1. **"Authentication required" error**: Make sure the user has authenticated with `authenticate()`
2. **"Access denied" error**: Check that the Google Sheet is shared with the authenticated user
3. **"API key not valid" error**: Verify your API key in the environment variables
4. **"Client ID not valid" error**: Check your OAuth2 Client ID configuration

### Debug Steps:

1. Check browser console for detailed error messages
2. Verify environment variables are loaded correctly
3. Ensure Google Sheets API is enabled in Google Cloud Console
4. Check that the sheet ID and range are correct
5. Verify the sheet is shared with the correct email address
