import gql from "graphql-tag";

export const CREATE_NEWS = gql`
  mutation createNews(
    $title: String!
    $UF_ORDER: Int! = 100
    $UF_EXTERNAL_SYSTEM_ID: Int! = 1
    $icon: Int!
    $desc: String
    $imgLandscape: Int
    $imgLibrary: Int
    $fullDesc: String
    $phone: String
    $UF_BTN_TEXT: String
    $UF_BTN_LINK: String
    $types: [Int]
    $complexes: [Int]
    $houses: [Int]
    $approaches: [Int]
    $floors: [Int]
    $premises: [Int]
    $contacts: [Int]
    $images: [Int]
    $documents: [Int]
  ){
    createNews(
      UF_NAME: $title
      UF_ORDER: $UF_ORDER
      UF_EXTERNAL_SYSTEM_ID: $UF_EXTERNAL_SYSTEM_ID
      UF_ICON_ID: $icon
      UF_TITLE: $title
      UF_PREVIEW_TEXT: $desc
      UF_IMG_LANDSCAPE: $imgLandscape
      UF_IMG_LIBRARY: $imgLibrary
      UF_TEXT: $fullDesc
      UF_PHONE: $phone
      UF_BTN_TEXT: $UF_BTN_TEXT
      UF_BTN_LINK: $UF_BTN_LINK
      types: $types
      complexes: $complexes
      houses: $houses
      approaches: $approaches
      floors: $floors
      premises: $premises
      contacts: $contacts
      images: $images
      documents: $documents
    ){
      ID
    }
  }
`
