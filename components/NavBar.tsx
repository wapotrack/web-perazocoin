import { ChakraProvider, Box, VStack, Heading, Button, useColorModeValue, Container, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import coinsData from '@/app/data/coins.json'

const MotionBox = motion(Box)

const NavBar = () => {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  const getRandomCoin = () => {
    const countryToContinent: { [key: string]: string } = {
      'USA': 'america',
      'Canada': 'america',
      'Brazil': 'america',
      'Argentina': 'america',
      'UK': 'europe',
      'France': 'europe',
      'Germany': 'europe',
      'Japan': 'asia',
      'China': 'asia',
      'India': 'asia',
      'Egypt': 'africa',
      'South Africa': 'africa',
      'Nigeria': 'africa'
    }

    const availableCountries = Object.keys(coinsData)

    const validCountries = availableCountries.filter(country => country in countryToContinent)
    
    if (validCountries.length === 0) {
      console.error('No hay países válidos con monedas')
      return
    }

    const randomCountry = validCountries[Math.floor(Math.random() * validCountries.length)]
    
    const coins = coinsData[randomCountry as keyof typeof coinsData]
    
    if (!coins || coins.length === 0) {
      console.error('No hay monedas para el país seleccionado')
      return
    }

    const randomCoin = coins[Math.floor(Math.random() * coins.length)]
    
    const continent = countryToContinent[randomCountry]

    if (!continent) {
      console.error('No se encontró el continente para el país seleccionado')
      return
    }

    router.push(`/continents/${continent}?country=${randomCountry}&coin=${randomCoin.id}`)
  }

  return (
    <Box as="nav" bg={bgColor} boxShadow="sm" position="fixed" width="100%" zIndex="sticky" top={0}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" py={4}>
          <Link href="/" passHref>
            <Heading 
              as="h1" 
              size="lg" 
              letterSpacing={'tighter'} 
              cursor="pointer"
              _hover={{ color: 'blue.500' }}
            >
              Perazzo Coins
            </Heading>
          </Link>
          <Flex align="center" gap={8}>
            <Link href="/" passHref>
              <Text
                fontWeight="bold"
                color={textColor}
                _hover={{ color: 'blue.500', textDecoration: 'none' }}
                cursor="pointer"
              >
                Home
              </Text>
            </Link>
            <Link href="/about" passHref>
              <Text
                fontWeight="bold"
                color={textColor}
                _hover={{ color: 'blue.500', textDecoration: 'none' }}
                cursor="pointer"
              >
                About
              </Text>
            </Link>
            <Text
              fontWeight="bold"
              color={textColor}
              _hover={{ color: 'blue.500', textDecoration: 'none' }}
              cursor="pointer"
              onClick={getRandomCoin}
            >
              Random Coin
            </Text>
            <Link href="/search" passHref>
              <Text
                fontWeight="bold"
                color={textColor}
                _hover={{ color: 'blue.500', textDecoration: 'none' }}
                cursor="pointer"
              >
                Buscar
              </Text>
            </Link>
 
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default NavBar;
