// pages/_app.js
import '../styles/globals.css'; // Import global styles
import Layout from './layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;