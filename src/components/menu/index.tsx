import { FC } from 'react'
import NextLink from 'next/link'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export const Menus: FC = ({}) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem>
          <Link as={NextLink} href="/subjects">
            科目
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
