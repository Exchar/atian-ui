import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./RTLInVitest.setup.ts",
    testMatch: ['./tests/**/*.test.tsx'],
    globals: true,
    
    coverage: {
      thresholds: {
        branches: 20, // 自行设置合理值
        functions: 20,
        lines: 20,
      },
      include: ['src/'], // 只计算 src 内文件覆盖率
    }
  },
})
