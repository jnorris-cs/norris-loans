import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  html: {
    favicon: './src/assets/images/icon.png',
    meta: {
      description:
        'an application that dynamically generates form inputs from a provided JSON configuratio',
    },
    title: 'Norris Loans',
  },
  plugins: [pluginReact(), pluginSass()],
  resolve: {
    alias: {
      components: './src/components',
      contexts: './src/contexts',
      hooks: './src/hooks',
      types: './src/types',
      utils: './src/utils',
    },
  },
});
