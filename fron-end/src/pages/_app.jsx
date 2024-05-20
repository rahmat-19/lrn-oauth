import "@/pages/globals.css";
import Layout from "@/components/layout/App/layout";

import { AuthProvider } from "@/components/context/AuthContext";

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
