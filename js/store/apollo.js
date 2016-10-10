'use strict';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('http://192.168.0.18:5000/graphql');

const client = new ApolloClient({
  networkInterface,
});

module.exports = client;
