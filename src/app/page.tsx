"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Map,
  BookOpen,
  Calendar,
  MessageCircle,
  ArrowUpRight,
  Instagram,
  Twitter,
  Facebook,
  Play,
  X,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  // --- LOGIC SCROLL NAVBAR ---
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- LOGIC MODAL SHOWREEL ---
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // --- LOGIC PARALLAX MOUSE ---
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  return (
    <main
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden bg-[#FDF8F5] text-[#4A3B32]"
    >
      {/* --- BACKGROUND DECORATION --- */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("/images/pemandangan.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* --- NAVIGATION (ADAPTIVE) --- */}
      <nav
        className={`fixed top-0 w-full p-6 flex justify-between items-center z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#2C2420]/90 backdrop-blur-md text-[#FDF8F5] shadow-lg py-4"
            : "bg-transparent text-[#4A3B32] py-6"
        }`}
      >
        <div className="font-bold text-xl flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#A0563F]" /> Nusantara Cultural Atlas
        </div>
        <div className="flex gap-6 text-sm font-medium">
          {/* UPDATE: Menggunakan Link Next.js */}
          <Link href="/peta" className="hover:text-[#A0563F] transition-colors">
            Peta Budaya
          </Link>
          <Link
            href="/events"
            className="hover:text-[#A0563F] transition-colors"
          >
            Jadwal Event
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Layer 1: Background Elements */}
        <motion.div
          style={{
            x: useTransform(mouseX, [-0.5, 0.5], [20, -20]),
            y: useTransform(mouseY, [-0.5, 0.5], [20, -20]),
          }}
          className="absolute top-20 left-10 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-40 -z-10"
        />
        <motion.div
          style={{
            x: useTransform(mouseX, [-0.5, 0.5], [-30, 30]),
            y: useTransform(mouseY, [-0.5, 0.5], [-30, 30]),
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-red-200 rounded-full blur-3xl opacity-40 -z-10"
        />

        {/* Layer 2: Main Typography */}
        <div className="z-10 max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-[#8C6A5D] text-[#8C6A5D] text-xs font-bold tracking-widest mb-6 uppercase bg-white/50 backdrop-blur-sm">
              Peta Interaktif Indonesia
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] text-[#2C2420]">
              Jelajahi Kekayaan <br />
              <span className="italic text-[#A0563F]">Budaya Nusantara</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Temukan ribuan tradisi seremonial dan kesenian daerah dari 38
              provinsi melalui pengalaman visual yang imersif.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 flex gap-4 justify-center"
          >
            {/* BUTTON 1: MULAI MENJELAJAH -> KE PETA */}
            <Link
              href="/peta"
              className="group relative px-8 py-4 bg-[#A0563F] text-white rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all inline-block"
            >
              <span className="relative z-10 flex items-center gap-2">
                Mulai Menjelajah{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[#8a4731] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>

            {/* BUTTON 2: LIHAT SHOWREEL -> BUKA MODAL */}
            <button
              onClick={() => setIsShowreelOpen(true)}
              className="px-8 py-4 bg-white text-[#A0563F] border border-[#A0563F]/30 rounded-full font-semibold hover:bg-[#FFF8F5] transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Lihat Showreel
            </button>
          </motion.div>
        </div>

        {/* Layer 3: Floating Assets */}
        <motion.div
          style={{
            x: useTransform(mouseX, [-0.5, 0.5], [40, -40]),
            y: useTransform(mouseY, [-0.5, 0.5], [20, -20]),
          }}
          className="absolute left-0 top-1/3 hidden md:block w-64 h-64 pointer-events-none opacity-80"
        >
          <div className="w-full h-full rounded-lg flex items-center justify-center rotate-[-10deg]">
            {/* Pastikan file Wayang.png ada di folder public/images/ */}
            <img
              src="/images/Wayang.png"
              alt="Wayang"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          style={{
            x: useTransform(mouseX, [-0.5, 0.5], [-50, 50]),
            y: useTransform(mouseY, [-0.5, 0.5], [40, -40]),
          }}
          className="absolute right-0 bottom-20 hidden md:block w-72 h-96 pointer-events-none opacity-90"
        >
          <div className="w-full h-full rounded-lg flex items-center justify-center rotate-[5deg]">
            {/* Pastikan file Penari.png ada di folder public/images/ */}
            <img
              src="/images/Penari.png"
              alt="Penari"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* --- FEATURE SECTION (BENTO GRID) --- */}
      <section className="relative py-24 px-6 bg-white z-20 rounded-t-[3rem] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-[#A0563F] uppercase mb-3">
              Fitur Utama
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2420]">
              Platform Terpadu <br /> Warisan Nusantara
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {/* Card 1 */}
            <FeatureCard
              colSpan="md:col-span-2"
              icon={<Map className="w-8 h-8 text-white" />}
              title="Peta Interaktif 3D"
              desc="Jelajahi sebaran tradisi berdasarkan lokasi geografis dengan visualisasi peta yang imersif dan detail."
              color="bg-[#8C6A5D]"
              textColor="text-white"
            />

            {/* Card 2 */}
            <FeatureCard
              colSpan="md:col-span-1"
              icon={<BookOpen className="w-8 h-8 text-[#8C6A5D]" />}
              title="Ensiklopedia Budaya"
              desc="Data lengkap sejarah, filosofi, dan nilai budaya yang terkurasi."
              color="bg-[#FDF8F5]"
              textColor="text-[#2C2420]"
            />

            {/* Card 3 */}
            <FeatureCard
              colSpan="md:col-span-1"
              icon={<Calendar className="w-8 h-8 text-[#8C6A5D]" />}
              title="Jadwal Event"
              desc="Kalender upacara adat dan festival budaya real-time."
              color="bg-[#FDF8F5]"
              textColor="text-[#2C2420]"
            />

            {/* Card 4 */}
            <FeatureCard
              colSpan="md:col-span-2"
              icon={<MessageCircle className="w-8 h-8 text-white" />}
              title="Asisten Budaya AI"
              desc="Tanya jawab interaktif tentang budaya Indonesia dengan Chatbot pintar berbasis Large Language Model."
              color="bg-[#A0563F]"
              textColor="text-white"
            />
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-12">
            <StatItem number="38" label="Provinsi" />
            <StatItem number="100+" label="Tradisi & Kesenian" />
            <StatItem number="50+" label="Event Budaya" />
            <StatItem number="24/7" label="Akses Platform" />
          </div>
        </div>
      </section>

      {/* --- CTA & FOOTER WRAPPER --- */}
      <div className="relative mt-32">
        {/* MARQUEE */}
        <div className="relative bg-[#A0563F] overflow-hidden flex flex-col items-center justify-center text-[#FDF8F5]">
          <div className="absolute inset-0 flex items-center pointer-events-none opacity-10 select-none overflow-hidden">
            <motion.div
              className="whitespace-nowrap text-[12rem] md:text-[15rem] font-serif font-bold leading-none"
              animate={{ x: [0, -2000] }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
            >
              SUMATERA JAWA KALIMANTAN SULAWESI PAPUA BALI — SUMATERA JAWA
              KALIMANTAN SULAWESI PAPUA BALI —
            </motion.div>
          </div>

          <div
            className="absolute inset-0 opacity-20 z-10"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="relative z-20 w-full max-w-4xl mx-auto text-center px-6 py-32 md:py-48">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Siap Menjelajah <br /> Nusantara?
              </h2>
              <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-light">
                Bergabunglah dengan ribuan orang lainnya dalam melestarikan dan
                mempelajari kekayaan budaya kita untuk masa depan.
              </p>

              <div className="mb-10">
                <Link
                  href="/peta"
                  className="bg-[#FDF8F5] text-[#A0563F] px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 hover:shadow-white/20 transition-all inline-flex items-center gap-3 mx-auto"
                >
                  Buka Peta Sekarang <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-[#2C2420] text-[#FDF8F5] pt-24 pb-10 relative z-30 -mt-10 rounded-t-[3rem]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              {/* Brand Section */}
              <div className="md:col-span-4">
                <div className="flex items-center gap-2 text-xl font-serif font-bold mb-6">
                  <MapPin className="w-8 h-8 text-[#A0563F]" /> Nusantara
                  Cultural Atlas
                </div>
                <p className="text-white/60 leading-relaxed mb-8">
                  Platform digital yang didedikasikan untuk mendokumentasikan,
                  memvisualisasikan, dan melestarikan warisan budaya Indonesia
                  untuk generasi mendatang.
                </p>
                <div className="flex gap-4">
                  <SocialButton icon={<Instagram className="w-5 h-5" />} />
                  <SocialButton icon={<Twitter className="w-5 h-5" />} />
                  <SocialButton icon={<Facebook className="w-5 h-5" />} />
                </div>
              </div>

              {/* Links */}
              <div className="md:col-span-2 md:col-start-6">
                <h4 className="font-bold text-lg mb-6 text-[#A0563F]">
                  Eksplorasi
                </h4>
                <ul className="space-y-4 text-white/70">
                  <FooterLink text="Peta Budaya" />
                  <FooterLink text="Ensiklopedia" />
                  <FooterLink text="Jadwal Event" />
                  <FooterLink text="Museum Virtual" />
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-bold text-lg mb-6 text-[#A0563F]">
                  Perusahaan
                </h4>
                <ul className="space-y-4 text-white/70">
                  <FooterLink text="Tentang Kami" href="/about" />
                  <FooterLink text="Karir" />
                  <FooterLink text="Blog" />
                  <FooterLink text="Kontak" />
                </ul>
              </div>

              {/* Newsletter */}
              <div className="md:col-span-4 md:col-start-9 lg:col-span-3">
                <h4 className="font-bold text-lg mb-6 text-[#A0563F]">
                  Kabar Terbaru
                </h4>
                <p className="text-white/60 text-sm mb-4">
                  Dapatkan update mingguan tentang festival dan penemuan budaya
                  baru.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Anda"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#A0563F] transition-colors"
                  />
                  <button className="absolute right-2 top-2 bg-[#A0563F] p-1.5 rounded-md hover:bg-[#8C6A5D] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
              <p>&copy; 2025 Nusantara Cultural Atlas. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ================= MODAL SHOWREEL VIDEO ================= */}
      <AnimatePresence>
        {isShowreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsShowreelOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsShowreelOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/T1tDorodPbM?autoplay=1&rel=0&modestbranding=1"
                title="Wonderful Indonesia Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIChatFloating />
    </main>
  );
}

// --- COMPONENTS HELPER ---

function AIChatFloating() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hilangkan tooltip otomatis setelah 5 detik agar tidak mengganggu
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-2">
      {/* 1. TOOLTIP BUBBLE (Sapaan) */}
      <AnimatePresence>
        {(showTooltip || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="bg-white px-4 py-2 rounded-2xl rounded-br-none shadow-xl border border-[#A0563F]/10 mb-2 relative max-w-[200px]"
          >
            <p className="text-sm font-bold text-[#2C2420] flex items-center gap-1">
              Halo! Ada yang bisa dibantu?{" "}
              <Sparkles size={14} className="text-yellow-500 fill-yellow-500" />
            </p>
            {/* Panah bubble */}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45 border-r border-b border-[#A0563F]/10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. AVATAR TOMBOL UTAMA */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => alert("Fitur Chat AI akan segera hadir! 🤖")} // Nanti diganti fungsi buka chat
        // Animasi Masuk
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative group w-16 h-16 md:w-20 md:h-20"
      >
        {/* Animasi 'Bernapas' / Floating Naik Turun */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          {/* Lingkaran Background & Glow */}
          <div className="absolute inset-0 bg-[#FFFF] rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden border-2 border-white">
            {/* Ilustrasi Robot 2D Lucu (DiceBear Bottts) */}
            <img
              src="/images/bot.png"
              alt="AI Assistant"
              className="w-[300%] h-[300%] object-contain"
            />

            {/* Efek Shine/Kilau */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-10 rounded-full blur-sm"></div>
          </div>

          {/* Badge Notifikasi Merah (Opsional) */}
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
}

function FeatureCard({ colSpan, icon, title, desc, color, textColor }: any) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`${colSpan} ${color} ${textColor} p-8 rounded-3xl relative overflow-hidden group cursor-pointer transition-shadow hover:shadow-2xl`}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="mb-6 p-3 bg-white/10 w-fit rounded-2xl backdrop-blur-sm">
          {icon}
        </div>
        <div>
          <h4 className="text-2xl font-bold mb-2 flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h4>
          <p
            className={`text-sm opacity-80 leading-relaxed ${
              textColor === "text-white" ? "text-gray-200" : "text-gray-600"
            }`}
          >
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      className="text-center"
    >
      <h4 className="text-4xl md:text-5xl font-bold text-[#A0563F] mb-2">
        {number}
      </h4>
      <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">
        {label}
      </p>
    </motion.div>
  );
}

// Tambahkan properti 'href' di sini
function FooterLink({ text, href = "#" }: { text: string; href?: string }) {
  return (
    <li>
      {/* Gunakan Link dari Next.js, bukan <a> biasa */}
      <Link
        href={href}
        className="hover:text-[#A0563F] hover:translate-x-1 transition-all inline-block"
      >
        {text}
      </Link>
    </li>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#A0563F] hover:text-white transition-all text-white/70"
    >
      {icon}
    </a>
  );
}
