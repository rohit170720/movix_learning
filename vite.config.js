import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "Movix Data",
		short_name: "Movix",
		description: "An app that can show movies data and latest movies",
		icons: [
			{
				src: "/movix-logo.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/movix-logo.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/movix-logo.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/movix-logo.png",
				sizes: "225x225",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
});
