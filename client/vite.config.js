import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function normalizeBase(value) {
  const clean = String(value || '/').trim();
  if (!clean || clean === '/') return '/';
  return `/${clean.replace(/^\/+|\/+$/g, '')}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = normalizeBase(env.VITE_BASE_PATH);
  const baseWithoutTrailingSlash = base === '/' ? '' : base.replace(/\/$/, '');
  const apiPrefix = `${baseWithoutTrailingSlash}/api` || '/api';

  return {
    base,
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 5173,
      proxy: {
        [apiPrefix]: {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          rewrite: (path) => base === '/' ? path : path.replace(baseWithoutTrailingSlash, '')
        }
      }
    }
  };
});
