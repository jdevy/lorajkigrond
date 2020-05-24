import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  // uri: 'http://localhost:60000/simple/v1/ck8vtxppc001x01787ovdmhh8'
  uri: 'https://openapi.radiofrance.fr/v1/graphql?x-token=1924e519-b170-44f8-bbca-7e1f38305666'
})

export default new ApolloClient({
  // Provide the URL to the API server.
  link: httpLink,
  // Using a cache for blazingly
  // fast subsequent queries.
  cache: new InMemoryCache()
})
