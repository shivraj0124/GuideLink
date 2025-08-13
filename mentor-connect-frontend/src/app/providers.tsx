// src/app/providers.tsx
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { createContext, useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
