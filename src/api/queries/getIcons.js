import gql from "graphql-tag";

export const GET_ICONS = gql`
query icons(
  $currentPage: Int! = 1
  $perPage: Int! = 20
  $filterStr: [String] = []
  $searchStr: String = ""
) {
  getIcons(
    currentPage: $currentPage
    perPage: $perPage
    filterInn: [{ column: "UF_TITLE", value: $filterStr, relation: "category" }]
    search: $searchStr
  ) {
    data {
      UF_TITLE
      file {
        SRC
        ORIGINAL_NAME
        ID
      }
      category {
        UF_TITLE
      }
    }
    paginatorInfo {
      total
      perPage
    }
  }
}`
