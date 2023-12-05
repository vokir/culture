import gql from "graphql-tag";

export const GET_PREMISES = gql`
query premises {
	getPremises  {
		ID,
		UF_NAME,
		UF_NUMBER
	}
}`
