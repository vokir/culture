import gql from "graphql-tag";

export const GET_DOCUMENTS = gql`
  query documents(
    $filterType: [String]
    $filterCategories: [String]
    $search: String
  ) {
    getDocuments(
      currentPage: 1
      perPage: 10
      filterInn: [
        { column: "UF_TITLE", value: $filterCategories, relation: "category" }
        { column: "UF_TITLE", value: $filterType, relation: "type" }
      ]
      search: $search
    ) {
      data {
        ID
        UF_TITLE
        category {
          UF_TITLE
        }
        type {
          UF_TITLE
        }
        file {
          SRC
          ORIGINAL_NAME
          ID
          FILE_SIZE
        }
      }
    }
  }
`;
