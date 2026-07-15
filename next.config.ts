import type {NextConfig} from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  allowedDevOrigins: [
    "localhost:3000",
    "develop.navatuseinlab.uk"
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
