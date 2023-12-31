import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// アプリケーション全体に適用される
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
