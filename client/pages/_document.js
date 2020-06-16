import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="vi">
        <Head>
          {/* <link rel="icon" type="image/png" href="https://clinic.weva.vn/favicon.ico"></link> */}
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link
            href="https://fonts.googleapis.com/css?family=HelveticaNeue:300,400,500,700,900"
            rel="stylesheet"
            key="font-seccond"
          />
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}