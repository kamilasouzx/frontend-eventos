"use client";
import { useEffect, useState } from "react";
import { Home, CalendarPlus, LogIn } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl
        ${scrolled 
          ? "shadow-md bg-gradient-to-r from-purple-300/80 via-blue-200/80 to-yellow-200/80" 
          : "bg-gradient-to-r from-purple-200/50 via-blue-100/50 to-yellow-100/50"
        }
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 text-gray-900">

        {/* Lado esquerdo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Home size={22} />
          Events Manager
        </Link>

        {/* Meio */}
        <Link
          href="/evento/create"
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl transition
            bg-gradient-to-r from-purple-400 to-blue-400
            hover:from-purple-500 hover:to-blue-500
            text-white font-semibold shadow-md
          "
        >
          <CalendarPlus size={18} />
          Cadastrar Evento
        </Link>

        {/* Lado direito (LOGIN) */}
        <Link
          href="/usuario/login"
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl transition
            border border-gray-400/60
            hover:bg-white/40
            text-gray-900 font-semibold
          "
        >
          <LogIn size={18} />
          Entrar
        </Link>

      </div>
    </header>
  );
}
