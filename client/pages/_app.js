import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
import StoreProvider from '../contexts/storeContext';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withApollo(MyApp);
