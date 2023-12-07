import gql from 'graphql-tag';

export const GET_CONTACTS = gql`
  query contacts {
    getContacts {
      ID
      LAST_NAME
      NAME
      SECOND_NAME
      FULL_NAME
      fields {
        VALUE
        TYPE_ID
      }
    }
  }
`;
