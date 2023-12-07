import gql from 'graphql-tag';

export const GET_PREMISES_BY_FLOOR_ID = gql`
  query premises($premisesID: [String]) {
    getPremises(filterInn: { column: "UF_FLOOR_ID", value: $premisesID }) {
      UF_NAME
      UF_NUMBER
      ID
      floor {
        ID
        UF_NAME
        approach {
          ID
          UF_NAME
          house {
            UF_NAME
            ID
          }
        }
      }
    }
  }
`;
