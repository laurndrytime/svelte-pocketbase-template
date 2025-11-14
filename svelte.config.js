import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'nonce', //nonce or hash
			directives: {
				'default-src': ['none'],
				'script-src': ['self', 'stric-dynamic'],
				'object-src': ['none'],
				'style-src': ['self'],
				'base-uri': ['self'],
				'img-src': ['self', 'data:'],
				'font-src': ['self'],
				'connect-src': ['self'],
				'frame-src': ['*'],
				'frame-ancestors': ['self'],
				'form-action': ['none'],
				'upgrade-insecure-requests': true
			}
		}
	}
};

export default config;
