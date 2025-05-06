import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.example.com',
      'images.unsplash.com',
      'facebook.com',
      'anotherdomain.com',
      // Thêm domain bạn cần
    ],
  },
};

export default nextConfig;
