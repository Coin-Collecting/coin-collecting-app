import gql from 'graphql-tag';

export const AddCoinMutation = gql`
    mutation (
    $coinId: String!,
    $quality: String!,
    ) {
        addUserCoin (
            coinId: $coinId,
            quality: $quality,
        )
    }
`;

export const RemoveCoinMutation = gql`
    mutation (
    $id: String!,
    ) {
        removeUserCoin (
            id: $id,
        )
    }
`;

export const AddToWishListMutation = gql`
  mutation (
    $coinId: String!,
  ) {
    addWish (
      coinId: $coinId,
    )
  }
`;

export const RemoveFromWishListMutation = gql`
    mutation (
    $id: String!,
    ) {
        removeWish (
            id: $id,
        )
    }
`;

export const loginMutation = gql`
    mutation (
    $username: String!,
    $password: String!,
    ) {
        loginUser (
            username: $username,
            password: $password,
        )
    }
`;

export const MeQuery = gql`
    query {
        me {
            username
            email
            admin
            totalOwned
            totalUniqueOwned
            totalMissing
            wishes {
                id
                year
                mintage
                issue {
                    id
                    variety
                    denomination {
                        val
                    }
                }
                mint
            }
        }
    }
`;
