import { headers, cookies } from 'next/headers'
import SupabaseListener from '../components/supabase-listener'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/database.types'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ブラウザで持っているheader情報とcookie情報を渡す
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  // サーバーサイドからセッション情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  )
}
