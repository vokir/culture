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
          ID,
          UF_NAME,
        },
        approaches {
          ID,
          UF_NAME,
          house {
            UF_NAME
          }
        },
        floors {
          ID,
          UF_NAME,
          UF_NUMBER,
          approache {
            UF_NAME,
            house {
              UF_NAME
            }
          }
        },
        premises {
          ID,
          UF_NUMBER,
          UF_NAME,
          floor {
            UF_NAME,
            UF_NUMBER,
            approache {
              UF_NAME,
              house {
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
      }
    }
  }`
