"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Github,
  Linkedin,
  Instagram,
  ArrowLeft,
  Heart,
} from "lucide-react";
import Link from "next/link";
// import Image from "next/image"; // Kita gunakan motion.img biasa agar mudah dianimasikan

// --- DATA TIM (UPDATE: Menggunakan Gambar Lokal) ---
const TEAM_MEMBERS = [
  {
    name: "Lalu Fathan Mauliansyah",
    role: "Ketua Tim",
    // GANTI 'avatarSeed' DENGAN PATH GAMBAR LOKAL KAMU DI SINI
    // Pastikan file gambar ada di folder public/images/team/
    imageSrc: "/images/atan.png",
    color: "bg-blue-50", // Warna blob background
  },
  {
    name: "Muhammad Rafi Rizkyarto",
    role: "Project Manager & Research",
    imageSrc: "/images/team/rafi.jpg", // Ganti dengan file yang sesuai
    color: "bg-green-50",
  },
  {
    name: "Aditya Putra Ramadhan",
    role: "Lead Developer",
    imageSrc: "/images/adit.png", // Ganti dengan file yang sesuai
    color: "bg-orange-50",
  },
  {
    name: "Najwa Febrianti Azzahra",
    role: "Content Specialist",
    imageSrc: "/images/team/najwa.jpg", // Ganti dengan file yang sesuai
    color: "bg-pink-50",
  },
  {
    name: "Rusdi Aulia Romadhon",
    role: "UI/UX Designer",
    imageSrc: "/images/rusdi.png", // Ganti dengan file yang sesuai
    color: "bg-purple-50",
  },
];

// --- ANIMASI VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F5] font-sans text-[#2C2420] overflow-x-hidden">
      {/* TOMBOL KEMBALI */}
      <div className="absolute top-8 left-8 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#A0563F] font-bold hover:-translate-x-1 transition-transform bg-white px-4 py-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} /> Kembali
        </Link>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-48 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-2 px-5 rounded-full bg-[#A0563F]/10 text-[#A0563F] text-sm font-bold tracking-[0.2em] uppercase mb-8">
            Tentang Kami
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-[#2C2420] leading-tight">
            Merawat Ingatan, <br />
            <span className="italic text-[#A0563F]">Melestarikan Budaya.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-light">
            Nusantara Cultural Atlas adalah inisiatif digital oleh{" "}
            <strong>Tim Spontan</strong> untuk mendokumentasikan dan
            mempromosikan kekayaan budaya Indonesia agar tetap hidup di era
            digital.
          </p>
        </motion.div>

        {/* Hiasan Background Abstrak */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* ================= VISI & MISI ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CARD VISI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-orange-100 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#A0563F]/5 rounded-bl-full transition-transform group-hover:scale-125 duration-700 origin-top-right"></div>

            <div className="w-16 h-16 bg-[#FFF0EB] rounded-2xl flex items-center justify-center text-[#A0563F] mb-8">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-6 text-[#2C2420]">
              Visi Kami
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Menjadi platform literasi budaya digital terdepan yang
              menghubungkan generasi muda dengan warisan leluhur Nusantara
              melalui pengalaman visual yang imersif dan relevan.
            </p>
          </motion.div>

          {/* CARD MISI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#2C2420] p-10 md:p-12 rounded-[2.5rem] shadow-2xl text-[#FDF8F5] relative overflow-hidden hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-tr-full"></div>

            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/10">
              <Lightbulb size={32} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-6">Misi Kami</h3>
            <ul className="space-y-5 text-white/80 text-lg">
              <li className="flex items-start gap-4">
                <span className="mt-2 w-2 h-2 bg-[#A0563F] rounded-full flex-shrink-0"></span>
                <span>Mendigitalisasi informasi tradisi dari 38 provinsi.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 w-2 h-2 bg-[#A0563F] rounded-full flex-shrink-0"></span>
                <span>Menyajikan konten dalam format visual interaktif.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 w-2 h-2 bg-[#A0563F] rounded-full flex-shrink-0"></span>
                <span>Meningkatkan apresiasi terhadap keberagaman.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= TEAM SECTION (YANG DIPERBAIKI) ================= */}
      <section className="py-24 px-6 bg-white relative rounded-t-[4rem] mt-10 shadow-[0_-20px_60px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#2C2420]">
              Tim Spontan
            </h2>
            <p className="text-gray-500 text-lg">
              Orang-orang kreatif dibalik layar BUDAYA GO! 2025
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
          >
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                // --- PERBAIKAN DI SINI: Menambahkan 'relative' pada card ---
                className="group bg-[#FDF8F5] rounded-[2.5rem] p-8 text-center border border-transparent hover:border-[#A0563F]/20 hover:shadow-[0_20px_40px_rgba(160,86,63,0.1)] transition-all duration-300 relative"
              >
                {/* --- PERBAIKAN DI SINI: Wrapper 'relative z-10' --- */}
                {/* Ini memastikan semua konten di dalamnya (gambar, teks) berada DI ATAS background card */}
                <div className="relative z-10">
                  {/* Avatar Container */}
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    {/* Blob background di belakang foto */}
                    <div
                      className={`absolute inset-0 rounded-full opacity-30 scale-90 group-hover:scale-110 transition-transform duration-500 ${member.color}`}
                    ></div>

                    {/* --- PERBAIKAN DI SINI: Menggunakan Gambar Lokal --- */}
                    <motion.img
                      src={member.imageSrc} // Menggunakan path gambar lokal
                      alt={member.name}
                      // Ditambahkan 'object-cover' dan 'rounded-full' agar foto jadi bulat sempurna
                      className="w-full h-full object-cover rounded-full relative z-10 drop-shadow-lg"
                      animate={{ y: [0, -8, 0] }} // Animasi floating tetap ada
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-[#2C2420] mb-2 group-hover:text-[#A0563F] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
                    {member.role}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <SocialIcon icon={<Github size={20} />} />
                    <SocialIcon icon={<Linkedin size={20} />} />
                    <SocialIcon icon={<Instagram size={20} />} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-24 text-center max-w-2xl mx-auto"
          >
            <Heart className="w-8 h-8 text-[#A0563F] mx-auto mb-6 fill-current animate-pulse" />
            <p className="text-xl italic text-gray-600 font-serif">
              "Kami percaya bahwa teknologi bukan untuk menggantikan tradisi,
              tetapi untuk memberinya panggung baru."
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// --- HELPER COMPONENT ---
function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#A0563F] hover:text-white hover:border-[#A0563F] transition-all shadow-sm hover:shadow-lg"
    >
      {icon}
    </a>
  );
}
