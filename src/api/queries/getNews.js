import gql from "graphql-tag";

export const GET_NEWS = gql`
  query news ($str: String, $currentPage: Int! = 1, $perPage: Int! = 20){
    getNews (search: $str, currentPage: $currentPage, perPage: $perPage) {
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
          NAME,
          LAST_NAME,
          SECOND_NAME
        },
        houses {
          ID,
          UF_NAME,
        },
        approaches {
          ID,
          UF_NAME,
          house {
            ID,
            UF_NAME
          }
        },
        floors {
          ID,
          UF_NAME,
          UF_NUMBER,
          approache {
            ID,
            UF_NAME,
            house {
              ID,
              UF_NAME
            }
          }
        },
        premises {
          ID,
          UF_NUMBER,
          UF_NAME,
          floor {
            ID,
            UF_NAME,
            UF_NUMBER,
            approache {
              ID,
              UF_NAME,
              house {
                ID,
                UF_NAME,
              }
            }
          }
        }
        icon {
          file {
            ORIGINAL_NAME,
            SRC,
            ID
          }
        }
      },
      paginatorInfo {
        total,
        perPage,
      }
    }
  }`
