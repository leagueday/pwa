const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client')
const fetch = require('cross-fetch')

const ADDRESS = 'https://hungry-pasteur-258023.netlify.app'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: ADDRESS + '/.netlify/functions/graphql',
    fetch,
  }),
})
