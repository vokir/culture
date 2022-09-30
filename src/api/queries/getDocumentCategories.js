import gql from "graphql-tag";

export const GET_DOCUMENT_CATEGORIES = gql`
  query getDocumentCategories {
    getDocumentCategories {
      ID
      UF_TITLE
    }
  }
`;
