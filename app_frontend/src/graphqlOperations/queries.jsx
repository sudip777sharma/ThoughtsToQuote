import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
    query getAllQuotes{
        quotes{
            _id
            name
            by{
            _id
            firstName
            lastName
            }
        }
    }
`
export const GET_QUOTE_BY_ID = gql`
    query getQuoteById($_id:ID!){
        quoteById(_id:$_id){
            name
        }
    }
`
export const GET_MY_PROFILE = gql`
    query getMyProfile{
        myprofile{
            _id
            firstName
            lastName
            email
            quotes{
                _id
                name
            }
        }
    }
`
export const GET_USER_BY_ID = gql`
    query getUserById($userId:ID!){
        user(_id:$userId){
            _id
            firstName
            lastName
            email
            quotes{
                _id
                name
            }
        }
    }
`