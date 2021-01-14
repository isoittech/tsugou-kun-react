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
  sanka_kahi: Scalars['String'];
  moyooshi_kouho_nichiji_id: Scalars['Float'];
  sankasha_id: Scalars['Float'];
  Sankasha: Sankasha;
  moyooshiKouhoNichijiId: Scalars['Float'];
  MoyooshiKouhoNichiji: MoyooshiKouhoNichiji;
};

export type Sankasha = {
  __typename?: 'Sankasha';
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

export type Query = {
  __typename?: 'Query';
  Moyooshi: Moyooshi;
};


export type QueryMoyooshiArgs = {
  schedule_update_id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMoyooshi: Moyooshi;
  updateMoyooshi: Moyooshi;
};


export type MutationAddMoyooshiArgs = {
  Moyooshi: MoyooshiInput;
};


export type MutationUpdateMoyooshiArgs = {
  Moyooshi: UpdateMoyooshiInput;
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