"use client";

import React, { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  useInView,
} from "framer-motion"; // Tambah useInView
import {
  ArrowLeft,
  Music,
  MapPin,
  Camera,
  PlayCircle,
  Leaf,
  Users,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

// --- DATABASE PROVINSI LENGKAP (DUMMY DATA) ---
const PROVINCE_DATA: any = {
  bali: {
    name: "Bali",
    julukan: "The Island of Gods",
    description:
      "Lebih dari sekadar destinasi wisata, Bali adalah kanvas hidup di mana spiritualitas Hindu menyatu dengan seni, alam, dan kehidupan sehari-hari.",
    color: "from-orange-500 via-red-500 to-yellow-500",
    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1920&auto=format&fit=crop",

    philosophy: [
      {
        title: "Parahyangan",
        desc: "Hubungan harmonis manusia dengan Tuhan.",
        icon: Sparkles,
      },
      {
        title: "Pawongan",
        desc: "Hubungan harmonis antar sesama manusia.",
        icon: Users,
      },
      {
        title: "Palemahan",
        desc: "Hubungan harmonis manusia dengan alam.",
        icon: Leaf,
      },
    ],

    // ID Video YouTube (Wonderful Indonesia)
    videoId: "bqCSlX8O9ec",

    gallery: [
      {
        src: "https://i.pinimg.com/736x/ff/e8/7f/ffe87f55e803b6ac6b8ed83c4a254d0a.jpg",
        title: "Tari Kecak",
        size: "col-span-2 row-span-2",
      },
      {
        src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800",
        title: "Pura Ulun Danu",
        size: "col-span-1 row-span-1",
      },
      {
        src: "https://i.pinimg.com/736x/e3/3e/3d/e33e3d46e145b6fe6ac9d35f79bc539a.jpg",
        title: "Canang Sari",
        size: "col-span-1 row-span-1",
      },
      {
        src: "https://i.pinimg.com/1200x/a2/7e/c5/a27ec55e489abbbd8369f5048c69e6f1.jpg",
        title: "Ubud Rice Terrace",
        size: "col-span-2 row-span-1",
      },
    ],
  },
  "jawa-barat": {
    name: "Jawa Barat",
    julukan: "Tanah Pasundan",
    description:
      "Harmoni alam pegunungan yang sejuk dan kehangatan budaya Sunda.",
    color: "from-blue-600 to-teal-400",
    heroImage:
      "https://images.unsplash.com/photo-1602202853776-486d2a3055c7?q=80&w=1600",
    philosophy: [],
    videoId: "",
    gallery: [],
  },
  "dki-jakarta": {
    name: "DKI Jakarta",
    julukan: "Kota Metropolitan",
    description:
      "Pusat pemerintahan dan ekonomi dengan sejarah Betawi yang kental.",
    color: "from-red-600 to-orange-500",
    heroImage:
      "https://images.unsplash.com/photo-1555899434-94d1368d7fe6?q=80&w=1600",
    philosophy: [],
    videoId: "",
    gallery: [],
  },
};

// --- ANIMASI VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function ProvinceDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const data = PROVINCE_DATA[slug];

  // Parallax Effect
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // --- LOGIKA AUTOPLAY VIDEO SAAT SCROLL ---
  const videoContainerRef = useRef(null);
  // once: true artinya hanya trigger sekali saja biar ga reload-reload terus
  const isVideoInView = useInView(videoContainerRef, {
    amount: 0.6,
    once: true,
  });
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default mute agar autoplay jalan di browser

  useEffect(() => {
    if (isVideoInView) {
      setShouldPlay(true);
    }
  }, [isVideoInView]);

  if (!data)
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold">
        Data Provinsi Belum Lengkap
      </div>
    );

  return (
    <main
      ref={ref}
      className="min-h-screen bg-[#FAFAFA] text-[#2C2420] font-sans overflow-hidden selection:bg-orange-200"
    >
      {/* ================= HERO SECTION (PARALLAX) ================= */}
      <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <img
            src={data.heroImage}
            alt={data.name}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FAFAFA]"></div>
        </motion.div>

        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 z-50 group bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="relative z-10 text-center px-4 max-w-4xl mt-20">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0px" }}
            animate={{ opacity: 1, letterSpacing: "8px" }}
            transition={{ duration: 1.5 }}
            className="block text-white/90 font-semibold tracking-[8px] mb-4 uppercase text-sm md:text-lg"
          >
            Pesona Indonesia
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl mb-2"
          >
            {data.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-3xl text-white font-light italic font-serif"
          >
            "{data.julukan}"
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 text-white/80 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">Jelajahi</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </div>

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pb-24 -mt-24">
        {/* 1. INTRO CARD */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[40px] shadow-2xl text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Tentang {data.name}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* 2. FILOSOFI SECTION */}
        {data.philosophy && data.philosophy.length > 0 && (
          <div className="mb-32">
            <div className="text-center mb-16">
              <span
                className={`inline-block py-1 px-3 rounded-full bg-gradient-to-r ${data.color} text-white text-xs font-bold tracking-widest uppercase mb-4`}
              >
                Filosofi Hidup
              </span>
              <h3 className="text-4xl font-bold">Tri Hita Karana</h3>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {data.philosophy.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <item.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* 3. CINEMATIC VIDEO SECTION (AUTO PLAY & CLEAN UI) */}
        {data.videoId && (
          <motion.div
            ref={videoContainerRef} // Ref dipasang di sini untuk deteksi scroll
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full rounded-[40px] overflow-hidden shadow-2xl mb-32 group bg-black"
          >
            {/* Custom Header Overlay */}
            <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 pointer-events-none">
              <PlayCircle size={18} className="text-red-500 fill-current" />
              <span className="text-sm font-semibold tracking-wide">
                Cultural Experience
              </span>
            </div>

            {/* Indikator Mute/Unmute (Opsional, UX Enhancement) */}
            <div className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-md text-white p-2 rounded-full border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </div>

            <div className="relative pt-[56.25%]">
              {shouldPlay ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full pointer-events-auto" // pointer-events-auto agar user bisa unmute/pause manual jika mau
                  // --- RAHASIA LINK YOUTUBE BERSIH & AUTOPLAY ---
                  // autoplay=1 : Auto play
                  // mute=1     : Wajib mute agar autoplay jalan di Chrome/Safari
                  // controls=0 : Hapus kontrol bawah (lebih cinematic) -> Ganti 1 jika ingin user bisa control volume
                  // rel=0      : Meminimalisir rekomendasi aneh
                  // loop=1     : Video mengulang terus, MENCEGAH END SCREEN muncul
                  // playlist   : Diperlukan agar loop berfungsi pada iframe embed
                  // modestbranding=1 : Hapus logo YT
                  src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1&loop=1&playlist=${data.videoId}&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Placeholder saat belum di-scroll (Gambar Hitam/Loading)
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <PlayCircle className="text-white/20 w-16 h-16" />
                    <span className="text-white/40 text-sm">
                      Memuat Video...
                    </span>
                  </div>
                </div>
              )}

              {/* Layer transparan agar video tidak terlalu terang/tajam (opsional, cinematic look) */}
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-[40px] shadow-inner"></div>
            </div>
          </motion.div>
        )}

        {/* 4. BENTO GRID GALLERY */}
        {data.gallery && data.gallery.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-12 px-2">
              <div>
                <h3 className="text-4xl font-bold mb-2">Galeri Visual</h3>
                <p className="text-gray-500">
                  Menangkap keindahan dalam setiap sudut.
                </p>
              </div>
              <div className="hidden md:flex gap-2">
                <Camera className="text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
              {data.gallery.map((img: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative group rounded-3xl overflow-hidden shadow-md ${img.size} min-h-[200px]`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-bold text-lg">{img.title}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-300 mt-1">
                        <MapPin size={12} />
                        <span>{data.name}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
