'use client'
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { useState } from "react"
import Image from "next/image"
import { Container } from 'postcss';
import { Flex, Box } from '@chakra-ui/react';
import StartPage from '@/components/StartPage';


const coinsData = [
  { 
    "name": "Peso Argentino", 
    "year": 1980, 
    "description": "Description of peso argentino", 
    "continent": "America", 
    "country": "Argentina", 
    "marketAvgPrice": "US$500", 
    "material": "Steel",  
    "kg": 0.221
  }
]



export default function Page() {
  return (
    <Box>
      <NavBar></NavBar>
      <StartPage></StartPage>
    </Box>
  ); 
}
