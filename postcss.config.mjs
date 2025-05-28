import tailwindcss from '@tailwindcss/postcss';

const config = {
  plugins: [
    tailwindcss({
      content: [
        './src/**/*.{js,ts,jsx,tsx,css}',
        './src/app/**/*.{js,ts,jsx,tsx,css}',
        './src/components/**/*.{js,ts,jsx,tsx,css}'
      ]
    })
  ],
};

export default config;