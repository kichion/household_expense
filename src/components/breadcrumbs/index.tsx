import type { FC } from 'react'
import NextLink from 'next/link'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export type BreadcrumbLink = {
  name: string
  href: string
}
export type BreadcrumbsProps = {
  linkList: BreadcrumbLink[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ linkList }) => {
  return (
    <Breadcrumb spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {linkList.map((l) => {
        return (
          <BreadcrumbItem key={l.name}>
            <BreadcrumbLink as={NextLink} href={l.href}>
              {l.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
