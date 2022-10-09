/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ikzttp.mypinata.cloud'],
  },
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
