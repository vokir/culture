import gql from "graphql-tag";

export const GET_IMAGES = gql`
query getImages(
  $currentPage: Int! = 1
  $perPage: Int! = 20
  $name: [String] = []
  $categories: [String] = []
  $searchStr: String = ""
) {
  getImages(
    currentPage: $currentPage
    perPage: $perPage
    filterInn: [
      { column: "UF_TITLE", value: $name}
      { column: "ID", value: $categories, relation: "category" }
    ]
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
