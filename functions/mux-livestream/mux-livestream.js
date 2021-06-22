const fetch = require('node-fetch')
const userName = process.env.REACT_APP_MUX_TOKEN_ID
const accessToken = process.env.REACT_APP_MUX_TOKEN_SECRET
const authString = `${userName}:${accessToken}`
const authStringEncoded = Buffer.from(authString).toString('base64')
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
  Authorization: `Basic ${authStringEncoded}`,
  'Content-Type': 'application/json',
}

const handler = async (event, context) => {
  // const queryStringParameters = event.queryStringParameters
  // const foreignUrl = queryStringParameters.https://api.mux.com/video/v1/live-streams

  const { url } = JSON.parse(event.body)
  const bodyData=JSON.stringify({
    "playback_policy": "public",
    "new_asset_settings": {
      "playback_policy": "public"
    }
  }  )
  const response = await fetch(`https://api.mux.com/${url}`,
   {  method: 'POST',
     body:bodyData,
    headers })

  return {
    body: await response.text(),
    headers: {
      ...headers,
      ...Object.fromEntries(response.headers.entries()),
    },
    statusCode: response.status,
  }
}

module.exports = { handler }
