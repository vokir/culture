import gql from "graphql-tag";

export const GET_ICONS = gql`
  query icons($currentPage: Int! = 1, $perPage: Int! = 20) {
    getIcons(currentPage: $currentPage, perPage: $perPage){
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
