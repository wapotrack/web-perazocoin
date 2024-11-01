'use client'
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
  Image,
  Divider,
  IconButton,
  Heading,
} from '@chakra-ui/react'
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      bg={bgColor}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={borderColor}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Heading size="md">Perazzo Coins</Heading>
            </Box>
            <Text fontSize={'sm'}>
              © 2024 Perazzo Coins. Todos los derechos reservados
            </Text>
            <Stack direction={'row'} spacing={6}>
              <IconButton
                aria-label="twitter"
                icon={<FaTwitter />}
                size="lg"
                color={'gray.600'}
                variant={'ghost'}
                _hover={{
                  bg: 'blue.500',
                  color: 'white',
                }}
              />
              <IconButton
                aria-label="instagram"
                icon={<FaInstagram />}
                size="lg"
                color={'gray.600'}
                variant={'ghost'}
                _hover={{
                  bg: 'pink.500',
                  color: 'white',
                }}
              />
              <IconButton
                aria-label="linkedin"
                icon={<FaLinkedin />}
                size="lg"
                color={'gray.600'}
                variant={'ghost'}
                _hover={{
                  bg: 'blue.600',
                  color: 'white',
                }}
              />
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading size="sm">Compañía</Heading>
            <Link href={'/about'}>Sobre Nosotros</Link>
            <Link href={'/contact'}>Contacto</Link>
            <Link href={'/privacy'}>Política de Privacidad</Link>
            <Link href={'/terms'}>Términos de Servicio</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading size="sm">Soporte</Heading>
            <Link href={'/faq'}>FAQ</Link>
            <Link href={'/help'}>Centro de Ayuda</Link>
            <Link href={'/community'}>Comunidad</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading size="sm">Recursos</Heading>
            <Link href={'/blog'}>Blog</Link>
            <Link href={'/news'}>Noticias</Link>
            <Link href={'/guides'}>Guías</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
} 