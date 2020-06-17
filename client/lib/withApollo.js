import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getMainDefinition } from "apollo-utilities";
import withApollo from "next-with-apollo";
import { HttpLink } from "apollo-link-http";
import { split, from } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import fetch from "isomorphic-unfetch";
const GRAPHQL_URL = 'http://localhost:9005/kompaql';
const wsLink = process.browser
  ? new WebSocketLink({
      uri: 'ws://localhost:9005/kompaql',
      options: {
        reconnect: true
      }
    })
  : null;
const httpLink = new HttpLink({
  fetch,
  uri: GRAPHQL_URL
});
const link = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    )
  : httpLink;
export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: from([link]),
      cache: new InMemoryCache().restore(initialState || {})
    })
);