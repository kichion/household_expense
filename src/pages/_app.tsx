import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { Auth } from '@supabase/ui'

import { supabase } from 'src/lib/supabase-client'
import { useApiAccessToken } from 'src/hooks/auth'

function MyApp({ Component, pageProps }: AppProps) {
  useApiAccessToken()

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth.UserContextProvider>
  )
}

export default MyApp
