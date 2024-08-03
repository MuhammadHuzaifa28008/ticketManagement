import { useTheme } from '@emotion/react'
import Box from '@mui/material/Box';
import React from 'react'
import AllCustomers from '../../components/AllCustomers'
import TestFilterHook from '../../hooks/TestFilterHook.test'
import useDynamicFilter from '../../hooks/useDynamicFilter';


export default function Home() {
  // const theme = useTheme()


  return (
    <Box display = 'flex' flexDirection= 'column' alignItems='center' padding= '10px' width= '100%' height = "100%" 
    sx  = {{
      border: '5px solid red'
    }}
    >
      {/* <TestFilterHook /> */}
      <AllCustomers />
    </Box>
  )
}
