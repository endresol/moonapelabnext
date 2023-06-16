/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.moonapelab.io",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
