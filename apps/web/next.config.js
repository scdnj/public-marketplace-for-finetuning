module.exports = {
  output: 'export',
  reactStrictMode: true,
  assetPrefix: './',
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};
