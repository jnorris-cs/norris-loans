import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
	plugins: [pluginReact(), pluginSass()],
	resolve: {
		alias: {
			components: './src/components',
			hooks: './src/hooks',
			contexts: './src/contexts',
			types: './src/types',
			utils: './src/utils',
		},
	},
	html: {
		title: 'Norris Loans',
		favicon: './src/assets/images/icon.png',
		meta: {
			description:
				'an application that dynamically generates form inputs from a provided JSON configuratio',
		},
	},
});
