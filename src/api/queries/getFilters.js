import gql from "graphql-tag";

export const GET_FILTERS = gql`
query getFilters{
  getFilters{
    ID
    UF_CONTENT
    UF_ENTITY
  }
}
`
