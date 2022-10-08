/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/azuki',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
