import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { Auth } from '@supabase/ui'

import { supabase } from 'src/lib/supabase-client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth.UserContextProvider>
  )
}

export default MyApp
