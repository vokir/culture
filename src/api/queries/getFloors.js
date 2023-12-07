import gql from 'graphql-tag';

export const GET_FLOORS = gql`
  query floors {
    getFloors {
      ID
      UF_NAME
    }
  }
`;
