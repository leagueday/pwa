import { makeRequestHeaders } from './util'

const CHANNELS_ENDPOINT = '/.netlify/functions/fauna-channels'

const scrub = channel => {
  for (let key of Object.keys(channel)) {
    const trimmedValue = channel[key].replace(/^\s+/, '').replace(/\s+$/, '')

    if (trimmedValue === '') delete channel[key]
    else channel[key] = trimmedValue
  }

  return channel
}

const operateChannels = (bearerToken, op, channel) => {
  const params = new URLSearchParams({
    op,
    channel: channel ? JSON.stringify(channel) : null,
  })

  return fetch(`${CHANNELS_ENDPOINT}?${params.toString()}`, {
    headers: makeRequestHeaders(bearerToken),
  })
    .then(res =>
      res.headers.get('Content-Type') === 'application/json'
        ? res.json()
        : res.text()
    )
    .catch(err => {
      if (NODE_ENV === 'development')
        console.error('channel ops request error', err)
      return err.message
    })
}

const ChannelsOperations = {
  add: (bearerToken, channel) =>
    operateChannels(bearerToken, 'add', scrub(channel)),
  fetch: bearerToken => operateChannels(bearerToken, 'fetch'),
  remove: (bearerToken, channel) =>
    operateChannels(bearerToken, 'remove', channel),
  update: (bearerToken, channel) =>
    operateChannels(bearerToken, 'update', scrub(channel)),
}

export default ChannelsOperations
