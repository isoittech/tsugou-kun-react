import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type SankaNichiji = {
  __typename?: 'SankaNichiji';
  sanka_kahi: SankaKahiType;
  sankasha_id: Scalars['Float'];
  moyooshi_kouho_nichiji_id: Scalars['Float'];
  sankasha: Sankasha;
  moyooshiKouhoNichiji: MoyooshiKouhoNichiji;
};

export enum SankaKahiType {
  Mikaitou = 'MIKAITOU',
  Maru = 'MARU',
  Sankaku = 'SANKAKU',
  Batsu = 'BATSU'
}

export type Sankasha = {
  __typename?: 'Sankasha';
  id: Scalars['Float'];
  name: Scalars['String'];
  comment: Scalars['String'];
  sankaNichiji: Array<SankaNichiji>;
  moyooshi_id: Scalars['Float'];
  moyooshi: Moyooshi;
};

export type Moyooshi = {
  __typename?: 'Moyooshi';
  name: Scalars['String'];
  memo: Scalars['String'];
  schedule_update_id: Scalars['String'];
  sankashas: Array<Sankasha>;
  moyooshiKouhoNichijis: Array<MoyooshiKouhoNichiji>;
};

export type MoyooshiKouhoNichiji = {
  __typename?: 'MoyooshiKouhoNichiji';
  id: Scalars['Float'];
  kouho_nichiji: Scalars['String'];
  schedule_update_id: Scalars['String'];
  sankaNichiji: Array<SankaNichiji>;
  moyooshi_id: Scalars['Float'];
  moyooshi: Moyooshi;
};

export type CalculatedSankaNichiji = {
  __typename?: 'CalculatedSankaNichiji';
  moyooshiKouhoNichiji: MoyooshiKouhoNichiji;
  maruCount: Scalars['Float'];
  sankakuCount: Scalars['Float'];
  batsuCount: Scalars['Float'];
};

export type MoyooshiInput = {
  name: Scalars['String'];
  memo?: Maybe<Scalars['String']>;
  moyooshiKouhoNichijis: Array<Scalars['String']>;
};

export type UpdateMoyooshiInput = {
  name: Scalars['String'];
  memo?: Maybe<Scalars['String']>;
  moyooshiKouhoNichijis: Array<Scalars['String']>;
  schedule_update_id?: Maybe<Scalars['String']>;
  deleted_nichiji_kouho?: Maybe<Array<Scalars['String']>>;
};

export type SankaKahiInput = {
  sankaKahi: SankaKahiType;
  moyooshiNichijiKouhoId: Scalars['Float'];
};

export type SankashaInput = {
  name: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
  sankashaId?: Maybe<Scalars['Float']>;
  schedule_update_id?: Maybe<Scalars['String']>;
  sankaKahis: Array<SankaKahiInput>;
};

export type UpdateSankashaInput = {
  name: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
  sankashaId?: Maybe<Scalars['Float']>;
  schedule_update_id?: Maybe<Scalars['String']>;
  sankaKahis: Array<SankaKahiInput>;
};

export type Query = {
  __typename?: 'Query';
  Moyooshi: Moyooshi;
  getCalculatedSankanichijis: Array<CalculatedSankaNichiji>;
  getSankashas: Array<Sankasha>;
};


export type QueryMoyooshiArgs = {
  schedule_update_id: Scalars['String'];
};


export type QueryGetCalculatedSankanichijisArgs = {
  schedule_update_id: Scalars['String'];
};


export type QueryGetSankashasArgs = {
  schedule_update_id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMoyooshi: Moyooshi;
  updateMoyooshi: Moyooshi;
  addSankasha: Sankasha;
};


export type MutationAddMoyooshiArgs = {
  Moyooshi: MoyooshiInput;
};


export type MutationUpdateMoyooshiArgs = {
  Moyooshi: UpdateMoyooshiInput;
};


export type MutationAddSankashaArgs = {
  Sankasha: UpdateSankashaInput;
};

export type MoyooshiQueryVariables = Exact<{
  schedule_update_id: Scalars['String'];
}>;


export type MoyooshiQuery = (
  { __typename?: 'Query' }
  & { Moyooshi: (
    { __typename: 'Moyooshi' }
    & Pick<Moyooshi, 'name' | 'memo' | 'schedule_update_id'>
    & { moyooshiKouhoNichijis: Array<(
      { __typename: 'MoyooshiKouhoNichiji' }
      & Pick<MoyooshiKouhoNichiji, 'id' | 'kouho_nichiji'>
    )> }
  ) }
);

export type AddMoyooshiMutationVariables = Exact<{
  moyooshi: MoyooshiInput;
}>;


export type AddMoyooshiMutation = (
  { __typename?: 'Mutation' }
  & { addMoyooshi: (
    { __typename: 'Moyooshi' }
    & Pick<Moyooshi, 'name' | 'memo' | 'schedule_update_id'>
    & { moyooshiKouhoNichijis: Array<(
      { __typename?: 'MoyooshiKouhoNichiji' }
      & Pick<MoyooshiKouhoNichiji, 'kouho_nichiji'>
    )> }
  ) }
);

