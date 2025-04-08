import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  dts({ 
    rollupTypes: true, 
    tsconfigPath: './tsconfig.build.json',    
    outDir: 'dist/es' }
  )
  ],
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
  build:{
    cssCodeSplit: true,
    cssTarget: 'chrome61',
    outDir: 'dist',
    minify: 'terser',
    lib:{
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'AT-UI',
      fileName: (format) => `atian-ui.${format}.js`,
      // formats: ['es', 'umd'],
    },
    rollupOptions: {
			external: ['react', 'react-dom','axios'],
			output: [{
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
          axios: 'axios',
				}
			},
      // {
      //   format: "es",
      //   entryFileNames: "[name].js",
      //   exports: "named",
      //   name: "AT-UI",
      //   dir: "./dist/dist",
      // },
      {
          format: "es",
          entryFileNames: "[name].js",
          exports: "named",
          preserveModules: true,
          inlineDynamicImports: false,
          preserveModulesRoot: "src",
          dir: "./dist/es",
      },
      {
          format: "umd",
          entryFileNames: "[name].js",
          exports: "named",
          inlineDynamicImports: false,
          preserveModules: false,
          preserveModulesRoot: "src",
          dir: "./dist/umd",
          name: "AT-UI",
      },
    ]
		}
  }
})
