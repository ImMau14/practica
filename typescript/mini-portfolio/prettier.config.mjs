/** @type {import("prettier").Config} */
export default {
	plugins: [
		"prettier-plugin-tailwindcss",
		"prettier-plugin-astro",
	],
	semi: false,
	singleQuote: false,
	trailingComma: "es5",
	tabWidth: 100,
	astroAllowShorthand: true,
}
