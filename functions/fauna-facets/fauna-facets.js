const { Client, query: q } = require('faunadb')

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

const addFacet = async (client, facet) => {
  if (!facet) {
    return [STATUS_BAD_PARAMS, null]
  }

  try {
    // prettier-ignore
    await client.query(
      q.Create(
        q.Collection('facet'),
        {
          data: facet,
        },
      )
    )
    return [STATUS_OK, null]
  } catch (err) {
    console.error(err)
    return errorToStatus(err)
  }
}

const fetchFacets = async client => {
  try {
    // prettier-ignore
    let {data} = await client.query(
      q.Map(
        q.Paginate(
          q.Documents(
            q.Collection('facet')
          ),
          { size: 99999 }
        ),
        q.Lambda(x => q.Get(x))
      )
    )

    data = data.map(record => record.data)

    return [STATUS_OK, data]
  } catch (err) {
    return errorToStatus(err)
  }
}

const removeFacet = async (client, facet) => {
  if (!facet) {
    return [STATUS_BAD_PARAMS, null]
  }

  try {
    return [STATUS_OTHER_ERROR, 'not implemented']
  } catch (err) {
    console.error(err)
    return errorToStatus(err)
  }
}

const updateFacet = async (client, facet) => {
  if (!facet) {
    return [STATUS_BAD_PARAMS, null]
  }

  try {
    // prettier-ignore
    await client.query(
      q.Let(
        {
          doc: q.Get(
            q.Match(
              q.Index('facet_title'),
              facet.title
            )
          ),
          ref: q.Select(
            ['ref'],
            q.Var('doc')
          ),
        },
        q.Update(q.Var('ref'), { data: facet })
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
  const facetParameter =
    queryStringParameters && queryStringParameters.facet
      ? JSON.parse(queryStringParameters.facet)
      : null

  if (process.env.NODE_ENV === 'development')
    console.log('fauna-facets', opParameter, JSON.stringify(facetParameter))

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
    ;[status, resultOrDiagnostic] = await fetchFacets(client)
  } else if (opParameter === 'add') {
    ;[status, resultOrDiagnostic] = await addFacet(client, facetParameter)
  } else if (opParameter === 'update') {
    ;[status, resultOrDiagnostic] = await updateFacet(client, facetParameter)
  } else if (opParameter === 'remove') {
    ;[status, resultOrDiagnostic] = await removeFacet(client, facetParameter)
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
