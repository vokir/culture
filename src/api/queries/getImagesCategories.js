import gql from "graphql-tag";

export const GET_IMAGES_CATEGORIES = gql`
query category{
	getImageCategories{
    ID
    UF_TITLE
  }
}
`
