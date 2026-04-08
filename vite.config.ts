import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@\/ride-elegibility\/(.*)$/,
        replacement: `${path.resolve(__dirname, './src/features/ride-eligibility')}/$1`,
      },
      {
        find: /^@\/(?!ride-elegibility\/)(.*)$/,
        replacement: `${path.resolve(__dirname, './src')}/$1`,
      },
    ],
  },
})
