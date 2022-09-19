import gql from "graphql-tag";

export const GET_FLOORS_BY_APPROACH_ID = gql`
  query floors($approachID: [String]) {
    getFloors(filterInn: {
      column: "UF_APPROACHE_ID"
      value: $approachID
    }){
      UF_NAME,
      ID,
      approach{
        ID,
        UF_NAME,
        house {
          ID,
          UF_NAME
        }
      }
    }
  }
`
