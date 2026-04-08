import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    passWithNoTests: true,
  },
})
