const fetch = require('node-fetch')
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
  Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  'Content-Type': 'application/json',
}

const handler = async (event, context) => {
  const { url } = JSON.parse(event.body)

  const response = await fetch(`https://api.airtable.com/v0/${url}`, {
    headers,
  })

  return {
    body: await response.text(),
    headers: headers,
    statusCode: response.status,
  }
}

module.exports = { handler }
