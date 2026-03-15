import AdBanner from '@/components/AdBanner';

export default function GovernmentLiaisonPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white mb-8">Government Liaison</h1>
      <p className="text-lg text-slate-300 mb-12">
        Seamless PRO services, document clearing, and official approvals for corporate compliance in the Middle East and SE Asia.
      </p>

      {/* Your main content here... */}

      {/* Rita Services Banner */}
      <div className="mt-16">
        <AdBanner
          imageSrc="/ads/rita-banner.png"
          alt="Services Rita"
          linkUrl="https://rita.services"
        />
      </div>
    </div>
  );
}
