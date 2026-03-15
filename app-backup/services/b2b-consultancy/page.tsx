import AdBanner from '@/components/AdBanner';

export default function B2BConsultancyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white mb-8">B2B Consultancy</h1>
      <p className="text-lg text-slate-300 mb-12">
        Strategic advisory for corporate growth, market expansion, and high-value partnerships across Africa and global markets.
      </p>

      {/* Your main content here... */}

      {/* CobelBTC Training Banner */}
      <div className="mt-16">
        <AdBanner
          imageSrc="/ads/cobelbtc-banner.png"
          alt="Formations professionnelles CobelBTC"
          linkUrl="https://cobelbtc.com"
        />
      </div>
    </div>
  );
}
