import type { NextPage } from 'next'

import { Auth } from '@supabase/ui'
import { Box } from '@chakra-ui/react'

import { supabase } from 'src/lib/supabase-client'
import { useRedirectAuth } from 'src/hooks/auth'

const SignIn: NextPage = () => {
  const done = useRedirectAuth({ needAuth: false })
  return (
    <Box m="auto" maxW={350}>
      {done && <Auth supabaseClient={supabase} />}
    </Box>
  )
}

export default SignIn
