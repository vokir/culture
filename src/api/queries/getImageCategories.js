import gql from 'graphql-tag';

export const GET_IMAGE_CATEGORIES = gql`
  query getImageCategories {
    getImageCategories {
      ID
      UF_TITLE
    }
  }
`;
