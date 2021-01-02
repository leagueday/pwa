const fetch = require('node-fetch')

/*
const handler = async function () {
  try {
    const response = await fetch('https://icanhazdadjoke.com', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log (where is the netlify function log?)
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}
*/

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const foreignUrl = queryStringParameters.url

  if (queryStringParameters?.kind === 'imgBlob') {
    const response = await fetch(foreignUrl)

    if (!response.ok) {
      return {
        statusCode: 502,
        body: 'Bad Gateway'
      }
    }
    else {
      // netlify restricts lambda responses to strings...
      // so here we have to encode a base-64 string
      const buffer = await response.buffer()
      return {
        body: buffer.toString('base64'),
        isBase64Encoded: true,
        statusCode: 200,
      }
    }
  }
  else {
    return Promise.resolve({
      statusCode: 400,
      body: 'Bad Request'
    })
  }
}

module.exports = { handler }
