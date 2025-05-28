/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/api/v1/view/**",
      },
      {
        protocol: "http",
        hostname: "54.165.182.210",
        port: "8080",
        pathname: "/api/v1/view/**",
      },
    ],
  },
};

export default nextConfig;
