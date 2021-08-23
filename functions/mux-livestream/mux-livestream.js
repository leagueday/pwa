const fetch = require('node-fetch')

const userName = 'e6dc9a66-fb63-414b-b187-6a39aaa6583f'
const accessToken =
  '2bGfOofUHoMPq5PtL6yb/peOp80MyN2VGsgLb5nIaREZhQ51iAtDdd4yR0pIp0bXYWWki2lcHVS'
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

  const { url, passthrough } = JSON.parse(event.body)
  const bodyData = JSON.stringify({
    "playback_policy": "public",
    "new_asset_settings": {
      "playback_policy": "public"
    },
    "passthrough": passthrough,
    "audio_only": true
  })

  const response = await fetch(`https://api.mux.com/${url}`,
    {
      method: 'POST',
      body: bodyData,
      headers
    })

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
