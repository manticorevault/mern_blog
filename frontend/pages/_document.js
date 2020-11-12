import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {

  setGoogleTags() {

    // Remove the ! on prod once you get the domain endpoint
    if (!publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZP7BR29CB1');
        `
      };
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/styles.css" />

          <React.Fragment>
            <script dangerouslySetInnerHTML={this.setGoogleTags()} />
          </React.Fragment>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;