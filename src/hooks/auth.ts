import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Auth } from '@supabase/ui'
import { supabase } from 'src/lib/supabase-client'

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

const postAuth = (event: AuthChangeEvent, session: Session | null) => {
  if (event === 'TOKEN_REFRESHED' && !session) {
    event = 'SIGNED_IN'
  }
  fetch('/api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err.message)
    })
}

export const useApiAccessToken = (): void => {
  const session = supabase.auth.session()
  postAuth('SIGNED_IN', session)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => postAuth(event, session),
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])
}
