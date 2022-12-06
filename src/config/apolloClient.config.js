import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from '@apollo/client/core'
import axios from "axios";
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql'

let sessid = 'd7a0d89faf1977c72ab08842ec935cf2'

if (process.env.NODE_ENV === 'production') {
  sessid = BX.bitrix_sessid()
}

axios.defaults.params = {
  sessid
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
  connectToDevTools: true,
})

//Get news fields from schema

const ENDPOINT_URL = '/api/v2/master-system/graphql?sessid=' + sessid;

export const newsFieldsPromise = (async () => {
    const res = await axios.post(ENDPOINT_URL, { query: getIntrospectionQuery() })
		const fields = res.data.data.__schema.types.find(type => type.name === 'News').fields
		return fields
})()

export const imageFieldsPromise = (async () => {
	const res = await axios.post(ENDPOINT_URL, { query: getIntrospectionQuery() })
	const fields = res.data.data.__schema.types.find(type => type.name === 'Image').fields
	return fields
})()

export const iconFieldsPromise = (async () => {
	const res = await axios.post(ENDPOINT_URL, { query: getIntrospectionQuery() })
	const fields = res.data.data.__schema.types.find(type => type.name === 'Icon').fields
	return fields
})()

export const documentFieldsPromise = (async () => {
	const res = await axios.post(ENDPOINT_URL, { query: getIntrospectionQuery() })
	const fields = res.data.data.__schema.types.find(type => type.name === 'Document').fields
	return fields
})()

export const newsColumnsPromise = (async () => {
	const res = await axios.post(ENDPOINT_URL, { query: getIntrospectionQuery() })
	const columns = res.data.data.__schema.types
		.find(type => type.name === 'News').fields
		.filter(row => {
			const columnsName = ['icon','UF_NAME', 'UF_CREATED_AT', 'degree', 'types', 'complexes', 'contacts', 'UF_ACTIVE', 'UF_TITLE', 'UF_PREVIEW_TEXT', 'UF_TEXT']
			return columnsName.includes(row.name) ? true : false
		})

	return columns
})()
