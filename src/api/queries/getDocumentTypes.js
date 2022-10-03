import gql from "graphql-tag";

export const GET_DOCUMENT_TYPES = gql`
  query getDocumentTypes {
    getDocumentTypes {
      ID
      UF_TITLE
    }
  }
`;
