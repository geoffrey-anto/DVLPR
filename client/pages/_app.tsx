import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "../styles/color.css";

function MyApp({ Component, pageProps }: AppProps) {

  const graphqlClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GQL_URL_PROD || " ",
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <ApolloProvider client={graphqlClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
