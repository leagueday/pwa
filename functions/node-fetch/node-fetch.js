const fetch = require('node-fetch')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
}

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const foreignUrl = queryStringParameters.url

  const response = await fetch(foreignUrl)

  return response.ok
    ? {
        body: await response.text(),
        headers: {
          ...headers,
          'content-type': response.headers.get('content-type'),
        },
        statusCode: 200,
      }
    : {
        statusCode: 502,
        body: 'Bad Gateway',
      }
}

module.exports = { handler }
