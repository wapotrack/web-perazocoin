'use client'
import {
  Box,
  Input,
  VStack,
  SimpleGrid,
  Select,
  Text,
  Card,
  CardBody,
  Image,
  Badge,
  Heading,
  Container,
  InputGroup,
  InputLeftElement,
  Flex,
  useColorModeValue,
  Stack,
  IconButton,
  Collapse,
  Tooltip,
  Button
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import coinsData from '@/app/data/coins.json'
import countriesData from '@/app/data/countries.json'

interface Coin {
  id: string
  name: string
  year: number
  metal: string
  image: string
  description: string
  weight: string
  purity: string
  country?: string
  numero: string
  periodo: string
  moneda: string
  tipoMoneda: string
  denominacion: string
  valorFusion: string
  gobernante: string
  aleacion: string
  canto: string
  forma: string
  alineacion: string
  diametro: string
  grosor: string
}

export default function SearchCoins() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedMetal, setSelectedMetal] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [coins, setCoins] = useState<Coin[]>([])
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')


  const metals = Array.from(
    new Set(
      Object.values(coinsData)
        .flat()
        .map(coin => coin.metal)
    )
  ).sort()


  const years = Array.from(
    new Set(
      Object.values(coinsData)
        .flat()
        .map(coin => Number(coin.year))
    )
  ).sort((a, b) => b - a)

  // Preparar lista de monedas con país
  useEffect(() => {
    const allCoins: Coin[] = []
    Object.entries(coinsData).forEach(([country, countryCoins]) => {
      countryCoins.forEach(coin => {
        allCoins.push({ ...coin, country, year: parseInt(coin.year) })
      })
    })
    setCoins(allCoins)
  }, [])

  const filterCoins = () => {
    let filtered = coins
    let isSearching = false

    if (searchTerm || selectedCountry || selectedMetal || selectedYear) {
      isSearching = true

      if (searchTerm) {
        filtered = filtered.filter(coin =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      if (selectedCountry) {
        filtered = filtered.filter(coin => coin.country === selectedCountry)
      }

      if (selectedMetal) {
        filtered = filtered.filter(coin => coin.metal === selectedMetal)
      }

      if (selectedYear) {
        filtered = filtered.filter(coin => coin.year === parseInt(selectedYear))
      }
    } else {
      filtered = []
    }

    setHasSearched(isSearching)
    setFilteredCoins(filtered)
  }

  useEffect(() => {
    filterCoins()
  }, [searchTerm, selectedCountry, selectedMetal, selectedYear])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedMetal('')
    setSelectedYear('')
    setHasSearched(false)
    setFilteredCoins([])
  }

  const navigateToCoin = (coin: Coin) => {
    if (!coin.country) return

    let targetContinent = ''
    Object.entries(countriesData).forEach(([continent, data]) => {
      if (Object.keys(data.countries).includes(coin.country!)) {
        targetContinent = continent
      }
    })

    if (targetContinent) {
      router.push(`/continents/${targetContinent}?country=${coin.country}&coin=${coin.id}`)
    }
  }

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={6}>
          <Box w="100%" bg={bgColor} p={6} borderRadius="lg" boxShadow="sm" borderWidth={1} borderColor={borderColor}>
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar monedas por nombre o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <Flex w="100%" justify="space-between" align="center">
                {hasSearched && (
                  <Text color="gray.500">
                    {filteredCoins.length} monedas encontradas
                  </Text>
                )}
                <Flex gap={2}>
                  {(searchTerm || selectedCountry || selectedMetal || selectedYear) && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleClearFilters}
                    >
                      Limpiar filtros
                    </Button>
                  )}
                  <Tooltip label={showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}>
                    <IconButton
                      aria-label="Toggle filters"
                      icon={showFilters ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => setShowFilters(!showFilters)}
                      variant="ghost"
                      size="sm"
                    />
                  </Tooltip>
                </Flex>
              </Flex>

              <Collapse in={showFilters} animateOpacity>
                <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%">
                  <Select
                    placeholder="Seleccionar país"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {Object.entries(countriesData).map(([_, continent]) =>
                      Object.entries(continent.countries).map(([countryId, country]) => (
                        <option key={countryId} value={countryId}>
                          {country.flag} {country.name}
                        </option>
                      ))
                    )}
                  </Select>

                  <Select
                    placeholder="Seleccionar metal"
                    value={selectedMetal}
                    onChange={(e) => setSelectedMetal(e.target.value)}
                  >
                    {metals.map(metal => (
                      <option key={metal} value={metal}>
                        {metal}
                      </option>
                    ))}
                  </Select>

                  <Select
                    placeholder="Seleccionar año"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Select>
                </SimpleGrid>
              </Collapse>
            </VStack>
          </Box>

          {!hasSearched ? (
            <Box textAlign="center" py={8}>
              <Text fontSize="lg" color="gray.500">
                Ingresa un término de búsqueda o usa los filtros para encontrar monedas
              </Text>
            </Box>
          ) : filteredCoins.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text fontSize="lg" color="gray.500">
                No se encontraron monedas con los filtros seleccionados
              </Text>
            </Box>
          ) : (
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} w="100%">
              {filteredCoins.map((coin) => (
                <Card
                  key={coin.id}
                  cursor="pointer"
                  onClick={() => navigateToCoin(coin)}
                  _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
                  transition="all 0.2s"
                >
                  <CardBody>
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      borderRadius="lg"
                      mb={4}
                      fallbackSrc="https://placehold.co/200x200"
                    />
                    <Stack spacing={2}>
                      <Heading size="md">{coin.name}</Heading>
                      <Text color="gray.500" noOfLines={2}>
                        {coin.description}
                      </Text>
                      <Flex gap={2} wrap="wrap">
                        <Badge colorScheme="blue">{coin.year}</Badge>
                        <Badge colorScheme="purple">{coin.metal}</Badge>
                        <Badge colorScheme="green">{coin.weight}</Badge>
                        {coin.denominacion && (
                          <Badge colorScheme="orange">{coin.denominacion}</Badge>
                        )}
                        {coin.tipoMoneda && (
                          <Badge colorScheme="teal">{coin.tipoMoneda}</Badge>
                        )}
                      </Flex>
                      <VStack align="start" spacing={1} mt={2}>
                        {coin.periodo && (
                          <Text fontSize="sm">
                            <Text as="span" fontWeight="bold">Período:</Text> {coin.periodo}
                          </Text>
                        )}
                        {coin.gobernante && (
                          <Text fontSize="sm">
                            <Text as="span" fontWeight="bold">Gobernante:</Text> {coin.gobernante}
                          </Text>
                        )}
                        {coin.aleacion && (
                          <Text fontSize="sm">
                            <Text as="span" fontWeight="bold">Aleación:</Text> {coin.aleacion}
                          </Text>
                        )}
                        <Text fontSize="sm">
                          <Text as="span" fontWeight="bold">Medidas:</Text> {coin.diametro}mm × {coin.grosor}mm
                        </Text>
                      </VStack>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
} 