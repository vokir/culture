import gql from 'graphql-tag';

export const DELETE_FILTER = gql`
  mutation deleteFilter($id: Int!) {
    deleteFilter(id: $id)
  }
`;
