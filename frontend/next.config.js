module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return process.env.NODE_ENV !== 'production'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
          },
          {
            source: '/uploads/:slug*',
            destination: `http://localhost:5000/uploads/:slug*`,
          },
        ]
      : []
  },
}
