'use client'
import { ChakraProvider, Box } from '@chakra-ui/react'
import NavBar from '@/components/NavBar'
import SearchCoins from '@/components/SearchCoins'

export default function SearchPage() {
  return (
    <ChakraProvider>
      <NavBar />
      <Box pt={20}>
        <SearchCoins />
      </Box>
    </ChakraProvider>
  )
} 