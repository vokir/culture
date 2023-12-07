import gql from 'graphql-tag';

export const GET_COMPLEXES = gql`
  query complexes {
    getComplexes {
      ID
      UF_NAME
    }
  }
`;
