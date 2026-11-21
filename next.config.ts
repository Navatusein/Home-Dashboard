import type {NextConfig} from "next";
import path from "path";

const buildId = Date.now().toString(36);

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  reactStrictMode: false,
  generateBuildId: () => buildId,
  env: {
    BUILD_ID: buildId,
  },
  allowedDevOrigins: process.env.DEV_ALLOWED_ORIGINS?.split(","),
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  experimental: {
    agentUpgrade: "security",
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
