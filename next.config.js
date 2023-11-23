/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/editor',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
