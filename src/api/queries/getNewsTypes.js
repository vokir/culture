import gql from "graphql-tag";

export const GET_NEWS_TYPES = gql`
  query newsTypes {
    getNewsTypes {
      ID,
      UF_TITLE
    }
  }
`
