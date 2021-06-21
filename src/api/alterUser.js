import { makeRequestHeaders } from './util'

const ALTER_USER_ENDPOINT = `/.netlify/functions/fauna-alter-user`

const alterUser = async (bearerToken, userEmail, data) => {
  const params = new URLSearchParams({
    userEmail,
    data: JSON.stringify(data),
  })

  return fetch(`${ALTER_USER_ENDPOINT}?${params}`, {
    headers: makeRequestHeaders(bearerToken),
  })
}

export default alterUser;