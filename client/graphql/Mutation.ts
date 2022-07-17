import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation ($data: userInputData!) {
    Register(data: $data)
  }
`;

export const LOGIN_USER_WITH_ID_NAME = gql`
  mutation ($loginInput: LoginInput!) {
    Login(LoginInput: $loginInput) {
      id
      name
      username
      tweets {
        description
      }
    }
  }
`;

export const ADD_TWEET = gql`
  mutation ($tweetInput: TweetInput!, $addTweetId: Float!) {
    addTweet(tweetInput: $tweetInput, id: $addTweetId)
  }
`;

export const RETWEET_TWEET = gql`
  mutation ($userId: Float!, $tweetId: Float!) {
    retweetTweet(userId: $userId, tweetId: $tweetId)
  }
`;

export const CHANGE_USER_NAME = gql`
  mutation ($newUsername: String!, $email: String!) {
    changeUsername(newUsername: $newUsername, email: $email)
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation ($newPassword: String!, $oldPassword: String!, $email: String!) {
    changeUserPassword(
      newPassword: $newPassword
      oldPassword: $oldPassword
      email: $email
    )
  }
`;
