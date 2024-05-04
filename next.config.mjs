/** @type {import('next').NextConfig} */
const nextConfig = {};
const NEXTAUTH_SECRET = "2HLr00fy2L+Ts/HI1bXYCxle06zw0ESsFC2JYokMmjs=";

const config = {
  ...nextConfig,
  env: { NEXTAUTH_SECRET },
};

export default config;

// /** @type {import('next').NextConfig} */
// const nextConfig = {};
// export default nextConfig;
