"use client";
import { useEffect, useState } from "react";
import { Home, CalendarPlus, LogIn, Search, LogOut } from "lucide-react"; 
// Removendo a importação de Link para resolver o erro de compilação

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função para lidar com o Logout
  const handleLogout = () => {
    // Remove todos os dados de autenticação
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nome");
    // Redireciona para a home e força o reload para que a TopBar atualize
    window.location.href = "/";
  };

  // Efeito para verificar o estado de scroll e a autenticação
  useEffect(() => {
    // Lógica de Scroll
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    // Lógica de Autenticação (Executada apenas no cliente)
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");

    if (token && nome) {
      setUserName(nome.split(' ')[0]); // Pega apenas o primeiro nome
      setIsLoggedIn(true);
    } else {
      setUserName(null);
      setIsLoggedIn(false);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Dependência vazia para rodar apenas uma vez no mount

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

        {/* LOGO (Usando <a> ao invés de Link) */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Home size={22} />
          Gerenciador de Eventos
        </a>

        {/* BOTÕES E AUTENTICAÇÃO */}
        <div className="flex items-center gap-4">

          {/* Buscar Usuários (Usando <a> ao invés de Link) */}
          <a
            href="/usuario/list"
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              border border-white/40 
              hover:bg-white/10 
              transition font-semibold
            "
          >
            <Search size={18} />
            Buscar Usuários
          </a>

          {/* Cadastrar Evento (Usando <a> ao invés de Link) */}
          <a
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
          </a>

          {/* RENDERIZAÇÃO CONDICIONAL DE LOGIN/USUÁRIO */}
          {isLoggedIn ? (
            <>
              {/* Exibição do nome do usuário */}
              <span className="font-bold text-lg text-purple-400">
                Olá, {userName}!
              </span>

              {/* Botão de Sair (Logout) */}
              <button
                onClick={handleLogout}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-xl
                  border border-white/40 bg-red-600/50
                  hover:bg-red-600/70
                  transition font-semibold
                "
              >
                <LogOut size={18} />
                Sair
              </button>
            </>
          ) : (
            // Link para Login (se não estiver logado - Usando <a>)
            <a
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
            </a>
          )}

        </div>
      </div>
    </header>
  );
}