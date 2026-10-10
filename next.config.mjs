/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [],
};

if (process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_PUBLIC_HOST_SUFFIX) {
  nextConfig.allowedDevOrigins.push('https://3000-' + process.env.BASE44_PUBLIC_HOST_SUFFIX);
}

export default nextConfig;
