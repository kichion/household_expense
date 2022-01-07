import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'src/lib/supabase-client'

// HACK: using login user access token in server side
// ref: https://github.com/supabase/supabase/issues/1735#issuecomment-922284089
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}
