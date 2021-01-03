const fetch = require('node-fetch')
// const FileType = require('file-type')

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

  if (queryStringParameters.kind === 'imgBlob') {
    // Netlify restricts lambda responses to strings.
    // So here we encode a base-64 string.
    const buffer = await response.buffer()
    // const bufferFileType = JSON.stringify(await FileType.fromBuffer(buffer))
    const base64String = buffer.toString('base64')

    return {
      body: base64String,
      headers: {
        'content-type': contentType,
        // 'x-file-type': bufferFileType,
      },
      isBase64Encoded: true,
      statusCode: 200,
    }
  } else if (queryStringParameters.kind === 'doc') {
    return {
      body: await response.text(),
      headers: {
        'content-type': contentType,
      },
      statusCode: 200,
    }
  } else {
    return Promise.resolve({
      statusCode: 400,
      body: 'Bad Request'
    })
  }
}

module.exports = { handler }
