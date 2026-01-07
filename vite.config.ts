import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config as dotenvConfig } from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env from repo root
dotenvConfig({ path: resolve(__dirname, '.env') })

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'import.meta.env.LLM_MODEL_NAME': JSON.stringify(
			process.env.LLM_MODEL_NAME,
		),
		'import.meta.env.LLM_API_KEY': JSON.stringify(process.env.LLM_API_KEY),
		'import.meta.env.LLM_BASE_URL': JSON.stringify(
			process.env.LLM_BASE_URL,
		),
	},
})
