const { Client, query: q } = require('faunadb')

const PODCAST_LIST_DOCUMENT_ID = '4c557056-1de3-4dad-b78e-a1d3c3892657'

const STATUS_BAD_PARAMS = -1
const STATUS_OK = 0
const STATUS_NOT_FOUND = 1
const STATUS_OTHER_ERROR = 5

const errorToStatus = err =>
  err.message === 'instance not found'
    ? [STATUS_NOT_FOUND, err.message]
    : [STATUS_OTHER_ERROR, err.message]

const checkIsAdminUser = async (client, email) => {
  if (!email) {
    return [STATUS_OK, false]
  }

  try {
    const isAdmin = await client.query(
      q.Let(
        {
          doc: q.Get(q.Match(q.Index('user_email'), email)),
        },
        q.Select(['data', 'isAdmin'], q.Var('doc'), false)
      )
    )

    return [STATUS_OK, isAdmin]
  } catch (err) {
    return errorToStatus(err)
  }
}

const fetchList = async client => {
  try {
    const {
      data: { podcasts },
    } = await client.query(
      q.Get(q.Match(q.Index('control_id'), PODCAST_LIST_DOCUMENT_ID))
    )

    return [STATUS_OK, podcasts]
  } catch (err) {
    return errorToStatus(err)
  }
}

const addToList = async (client, url) => {
  if (!url) {
    return [STATUS_BAD_PARAMS, null]
  }

  try {
    // prettier-ignore
    await client.query(
      q.Let(
        {
          match: q.Match(q.Index('control_id'), PODCAST_LIST_DOCUMENT_ID),
          doc: q.Get(q.Var('match')),
          podcasts: q.Select(['data', 'podcasts'], q.Var('doc')),
        },
        q.Update(
          q.Select(['ref'], q.Var('doc')),
          {
            data: {
              podcasts: q.Append(
                { url },
                q.Var('podcasts'),
              )
            }
          }
        )
      )
    )
    return [STATUS_OK, null]
  } catch (err) {
    console.error(err)
    return errorToStatus(err)
  }
}

const removeFromList = async (client, url) => {
  if (!url) {
    return [STATUS_BAD_PARAMS, null]
  }

  try {
    // prettier-ignore
    await client.query(
      q.Let(
        {
          match: q.Match(q.Index('control_id'), PODCAST_LIST_DOCUMENT_ID),
          doc: q.Get(q.Var('match')),
          podcasts: q.Select(['data', 'podcasts'], q.Var('doc')),
        },
        q.Update(
          q.Select(['ref'], q.Var('doc')),
          {
            data: {
              podcasts: q.Filter(
                q.Var('podcasts'),
                q.Lambda(
                  'i',
                  q.Not(
                    q.Equals(
                      url,
                      q.Select(['url'], q.Var('i'))
                    )
                  )
                )
              )
            }
          }
        )
      )
    )
    return [STATUS_OK, null]
  } catch (err) {
    console.error(err)
    return errorToStatus(err)
  }
}

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const { user } = context.clientContext

  const opParameter = queryStringParameters ? queryStringParameters.op : null
  const urlParameter =
    queryStringParameters && queryStringParameters.url
      ? queryStringParameters.url
      : null

  if (process.env.NODE_ENV === 'development')
    console.log('fauna-podcasts-list', opParameter, urlParameter)

  // obtain the user email from the context, depends on netlify identity
  const userEmail = user ? user.email : null

  const client = new Client({
    secret: process.env.FAUNADB_SECRET,
  })

  let [status, resultOrDiagnostic] = await checkIsAdminUser(client, userEmail)

  if (status !== STATUS_OK) {
    console.error(resultOrDiagnostic)

    return {
      body: 'Internal Server Error',
      statusCode: 500,
    }
  } else if (!resultOrDiagnostic) {
    return {
      body: 'Unauthorized',
      statusCode: 401,
    }
  }

  if (opParameter === 'fetch') {
    ;[status, resultOrDiagnostic] = await fetchList(client)
  } else if (opParameter === 'add') {
    ;[status, resultOrDiagnostic] = await addToList(client, urlParameter)
  } else if (opParameter === 'remove') {
    ;[status, resultOrDiagnostic] = await removeFromList(client, urlParameter)
  } else
    return {
      body: 'Bad Request',
      statusCode: 400,
    }

  if (status === STATUS_BAD_PARAMS) {
    return {
      body: 'Bad Request',
      statusCode: 400,
    }
  } else if (status !== STATUS_OK) {
    console.error(resultOrDiagnostic)

    return {
      body: 'Internal Server Error',
      statusCode: 500,
    }
  } else
    return {
      body: JSON.stringify(resultOrDiagnostic),
      headers: {
        'content-type': 'application/json',
      },
      statusCode: 200,
    }
}

module.exports = { handler }
