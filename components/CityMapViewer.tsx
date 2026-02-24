'use client';

import { useState } from 'react';
import { MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';

interface CityMapViewerProps {
  initialMapUrl: string;
  neighborhoods: string[];
  cityName: string;
}

export function CityMapViewer({ initialMapUrl, neighborhoods, cityName }: CityMapViewerProps) {
  const [mapUrl, setMapUrl] = useState(initialMapUrl);
  const [activeNeighborhood, setActiveNeighborhood] = useState<string | null>(null);

  const handleNeighborhoodClick = (neighborhood: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation since it's a Link
    setActiveNeighborhood(neighborhood);
    
    // Construct search URL for Google Maps Embed
    // Using the output=embed format which works without API key for simple searches
    const query = encodeURIComponent(`${neighborhood}, ${cityName}, Maranhão`);
    const newUrl = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    setMapUrl(newUrl);
    
    // Smooth scroll to map
    document.getElementById('city-map-frame')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      {/* Map Section */}
      <section className="mb-16">
        <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 px-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            {activeNeighborhood ? `Localização: ${activeNeighborhood}` : 'Localização'}
          </h2>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-slate-200 relative" id="city-map-frame">
            <iframe
              key={mapUrl} // Force re-render when URL changes
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Bairros de {cityName}
          </h2>
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
            {neighborhoods.length} bairros cadastrados
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {neighborhoods.map((neighborhood, index) => (
            <Link
              href="#"
              onClick={(e) => handleNeighborhoodClick(neighborhood, e)}
              key={index}
              className={`group p-4 rounded-xl border transition-all flex flex-col ${
                activeNeighborhood === neighborhood
                  ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500'
                  : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <span className={`font-semibold transition-colors mb-1 ${
                activeNeighborhood === neighborhood ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
              }`}>
                {neighborhood}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
