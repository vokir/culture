import gql from "graphql-tag";

export const GET_NEWS = gql`
  query news ($currentPage: Int! = 1, $perPage: Int! = 20){
    getNews (currentPage: $currentPage, perPage: $perPage) {
      data {
        ID,
        UF_NAME,
        UF_CREATED_AT,
        types {
         UF_TITLE
        },
        complexes {
          UF_NAME
        }
        contacts {
          NAME
        },
        houses {
          UF_NAME,
          UF_COMPLEX_ID
        },
        approaches {
          UF_NAME,
          UF_HOUSE_ID
        },
        floors {
          UF_NAME,
          UF_NUMBER
        }
        icon {
          file {
            ORIGINAL_NAME
          }
        }
      }
    }
  }`
