"use client";
import dynamic from 'next/dynamic';

// Importación dinámica para evitar problemas de SSR
const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="w-full h-screen">
        <MapComponent />
      </div>
    </div>
  );
}
