import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path-browserify'
import {URL} from 'url';

const currentUrl = new URL(import.meta.url);
const __filename = currentUrl.pathname;
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve :{
    alias:{
      "@/components" : path.resolve(__dirname, "src/components"),
      "@/context" : path.resolve(__dirname, "src/context"),
      "@/pages" : path.resolve(__dirname, "src/pages"),
      "@/hooks" : path.resolve(__dirname, "src/hooks"),
      "@/locales" : path.resolve(__dirname, "src/locales"),
      "@/api" : path.resolve(__dirname, "src/api"),
      "@/routes" : path.resolve(__dirname, "src/routes")
    }
  }
})
