import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import loGet from 'lodash/get';

const Header = dynamic({ loader: () => import('../../components/Header') });
const Footer = dynamic({ loader: () => import('../../components/Footer') });

const Layout = (props) => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      if (router.pathname === '/') {
        router.push('/room');
      }
    } else {
      if (router.pathname === '/chat' || router.pathname === '/room') {
        router.push('/');
      }
    }
  }, []);

  return (
    <>
      {/* <Header /> */}
      {props.children}
      {/* <Footer /> */}
    </>
  );
};

Layout.propTypes = {
  // startupWorkingFlow: PropTypes.func,
  // history: PropTypes.object,
  // children: PropTypes.any,
  // dispatch: PropTypes.any,
};

export default Layout;
