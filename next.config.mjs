import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true',
};

const nextConfig = {};

export default withBundleAnalyzer(bundleAnalyzerConfig)(nextConfig);