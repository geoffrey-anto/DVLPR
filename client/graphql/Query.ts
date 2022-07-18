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
      replyCount
      user {
        name
        username
        id
      }
      replies {
        id
        description
        repliedUsername
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
      replyCount
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
      replyCount
      user {
        name
        username
        id
        email
      }
    }
  }
`;

export const GET_TOP_USERS = gql`
  query ($limit: Float!) {
    getTopUsers(limit: $limit) {
      email
      name
      username
      id
      tweets {
        id
      }
    }
  }
`;

export const GET_TOP_TWEETS = gql`
  query ($limit: Float!) {
    getTopTweets(limit: $limit) {
      id
      description
      image
      likes
      user {
        name
        email
        username
      }
    }
  }
`;
