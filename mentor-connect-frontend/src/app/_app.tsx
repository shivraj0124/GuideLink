import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../components/context/Authprovider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
        {/* <AuthProvider> */}
        <Toaster position="top-center" />
        <Component {...pageProps} />
    {/* </AuthProvider> */}
      </SessionContextProvider>
  );
}
