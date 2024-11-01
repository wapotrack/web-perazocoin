'use client'
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  Container,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import continentsData from '@/app/data/continents.json'
import coinsData from '@/app/data/coins.json'
import countriesData from '@/app/data/countries.json'

interface CoinForm {
  id: string
  name: string
  year: string
  country: string
  description: string
  metal: string
  weight: string
  purity: string
  image: string
  reverseImage: string
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

export default function AdminPage() {
  const toast = useToast()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  
  const [formData, setFormData] = useState<CoinForm>({
    id: '',
    name: '',
    year: '',
    country: '',
    description: '',
    metal: '',
    weight: '',
    purity: '',
    image: '',
    reverseImage: '',
    numero: '',
    periodo: '',
    moneda: '',
    tipoMoneda: '',
    denominacion: '',
    valorFusion: '',
    gobernante: '',
    aleacion: '',
    canto: '',
    forma: '',
    alineacion: '',
    diametro: '',
    grosor: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [coins, setCoins] = useState<any[]>([])

  useEffect(() => {
    // Cargar todas las monedas existentes
    const allCoins: any[] = []
    Object.entries(coinsData).forEach(([country, countryCoins]) => {
      countryCoins.forEach(coin => {
        allCoins.push({ ...coin, country })
      })
    })
    setCoins(allCoins)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateId = (name: string, country: string) => {
    const countryPrefix = country.toLowerCase().substring(0, 3)
    const nameSlug = name.toLowerCase().replace(/\s+/g, '-')
    return `${countryPrefix}-${nameSlug}-${new Date().getFullYear()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Crear objeto con todos los campos
      const coinData = {
        ...formData,
        id: generateId(formData.name, formData.country),
        year: parseInt(formData.year)
      }

      // Verificar que los campos requeridos no estén vacíos
      const requiredFields = ['name', 'country', 'year', 'metal', 'weight', 'purity', 'image', 'description']
      const missingFields = requiredFields.filter(field => !coinData[field as keyof typeof coinData])

      if (missingFields.length > 0) {
        toast({
          title: 'Campos requeridos faltantes',
          description: `Por favor complete los siguientes campos: ${missingFields.join(', ')}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coinData),
      })

      if (!response.ok) throw new Error('Error al guardar la moneda')

      const result = await response.json()

      if (result.success) {
        toast({
          title: 'Moneda agregada',
          description: 'La moneda se ha guardado correctamente',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        // Actualizar la lista de monedas
        setCoins(prev => [...prev, { ...coinData, country: formData.country }])
        
        // Limpiar el formulario
        setFormData({
          id: '',
          name: '',
          year: '',
          country: '',
          description: '',
          metal: '',
          weight: '',
          purity: '',
          image: '',
          reverseImage: '',
          numero: '',
          periodo: '',
          moneda: '',
          tipoMoneda: '',
          denominacion: '',
          valorFusion: '',
          gobernante: '',
          aleacion: '',
          canto: '',
          forma: '',
          alineacion: '',
          diametro: '',
          grosor: ''
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar la moneda',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ChakraProvider>
      <NavBar />
      <Box minHeight="100vh" bg={bgColor} pt={20}>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Heading>Administrar Monedas</Heading>
            
            <Box as="form" onSubmit={handleSubmit}>
              <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>País</FormLabel>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Selecciona un país"
                    >
                      {Object.entries(countriesData).map(([continentId, continent]) => (
                        <optgroup key={continentId} label={continent.name}>
                          {Object.entries(continent.countries).map(([countryId, country]) => (
                            <option key={countryId} value={countryId}>
                              {country.flag} {country.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Nombre de la Moneda</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Año</FormLabel>
                    <Input
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Metal</FormLabel>
                    <Input
                      name="metal"
                      value={formData.metal}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </VStack>

                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Peso</FormLabel>
                    <Input
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Pureza</FormLabel>
                    <Input
                      name="purity"
                      value={formData.purity}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>URL de la Imagen (Anverso)</FormLabel>
                    <Input
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>URL de la Imagen (Reverso)</FormLabel>
                    <Input
                      name="reverseImage"
                      value={formData.reverseImage}
                      onChange={handleInputChange}
                      placeholder="URL de la imagen del reverso (opcional)"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Descripción</FormLabel>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </VStack>

                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Número</FormLabel>
                    <Input name="numero" value={formData.numero} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Período</FormLabel>
                    <Input name="periodo" value={formData.periodo} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Moneda</FormLabel>
                    <Input name="moneda" value={formData.moneda} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Tipo de monedas</FormLabel>
                    <Input name="tipoMoneda" value={formData.tipoMoneda} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Denominación</FormLabel>
                    <Input name="denominacion" value={formData.denominacion} onChange={handleInputChange} />
                  </FormControl>
                </VStack>

                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Valor de fusión</FormLabel>
                    <Input name="valorFusion" value={formData.valorFusion} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Gobernante</FormLabel>
                    <Input name="gobernante" value={formData.gobernante} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Aleación</FormLabel>
                    <Input name="aleacion" value={formData.aleacion} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Canto</FormLabel>
                    <Input name="canto" value={formData.canto} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Forma</FormLabel>
                    <Input name="forma" value={formData.forma} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Alineación</FormLabel>
                    <Input name="alineacion" value={formData.alineacion} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Diámetro (mm)</FormLabel>
                    <Input name="diametro" value={formData.diametro} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Grosor (mm)</FormLabel>
                    <Input name="grosor" value={formData.grosor} onChange={handleInputChange} />
                  </FormControl>
                </VStack>
              </SimpleGrid>

              <Button
                mt={8}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                width="100%"
              >
                Agregar Moneda
              </Button>
            </Box>

            <Heading size="md" mt={8}>Monedas Existentes</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {coins.map((coin) => (
                <Card key={coin.id}>
                  <CardBody>
                    <VStack align="stretch" spacing={2}>
                      <Heading size="sm">{coin.name}</Heading>
                      <Text color="gray.500">{coin.country}</Text>
                      <Badge colorScheme="blue">{coin.year}</Badge>
                      <Text noOfLines={2}>{coin.description}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
} 