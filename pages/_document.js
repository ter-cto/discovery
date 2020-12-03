import Document, { Html, Head, Main, NextScript } from "next/document";
import patchSharing  from "@module-federation/nextjs-mf/patchSharing";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                {patchSharing()}
                {/*<script src="http://localhost:4000/_next/static/remoteEntryMerged.js" />*/}
                <script src="http://cto-landing.netlify.app/_next/static/remoteEntryMerged.js" />
                <Head />
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;