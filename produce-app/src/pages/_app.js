import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
// pages/_app.js

import { ProduceProvider } from "./context/ProduceContext";

function MyApp({ Component, pageProps }) {
  return (
    <ProduceProvider>
      <Component {...pageProps} />
    </ProduceProvider>
  );
}

export default MyApp;
