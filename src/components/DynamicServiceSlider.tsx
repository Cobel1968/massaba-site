// components/DynamicServiceSlider.tsx

import fs from 'fs';
import path from 'path';
import Image from 'next/image';

// this function reads the filenames - MUST run on the server
async function getVehicleImages() {
  const imagesDirectory = path.join(process.cwd(), 'public/vehicles/import_export');
  
  try {
    const filenames = await fs.promises.readdir(imagesDirectory);
    
    // filter to only include common image formats
    const imageFiles = filenames.filter(file => 
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
    );
    
    // return the paths relative to the public root
    return imageFiles.map(filename => `/vehicles/import_export/${filename}`);
  } catch (error) {
    console.error("Error reading vehicle images:", error);
    return []; // return an empty array if there's an error
  }
}

export default async function DynamicServiceSlider() {
  const imageUrls = await getVehicleImages();

  if (imageUrls.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        No images found in public/vehicles/import_export
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden py-12 bg-slate-900/50 rounded-3xl border border-slate-800 shadow-inner">
      <div className="flex animate-scroll gap-6 px-6">
        {/* Render the images */}
        {imageUrls.map((url, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] h-[200px] relative rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <Image
              src={url}
              alt={`Vehicle Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        ))}
        
        {/* Duplicate images for seamless scrolling effect */}
        {imageUrls.map((url, index) => (
          <div key={`dup-${index}`} className="flex-shrink-0 w-[300px] h-[200px] relative rounded-2xl overflow-hidden shadow-xl border border-slate-800" aria-hidden="true">
            <Image
              src={url}
              alt="" // hide from screen readers
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}