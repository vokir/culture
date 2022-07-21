import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
  fetchOptions: {},
  uri: 'https://bitrix-stage.culture-home.ru/api/management/graphql?sessid=cc9c0b3c285120e64f2e6f0150627b8es',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
