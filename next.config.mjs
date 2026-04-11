const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/arendabmk";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
