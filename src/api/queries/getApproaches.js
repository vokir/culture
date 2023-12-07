import gql from 'graphql-tag';

export const GET_APPROACHES = gql`
  query complexes {
    getApproaches {
      ID
      UF_NAME
    }
  }
`;
