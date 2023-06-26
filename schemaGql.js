import { ApolloServer, gql } from "apollo-server-express";

// this is schema of our graphql server
// this is a query from client side to server
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    iquote(by: ID!): [QuoteWithName]
    myprofile: User
    quoteById(_id: ID!): QuoteWithName
  }

  type QuoteWithName {
    _id: ID!
    name: String!
    by: IdName!
  }

  type IdName {
    _id: ID!
    firstName: String!
    lastName: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
  }

  type Quote {
    _id: ID!
    name: String!
    by: ID!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createQuote(name: String!): String
    updateQuote(_id: ID!, name: String!): String
    deleteQuote(_id: ID!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
