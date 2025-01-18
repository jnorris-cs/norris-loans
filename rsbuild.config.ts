import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig({
	plugins: [pluginReact(), pluginSass()],
	html: {
		title: "Norris Loans",
		favicon: "./src/assets/images/icon.png",
		meta: {
			description:
				"an application that dynamically generates form inputs from a provided JSON configuratio",
		},
	},
});
