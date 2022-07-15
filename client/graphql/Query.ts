import { gql } from "@apollo/client";

export const GET_ALL_TWEETS = gql`
  query getAllTweets {
    getAllTweets {
      id
      description
      image
      isRepost
      likes
      repostCount
      createdAt
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

export const GET_TWEET_BY_ID = gql`
  query ($tweetId: Float!) {
    getTweetById(tweetId: $tweetId) {
      id
      image
      description
      isRepost
      repostCount
      likes
      createdAt
      user {
        id
        name
        username
      }
    }
  }
`;

export const GET_TWEETS_FOR_USER = gql`
  query ($getTweetsForUserId: Float!) {
    getTweetsForUser(id: $getTweetsForUserId) {
      description
      id
      image
      isRepost
      createdAt
      likes
      repostCount
      user {
        name
        username
        id
      }
    }
  }
`;
