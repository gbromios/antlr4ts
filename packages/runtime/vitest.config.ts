import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		include: ['./test/**/Test*.ts'],
		exclude: ['./test/runtime/**'],
		clearMocks: true,
	},
})
