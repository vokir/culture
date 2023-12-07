import gql from 'graphql-tag';

export const CREATE_NEWS = gql`
  mutation createNews(
    $title: String!
    $UF_ORDER: Int! = 100
    $UF_EXTERNAL_SYSTEM_ID: Int! = 1
    $active: Boolean! = true
    $priority: Int!
    $icon: Int
    $desc: String
    $imgLandscape: Int
    $imgLibrary: Int
    $fullDesc: String
    $phone: String
    $btnText: String
    $btnLink: String
    $types: [Int]
    $complexes: [Int]
    $houses: [Int]
    $approaches: [Int]
    $floors: [Int]
    $premises: [Int]
    $contacts: [Int]
    $images: [Int]
    $documents: [Int]
    $image: Int
  ) {
    createNews(
      UF_NAME: $title
      UF_DEGREE_ID: $priority
      UF_ACTIVE: $active
      UF_ORDER: $UF_ORDER
      UF_EXTERNAL_SYSTEM_ID: $UF_EXTERNAL_SYSTEM_ID
      UF_ICON_ID: $icon
      UF_PREVIEW_PICTURE_ID: $image
      UF_TITLE: $title
      UF_PREVIEW_TEXT: $desc
      UF_IMG_LANDSCAPE: $imgLandscape
      UF_IMG_LIBRARY: $imgLibrary
      UF_TEXT: $fullDesc
      UF_PHONE: $phone
      UF_BTN_TEXT: $btnText
      UF_BTN_LINK: $btnLink
      types: $types
      complexes: $complexes
      houses: $houses
      approaches: $approaches
      floors: $floors
      premises: $premises
      contacts: $contacts
      images: $images
      documents: $documents
    ) {
      ID
    }
  }
`;
