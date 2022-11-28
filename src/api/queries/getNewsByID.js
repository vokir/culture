import gql from "graphql-tag";

export const GET_NEWS_BY_ID = gql`
query getNewsAt($newsID: Int) {
  getNewsAt(id: $newsID) {
    ID
    UF_NAME
    UF_TITLE
    UF_PREVIEW_TEXT
    UF_TEXT
    UF_PHONE
    UF_CREATED_AT
    imgLandscape {
      SRC,
      ID,
      ORIGINAL_NAME,
    }
    imgLibrary {
      SRC,
      ID,
      ORIGINAL_NAME,
    }
    links{
      ID
      UF_TITLE
      UF_LINK
    }
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
			ID
			file {
				ID
				ORIGINAL_NAME
				SRC
			}
		}
	contacts{
    ID
    LAST_NAME
    NAME
    SECOND_NAME
    FULL_NAME
    fields{
      TYPE_ID
      VALUE
      __typename
    }
    __typename
  }
    UF_BTN_TEXT
    UF_BTN_LINK
		previewPicture{
			ID
			ORIGINAL_NAME
			SRC
		}
  }
}
`;
