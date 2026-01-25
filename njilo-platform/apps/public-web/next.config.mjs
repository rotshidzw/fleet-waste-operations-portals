/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/C:\\\\pagefile.sys",
        "**/C:\\\\hiberfil.sys",
        "**/C:\\\\swapfile.sys"
      ]
    };
    return config;
  }
};

export default nextConfig;
