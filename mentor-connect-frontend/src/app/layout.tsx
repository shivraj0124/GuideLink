// app/layout.tsx
import './globals.css'
import { SupabaseProvider } from './providers'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/components/context/Authprovider";
export const metadata = {
  title: 'MentorConnect',
  description: 'Your mentorship platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Toaster position="top-center" />
        <SupabaseProvider>{children}</SupabaseProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
