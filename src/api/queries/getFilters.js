import gql from "graphql-tag";

export const GET_FILTERS = gql`
query getFilters($entity:String!){
  getFilters(filter:{column:"UF_ENTITY", value:$entity}){
    ID
		UF_CONTENT
    UF_ENTITY
  }
}
`
