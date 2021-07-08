const fetch = require('node-fetch')

const apiKey = "keymd23kpZ12EriVi"
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
}

const handler = async (event, context) => {
  const { url, body } = JSON.parse(event.body)

  const response = await fetch(`https://api.airtable.com/v0/${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  return {
    body: await response.text(),
    headers: headers,
    statusCode: response.status,
  }
}

module.exports = { handler }
