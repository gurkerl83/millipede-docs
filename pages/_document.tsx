import { ServerStyleSheets } from '@material-ui/styles';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { PathnameToLanguage, pathnameToLanguage } from '../docs/src/modules/utils/helpers';

/* eslint-disable class-methods-use-this */
class MillipedeDocument extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

type InitialProps = PathnameToLanguage & DocumentInitialProps;

MillipedeDocument.getInitialProps = async (ctx: DocumentContext): Promise<InitialProps> => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,

    canonical: pathnameToLanguage(ctx.req.url).canonical,
    userLanguage: ctx.query.userLanguage as string,

    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ) as any
    // styles: [...(initialProps.styles || []), sheets.getStyleElement()]
  };
};

export default MillipedeDocument;
