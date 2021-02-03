import { gql } from "@apollo/client";

export const GQ_GET_CALCULATED_SANKANICHIJIS = gql`
    query getCalculatedSankanichijis($schedule_update_id: String!) {
        getCalculatedSankanichijis(schedule_update_id: $schedule_update_id) {
            moyooshiKouhoNichiji {
                id
                kouho_nichiji
                schedule_update_id
            }
            maruCount
            sankakuCount
            batsuCount
        }
    }
`;

export const GQ_GET_SANKASHAS = gql`
    query getSankashas($schedule_update_id: String!) {
        getSankashas(schedule_update_id: $schedule_update_id) {
            id
            name
            comment
            sankaNichiji {
                sanka_kahi
                moyooshi_kouho_nichiji_id
                sankasha_id
            }
        }
    }
`;

export const GQ_ADD_SANKASHA = gql`
    mutation addSankasha($addedSankasha: UpdateSankashaInput!) {
        addSankasha(Sankasha: $addedSankasha) {
            id
            name
            comment
            sankaNichiji {
                sanka_kahi
            }
        }
    }
`;
