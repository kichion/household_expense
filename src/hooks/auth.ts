import type { User } from '@supabase/supabase-js'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Auth } from '@supabase/ui'

export type VerifyAuth = {
  done: boolean
  user: User | null
}

export const useRedirectAuth = (
  { needAuth } = { needAuth: true },
): VerifyAuth => {
  const { user } = Auth.useUser()
  const { replace, isReady } = useRouter()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!isReady) return
    if (!user && needAuth) replace('/signin')
    if (user && !needAuth) replace('/')
    const timer = setInterval(() => setDone(true), 200)
    return () => {
      clearTimeout(timer)
    }
  }, [isReady, user, needAuth, replace])

  return { done, user }
}
