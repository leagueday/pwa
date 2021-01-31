const fetch = require('node-fetch')
// const FileType = require('file-type')

const PROXY_RESPONSE_KIND_IMG = 'imgBlob'
const PROXY_RESPONSE_KIND_DOC = 'doc'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS'
};

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const foreignUrl = queryStringParameters.url

  const response = await fetch(foreignUrl)

  if (!response.ok) {
    return {
      statusCode: 502,
      body: 'Bad Gateway'
    }
  }

  const contentType = response.headers.get('content-type')

  if (queryStringParameters.kind === PROXY_RESPONSE_KIND_IMG) {
    // Netlify restricts lambda responses to strings.
    // So here we encode a base-64 string.
    const buffer = await response.buffer()
    // const bufferFileType = JSON.stringify(await FileType.fromBuffer(buffer))
    const base64String = buffer.toString('base64')

    return {
      body: base64String,
      headers: {
        ...headers,
        'content-type': contentType,
      },
      isBase64Encoded: true,
      statusCode: 200,
    }
  } else if (queryStringParameters.kind === PROXY_RESPONSE_KIND_DOC) {
    return {
      body: await response.text(),
      headers: {
        ...headers,
        'content-type': contentType,
      },
      statusCode: 200,
    }
  } else {
    return Promise.resolve({
      statusCode: 400,
      headers: {
        ...headers,
        'content-type': contentType,
      },
      body: 'Bad Request'
    })
  }
}

module.exports = { handler }
