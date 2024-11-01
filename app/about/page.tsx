'use client'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Avatar,
  Badge,
  useColorModeValue,
  Flex,
  Icon,
  Divider,
  Tag,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaSearch, FaBook, FaCamera, FaDatabase } from 'react-icons/fa'
import NavBar from '@/components/NavBar'

interface Collaborator {
  name: string
  role: string
  description: string
  image: string
  specialty: string[]
  contributions: number
  joined: string
}

const collaborators: Collaborator[] = [
  {
    name: 'Ezequiel Aranda',
    role: 'Investigador',
    description: 'Especialista en monedas antiguas de América Latina. Búsqueda y verificación de información histórica. Primer contribuidor de Perazzo Coins.',
    
    image: 'https://media.discordapp.net/attachments/1239394562657747007/1301778845707534366/image.png?ex=6725b786&is=67246606&hm=f586d225f27c44bcdb048c4a6fb496f384d98c1ca8089c0b530567cccc23fb94&=&format=webp&quality=lossless&width=351&height=437',
    specialty: ['Monedas Coloniales', 'Numismática Latinoamericana'],
    contributions: 145,
    joined: 'Marzo 1998'
  },
]

const leaders = [
  {
    name: 'Santino Silvero',
    role: 'Desarrollador Principal',
    description: 'Líder técnico y desarrollador full-stack. Responsable de la arquitectura y desarrollo del sistema completo de Perazzo Coins.',
    image: 'https://i.pinimg.com/564x/5e/e1/a7/5ee1a7e5fb702b70514e21c3dfe1069d.jpg', // Puedes reemplazar con la imagen real
    specialty: ['Full Stack', 'Arquitectura', 'UI/UX'],
    contributions: 50125012089,
    joined: 'Enero 1980',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in'
  },
  {
    name: 'Bautista González',
    role: 'Project Manager',
    description: 'Líder del proyecto y coordinador general. Encargado de la gestión, planificación y dirección estratégica de Perazzo Coins.',
    image: 'https://media.discordapp.net/attachments/1239394562657747007/1301778667822907482/image.png?ex=6725b75c&is=672465dc&hm=27eaea7e4bb96d144bd27bc8090d14088199e287c7a352db812f2df72aba390d&=&format=webp&quality=lossless&width=301&height=270', // Puedes reemplazar con la imagen real
    specialty: ['Gestión', 'Estrategia', 'Planificación'],
    contributions: 10000000,
    joined: 'Enero 1980',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in'
  }
]

export default function AboutPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const highlightBg = useColorModeValue('blue.50', 'blue.900')

  return (
    <>
      <NavBar />
      <Box minH="100vh" bg={bgColor} pt={20}>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={12} align="stretch">
            {/* Sección de Líderes */}
            <Box>
              <Heading mb={8} textAlign="center">Líderes del Proyecto</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={16}>
                {leaders.map((leader) => (
                  <Box
                    key={leader.name}
                    bg={highlightBg}
                    p={8}
                    borderRadius="xl"
                    boxShadow="xl"
                    borderWidth="2px"
                    borderColor="blue.200"
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
                  >
                    <VStack spacing={6} align="center">
                      <Avatar
                        size="2xl"
                        name={leader.name}
                        src={leader.image}
                        mb={4}
                        border="4px solid"
                        borderColor="blue.400"
                      />
                      <VStack spacing={2} align="center">
                        <Heading size="lg">{leader.name}</Heading>
                        <Badge
                          colorScheme="blue"
                          fontSize="md"
                          px={4}
                          py={1}
                          borderRadius="full"
                        >
                          {leader.role}
                        </Badge>
                      </VStack>
                      
                      <Text textAlign="center" fontSize="md">
                        {leader.description}
                      </Text>
                      
                      <HStack wrap="wrap" justify="center" spacing={3}>
                        {leader.specialty.map((spec) => (
                          <Tag key={spec} size="lg" colorScheme="blue" variant="solid">
                            {spec}
                          </Tag>
                        ))}
                      </HStack>
                      
                      <Divider />
                      
                      <HStack spacing={4}>
                        <IconButton
                          as="a"
                          href={leader.github}
                          target="_blank"
                          aria-label="GitHub"
                          icon={<FaGithub />}
                          size="lg"
                          colorScheme="blue"
                          variant="ghost"
                        />
                        <IconButton
                          as="a"
                          href={leader.linkedin}
                          target="_blank"
                          aria-label="LinkedIn"
                          icon={<FaLinkedin />}
                          size="lg"
                          colorScheme="blue"
                          variant="ghost"
                        />
                      </HStack>
                      
                      <Flex w="100%" justify="space-between" fontSize="sm">
                        <Text fontWeight="bold">
                          {leader.contributions} contribuciones
                        </Text>
                        <Text fontWeight="bold">
                          Desde {leader.joined}
                        </Text>
                      </Flex>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            {/* Sección de Equipo */}
            <Box>
              <Heading mb={8} textAlign="center">Equipo de Investigación</Heading>
              <Text textAlign="center" mb={12} fontSize="lg" color="gray.600">
                Conoce a los expertos detrás de nuestra extensa base de datos numismática
              </Text>
              
              <SimpleGrid 
                columns={{ base: 1, md: 2, lg: 3 }} 
                spacing={8}
                justifyItems="center"
                maxW="1200px"
                mx="auto"
              >
                {collaborators.map((collaborator) => (
                  <Box
                    key={collaborator.name}
                    bg={cardBg}
                    p={6}
                    borderRadius="lg"
                    boxShadow="md"
                    borderWidth="1px"
                    borderColor={borderColor}
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                  >
                    <VStack spacing={4} align="center">
                      <Avatar
                        size="xl"
                        name={collaborator.name}
                        src={collaborator.image}
                        mb={2}
                      />
                      <VStack spacing={1} align="center">
                        <Heading size="md">{collaborator.name}</Heading>
                        <Badge colorScheme="blue" fontSize="sm">
                          {collaborator.role}
                        </Badge>
                      </VStack>
                      
                      <Text textAlign="center" fontSize="sm" color="gray.500">
                        {collaborator.description}
                      </Text>
                      
                      <Divider />
                      
                      <HStack wrap="wrap" justify="center" spacing={2}>
                        {collaborator.specialty.map((spec) => (
                          <Tag key={spec} size="sm" colorScheme="purple">
                            {spec}
                          </Tag>
                        ))}
                      </HStack>
                      
                      <Flex w="100%" justify="space-between" fontSize="sm" color="gray.500">
                        <Text>{collaborator.contributions} contribuciones</Text>
                        <Text>Desde {collaborator.joined}</Text>
                      </Flex>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>


          </VStack>
        </Container>
      </Box>
    </>
  )
} 

