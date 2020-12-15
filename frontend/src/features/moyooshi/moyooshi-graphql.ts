import { gql, useQuery } from "@apollo/client";

export const GQ_GET_MOYOOSHI = gql`
    query Moyooshi($schedule_update_id: String!) {
        Moyooshi(schedule_update_id: $schedule_update_id) {
            name
            memo
            schedule_update_id
            __typename
            moyooshiKouhoNichijis {
                kouho_nichiji
                __typename
            }
        }
    }
`;
