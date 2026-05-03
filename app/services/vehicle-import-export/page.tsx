"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, ArrowRight, Truck, Shield, Clock, Globe } from 'lucide-react';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
interface VehicleImage {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}
export default function VehicleImportExportPage() {
  const [images, setImages] = useState<VehicleImage[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase
        .from('service_images')
        .select('*')
        .eq('service_slug', 'vehicle-import-export')
        .order('display_order');
      if (error) {
        console.error('Error fetching images:', error);
      } else {
        setImages(data || []);
      }
      setLoading(false);
    }
    fetchImages();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Services
        </Link>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Vehicle Import/Export
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional vehicle import/export services from UAE to Ivory Coast and West Africa
          </p>
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Truck className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-white font-bold text-xl">15-25 Days</div>
            <div className="text-gray-400 text-sm">Delivery Time</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Shield className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-white font-bold text-xl">100%</div>
            <div className="text-gray-400 text-sm">Customs Clearance</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-white font-bold text-xl">Express</div>
            <div className="text-gray-400 text-sm">Available</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Globe className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-white font-bold text-xl">UAE → West Africa</div>
            <div className="text-gray-400 text-sm">Door-to-Door</div>
          </div>
        </div>
        {/* Vehicle Gallery */}
        <h2 className="text-2xl font-bold text-white mb-6">Our Vehicle Gallery</h2>
        {loading ? (
          <div className="text-center text-white py-12">Loading vehicles...</div>
        ) : images.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No vehicle images available</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative h-64 w-full bg-gray-800">
                  <Image
                    src={image.image_url}
                    alt={image.alt_text || 'Premium Vehicle'}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={image.image_url.includes('supabase.co')}
                    onError={(e) => {
                      console.error('Image failed to load:', image.image_url);
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-white/80 text-center">{image.alt_text || 'Premium Vehicle'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pricing Info */}
        <div className="mt-12 bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Pricing Information</h3>
          <p className="text-gray-300 mb-4">
            Our vehicle import service includes shipping, customs clearance, and delivery. Total cost depends on vehicle value:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Freight Shipping:</span>
              <span className="text-amber-400">$2,500 base</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Service Fee (15%):</span>
              <span className="text-amber-400">Calculated on freight</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Transaction Fee (8%):</span>
              <span className="text-amber-400">On subtotal</span>
            </li>
            <li className="flex justify-between">
              <span>Tax (5%):</span>
              <span className="text-amber-400">On total</span>
            </li>
          </ul>
        </div>
        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Request a Quote <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}