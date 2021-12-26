import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Auth } from '@supabase/ui'

export const useRedirectAuth = ({ needAuth } = { needAuth: true }): boolean => {
  const { user } = Auth.useUser()
  const { replace, isReady } = useRouter()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!isReady) return
    if (!user && needAuth) replace('/signin')
    if (user && !needAuth) replace('/')
    setInterval(() => setDone(true), 200)
  }, [isReady, user, needAuth, replace])

  return done
}
