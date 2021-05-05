var assert = require('assert')
const axios = require('axios')

const { client } = require('../api/graphqlClient')

describe('Networking tests', function () {
  const axiosClient = axios.create({ baseURL: ADDRESS })
  it('Simple connection', async () => {
    const result = await axiosClient.get('/graphql')
    assert(result)
  })

  describe('Set up ApolloClient', () => {
    it('Requests podcast episodes', async () => {
      const result = await client.query({
        query: gql`
          query {
            podcastEpisodes {
              episode
              url
              title
            }
          }
        `,
      })

      assert(result)
      assert(result.data.podcastEpisodes)
    })

    it('Makes a call for 2 collections', async () => {
      const result = await client.query({
        query: gql`
          query {
            podcastEpisodes {
              episode
              url
              title
            }
            podcastFeeds {
              id
              imageUrl
              description
              title
              channelId
            }
          }
        `,
      })

      assert(result)
      assert(result.data.podcastFeeds)
      assert(result.data.podcastEpisodes)
    })
  })

  it('Works with example call', async () => {
    const { ApolloClient, InMemoryCache } = require('@apollo/client')

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: 'https://48p1r2roz4.sse.codesandbox.io',
        fetch,
      }),
    })

    const result = await client.query({
      query: gql`
        query GetRates {
          rates(currency: "USD") {
            currency
          }
        }
      `,
    })

    assert(result.data.rates[0])
    assert(result.data.rates[0].__typename)
    assert(result.data.rates[0].currency)
  })
})
