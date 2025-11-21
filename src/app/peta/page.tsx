"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { ArrowLeft, Plus, Minus, Maximize } from "lucide-react";
import { geoCentroid } from "d3-geo";
import Link from "next/link";

const GEO_URL =
  "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json";

// Daftar provinsi yang bisa diklik (Contoh 3 Provinsi)
const AVAILABLE_PROVINCES = ["BALI", "JAWA BARAT", "DKI JAKARTA"];

export default function PetaPage() {
  const router = useRouter();
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [118, -2], zoom: 4 });

  // --- FIX 1: Tambahkan tipe ': any' pada parameter geo ---
  const handleProvinceClick = (geo: any) => {
    const rawName = geo.properties.Propinsi || geo.properties.name;
    const provinceName = rawName ? rawName.toUpperCase() : "";

    if (AVAILABLE_PROVINCES.includes(provinceName)) {
      // 1. Hitung titik tengah
      const centroid = geoCentroid(geo);

      // 2. Animasi Zoom Masuk
      setPosition({
        coordinates: centroid,
        zoom: 8, // Level zoom saat masuk
      });

      // 3. Pindah halaman setelah delay
      setTimeout(() => {
        const slug = provinceName.toLowerCase().replace(/\s+/g, "-");
        router.push(`/provinsi/${slug}`);
      }, 1000);
    } else {
      // Opsional: Alert jika provinsi belum ada datanya
      // alert("Data provinsi ini belum tersedia.");
    }
  };

  function handleZoomIn() {
    if (position.zoom >= 10) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }));
  }

  return (
    <main className="w-full h-screen bg-gradient-to-br from-[#E8F1F2] to-[#dbeafe] relative overflow-hidden font-sans">
      {/* --- HEADER --- */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all text-[#2C2420]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg text-center pointer-events-auto border border-white/50">
          <h1 className="text-xl font-extrabold text-[#2C2420] tracking-wide">
            PETA INTERAKTIF NUSANTARA
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Klik provinsi (Jabar, DKI, Bali) untuk masuk
          </p>
        </div>
        <div className="w-12"></div>
      </div>

      {/* --- KONTROL ZOOM --- */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-10 pointer-events-auto">
        <button
          onClick={handleZoomIn}
          className="bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg hover:bg-white hover:scale-105 transition-all text-[#2C2420]"
        >
          <Plus className="w-6 h-6" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg hover:bg-white hover:scale-105 transition-all text-[#2C2420]"
        >
          <Minus className="w-6 h-6" />
        </button>
        <button
          onClick={() => setPosition({ coordinates: [118, -2], zoom: 4 })}
          className="bg-[#A0563F] p-3 rounded-xl shadow-lg hover:bg-[#8a4731] hover:scale-105 transition-all text-white"
        >
          <Maximize className="w-6 h-6" />
        </button>
      </div>

      {/* --- MAP AREA --- */}
      {/* FIX 2: Tambahkan class [&_g]:transition-all... untuk animasi zoom CSS pengganti transitionDuration */}
      <div className="w-full h-full cursor-move [&_g]:transition-transform [&_g]:duration-1000 [&_g]:ease-in-out">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 1300, center: [118, -2] }}
          className="w-full h-full"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={(position) => setPosition(position)}
            // transitionDuration={1000}  <-- INI DIHAPUS KARENA BIKIN ERROR
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) => {
                // --- FIX SORTING: Provinsi kecil digambar TERAKHIR agar ada di ATAS ---
                const sortedGeographies = [...geographies].sort((a, b) => {
                  const nameA = (
                    a.properties.Propinsi || a.properties.name
                  ).toUpperCase();
                  const nameB = (
                    b.properties.Propinsi || b.properties.name
                  ).toUpperCase();

                  // Daftar provinsi prioritas (yang kecil-kecil)
                  const priorityProvinces = [
                    "DKI JAKARTA",
                    "DI YOGYAKARTA",
                    "BALI",
                  ];

                  const isAPriority = priorityProvinces.includes(nameA);
                  const isBPriority = priorityProvinces.includes(nameB);

                  // Jika A prioritas, taruh di belakang (return 1)
                  if (isAPriority && !isBPriority) return 1;
                  // Jika B prioritas, taruh di belakang (return -1)
                  if (!isAPriority && isBPriority) return -1;
                  return 0;
                });

                return sortedGeographies.map((geo) => {
                  const rawName =
                    geo.properties.Propinsi || geo.properties.name;
                  const provinceName = rawName ? rawName.toUpperCase() : "";
                  const isClickable =
                    AVAILABLE_PROVINCES.includes(provinceName);

                  // Tentukan apakah ini provinsi prioritas (untuk stroke styling)
                  const isPriority = [
                    "DKI JAKARTA",
                    "DI YOGYAKARTA",
                    "BALI",
                  ].includes(provinceName);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={provinceName}
                      // Tambahkan stopPropagation agar event tidak "bocor" ke provinsi di bawahnya
                      onMouseEnter={(e) => {
                        setTooltipContent(provinceName);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onClick={() => handleProvinceClick(geo)}
                      style={{
                        default: {
                          fill: isClickable ? "#64748b" : "#cbd5e1",
                          stroke: isPriority ? "#fff" : "#FFFFFF",
                          strokeWidth: isPriority ? 1.5 : 0.5,
                          outline: "none",
                          cursor: isClickable ? "pointer" : "default",
                          transition: "all 0.2s ease", // Percepat sedikit transisinya
                        },
                        hover: {
                          fill: isClickable ? "#A0563F" : "#cbd5e1",
                          stroke: "#FFF",
                          // --- PERUBAHAN PENTING DI SINI ---
                          // 1. HAPUS 'transform: scale(...)' <- Ini penyebab kedap-kedip
                          // 2. Ganti dengan strokeWidth yang menebal (efek highlight stabil)
                          strokeWidth: 2.5,
                          outline: "none",
                          // Efek glow/shadow tetap aman digunakan
                          filter: isClickable
                            ? "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))"
                            : "none",
                          zIndex: 999,
                        },
                        pressed: {
                          fill: "#475569",
                          outline: "none",
                          strokeWidth: 2.5,
                        },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <Tooltip
        id="my-tooltip"
        float={true}
        style={{
          backgroundColor: "rgba(44, 36, 32, 0.85)",
          backdropFilter: "blur(8px)",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "600",
          zIndex: 999,
        }}
      />
    </main>
  );
}
