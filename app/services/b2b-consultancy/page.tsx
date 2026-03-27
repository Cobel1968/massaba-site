import AdBanner from '@/components/AdBanner';

export default function B2BConsultancyPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">B2B Consultancy</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">Strategic advisory for corporate growth and high-value partnerships across Africa and global markets.</p>
        
        <AdBanner 
          imageSrc="/ads/cobelbtc-banner.png" 
          alt="Cobel Business Training Center - Formations professionnelles" 
          linkUrl="https://cobelbtc.com" 
        />
      </div>
    </div>
  );
}
