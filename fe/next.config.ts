import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.example.com',
      'images.unsplash.com',
      'facebook.com',
      'anotherdomain.com',
      'scontent.fsgn8-4.fna.fbcdn.net',
      'localhost', // Cho phép lấy ảnh từ localhost
      '127.0.0.1', // Nếu BE chạy bằng IP
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
      },
    ],
  },
};

export default nextConfig;