import type {NextConfig} from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  reactStrictMode: false,
  allowedDevOrigins: process.env.DEV_ALLOWED_ORIGINS?.split(","),
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  logging: {
    browserToTerminal: process.env.NODE_ENV === "development",
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
