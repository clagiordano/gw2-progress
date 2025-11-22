/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_GW_BASE_URL: "https://api.guildwars2.com/v2",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "render.guildwars2.com",
        port: "",
        pathname: "/**", // allow all paths from this hostname
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
