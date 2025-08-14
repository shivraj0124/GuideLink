import "@/styles/globals.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthProvider"; // Adjust path based on your structure

export default function App({ Component, pageProps }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AuthProvider>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </AuthProvider>
    </SessionContextProvider>
  );
}
