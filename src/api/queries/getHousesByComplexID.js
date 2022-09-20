import gql from "graphql-tag";

export const GET_HOUSES_BY_COMPLEX_ID = gql`
  query houses($complexID: String!)  {
    getHouses(filter: {
      column: "UF_COMPLEX_ID",
      value: $complexID
    }){
      UF_NAME,
      ID
    }
  }
`
