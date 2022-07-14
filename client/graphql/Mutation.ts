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
      tweets {
        description
      }
    }
  }
`;