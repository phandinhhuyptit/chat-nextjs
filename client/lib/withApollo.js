import {
    ApolloProvider,
  } from "@apollo/client";
import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink } from "apollo-boost";  
import { split, from } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from 'apollo-cache-inmemory';
  
  
    const httpLink = new HttpLink({
        uri: `http://localhost:9005/kompaql`,
      });
      
      const wsLink = new WebSocketLink({
        uri: `ws://localhost:9005/kompaql`,
        options: {
          reconnect: true,
        },
      });
      
      const cache = new InMemoryCache().restore(initialState || {})
    
      const link = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
          // return kind === "OperationDefinition";
        },
        wsLink, 
        httpLink
    );
  
   export default withApollo(({ initialState }) => {
      return new ApolloClient({
        link: from([link]),
        cache,
        connectToDevTools: true,
      });
    })(App);


