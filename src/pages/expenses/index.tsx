import type { NextPage } from 'next'
import type { Expense } from 'src/features/expenses'

import NextLink from 'next/link'
import useSWR from 'swr'

import { Link, Box, Flex } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { Button } from '@supabase/ui'

import { Alert } from 'src/components/alert'
import { Breadcrumbs } from 'src/components/breadcrumbs'
import { useRedirectAuth } from 'src/hooks/auth'
import { expenseFinder } from 'src/pages/api/expenses'

const Expenses: NextPage = () => {
  const { done } = useRedirectAuth()
  const { data, error } = useSWR<Expense[]>('/api/expenses', expenseFinder)

  return (
    <Box
      m="auto"
      maxW={900}
      borderRadius="md"
      borderWidth="1px"
      padding="2.5"
      marginY="5"
    >
      <Breadcrumbs linkList={[{ href: '/expenses', name: '項目' }]} />
      {error && <Alert title="data fetch error" error={error} />}
      <Flex justify="flex-end">
        <Link as={NextLink} href="/expenses/new">
          <Button>項目追加</Button>
        </Link>
      </Flex>
      {done && data && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>計上日</Th>
              <Th>科目</Th>
              <Th>金額</Th>
              <Th>記入者</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({ id, date, value, subject, author }) => {
              return (
                <Tr key={id}>
                  <Td isNumeric>{id}</Td>
                  <Td>{date}</Td>
                  <Td>{subject?.name}</Td>
                  <Td>{value}</Td>
                  <Td>{author?.name}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

export default Expenses
