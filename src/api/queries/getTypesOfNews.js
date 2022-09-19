import gql from "graphql-tag";

export const GET_TYPES_OF_NEWS = gql`
query getTypes{
  getNewsTypes{
    ID
    UF_TITLE
  }
}`
