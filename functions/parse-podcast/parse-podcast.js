const {Client: FaunaClient, query: q} = require('faunadb')
const RssParser = require('rss-parser')

const parser = new RssParser({
  defaultRSS: 2.0
})

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const podcastId = queryStringParameters.podcastId
  const podcastRssUrl = queryStringParameters.podcastUrl

  const faunaClient = new FaunaClient({
    secret: process.env.FAUNADB_SECRET
  })

  try {
    const feed = await parser.parseURL(podcastRssUrl)

    const data = {
      feed,
      id: podcastId,
      t: (new Date()).toISOString(),
      url: podcastRssUrl,
    }

    await faunaClient.query(
      q.Let(
        {
          match: q.Match(q.Index('parsed_podcast_rss_url'), podcastRssUrl),
        },
        q.If(
          q.Exists(q.Var('match')),
          q.Update(q.Select('ref', q.Get(q.Var('match'))), { data }),
          q.Create(q.Collection('parsed_podcast_rss'), { data })
        )
      )
    )

    return {
      body: 'OK',
      headers: {
      },
      statusCode: 200,
    }
  } catch (err) {
    console.error(err)
    return {
      body: 'Internal Server Error',
      statusCode: 500,
    }
  }
}

module.exports = { handler }
