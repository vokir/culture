import gql from "graphql-tag";

export const GET_NEWS_BY_ID = gql`
query news($newsID: Int) {
  getNewsAt(id: $newsID) {
    ID
    UF_NAME
    UF_TITLE
    UF_PREVIEW_TEXT
    UF_TEXT
    UF_PHONE
    UF_CREATED_AT
    degree {
      ID,
      UF_TITLE
    }
    types {
      UF_TITLE,
      ID
    }
    complexes {
      UF_NAME,
      ID
    }
    documents {
      ID
      file {
        ORIGINAL_NAME
        SRC
      }
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
        ID
        ORIGINAL_NAME
        SRC
      }
    }
    UF_BTN_TEXT
    UF_BTN_LINK
  }
}
`;
