export const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID
export const ACCESS_CODE = Buffer.from(`${process.env.AUTH_CLIENT_ID}:${process.env.AUTH_SECRET}`).toString('base64')
