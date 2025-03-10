'use client'

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { designSystemStyles } from "@worldresources/wri-design-systems";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        neutral: {
          300: { value: '#ff5252' },
          500: { value: '#ff0000' },
          700: { value: '#ff0000' },
        },
        primary: {
          100: { value: '#FFFBF2' },
          200: { value: '#93ff93' },
          500: { value: '#d80a5d' },
          600: { value: '#16b816' },
          700: { value: '#006100' },
          800: { value: 'red' },
          900: { value: '#332300' },
        },
        secondary: {
          500: { value: '' },
        },
        success: {
          // 100: { value: 'red' },
        },
        // accessibleTextOnPrimary500: { value: 'white' },
      },
    },
  },
})

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={designSystemStyles}>
    {children}
  </ChakraProvider>
)

export default Providers