export type UpdateMoyooshiMutationVariables = Exact<{
  updateMoyooshi: UpdateMoyooshiInput;
}>;


export type UpdateMoyooshiMutation = (
  { __typename?: 'Mutation' }
  & { updateMoyooshi: (
    { __typename: 'Moyooshi' }
    & Pick<Moyooshi, 'name' | 'memo' | 'schedule_update_id'>
    & { moyooshiKouhoNichijis: Array<(
      { __typename?: 'MoyooshiKouhoNichiji' }
      & Pick<MoyooshiKouhoNichiji, 'id' | 'kouho_nichiji'>
    )> }
  ) }
);

export type GetCalculatedSankanichijisQueryVariables = Exact<{
  schedule_update_id: Scalars['String'];
}>;


export type GetCalculatedSankanichijisQuery = (
  { __typename?: 'Query' }
  & { getCalculatedSankanichijis: Array<(
    { __typename?: 'CalculatedSankaNichiji' }
    & Pick<CalculatedSankaNichiji, 'maruCount' | 'sankakuCount' | 'batsuCount'>
    & { moyooshiKouhoNichiji: (
      { __typename?: 'MoyooshiKouhoNichiji' }
      & Pick<MoyooshiKouhoNichiji, 'id' | 'kouho_nichiji' | 'schedule_update_id'>
    ) }
  )> }
);

export type GetSankashasQueryVariables = Exact<{
  schedule_update_id: Scalars['String'];
}>;


export type GetSankashasQuery = (
  { __typename?: 'Query' }
  & { getSankashas: Array<(
    { __typename?: 'Sankasha' }
    & Pick<Sankasha, 'id' | 'name' | 'comment'>
    & { sankaNichiji: Array<(
      { __typename?: 'SankaNichiji' }
      & Pick<SankaNichiji, 'sanka_kahi' | 'moyooshi_kouho_nichiji_id' | 'sankasha_id'>
    )> }
  )> }
);

export type AddSankashaMutationVariables = Exact<{
  addedSankasha: UpdateSankashaInput;
}>;


export type AddSankashaMutation = (
  { __typename?: 'Mutation' }
  & { addSankasha: (
    { __typename?: 'Sankasha' }
    & Pick<Sankasha, 'id' | 'name' | 'comment'>
    & { sankaNichiji: Array<(
      { __typename?: 'SankaNichiji' }
      & Pick<SankaNichiji, 'sanka_kahi'>
    )> }
  ) }
);


export const MoyooshiDocument = gql`
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

/**
 * __useMoyooshiQuery__
 *
 * To run a query within a React component, call `useMoyooshiQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoyooshiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoyooshiQuery({
 *   variables: {
 *      schedule_update_id: // value for 'schedule_update_id'
 *   },
 * });
 */
export function useMoyooshiQuery(baseOptions: Apollo.QueryHookOptions<MoyooshiQuery, MoyooshiQueryVariables>) {
        return Apollo.useQuery<MoyooshiQuery, MoyooshiQueryVariables>(MoyooshiDocument, baseOptions);
      }
export function useMoyooshiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoyooshiQuery, MoyooshiQueryVariables>) {
          return Apollo.useLazyQuery<MoyooshiQuery, MoyooshiQueryVariables>(MoyooshiDocument, baseOptions);
        }
export type MoyooshiQueryHookResult = ReturnType<typeof useMoyooshiQuery>;
export type MoyooshiLazyQueryHookResult = ReturnType<typeof useMoyooshiLazyQuery>;
export type MoyooshiQueryResult = Apollo.QueryResult<MoyooshiQuery, MoyooshiQueryVariables>;
export const AddMoyooshiDocument = gql`
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
export type AddMoyooshiMutationFn = Apollo.MutationFunction<AddMoyooshiMutation, AddMoyooshiMutationVariables>;

/**
 * __useAddMoyooshiMutation__
 *
 * To run a mutation, you first call `useAddMoyooshiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMoyooshiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMoyooshiMutation, { data, loading, error }] = useAddMoyooshiMutation({
 *   variables: {
 *      moyooshi: // value for 'moyooshi'
 *   },
 * });
 */
export function useAddMoyooshiMutation(baseOptions?: Apollo.MutationHookOptions<AddMoyooshiMutation, AddMoyooshiMutationVariables>) {
        return Apollo.useMutation<AddMoyooshiMutation, AddMoyooshiMutationVariables>(AddMoyooshiDocument, baseOptions);
      }
