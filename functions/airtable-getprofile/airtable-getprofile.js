const fetch = require('node-fetch')

const apiKey = 'keyEcVKWAxBoB9kuq'
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
   Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
}

const handler = async (event, context) => {
  const { url, body } = JSON.parse(event.body)
  // console.log('body',body)
  
  const response = await fetch(`https://api.airtable.com/v0/${url}`, {
    method: 'GET',
    headers,
  })

  return {
    body: await response.text(),
    headers: headers,
    statusCode: response.status,
  }
}

module.exports = { handler }