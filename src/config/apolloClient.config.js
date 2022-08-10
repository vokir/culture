import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, concat } from '@apollo/client/core'

const sessid = 'b3755b7c7a87d99cb8f3e368ed29b5c2' //BX.bitrix_sessid();

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: (process.env.NODE_ENV === 'development' ? '/api/management/graphql?sessid='
    : 'https://bitrix-stage.culture-home.ru/api/management/graphql?sessid=') + sessid,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      Cookie: 'BITRIX_SM_TIME_ZONE=-300; BITRIX_SM_LOGIN=ip%40iit.company; BITRIX_SM_SALE_UID=19; _ym_uid=16585668221021474546; _ym_d=1658566822; _ym_isad=1; _ga=GA1.2.416211188.1658566822; _gid=GA1.2.1656555918.1658566822; BITRIX_CONVERSION_CONTEXT_s1=%7B%22ID%22%3A1%2C%22EXPIRE%22%3A1658609940%2C%22UNIQUE%22%3A%5B%22conversion_visit_day%22%5D%7D; PHPSESSID=RFuWsv2JfD3jrlewxCg4Js31Y0mNky4B; BITRIX_SM_SOUND_LOGIN_PLAYED=Y; BITRIX_SM_LAST_SETTINGS=',
      sessid
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
