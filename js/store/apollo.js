'use strict';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('http://10.6.6.233:5000/graphql');

const client = new ApolloClient({
  networkInterface,
});

module.exports = client;
