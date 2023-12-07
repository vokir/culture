import gql from 'graphql-tag';

export const GET_APPROACHES_BY_HOUSE_ID = gql`
  query approaches($houseID: [String]) {
    getApproaches(filterInn: { column: "UF_HOUSE_ID", value: $houseID }) {
      UF_NAME
      ID
      house {
        ID
        UF_NAME
      }
    }
  }
`;