export type AddMoyooshiMutationHookResult = ReturnType<typeof useAddMoyooshiMutation>;
export type AddMoyooshiMutationResult = Apollo.MutationResult<AddMoyooshiMutation>;
export type AddMoyooshiMutationOptions = Apollo.BaseMutationOptions<AddMoyooshiMutation, AddMoyooshiMutationVariables>;
export const UpdateMoyooshiDocument = gql`
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
export type UpdateMoyooshiMutationFn = Apollo.MutationFunction<UpdateMoyooshiMutation, UpdateMoyooshiMutationVariables>;

/**
 * __useUpdateMoyooshiMutation__
 *
 * To run a mutation, you first call `useUpdateMoyooshiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMoyooshiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMoyooshiMutation, { data, loading, error }] = useUpdateMoyooshiMutation({
 *   variables: {
 *      updateMoyooshi: // value for 'updateMoyooshi'
 *   },
 * });
 */
export function useUpdateMoyooshiMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMoyooshiMutation, UpdateMoyooshiMutationVariables>) {
        return Apollo.useMutation<UpdateMoyooshiMutation, UpdateMoyooshiMutationVariables>(UpdateMoyooshiDocument, baseOptions);
      }
export type UpdateMoyooshiMutationHookResult = ReturnType<typeof useUpdateMoyooshiMutation>;
export type UpdateMoyooshiMutationResult = Apollo.MutationResult<UpdateMoyooshiMutation>;
export type UpdateMoyooshiMutationOptions = Apollo.BaseMutationOptions<UpdateMoyooshiMutation, UpdateMoyooshiMutationVariables>;
export const GetCalculatedSankanichijisDocument = gql`
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

/**
 * __useGetCalculatedSankanichijisQuery__
 *
 * To run a query within a React component, call `useGetCalculatedSankanichijisQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalculatedSankanichijisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalculatedSankanichijisQuery({
 *   variables: {
 *      schedule_update_id: // value for 'schedule_update_id'
 *   },
 * });
 */
export function useGetCalculatedSankanichijisQuery(baseOptions: Apollo.QueryHookOptions<GetCalculatedSankanichijisQuery, GetCalculatedSankanichijisQueryVariables>) {
        return Apollo.useQuery<GetCalculatedSankanichijisQuery, GetCalculatedSankanichijisQueryVariables>(GetCalculatedSankanichijisDocument, baseOptions);
      }
export function useGetCalculatedSankanichijisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalculatedSankanichijisQuery, GetCalculatedSankanichijisQueryVariables>) {
          return Apollo.useLazyQuery<GetCalculatedSankanichijisQuery, GetCalculatedSankanichijisQueryVariables>(GetCalculatedSankanichijisDocument, baseOptions);
        }
export type GetCalculatedSankanichijisQueryHookResult = ReturnType<typeof useGetCalculatedSankanichijisQuery>;
export type GetCalculatedSankanichijisLazyQueryHookResult = ReturnType<typeof useGetCalculatedSankanichijisLazyQuery>;
export type GetCalculatedSankanichijisQueryResult = Apollo.QueryResult<GetCalculatedSankanichijisQuery, GetCalculatedSankanichijisQueryVariables>;
export const GetSankashasDocument = gql`
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

/**
 * __useGetSankashasQuery__
 *
 * To run a query within a React component, call `useGetSankashasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSankashasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSankashasQuery({
 *   variables: {
 *      schedule_update_id: // value for 'schedule_update_id'
 *   },
 * });
 */
export function useGetSankashasQuery(baseOptions: Apollo.QueryHookOptions<GetSankashasQuery, GetSankashasQueryVariables>) {
        return Apollo.useQuery<GetSankashasQuery, GetSankashasQueryVariables>(GetSankashasDocument, baseOptions);
      }
export function useGetSankashasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSankashasQuery, GetSankashasQueryVariables>) {
          return Apollo.useLazyQuery<GetSankashasQuery, GetSankashasQueryVariables>(GetSankashasDocument, baseOptions);
        }
export type GetSankashasQueryHookResult = ReturnType<typeof useGetSankashasQuery>;
export type GetSankashasLazyQueryHookResult = ReturnType<typeof useGetSankashasLazyQuery>;
export type GetSankashasQueryResult = Apollo.QueryResult<GetSankashasQuery, GetSankashasQueryVariables>;
export const AddSankashaDocument = gql`
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
export type AddSankashaMutationFn = Apollo.MutationFunction<AddSankashaMutation, AddSankashaMutationVariables>;

/**
 * __useAddSankashaMutation__
 *
 * To run a mutation, you first call `useAddSankashaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSankashaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSankashaMutation, { data, loading, error }] = useAddSankashaMutation({
 *   variables: {
 *      addedSankasha: // value for 'addedSankasha'
 *   },
 * });
 */
export function useAddSankashaMutation(baseOptions?: Apollo.MutationHookOptions<AddSankashaMutation, AddSankashaMutationVariables>) {
        return Apollo.useMutation<AddSankashaMutation, AddSankashaMutationVariables>(AddSankashaDocument, baseOptions);
      }
export type AddSankashaMutationHookResult = ReturnType<typeof useAddSankashaMutation>;
export type AddSankashaMutationResult = Apollo.MutationResult<AddSankashaMutation>;
export type AddSankashaMutationOptions = Apollo.BaseMutationOptions<AddSankashaMutation, AddSankashaMutationVariables>;