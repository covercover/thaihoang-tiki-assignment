// _document is only rendered on the server side and not on the client side
// Is used to change the initial server side rendered document markup
// Commonly used to implement server side rendering for css-in-js libraries like styled-components or emotion. styled-jsx is included with Next.js by default.
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import * as React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

export default class MyDocument extends Document<any> {
	static async getInitialProps(ctx) {
		// Step 1: Create an instance of ServerStyleSheet
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			// Step 2: Retrieve styles from components in the page
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);

			// Step 3: Extract the styles as <style> tags
			const styleTags = sheet.getStyleElement();

			// Step 4: Pass styleTags as a prop
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{styleTags}
					</>
				)
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		// @ts-ignore
		return (
			<Html lang="eng">
				<Head>
					{/* Import CSS for nprogress */}
					<link rel='stylesheet' type='text/css' href='/static/assets/css/nprogress.css'/>
					<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
					<link rel="shortcut icon" type="image/x-icon" href="/static/assets/favicon.ico"/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<style jsx global>{`
          html, body {
            font-family: 'Roboto', sans-serif;
          }
          body {
            word-wrap: break-word;
          }
          .video {
            max-width: 800px;
          }
          #__next {
            min-height: 100%;
          }
        `}</style>
				<body className="custom_class">
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}
