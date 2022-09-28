import gql from "graphql-tag";

export const GET_NEWS_DEGREES = gql`
  query newsDegrees {
    getNewsDegrees {
      ID,
      UF_TITLE
    }
  }
`
