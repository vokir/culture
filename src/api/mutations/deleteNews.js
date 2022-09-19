import gql from "graphql-tag";

export const DELETE_NEWS = gql`
  mutation deleteNews($id: Int!){
    deleteNews(id: $id)
  }
`
