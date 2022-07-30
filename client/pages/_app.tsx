import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "../styles/color.css"


const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GQL_URL || " ",
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
