import gql from "graphql-tag";

export const UPDATE_FILTER = gql`
  mutation updateFilter(
		$id:Int!,
    $content:String!,
  ){
    updateFilter(
      id:$id,
			UF_CONTENT:$content,
			UF_ENTITY: ""
    )
  }
`
