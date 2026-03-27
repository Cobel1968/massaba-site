import AdBanner from '@/components/AdBanner';

export default function GovernmentLiaisonPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Government Liaison</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">Seamless PRO services, document clearing, and official approvals for corporate compliance.</p>
        
        <AdBanner 
          imageSrc="/ads/rita-banner.png" 
          alt="Rita Services" 
          linkUrl="https://rita.services" 
        />
      </div>
    </div>
  );
}
