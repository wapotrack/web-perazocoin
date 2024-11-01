import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const coinData = await request.json()
    
    // Leer el archivo actual
    const filePath = path.join(process.cwd(), 'app/data/coins.json')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const coinsData = JSON.parse(fileContent)

    // Asegurarse de que el país existe en el objeto
    if (!coinsData[coinData.country]) {
      coinsData[coinData.country] = []
    }

    // Crear el objeto de moneda con todos los campos
    const newCoin = {
      id: coinData.id,
      name: coinData.name,
      year: coinData.year,
      description: coinData.description,
      metal: coinData.metal,
      weight: coinData.weight,
      purity: coinData.purity,
      image: coinData.image,
      reverseImage: coinData.reverseImage,
      numero: coinData.numero,
      periodo: coinData.periodo,
      moneda: coinData.moneda,
      tipoMoneda: coinData.tipoMoneda,
      denominacion: coinData.denominacion,
      valorFusion: coinData.valorFusion,
      gobernante: coinData.gobernante,
      aleacion: coinData.aleacion,
      canto: coinData.canto,
      forma: coinData.forma,
      alineacion: coinData.alineacion,
      diametro: coinData.diametro,
      grosor: coinData.grosor
    }

    // Agregar la nueva moneda al array del país correspondiente
    coinsData[coinData.country].push(newCoin)

    // Guardar el archivo actualizado
    fs.writeFileSync(filePath, JSON.stringify(coinsData, null, 2))

    return NextResponse.json({ success: true, data: newCoin })
  } catch (error) {
    console.error('Error al guardar la moneda:', error)
    return NextResponse.json(
      { success: false, error: 'Error al guardar la moneda' },
      { status: 500 }
    )
  }
} 