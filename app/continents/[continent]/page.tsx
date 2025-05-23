'use client'
import { useState, useEffect } from 'react'
import { ChakraProvider, Box, VStack, Heading, Text, useColorModeValue, Container, Grid, Button, Image, SimpleGrid, Badge, Flex, Skeleton, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams } from 'next/navigation'
import NavBar from '@/components/NavBar'
import continentsData from '@/app/data/continents.json'
import coinsData from '@/app/data/coins.json'

const MotionBox = motion(Box)

export default function ContinentPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const continent = params.continent as string
  
  const countryParam = searchParams.get('country')
  const coinParam = searchParams.get('coin')

  const [selectedCountry, setSelectedCountry] = useState(countryParam || '')
  const [selectedCoin, setSelectedCoin] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    if (countryParam && coinParam) {
      const countryCoins = coinsData[countryParam as keyof typeof coinsData] || []
      const coin = countryCoins.find(c => c.id === coinParam)
      if (coin) {
        setSelectedCoin(coin)
      }
    }
  }, [countryParam, coinParam])


  useEffect(() => {
    if (countryParam) {
      setSelectedCountry(countryParam)
    }
  }, [countryParam])

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const sidebarBgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const continentInfo = continentsData[continent as keyof typeof continentsData]
  const countryCoins = selectedCountry ? coinsData[selectedCountry as keyof typeof coinsData] || [] : []

  if (!continentInfo) {
    return (
      <ChakraProvider>
        <NavBar />
        <Container maxW="container.xl" py={8}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="lg"
            mt={20}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Continente no encontrado
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Lo sentimos, el continente que buscas no existe en nuestra base de datos.
            </AlertDescription>
          </Alert>
        </Container>
      </ChakraProvider>
    )
  }

  const countries = Object.entries(continentInfo.countries)
    .filter(([countryId]) => {
      // Solo mostrar países que tienen monedas en coinsData
      const countryCoins = coinsData[countryId as keyof typeof coinsData]
      return countryCoins && countryCoins.length > 0
    })

  if (countries.length === 0) {
    return (
      <ChakraProvider>
        <NavBar />
        <Box minHeight="100vh" bg={bgColor} pt={20}>
          <Container maxW="container.xl" py={8}>
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              borderRadius="lg"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                No hay monedas disponibles
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Aún no tenemos monedas disponibles para este continente. 
                Estamos trabajando para agregar más contenido pronto.
              </AlertDescription>
            </Alert>
          </Container>
        </Box>
      </ChakraProvider>
    )
  }


  if (isLoading) {
    return (
      <ChakraProvider>
        <NavBar />
        <Box minHeight="100vh" bg={bgColor} pt={20}>
          <Container maxW="container.xl" py={8}>
            <Grid templateColumns="1fr 250px" gap={8}>
              <Box>
                <VStack spacing={8} align="stretch">
                  <Skeleton height="60px" />
                  <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                    {[1, 2, 3].map((i) => (
                      <Box key={i} borderRadius="lg" overflow="hidden">
                        <Skeleton height="200px" />
                        <Box p={4}>
                          <Skeleton height="20px" mb={2} />
                          <Skeleton height="20px" mb={2} />
                          <Skeleton height="20px" />
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                </VStack>
              </Box>
              <Box>
                <Skeleton height="400px" />
              </Box>
            </Grid>
          </Container>
        </Box>
      </ChakraProvider>
    )
  }


  if (selectedCoin) {
    return (
      <ChakraProvider>
        <NavBar />
        <Box minHeight="100vh" bg={bgColor} pt={20}>
          <Container maxW="container.xl" py={8}>
            <Button 
              mb={8} 
              onClick={() => setSelectedCoin(null)}
              leftIcon={<Text>←</Text>}
            >
              Volver
            </Button>
            <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} gap={8}>
              <Box>
                <Grid templateColumns="1fr 1fr" gap={4}>
                  {selectedCoin.image && (
                    <Box
                      position="relative"
                      cursor="pointer"
                      onClick={() => setSelectedImage(selectedCoin.image)}
                    >
                      <Image 
                        src={selectedCoin.image} 
                        alt={`${selectedCoin.name} - Anverso`}
                        borderRadius="lg"
                        boxShadow="lg"
                        width="100%"
                        height="auto"
                      />
                      <Text 
                        position="absolute" 
                        bottom="2" 
                        left="50%" 
                        transform="translateX(-50%)"
                        bg="blackAlpha.700"
                        color="white"
                        px={2}
                        borderRadius="md"
                        fontSize="sm"
                      >
                        Anverso
                      </Text>
                    </Box>
                  )}
                  {selectedCoin.reverseImage && (
                    <Box
                      position="relative"
                      cursor="pointer"
                      onClick={() => setSelectedImage(selectedCoin.reverseImage)}
                    >
                      <Image 
                        src={selectedCoin.reverseImage} 
                        alt={`${selectedCoin.name} - Reverso`}
                        borderRadius="lg"
                        boxShadow="lg"
                        width="100%"
                        height="auto"
                      />
                      <Text 
                        position="absolute" 
                        bottom="2" 
                        left="50%" 
                        transform="translateX(-50%)"
                        bg="blackAlpha.700"
                        color="white"
                        px={2}
                        borderRadius="md"
                        fontSize="sm"
                      >
                        Reverso
                      </Text>
                    </Box>
                  )}
                </Grid>
                {selectedImage && (
                  <Box
                    position="fixed"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="blackAlpha.800"
                    zIndex={1000}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => setSelectedImage(null)}
                  >
                    <Image
                      src={selectedImage}
                      alt={selectedCoin.name}
                      maxH="90vh"
                      maxW="90vw"
                      objectFit="contain"
                    />
                  </Box>
                )}
              </Box>
              <Box>
                <VStack align="stretch" spacing={4}>
                  <Heading size="xl">{selectedCoin.name}</Heading>
                  <Text fontSize="lg" color="gray.500" mb={4}>
                    {continentInfo.countries[selectedCountry].flag} {' '}
                    {continentInfo.countries[selectedCountry].name}
                  </Text>
                  <Box 
                    overflowX="auto" 
                    borderRadius="lg" 
                    boxShadow="lg"
                    bg={useColorModeValue('white', 'gray.800')}
                  >
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                      <tbody>
                        {Object.entries(selectedCoin).map(([key, value], index) => {
                          if (['id', 'name', 'image', 'reverseImage'].includes(key)) return null;
                          
                          const keyTranslations: { [key: string]: string } = {
                            year: "Año",
                            description: "Descripción",
                            metal: "Metal",
                            weight: "Peso",
                            purity: "Pureza",
                            numero: "Número",
                            periodo: "Período",
                            moneda: "Moneda",
                            tipoMoneda: "Tipo de Moneda",
                            denominacion: "Denominación",
                            valorFusion: "Valor de Fusión",
                            gobernante: "Gobernante",
                            aleacion: "Aleación",
                            canto: "Canto",
                            forma: "Forma",
                            alineacion: "Alineación",
                            diametro: "Diámetro",
                            grosor: "Grosor"
                          };

                          const formattedKey = keyTranslations[key] || key.charAt(0).toUpperCase() + 
                            key.slice(1).replace(/([A-Z])/g, ' $1').trim();

                          if (!value) return null;

                          return (
                            <tr 
                              key={key}
                              style={{ 
                                backgroundColor: index % 2 === 0 
                                  ? 'var(--chakra-colors-gray-50)' 
                                  : 'transparent'
                              }}
                            >
                              <td 
                                style={{ 
                                  padding: '12px 16px',
                                  fontWeight: 'bold',
                                  color: 'var(--chakra-colors-blue-600)',
                                  width: '40%'
                                }}
                              >
                                {formattedKey}
                              </td>
                              <td 
                                style={{ 
                                  padding: '12px 16px',
                                  fontSize: '1.1em'
                                }}
                              >
                                {value as string}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Box>
                </VStack>
              </Box>
            </Grid>
          </Container>
        </Box>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider>
      <NavBar />
      <Box minHeight="100vh" bg={bgColor} pt={20}>
        <Container maxW="container.xl" py={8}>
          <Grid templateColumns="1fr 250px" gap={8}>
            <Box>
              <VStack spacing={8} align="stretch">
                <MotionBox
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Heading 
                    as="h2" 
                    size="2xl" 
                    textAlign="center"
                    bgGradient={continentInfo.gradient}
                    bgClip="text"
                    fontWeight="extrabold"
                    mb={4}
                  >
                    {continentInfo.name} Coins
                  </Heading>
                </MotionBox>
                {selectedCountry ? (
                  <>
                    <Heading as="h3" size="lg" mb={4}>
                      {continentInfo.countries[selectedCountry].flag} {' '}
                      {continentInfo.countries[selectedCountry].name} Coins
                    </Heading>
                    <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                      {countryCoins.map((coin) => (
                        <Box key={coin.id} borderWidth={1} borderRadius="lg" overflow="hidden" boxShadow="md">
                          <Image src={coin.image} alt={coin.name} width="100%" />
                          <Box p={4}>
                            <Heading as="h4" size="md" mb={2}>{coin.name}</Heading>
                            <Text>Year: {coin.year}</Text>
                            <Text mt={2} noOfLines={2}>{coin.description}</Text>
                            <Box mt={2}>
                              <Badge colorScheme="purple" mr={2}>{coin.metal}</Badge>
                              <Badge colorScheme="blue" mr={2}>{coin.weight}</Badge>
                              <Badge colorScheme="green">{coin.purity}</Badge>
                            </Box>
                            <Button 
                              mt={4} 
                              colorScheme="blue" 
                              width="100%"
                              onClick={() => setSelectedCoin(coin)}
                            >
                              Ver más
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </>
                ) : (
                  <Text fontSize="xl" textAlign="center">Select a country to view its coins.</Text>
                )}
              </VStack>
            </Box>
            <Box as="aside" bg={sidebarBgColor} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
              <Heading as="h3" size="md" mb={4}>Countries</Heading>
              <VStack spacing={2} align="stretch">
                {countries.map(([countryId, countryData]) => (
                  <Button 
                    key={countryId}
                    onClick={() => setSelectedCountry(countryId)}
                    colorScheme={selectedCountry === countryId ? 'blue' : 'gray'}
                    variant={selectedCountry === countryId ? 'solid' : 'ghost'}
                    leftIcon={<Text>{countryData.flag}</Text>}
                  >
                    {countryData.name}
                  </Button>
                ))}
              </VStack>
            </Box>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  )
} 