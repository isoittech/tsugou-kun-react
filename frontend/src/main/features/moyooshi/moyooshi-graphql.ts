import { gql, useQuery } from "@apollo/client";

export { useAddMoyooshiMutation } from "../../generated/graphql";
export { useMoyooshiQuery } from "../../generated/graphql";
export { useUpdateMoyooshiMutation } from "../../generated/graphql";

export const GQ_GET_MOYOOSHI = gql`
    query Moyooshi($schedule_update_id: String!) {
        Moyooshi(schedule_update_id: $schedule_update_id) {
            name
            memo
            schedule_update_id
            __typename
            moyooshiKouhoNichijis {
                id
                kouho_nichiji
                __typename
            }
        }
    }
`;

export const GQ_ADD_MOYOOSHI = gql`
    mutation addMoyooshi($moyooshi: MoyooshiInput!) {
        addMoyooshi(Moyooshi: $moyooshi) {
            __typename
            name
            memo
            schedule_update_id
            moyooshiKouhoNichijis {
                kouho_nichiji
            }
        }
    }
`;

export const GQ_UPDATE_MOYOOSHI = gql`
    mutation updateMoyooshi($updateMoyooshi: UpdateMoyooshiInput!) {
        updateMoyooshi(Moyooshi: $updateMoyooshi) {
            __typename
            name
            memo
            schedule_update_id
            moyooshiKouhoNichijis {
                id
                kouho_nichiji
            }
        }
    }
`;
