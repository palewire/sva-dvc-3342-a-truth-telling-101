import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const base = process.env.BASE_PATH ?? '';

if (base && (!base.startsWith('/') || base.endsWith('/'))) {
  throw new Error('BASE_PATH must start with / and must not end with /');
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: [mdsvex({ extensions: ['.svx'] }), vitePreprocess()],
  kit: {
    paths: { base },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: true,
      strict: true
    }),
    prerender: {
      handleUnseenRoutes({ routes, message }) {
        // The week route intentionally has no entries until a real lesson is added.
        if (routes.length === 1 && routes[0] === '/weeks/[slug]') return;
        throw new Error(message);
      }
    }
  }
};

export default config;
