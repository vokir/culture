import gql from "graphql-tag";

export const GET_NEWS = gql`
query news(
  $currentPage: Int! = 1
  $perPage: Int! = 20
  $searchStr: String = ""
  $filterStr: [String] = []
) {
  getNews(
    search: $searchStr
    currentPage: $currentPage
    perPage: $perPage
    filterInn: { column: "UF_TITLE", value: $filterStr, relation: "types" }
  ) {
    data {
      ID
      UF_NAME
      UF_CREATED_AT
      degree {
        ID,
        UF_TITLE
      }
      types {
        UF_TITLE
      }
      complexes {
        UF_NAME
      }
      contacts {
        NAME
        LAST_NAME
        SECOND_NAME
      }
      houses {
        ID
        UF_NAME
      }
      approaches {
        ID
        UF_NAME
        house {
          ID
          UF_NAME
        }
      }
      floors {
        ID
        UF_NAME
        UF_NUMBER
        approach {
          ID
          UF_NAME
          house {
            ID
            UF_NAME
          }
        }
      }
      premises {
        ID
        UF_NUMBER
        UF_NAME
        floor {
          ID
          UF_NAME
          UF_NUMBER
          approach {
            ID
            UF_NAME
            house {
              ID
              UF_NAME
            }
          }
        }
      }
      icon {
        file {
          ORIGINAL_NAME
          SRC
          ID
        }
      }
    }
    paginatorInfo {
      total
      perPage
    }
  }
}
`
