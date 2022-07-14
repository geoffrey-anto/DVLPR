import { gql } from "@apollo/client";

export const GET_ALL_TWEETS = gql`
  query {
    getAllTweets {
      id
      description
      image
      isRepost
      likes
      user {
        name
        username
        id
      }
    }
  }
`;

export const LIKE_TWEET = gql`
  mutation ($likeTweetId: Float!) {
    likeTweet(id: $likeTweetId)
  }
`;
