import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

client
    .query({
        query: gql`
            query Moyooshi {
                Moyooshi(schedule_update_id: "iJR1X3F_SQ5ZDjJISdmEMXE2") {
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
        `,
    })
    .then((result) => console.log(result));
