import type { NextPage } from 'next'
import type { Subject } from 'src/features/subjects'

import NextLink from 'next/link'
import useSWR from 'swr'

import { Link, Box, Flex } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { Button } from '@supabase/ui'

import { Alert } from 'src/components/alert'
import { Breadcrumbs } from 'src/components/breadcrumbs'
import { useRedirectAuth } from 'src/hooks/auth'
import { fetcher } from 'src/pages/api'

const Subjects: NextPage = () => {
  const done = useRedirectAuth()
  const { data, error } = useSWR('/api/subjects', fetcher)

  return (
    <Box
      m="auto"
      maxW={900}
      borderRadius="md"
      borderWidth="1px"
      padding="2.5"
      marginY="5"
    >
      <Breadcrumbs linkList={[{ href: '/subjects', name: '科目' }]} />
      {error && <Alert title="data fetch error" error={error} />}
      <Flex justify="flex-end">
        <Link as={NextLink} href="/subjects/new">
          <Button>科目追加</Button>
        </Link>
      </Flex>
      {done && data && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>科目名</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(data as Subject[]).map(({ id, name }) => {
              return (
                <Tr key={id}>
                  <Td isNumeric>{id}</Td>
                  <Td>{name}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

export default Subjects
