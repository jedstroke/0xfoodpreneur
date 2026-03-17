/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PRIVY_APP_ID: process.env.PRIVY_APP_ID,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    "better-sqlite3",
    "pino",
    "thread-stream",
    "@privy-io/node",
  ],
  turbopack: {},
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\/test\//,
        contextRegExp: /thread-stream/,
      }),
    );
    return config;
  },
};

export default nextConfig;
