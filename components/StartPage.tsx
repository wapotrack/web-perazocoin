import { 
  ChakraProvider, 
  Box, 
  VStack, 
  Heading, 
  Button, 
  useColorModeValue, 
  Container, 
  Grid, 
  Text, 
  Icon,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Divider,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { FaGlobe, FaCoins, FaSearch, FaInfoCircle } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function StartPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const statBg = useColorModeValue('blue.50', 'blue.900');

  const continents = [
    { 
      id: 'america', 
      name: 'America',
      image: '/images/america.jpg',
      description: 'Descubre las monedas del continente americano, desde las antiguas civilizaciones hasta la actualidad.',
      featured: 'American Eagle',
      countries: 10
    },
    { 
      id: 'europe', 
      name: 'Europe',
      image: '/images/europe.jpg',
      description: 'Explora la rica historia numismática europea a través de sus monedas más emblemáticas.',
      featured: 'Britannia',
      countries: 15
    },
    { 
      id: 'asia', 
      name: 'Asia',
      image: '/images/asia.jpg',
      description: 'Sumérgete en la fascinante colección de monedas asiáticas y su significado cultural.',
      featured: 'Panda Chino',
      countries: 10
    },
    { 
      id: 'africa', 
      name: 'Africa',
      image: '/images/africa.jpg',
      description: 'Conoce las monedas africanas y su importante papel en la historia del continente.',
      featured: 'Krugerrand',
      countries: 10
    }
  ];

  return (
    <ChakraProvider>
      <NavBar />
      <Box minHeight="100vh" bg={bgColor}>
        {/* Hero Section */}
        <Box 
          bgImage="url('/images/coins-background.jpg')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          py={40}
          position="relative"
        >
          <Box 
            position="absolute" 
            top={0} 
            left={0} 
            right={0} 
            bottom={0} 
            bg="blackAlpha.600"
          />
          <Container maxW="container.xl" position="relative">
            <VStack spacing={8} align="center">
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Heading 
                  as="h1" 
                  size="2xl" 
                  textAlign="center"
                  color="white"
                  fontWeight="extrabold"
                  mb={4}
                >
                  ¡Bienvenido a Perazzo Coins!
                </Heading>
                <Text
                  fontSize="xl"
                  color="white"
                  textAlign="center"
                  maxW="2xl"
                  mx="auto"
                >
                  Explora nuestra colección mundial de monedas y descubre la historia detrás de cada pieza.
                </Text>
              </MotionBox>

              {/* Stats Section */}
              <StatGroup 
                bg={statBg} 
                p={6} 
                borderRadius="lg" 
                width="full" 
                maxW="4xl"
                textAlign="center"
              >
                <Stat>
                  <StatLabel>Continentes</StatLabel>
                  <StatNumber>4</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Países</StatLabel>
                  <StatNumber>45+</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Monedas</StatLabel>
                  <StatNumber>100+</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Coleccionistas</StatLabel>
                  <StatNumber>1000+</StatNumber>
                </Stat>
              </StatGroup>
            </VStack>
          </Container>
        </Box>

        {/* Continents Section */}
        <Container maxW="container.xl" py={16}>
          <SimpleGrid columns={[1, null, 2]} spacing={8}>
            {continents.map((continent, index) => (
              <Link key={continent.id} href={`/continents/${continent.id}`} passHref>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  cursor="pointer"
                  overflow="hidden"
                  variant="outline"
                >
                  <CardBody>
                    <Box 
                      height="200px" 
                      borderRadius="md" 
                      overflow="hidden" 
                      mb={4}
                    >
                      <Image
                        src={continent.image}
                        alt={continent.name}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        fallbackSrc="https://indianartideas.in/articleimages/1701422925INDO%20LADY%202.jpg"
                      />
                    </Box>
                    <Stack spacing={3}>
                      <Heading size="lg">{continent.name}</Heading>
                      <Text>{continent.description}</Text>
                      <Divider />
                      <Stack direction="row" justify="space-between" align="center">
                        <Badge colorScheme="blue" fontSize="sm">
                          {continent.countries} países
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          Moneda destacada: {continent.featured}
                        </Text>
                      </Stack>
                    </Stack>
                  </CardBody>
                </MotionCard>
              </Link>
            ))}
          </SimpleGrid>
        </Container>

        {/* Features Section */}
        <Box bg={cardBg} py={16}>
          <Container maxW="container.xl">
            <SimpleGrid columns={[1, null, 3]} spacing={8}>
              <VStack align="start" spacing={4} p={6}>
                <Icon as={FaSearch} w={8} h={8} color="blue.500" />
                <Heading size="md">Búsqueda Inteligente</Heading>
                <Text>Encuentra rápidamente las monedas que buscas con nuestro sistema de filtrado avanzado.</Text>
              </VStack>
              <VStack align="start" spacing={4} p={6}>
                <Icon as={FaCoins} w={8} h={8} color="blue.500" />
                <Heading size="md">Colección Detallada</Heading>
                <Text>Información completa sobre cada moneda, incluyendo historia, especificaciones y más.</Text>
              </VStack>
              <VStack align="start" spacing={4} p={6}>
                <Icon as={FaInfoCircle} w={8} h={8} color="blue.500" />
                <Heading size="md">Actualizaciones Regulares</Heading>
                <Text>Nuevas monedas y datos agregados constantemente a nuestra base de datos.</Text>
              </VStack>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    </ChakraProvider>
  );
}