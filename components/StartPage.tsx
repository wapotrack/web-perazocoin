import { 
  ChakraProvider,
  Box, 
  VStack,
  Heading,
  Container,
  Text,
  Icon,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  useColorModeValue,
  Flex,
  Circle,
  HStack,
  Tooltip
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { FaGlobe, FaCoins, FaSearch, FaInfoCircle, FaMapMarkedAlt, FaHistory } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function StartPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const statBg = useColorModeValue('whiteAlpha.900', 'whiteAlpha.200');
  const gradientOverlay = useColorModeValue(
    'linear(to-r, whiteAlpha.800, whiteAlpha.500)',
    'linear(to-r, blackAlpha.800, blackAlpha.500)'
  );

  const continents = [
    { 
      id: 'america', 
      name: 'América',
      image: '/images/america.jpg',
      description: 'Descubre las monedas del continente americano, desde las antiguas civilizaciones hasta la actualidad.',
      featured: 'American Eagle',
      countries: 10,
      gradient: 'linear(to-r, red.400, orange.500)',
      icon: FaMapMarkedAlt
    },
    { 
      id: 'europe', 
      name: 'Europa',
      image: '/images/europe.jpg',
      description: 'Explora la rica historia numismática europea a través de sus monedas más emblemáticas.',
      featured: 'Britannia',
      countries: 15,
      gradient: 'linear(to-r, blue.400, teal.500)',
      icon: FaGlobe
    }
  ];

  const features = [
    {
      icon: FaSearch,
      title: 'Búsqueda Inteligente',
      description: 'Sistema de filtrado avanzado para encontrar monedas específicas.',
      gradient: 'linear(to-tr, pink.400, purple.500)'
    },
    {
      icon: FaCoins,
      title: 'Colección Detallada',
      description: 'Información completa y detallada de cada moneda en nuestra base de datos.',
      gradient: 'linear(to-tr, yellow.400, orange.500)'
    },
    {
      icon: FaHistory,
      title: 'Historia Numismática',
      description: 'Descubre la fascinante historia detrás de cada pieza.',
      gradient: 'linear(to-tr, green.400, teal.500)'
    }
  ];

  const technologies = [
    { 
      name: 'React', 
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg'
    },
    {
      name: 'Next.js',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg'
    },
    {
      name: 'Chakra UI',
      icon: 'https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/logo-colored@2x.png?raw=true'
    },
    {
      name: 'TypeScript',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg'
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg'
    },
    {
      name: 'Framer Motion',
      icon: 'https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png'
    }
  ];

  return (
    <ChakraProvider>
      <NavBar />
      <Box minHeight="100vh" bg={bgColor}>
        {/* Hero Section Mejorado */}
        <Box 
          bgImage="url('/images/coins-background.jpg')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          py={32}
          position="relative"
        >
          <Box 
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient={gradientOverlay}
            backdropFilter="blur(2px)"
          />
          <Container maxW="container.xl" position="relative" zIndex={1}>
            <VStack spacing={12} align="center">
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Heading 
                  as="h1" 
                  size="2xl" 
                  textAlign="center"
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                  fontWeight="extrabold"
                  mb={6}
                >
                  Perazzo Coins
                </Heading>
                <Text
                  fontSize="xl"
                  color={useColorModeValue('gray.700', 'gray.200')}
                  textAlign="center"
                  maxW="2xl"
                  mx="auto"
                  fontWeight="medium"
                >
                  Explora nuestra colección mundial de monedas y descubre la historia detrás de cada pieza
                </Text>
              </MotionBox>

              {/* Stats Section Mejorado */}
              <StatGroup 
                bg={statBg} 
                p={8}
                borderRadius="2xl"
                width="full"
                maxW="4xl"
                boxShadow="xl"
                backdropFilter="blur(10px)"
              >
                {[
                  { label: 'Continentes', value: '4' },
                  { label: 'Países', value: '100+' },
                  { label: 'Monedas', value: '26+' },
                  { label: 'Coleccionistas', value: '3+' }
                ].map((stat) => (
                  <Stat key={stat.label} textAlign="center">
                    <StatLabel fontSize="lg" fontWeight="medium">{stat.label}</StatLabel>
                    <StatNumber 
                      fontSize="4xl" 
                      fontWeight="bold"
                      bgGradient="linear(to-r, blue.400, purple.500)"
                      bgClip="text"
                    >
                      {stat.value}
                    </StatNumber>
                  </Stat>
                ))}
              </StatGroup>
            </VStack>
          </Container>
        </Box>

        {/* About Section */}
        <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
          <Container maxW="container.xl">
            <VStack spacing={12}>
              <VStack spacing={6} textAlign="center" maxW="3xl">
                <Heading 
                  as="h2" 
                  size="xl"
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                >
                  Sobre la Numismática y Nuestra Historia
                </Heading>
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                  La numismática es la ciencia que estudia las monedas y medallas, especialmente las antiguas. 
                  Va más allá de la simple colección, abarcando el estudio de la historia económica, 
                  artística y social que cada pieza representa.
                </Text>
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                  Este proyecto nació en las aulas de 4°2° como parte de la materia de Historia, 
                  bajo la guía del profesor Octavio Perazzo. Los estudiantes Santino Silvero y 
                  Bautista González desarrollaron esta plataforma para compartir su pasión por 
                  la historia a través de las monedas.
                </Text>
              </VStack>

              <Box w="full">
                <VStack spacing={4} mb={8}>
                  <Heading 
                    as="h3" 
                    size="lg"
                    textAlign="center"
                  >
                    Tecnologías Utilizadas
                  </Heading>
                  <Text 
                    fontSize="md" 
                    color={useColorModeValue('gray.600', 'gray.300')}
                    textAlign="center"
                  >
                    Construido con las últimas tecnologías web
                  </Text>
                </VStack>

                <SimpleGrid 
                  columns={[2, 3, 6]} 
                  spacing={8}
                  bg={cardBg}
                  p={8}
                  borderRadius="2xl"
                  boxShadow="lg"
                >
                  {technologies.map((tech) => (
                    <VStack 
                      key={tech.name}
                      spacing={4}
                      as={MotionBox}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: "0.3s" }}
                    >
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        boxSize="50px"
                        objectFit="contain"
                        filter={useColorModeValue('none', 'brightness(0) invert(1)')}
                      />
                      <Text 
                        fontSize="sm" 
                        fontWeight="medium"
                        color={useColorModeValue('gray.600', 'gray.300')}
                      >
                        {tech.name}
                      </Text>
                    </VStack>
                  ))}
                </SimpleGrid>
              </Box>
            </VStack>
          </Container>
        </Box>

        {/* Continents Section Mejorado */}
        <Container maxW="container.xl" py={20}>
          <SimpleGrid columns={[1, null, 2]} spacing={10}>
            {continents.map((continent, index) => (
              <Link key={continent.id} href={`/continents/${continent.id}`} passHref>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "2xl"
                  }}
                  cursor="pointer"
                  overflow="hidden"
                  borderRadius="2xl"
                  boxShadow="lg"
                >
                  <CardBody p={0}>
                    <Box position="relative">
                      <Box height="250px" overflow="hidden">
                        <Image
                          src={continent.image}
                          alt={continent.name}
                          objectFit="cover"
                          width="100%"
                          height="100%"
                          fallbackSrc="https://indianartideas.in/articleimages/1701422925INDO%20LADY%202.jpg"
                          transition="0.3s"
                          _hover={{ transform: 'scale(1.05)' }}
                        />
                      </Box>
                      <Box 
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgGradient={continent.gradient}
                        opacity={0.7}
                      />
                      <Box 
                        position="absolute"
                        top={4}
                        right={4}
                        p={3}
                        borderRadius="full"
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow="lg"
                      >
                        <Icon as={continent.icon} w={6} h={6} color="blue.500" />
                      </Box>
                    </Box>
                    <Stack spacing={4} p={6}>
                      <Heading size="lg">{continent.name}</Heading>
                      <Text color={useColorModeValue('gray.600', 'gray.300')}>
                        {continent.description}
                      </Text>
                      <HStack justify="space-between" align="center">
                        <Badge 
                          colorScheme="blue" 
                          fontSize="sm"
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          {continent.countries} países
                        </Badge>
                        <Tooltip label="Moneda más destacada" hasArrow>
                          <Text fontSize="sm" color="gray.500">
                            {continent.featured}
                          </Text>
                        </Tooltip>
                      </HStack>
                    </Stack>
                  </CardBody>
                </MotionCard>
              </Link>
            ))}
          </SimpleGrid>
        </Container>

        {/* Features Section Mejorado */}
        <Box py={20} bg={useColorModeValue('gray.50', 'gray.800')}>
          <Container maxW="container.xl">
            <SimpleGrid columns={[1, null, 3]} spacing={10}>
              {features.map((feature, index) => (
                <MotionBox
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <VStack 
                    align="start" 
                    spacing={6} 
                    p={8}
                    bg={cardBg}
                    borderRadius="2xl"
                    boxShadow="lg"
                    height="full"
                    position="relative"
                    overflow="hidden"
                  >
                    <Circle 
                      size="50px"
                      bgGradient={feature.gradient}
                      color="white"
                    >
                      <Icon as={feature.icon} w={6} h={6} />
                    </Circle>
                    <Heading size="md">{feature.title}</Heading>
                    <Text color={useColorModeValue('gray.600', 'gray.300')}>
                      {feature.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    </ChakraProvider>
  );
}