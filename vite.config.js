import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                code: resolve(__dirname, 'code.html'),
                ink: resolve(__dirname, 'ink.html'),
                contact: resolve(__dirname, 'contact.html'),
                submit: resolve(__dirname, 'submit.html'),
                legal: resolve(__dirname, 'legal.html'),
                asheville: resolve(__dirname, 'asheville.html'),
                atlanta: resolve(__dirname, 'atlanta.html'),
                augusta: resolve(__dirname, 'augusta.html'),
                birmingham: resolve(__dirname, 'birmingham.html'),
                chattanooga: resolve(__dirname, 'chattanooga.html'),
                greenville: resolve(__dirname, 'greenville.html'),
                macon: resolve(__dirname, 'macon.html'),
                savannah: resolve(__dirname, 'savannah.html'),
            },
        },
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate', // Automatically updates the SW when new content is deployed
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                "id": "/",
                "name": "Ink & Code Digital Studio",
                "short_name": "Ink & Code",
                "description": "Creative design, branding and digital experiences.",
                "start_url": "/",
                "scope": "/",
                "display": "standalone",
                "orientation": "portrait",
                "background_color": "#f4f4f2",
                "theme_color": "#1e1f50",
                "icons": [
                    {
                        "src": "/assets/icons/icon-192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/assets/icons/icon-512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    },
                    {
                        "src": "/assets/icons/icon-512-maskable.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]
            }
        })
    ]
});
