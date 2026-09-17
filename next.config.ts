import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

try {
  const sharp = require("sharp");
  const pngPath = path.join(process.cwd(), "public", "mantra-favicon1.png");
  if (fs.existsSync(pngPath)) {
    const appDir = path.join(process.cwd(), "src", "app");
    if (fs.existsSync(appDir)) {
      sharp(pngPath)
        .resize(512, 512)
        .png()
        .toFile(path.join(appDir, "icon.png"));
      sharp(pngPath)
        .resize(180, 180)
        .png()
        .toFile(path.join(appDir, "apple-icon.png"));
      sharp(pngPath)
        .resize(64, 64)
        .png()
        .toFile(path.join(process.cwd(), "public", "favicon.png"));

      const oldFavicon = path.join(appDir, "favicon.ico");
      if (fs.existsSync(oldFavicon)) {
        fs.unlinkSync(oldFavicon);
      }
    }
  }
  const metaJson = path.join(process.cwd(), "public", "meta.json");
  if (fs.existsSync(metaJson)) {
    fs.unlinkSync(metaJson);
  }
} catch (e: any) {
  // ignore
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/favicon.png',
      },
    ];
  },
};

export default nextConfig;