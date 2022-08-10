import gql from "graphql-tag";

export const GET_DOCUMENTS = gql`
  query documents {
    getDocuments(currentPage: 1, perPage:10){
      data {
        UF_TITLE,
        category {
          UF_TITLE
        }
        type {
          UF_TITLE
        },
        file{
          SRC,
          ORIGINAL_NAME,
          ID,
        }
      }
    }
  }`
