'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import supabase from '../../utils/supabase'
import useStore from '@/store'

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string
}) {
  const router = useRouter()
  const { updateLoginUser } = useStore()
  useEffect(() => {
    const getUserInfo = async () => {
      // ログインしているユーザーのセッション情報を取得
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!,
        })
      }
    }
    getUserInfo()
    // ユーザーのセッション情報の変化を監視する関数
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email! })
      // サーバーサイドのaccessTokenと一致するか確認
      if (session?.access_token !== accessToken) {
        // 一致しない場合に再実行する
        router.refresh()
      }
    })
  }, [accessToken])
  return null
}
