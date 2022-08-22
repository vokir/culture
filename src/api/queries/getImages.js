import gql from "graphql-tag";

export const GET_IMAGES = gql`
  query images($currentPage: Int! = 1, $perPage: Int! = 20) {
    getImages(currentPage: $currentPage, perPage: $perPage){
      data {
        UF_TITLE,
        file {
          SRC,
          ORIGINAL_NAME,
          ID
        }
      }
      paginatorInfo {
        total,
        perPage,
      }
    }
  }`
