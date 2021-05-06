import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'
import fetch from 'cross-fetch'

// TODO: get this onto process.env
// const uri = `https://hungry-pasteur-258023.netlify.app/.netlify/functions/graphql`
const uri = 'http://localhost:8911/graphql'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri,
    fetch,
  }),
})
