import gql from "graphql-tag";

export const GET_HOUSES = gql`
query houses {
	getHouses  {
		ID,
		UF_NAME
	}
}`
