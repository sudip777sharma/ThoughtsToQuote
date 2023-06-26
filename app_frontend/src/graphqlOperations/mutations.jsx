import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
    mutation createUser($userNew:UserInput!){
        user:signupUser(userNew:$userNew){
            _id
            firstName
            lastName
            email
        }
    }
`
export const LOGIN_USER = gql`
    mutation signinUser($userSignin:UserSigninInput!){
        user:signinUser(userSignin:$userSignin){
            token
        }
    } 
`
export const CREATE_QUOTE = gql`
    mutation createQuote($name:String!){
	    createQuote(name:$name)
    }
`
export const UPDATE_QUOTE = gql`
    mutation updateQuote($quoteId:ID!, $name:String!){
        updateQuote(_id:$quoteId, name:$name)
    }
`
export const DELETE_QUOTE = gql`
    mutation deleteQuote($quoteId:ID!){
        deleteQuote(_id:$quoteId)
    }
`