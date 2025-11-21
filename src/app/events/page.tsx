"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, MapPin, ArrowRight, Filter, X } from "lucide-react";
import Link from "next/link";

// --- DUMMY DATA EVENT (Lengkap dengan Gambar) ---
const EVENTS_DATA = [
  {
    id: 1,
    title: "Dieng Culture Festival",
    date: "2-4 Agustus 2025",
    location: "Dataran Tinggi Dieng, Banjarnegara",
    category: "Festival",
    description:
      "Festival romantis di atas awan yang menampilkan ritual pemotongan rambut gimbal, pesta lampion, dan pertunjukan jazz di tengah suhu dingin Dieng.",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop", // Ilustrasi lampion/malam
    provinceSlug: "jawa-tengah",
  },
  {
    id: 2,
    title: "Upacara Kasada Bromo",
    date: "15-16 Juni 2025",
    location: "Gunung Bromo, Probolinggo",
    category: "Upacara Adat",
    description:
      "Upacara Yadnya Kasada oleh suku Tengger dengan melarung sesaji berupa hasil bumi dan ternak ke kawah Gunung Bromo sebagai wujud syukur.",
    image:
      "https://i.pinimg.com/1200x/ba/07/5a/ba075a33d3a620f62a6a1c6d56681bc5.jpg", // Bromo
    provinceSlug: "jawa-timur",
  },
  {
    id: 3,
    title: "Pesta Kesenian Bali",
    date: "15 Juni - 13 Juli 2025",
    location: "Taman Werdhi Budaya, Denpasar",
    category: "Festival",
    description:
      "Parade seni terbesar di Bali yang menampilkan ribuan seniman, penari, dan musisi gamelan dalam satu panggung kolosal.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop", // Tari Bali
    provinceSlug: "bali",
  },
  {
    id: 4,
    title: "Festival Tabuik",
    date: "10-20 Juli 2025",
    location: "Kota Pariaman, Sumatera Barat",
    category: "Festival",
    description:
      "Perayaan memperingati Asyura dengan mengarak keranda 'Tabuik' ke laut saat matahari terbenam, diiringi gendang tasa yang membara.",
    image:
      "https://i.pinimg.com/736x/77/28/6b/77286bc49e98c55302bf652e4cfac69b.jpg", // Rumah Gadang/Minang vibe
    provinceSlug: "sumatera-barat",
  },
  {
    id: 5,
    title: "Lompat Batu Nias",
    date: "Setiap Akhir Pekan",
    location: "Desa Bawomataluo, Nias Selatan",
    category: "Atraksi",
    description:
      "Tradisi 'Fahombo' di mana pemuda Nias melompati susunan batu setinggi 2 meter sebagai tanda kedewasaan dan ketangkasan.",
    image:
      "https://i.pinimg.com/1200x/62/1c/54/621c54d0760ba11727a2888ca05d36e0.jpg", // Nias vibe/Traditional
    provinceSlug: "sumatera-utara",
  },
  {
    id: 6,
    title: "Pasola Sumba",
    date: "Februari - Maret 2025",
    location: "Sumba Barat, NTT",
    category: "Upacara Adat",
    description:
      "Permainan ketangkasan saling melempar lembing kayu dari atas kuda yang dipacu kencang, bagian dari ritual Marapu.",
    image:
      "https://i.pinimg.com/1200x/24/a9/0e/24a90e4bb85f1c4c447bfed0b7c59c44.jpg", // Sumba landscape/horse
    provinceSlug: "nusa-tenggara-timur",
  },
];

const CATEGORIES = ["Semua", "Festival", "Upacara Adat", "Atraksi"];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // --- FILTER LOGIC ---
  const filteredEvents = EVENTS_DATA.filter((event) => {
    const matchCategory =
      activeCategory === "Semua" || event.category === activeCategory;
    const matchSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans text-[#2C2420]">
      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-[#2C2420] text-white py-24 px-6 overflow-hidden">
        {/* Dekorasi Background Abstrak */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A0563F] rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#A0563F] font-bold tracking-[0.3em] uppercase text-sm bg-white/10 py-2 px-4 rounded-full backdrop-blur-sm border border-white/10"
          >
            Agenda Nusantara
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black mt-6 mb-6 tracking-tight"
          >
            Kalender Event{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#A0563F]">
              Budaya
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Jangan lewatkan momen magis. Temukan ribuan upacara adat, festival,
            dan perayaan tradisi yang hanya terjadi setahun sekali.
          </motion.p>

          {/* --- SEARCH BAR (Floating) --- */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 max-w-xl mx-auto relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Cari event, lokasi, atau festival..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-6 rounded-full bg-white text-gray-900 shadow-xl focus:outline-none focus:ring-4 focus:ring-[#A0563F]/30 transition-all text-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* --- FILTER CATEGORIES --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-[#A0563F] text-white border-[#A0563F] shadow-lg transform scale-105"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#A0563F] hover:text-[#A0563F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- EVENTS GRID --- */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={event.id}
                  className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#A0563F] shadow-sm">
                      {event.category}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-3 tracking-wider">
                      <Calendar size={14} className="text-[#A0563F]" />
                      <span>{event.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#A0563F] transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="flex items-start gap-2 text-gray-500 text-sm mb-4">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-sm mb-6 line-clamp-3 flex-grow">
                      {event.description}
                    </p>

                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <Link
                        href={`/provinsi/${event.provinceSlug}`}
                        className="flex items-center justify-between w-full group/btn"
                      >
                        <span className="font-bold text-[#2C2420] group-hover/btn:text-[#A0563F] transition-colors">
                          Lihat Info Provinsi
                        </span>
                        <span className="bg-[#F5F5F5] p-2 rounded-full group-hover/btn:bg-[#A0563F] group-hover/btn:text-white transition-all">
                          <ArrowRight size={18} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // --- EMPTY STATE ---
              <div className="col-span-full text-center py-20">
                <div className="inline-flex bg-gray-100 p-6 rounded-full mb-4">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Event tidak ditemukan
                </h3>
                <p className="text-gray-500 mt-2">
                  Coba ganti kata kunci pencarian atau kategori.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Semua");
                  }}
                  className="mt-6 text-[#A0563F] font-bold hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
