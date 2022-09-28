import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from '@apollo/client/core'

let sessid = 'b3755b7c7a87d99cb8f3e368ed29b5c2'

if (process.env.NODE_ENV === 'production') {
  sessid = BX.bitrix_sessid()
}

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: '/api/v2/master-system/graphql?sessid=' + sessid,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      sessid,
    },
  });
  return forward(operation);
});

// Create the config client
export const apolloClientConfig = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})
