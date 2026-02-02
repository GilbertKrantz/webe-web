import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    integrations: [react(), tailwind({
        applyBaseStyles: false,
    }), icon()],
    output: 'server',
    adapter: vercel(),
    vite: {
        ssr: {
            noExternal: ['gsap']
        }
    }
});
