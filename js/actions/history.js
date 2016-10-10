'use strict';

//import gql from 'apollo-client/gql';
import gql from 'graphql-tag';
import apollo from '../store/apollo';

import type { ThunkAction } from './types';

import loadApolloQuery from './apollo';


function loadHistory() : ThunkAction {
  const query = apollo.query({
    query: gql`
      query todo {
        account(name:"poloniexwallet") {
          balance {
            asset {
              symbol
            }
            quantity
          }
          history(limit:10) {
            id
            __typename
            ... on NoDetailOp {
              fee {
                asset {
                  symbol
                }
                quantity
              }
            }
            ... on Transfer {
              from {
                name
              }
              to {
                name
              }
              amount {
                asset {
                  symbol
                }
                quantity
              }
              fee {
                asset {
                  symbol
                }
                quantity
              }
              block {
                timestamp
              }
              type
            } 
          }
        }
      }      
    `,
    forceFetch: false
  });

  const actions = ['LOADED_BALANCE', 'LOADED_HISTORY'];
  return loadApolloQuery(actions, query);
}

module.exports = {
  loadHistory
};
