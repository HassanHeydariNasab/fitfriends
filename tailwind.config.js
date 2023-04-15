/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Noto Sans Arabic', 'sans-serif'],
				serif: ['Noto Sans Arabic', 'serif']
			}
		}
	},
	plugins: []
};
