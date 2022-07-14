import { gql } from "@apollo/client";

export const GET_ALL_TWEETS = gql`
  query {
    getAllTweets {
      id
      description
      image
      isRepost
      user {
        name
        username
        id
      }
    }
  }
`;
