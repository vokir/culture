import gql from "graphql-tag";

export const CREATE_FILTER = gql`
  mutation createFilter($content: String!, $entity: String!) {
    createFilter(UF_CONTENT: $content, UF_ENTITY: $entity) {
      ID
    }
  }
`;
