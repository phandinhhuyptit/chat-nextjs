import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { IndexWrapper } from  '../theme/global/index.styled' 
const Layout = dynamic({ loader: () => import('../containers/Layout') })
const Room = dynamic({ loader: () => import('../containers/Room') })


const RoomPage = (props) => { // eslint-disable-line
    return (
      <IndexWrapper>
        <Layout>
          <Head>
            <title>Danh Sách Phòng</title>

            {/* SEO */}
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="keywords" content="HuyIT | Trang Chủ" />
            <meta name="description" content="HuyIT | Trang Chủ" />
            <meta name="type" content="website" />
            <meta name="robots" content="INDEX, FOLLOW" />
            <meta name="language" content="Vietnamese" />

            {/* Open Graph data */}
            <meta property="fb:app_id" content="380743335865666" />
            <meta property="og:type" content="news" />
            <meta property="og:url" content="" />
            <meta property="og:title" content="HuyIT | Trang Chủ" />
            <meta property="og:image" content="" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:description" content="HuyIT | Trang Chủ" />
            <meta property="og:site_name" content="" />
            <meta property="og:locale" content="vi_VN" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="" />
            <meta name="twitter:title" content="HuyIT | Trang Chủ" />
            <meta name="twitter:description" content="HuyIT | Trang Chủ" />
            <meta name="twitter:image" content="" />
          </Head>
          <Room />
        </Layout>
      </IndexWrapper>
    )
}

export default RoomPage