import type { Session } from '@supabase/supabase-js'

import { supabase } from 'src/lib/supabase-client'
import { useEffect, useState } from 'react'

export const useSession = (): Session | null => {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => setSession(supabase.auth.session()), [])
  return session
}
