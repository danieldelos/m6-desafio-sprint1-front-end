import { AuthProvider } from "@/contexts/authContext";
import { ContactProvider } from "@/contexts/contatactsContext";
import "@/styles/globals.css";
import custonTheme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={custonTheme}>
      <AuthProvider>
        <ContactProvider>
        <Component {...pageProps} />
        </ContactProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}


