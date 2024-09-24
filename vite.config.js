
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

/**
 * Vite Configuration
 * This configuration is used for both development and production environments.
 * It sets up various build options, plugins, and optimizations for the project.
 */
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  // Log the current command for debugging purposes
  console.log(`Current command: ${command}`);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Alias for cleaner imports in the project
      },
    },
    assetsInclude: ['**/*.gltf', '**/**/*.glb'], // Include GLB and GLTF assets
    css: {
      postcss: './postcss.config.cjs', // PostCSS configuration for custom CSS processing
    },
    build: {
      chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit (default is 500KB)
      minify: isProduction, // Minify in production
      sourcemap: !isProduction, // Generate sourcemaps in development
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            threeVendor: ['three'],
            framerMotion: ['framer-motion']
          }
        },
      },
    },
  };
});

