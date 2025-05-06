import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.example.com',
      'images.unsplash.com',
      'facebook.com',
      'anotherdomain.com',
      'scontent.fsgn8-4.fna.fbcdn.net'
      // Thêm domain bạn cần
    ],
  },
};

export default nextConfig;
