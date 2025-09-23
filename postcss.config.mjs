const config = {
  plugins: ["@tailwindcss/postcss"],
  "windsurf.autoStart": true,
  experimental: {
    // Libera o acesso via IP local e também localhost
    allowedDevOrigins: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://192.168.1.10:3000' // <-- seu IP na rede local
    ]
  }
};

export default config;
