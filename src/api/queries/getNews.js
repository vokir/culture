import gql from "graphql-tag";

export const GET_NEWS = gql`
query news(
  $currentPage: Int! = 1
  $perPage: Int! = 20
  $searchStr: String = ""
  $id: [String] = []
  $active: [String] = []
  $name: [String] = []
  $system: [String] = []
  $date: String
  $types: [String] = []
  $complexes: [String] = []
  $houses: [String] = []
  $approaches: [String] = []
  $floors: [String] = []
  $premises: [String] = []
  $contacts: [String] = []
  $title: [String] = []
  $preview: [String] = []
  $text: [String] = []
  $icons: [String] = []
  $images: [String] = []
  $documents: [String] = []
  $phone: [String] = []
  $btnText: [String] = []
  $btnLink: [String] = []
  $imgAlbum: [String] = []
  $imgBook: [String] = []
  $degrees: [String] = []
	$dateFilterType: DateFilterType!
	$rangeValue: String
) {
  getNews(
    search: $searchStr
    currentPage: $currentPage
    perPage: $perPage
    filterInn: [
      { column: "ID", value: $id }
      { column: "UF_NAME", value: $name }
      { column: "UF_ACTIVE", value: $active }
      { column: "system", value: $system }
      { column: "ID", value: $types, relation: "types" }
      { column: "ID", value: $complexes, relation: "complexes" }
      { column: "ID", value: $houses, relation: "houses" }
      { column: "ID", value: $approaches, relation: "approaches" }
      { column: "ID", value: $floors, relation: "floors" }
      { column: "ID", value: $premises, relation: "premises" }
      { column: "ID", value: $contacts, relation: "contacts" }
      { column: "UF_TITLE", value: $title }
      { column: "UF_PREVIEW_TEXT", value: $preview }
      { column: "UF_TEXT", value: $text }
      { column: "ID", value: $icons, relation: "icon" }
      { column: "ID", value: $images, relation: "images" }
      { column: "ID", value: $documents, relation: "documents" }
      { column: "UF_PHONE", value: $phone }
      { column: "UF_BTN_TEXT", value: $btnText }
      { column: "UF_BTN_LINK", value: $btnLink }
      { column: "imgLandscape", value: $imgAlbum }
      { column: "imgLibrary", value: $imgBook }
      { column: "ID", value: $degrees, relation: "degree" }
    ]
		dateFilter:{column:"UF_CREATED_AT", value: $date, type:$dateFilterType, range_value:$rangeValue}
  ) {
    data {
      ID
      UF_NAME
      UF_TITLE
      UF_PREVIEW_TEXT
      UF_TEXT
      UF_PHONE
      UF_CREATED_AT
			UF_ACTIVE
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
        }
      }
        UF_BTN_TEXT
        UF_BTN_LINK
    }
    paginatorInfo {
      total
      perPage
    }
  }
}
`
