import React from 'react';
import Router from 'next/router';

const login = '/login?redirected=true'; // Define your login route address.

const checkUserAuthentication = () => {
  let auth = false
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if(user){
        auth = true
    } 
  }

  return { auth }; // change null to { isAdmin: true } for test it.
};

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;
  const userAuth =  checkUserAuthentication();
  
  hocComponent.getInitialProps = async ({ res }) => {
    const userAuth = await checkUserAuthentication();
    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (res) {
        res.writeHead(302, {
          Location: login,
        });
        res.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(userAuth);
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};
