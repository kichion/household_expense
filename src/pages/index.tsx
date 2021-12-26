import type { NextPage } from 'next'

import { Box } from '@chakra-ui/react'

import { useRedirectAuth } from 'src/hooks/auth'
import { Menus } from 'src/components/menu'

const Home: NextPage = () => {
  const done = useRedirectAuth()

  return (
    <Box m="auto" maxW={350} borderRadius="md" borderWidth="1px" padding="2.5">
      {done && <Menus />}
    </Box>
  )
}

export default Home
