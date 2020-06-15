import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import loGet from 'lodash/get'

const Header = dynamic({ loader: () => import('../../components/Header') })
const Footer = dynamic({ loader: () => import('../../components/Footer') })

const Full = (props) =>  {
      <div>
        <Header/>
        {children}
        <Footer/>
      </div>
  }

Full.propTypes = {
  startupWorkingFlow: PropTypes.func,
  history: PropTypes.object,
  children: PropTypes.any,
  dispatch: PropTypes.any,
}


export default Layout