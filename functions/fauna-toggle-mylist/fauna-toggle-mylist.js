// -*-*-*-*- WIP -*-*-*-*-

const {Client, query: q} = require('faunadb')

const STATUS_OK = 0
const STATUS_NOT_FOUND = 1
const STATUS_OTHER_ERROR = 5

const errorToStatus = err =>
  err.message === 'instance not found'
    ? [STATUS_NOT_FOUND, err.message]
    : [STATUS_OTHER_ERROR, err.message]

const addItemToMyList = async (client, email, kind, id) => {
  try {
    await client.query(
      q.Let(
        {
          doc: q.Get(q.Match(q.Index('user_email'), email)),
          ref: q.Select(['ref'], q.Var('doc')),
          my: q.Select(['data', 'my'], q.Var('doc'), []),
          myNext: q.Append([{kind, id}], q.Var('my')),
        },
        q.Update(
          q.Var('ref'),
          { data: { my: q.Var('myNext') } }
        )
      )
    )

    return [STATUS_OK]
  } catch (err) {
    return errorToStatus(err)
  }
}

const removeItemFromMyList = async (client, email, kind, id) => {
  try {
    await client.query(
      q.Let(
        {
          doc: q.Get(q.Match(q.Index('user_email'), email)),
          ref: q.Select(['ref'], q.Var('doc')),
          my: q.Select(['data', 'my'], q.Var('doc'), []),
          myNext: q.Filter(
            q.Var('my'),
            q.Lambda(
              'i',
              q.Or(
                q.Not(q.Equals(
                  q.Select(['id'], q.Var('i')),
                  id
                )),
                q.Not(q.Equals(
                  q.Select(['kind'], q.Var('i')),
                  kind
                ))
              )
            ),
          ),
        },
        q.Update(
          q.Var('ref'),
          { data: { my: q.Var('myNext') } }
        )
      )
    )

    return [STATUS_OK]
  } catch (err) {
    return errorToStatus(err)
  }
}

const handler = async (event, context) => {
  const queryStringParameters = event.queryStringParameters
  const {identity, user} = context.clientContext

  if (process.env.NODE_ENV === 'development')
    console.log('fauna-toggle-mylist', user, queryStringParameters)

  // obtain the user email from the context, depends on netlify identity
  const userEmail = user?.email

  if (!userEmail) return {
      body: 'Unauthorized',
      statusCode: 401,
    }

  const op = queryStringParameters?.op
  const id = queryStringParameters?.id
  const kind = queryStringParameters?.kind

  if (!op || !id || !kind || (op !== '+' && op !== '-')) return {
      body: 'Bad Request',
      statusCode: 400,
    }

  const client = new Client({
    secret: process.env.FAUNADB_SECRET
  })

  const querySubroutine = op === '+' ? addItemToMyList : removeItemFromMyList

  const [status, diagnostic] = await querySubroutine(client, userEmail, kind, id)

  if (status !== STATUS_OK) {
    if (process.env.NODE_ENV === 'development')
      console.error(diagnostic)

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
