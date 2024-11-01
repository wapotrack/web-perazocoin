import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const coin = await request.json()
    
    // Leer el archivo actual
    const filePath = path.join(process.cwd(), 'app/data/coins.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const coinsData = JSON.parse(fileContent)

    // Agregar la nueva moneda
    if (!coinsData[coin.country]) {
      coinsData[coin.country] = []
    }
    coinsData[coin.country].push({
      id: coin.id,
      name: coin.name,
      year: coin.year,
      image: coin.image,
      description: coin.description,
      metal: coin.metal,
      weight: coin.weight,
      purity: coin.purity
    })

    // Guardar el archivo actualizado
    await fs.writeFile(filePath, JSON.stringify(coinsData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving coin:', error)
    return NextResponse.json(
      { error: 'Failed to save coin' },
      { status: 500 }
    )
  }
} 