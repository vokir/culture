import gql from "graphql-tag";

export const GET_DOCUMENTS = gql`
  query documents(
    $type: [String]
    $category: [String]
    $search: String
		$perPage: Int! = 20
  ) {
    getDocuments(
      currentPage: 1
      perPage: $perPage
      filterInn: [
        { column: "ID", value: $category, relation: "category" }
        { column: "ID", value: $type, relation: "type" }
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
