import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, concat } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://bitrix-stage.culture-home.ru/api/management/graphql?9a04f201f1d0f59ef12f46b4968309a1',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const sessid = '9a04f201f1d0f59ef12f46b4968309a1' //BX.bitrix_sessid();
  operation.setContext({
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      'Set-Cookie': 'BITRIX_SM_TIME_ZONE=-300; BITRIX_SM_LOGIN=ip%40iit.company; BITRIX_CONVERSION_CONTEXT_s1=%7B%22ID%22%3A1%2C%22EXPIRE%22%3A1658523540%2C%22UNIQUE%22%3A%5B%22conversion_visit_day%22%5D%7D; BITRIX_SM_SOUND_LOGIN_PLAYED=Y; BITRIX_SM_SALE_UID=19; PHPSESSID=QuYhqX1DwRPdd3n2GPClWMCokotwUoZP; BITRIX_SM_LAST_SETTINGS=',
      sessid
    },
  });
  return forward(operation);
});
// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,

  connectToDevTools: true
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
