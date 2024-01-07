'use client'
import { Link } from '@chakra-ui/next-js'

export default function Page() {
  return (
    <Link href='/settings' color='blue.400' _hover={{ color: 'blue.500' }}>
      settings
    </Link>
  )
}
