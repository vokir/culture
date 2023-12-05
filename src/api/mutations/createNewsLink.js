import gql from "graphql-tag";

export const CREATE_NEWS_LINK = gql`
  mutation createNewsLink($title: String!, $link: String!, $newsID: Int!) {
    createNewsLink(UF_TITLE: $title, UF_LINK: $link, UF_NEWS_ID: $newsID) {
      ID
    }
  }
`;
