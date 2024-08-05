import { useTheme } from '@emotion/react'
import Box from '@mui/material/Box';
import React from 'react'
import AllCustomers from '../components/AllCustomers/AllCustomers'
import TestFilterHook from '../hooks/TestFilterHook.test'
import useDynamicFilter from '../hooks/useDynamicFilter';
import NavBar from '../components/NavBar';
export default function Home() {
  // const theme = useTheme()


  return (
    <Box display = 'flex' flexDirection= 'column' height='100vh' >
      <NavBar />
      <AllCustomers />
    </Box>
  )
}