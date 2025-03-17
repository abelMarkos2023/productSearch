const fs = require('fs');
import { hostname } from 'os';
import { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config :Configuration) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        canvas: false, // Fix: Ensures `config.resolve.alias` is defined before modifying
      };
    }// Optional: if you run into canvas-related issues
    config.plugins = config.plugins || []; // ✅ Ensure plugins array exists

    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.beforeRun.tap('IgnoreWinSAT', () => {
          try {
            fs.readdirSync('C:\\Users\\ts\\AppData\\Local\\Temp\\WinSAT');
          } catch (err) {
            const error = err as any; // ✅ Allow property access
            if (error.code === 'EPERM') {
              console.warn('Ignoring WinSAT folder');
            }
          }
        });
      }
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ],
  },
};

module.exports = nextConfig;


