const {Client, query: q} = require('faunadb')

const STATUS_OK = 0
const STATUS_NOT_FOUND = 1
const STATUS_OTHER_ERROR = 5

const errorToStatus = err =>
  err.message === 'instance not found'
    ? [STATUS_NOT_FOUND, err.message]
    : [STATUS_OTHER_ERROR, err.message]

const queryPodcastById = async (client, id) => {
  try {
    const clientResponse = await client.query(
      q.Get(
        q.Match(
          q.Index('parsed_podcast_rss_id'), id)
      )
    )

    return [STATUS_OK, clientResponse.data]
  } catch (err) {
    return errorToStatus(err)
  }
}

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const {user} = context.clientContext

  if (!user) {
    return {
      body: 'Unauthorized',
      statusCode: 401,
    }
  }

  const podcastId = queryStringParameters ? queryStringParameters.id : null

  if (!podcastId) {
    return {
      body: 'Bad Request',
      statusCode: 400,
    }
  }

  const client = new Client({
    secret: process.env.FAUNADB_SECRET
  })

  const [status, data] = await queryPodcastById(client, podcastId)

  if (status === STATUS_OK) {
    return {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      statusCode: 200,
    }
  } else {
    return {
      body: 'Not Found',
      statusCode: 404,
    }
  }
}

module.exports = { handler }
