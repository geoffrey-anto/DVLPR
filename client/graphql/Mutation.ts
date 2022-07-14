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
