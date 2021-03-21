// -*-*-*-*- WIP -*-*-*-*-

const {Client, query: q} = require('faunadb')

const STATUS_OK = 0
const STATUS_NOT_FOUND = 1
const STATUS_OTHER_ERROR = 5

const errorToStatus = err =>
  err.message === 'instance not found'
    ? [STATUS_NOT_FOUND, err.message]
    : [STATUS_OTHER_ERROR, err.message]

const checkIsAdminUser = async (client, email) => {
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

const alterUser = async (client, userEmail, data) => {
  try {
    await client.query(
      q.Let(
        {
          doc: q.Get(q.Match(q.Index('user_email'), userEmail)),
          ref: q.Select(['ref'], q.Var('doc')),
        },
        q.Update(q.Var('ref'), { data })
      )
    )

    return [STATUS_OK]
  } catch (err) {
    return errorToStatus(err)
  }
}

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const {user} = context.clientContext

  if (process.env.NODE_ENV === 'development')
    console.log('fauna-alter-user', user, queryStringParameters)

  // obtain the user email from the context, depends on netlify identity
  const userEmail = user ? user.email : null

  if (!userEmail) return {
    body: 'Unauthorized',
    statusCode: 401,
  }

  const userEmailParameter = queryStringParameters ? queryStringParameters.userEmail : null
  const data = queryStringParameters ? JSON.parse(queryStringParameters.data) : null

  if (!userEmailParameter || !data) return {
    body: 'Bad Request',
    statusCode: 400,
  }

  const client = new Client({
    secret: process.env.FAUNADB_SECRET
  })

  const checkPermission = userEmailParameter === userEmail
    ? () => Promise.resolve([STATUS_OK, true])
    : () => checkIsAdminUser(client, userEmail)

  let [status, resultOrDiagnostic] = await checkPermission()

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

  [status, resultOrDiagnostic] = await alterUser(client, userEmailParameter, data)

  if (status !== STATUS_OK) {
    console.error(resultOrDiagnostic)

    return {
      body: 'Internal Server Error',
      statusCode: 500,
    }
  }

  return {
    body: 'OK',
    statusCode: 200,
  }
}

module.exports = { handler }
