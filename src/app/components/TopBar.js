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
        ${
          scrolled
            ? "bg-indigo-950/70 shadow-md"
            : "bg-indigo-950/90"
        }
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 text-white">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Home size={22} />
          Gerenciador de Eventos
        </Link>

        {/* BOTÕES */}
        <div className="flex items-center gap-4">

          <Link
            href="/evento/create"
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              border border-white/40 
              hover:bg-white/10 
              transition font-semibold
            "
          >
            <CalendarPlus size={18} />
            Cadastrar Evento
          </Link>

          <Link
            href="/usuario/login"
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              border border-white/40
              hover:bg-white/10
              transition font-semibold
            "
          >
            <LogIn size={18} />
            Entrar
          </Link>

        </div>

      </div>
    </header>
  );
}
