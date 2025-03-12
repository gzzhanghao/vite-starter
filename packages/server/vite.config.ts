import nodeExternals from 'rollup-plugin-node-externals';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    outDir: './dist',
    minify: false,
  },
  optimizeDeps: {
    noDiscovery: true,
  },
  plugins: [nodeExternals({ devDeps: true })],
});
