const { Client, query: q } = require('faunadb')

const STATUS_OK = 0
const STATUS_NOT_FOUND = 1
const STATUS_OTHER_ERROR = 5

const errorToStatus = err =>
  err.message === 'instance not found'
    ? [STATUS_NOT_FOUND, err.message]
    : [STATUS_OTHER_ERROR, err.message]

const fetchUserData = async (client, email) => {
  try {
    const clientResponse = await client.query(
      q.Get(q.Match(q.Index('user_email'), email))
    )

    return [STATUS_OK, clientResponse.data]
  } catch (err) {
    return errorToStatus(err)
  }
}

const fetchNonUserData = async client => {
  return fetchUserData(client, 'ANON')
}

const createUserData = async (client, email, name) => {
  try {
    // fetch ANON template user record
    const clientResponse = await client.query(
      q.Get(q.Match(q.Index('user_email'), 'ANON'))
    )

    const templateDocument = clientResponse.data

    // then save template document along with new email and name
    await client.query(
      q.Create(q.Collection('user'), {
        data: { ...templateDocument, email, name },
      })
    )

    return [STATUS_OK, { email, name }]
  } catch (err) {
    return errorToStatus(err)
  }
}

const deleteUserData = async (client, email) => {
  try {
    await client.query(q.Delete(q.Get(q.Match(q.Index('user_email'), email))))

    return [STATUS_OK]
  } catch (err) {
    return errorToStatus(err)
  }
}

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const { user } = context.clientContext

  if (process.env.NODE_ENV === 'development')
    console.log('fauna-view-query', JSON.stringify(user, null, 2))

  // obtain the user email from the context, depends on netlify identity
  const userEmail = user ? user.email : null
  const userName =
    user && user.user_metadata ? user.user_metadata.full_name : null

  const client = new Client({
    secret: process.env.FAUNADB_SECRET,
  })

  let status
  let data = {}
  if (queryStringParameters.doDelete) {
    if (!userEmail)
      return ({
        body: 'Unauthorized',
        statusCode: 401,
      }[status] = await deleteUserData(client, userEmail))
  } else {
    if (userEmail) {
      ;[status, data] = await fetchUserData(client, userEmail)

      if (status === STATUS_NOT_FOUND) {
        ;[status, data] = await createUserData(client, userEmail, userName)
      }
    } else {
      // note this branch is specifically not authenticated
      ;[status, data] = await fetchNonUserData(client)
    }
  }

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
      body: JSON.stringify({
        error: {
          description: `unhandled: ${data}`,
        },
      }),
      headers: {
        'content-type': 'application/json',
      },
      statusCode: 200,
    }
  }
}

module.exports = { handler }
