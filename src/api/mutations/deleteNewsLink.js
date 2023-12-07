import gql from 'graphql-tag';

export const DELETE_NEWS_LINK = gql`
  mutation deleteNewsLink($id: Int!) {
    deleteNewsLink(id: $id)
  }
`;
