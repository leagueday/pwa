import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'
import fetch from 'cross-fetch'

const ADDRESS = 'https://hungry-pasteur-258023.netlify.app'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: ADDRESS + '/.netlify/functions/graphql',
    fetch,
  }),
})
