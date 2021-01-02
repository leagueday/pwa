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

const handler = async function () {
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({ msg: 'hi from netlify function' }),
  })
}

module.exports = { handler }
