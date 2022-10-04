import gql from "graphql-tag";

export const GET_IMAGES = gql`
query images(
  $currentPage: Int! = 1
  $perPage: Int! = 20
  $filterStr: [String] = []
  $searchStr: String = ""
) {
  getImages(
    currentPage: $currentPage
    perPage: $perPage
    filterInn: [{ column: "UF_TITLE", value: $filterStr, relation: "category" }]
    search: $searchStr
  ) {
    data {
      UF_TITLE
      ID
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
}
`
