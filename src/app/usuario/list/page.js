"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TopBar from "../../components/TopBar";
import { useRouter } from "next/navigation";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function carregarTodos() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/usuario");
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Erro ao listar usuários:", err);
    } finally {
      setLoading(false);
    }
    
  }


  async function buscarPorNome() {
    if (busca.trim() === "") return carregarTodos();

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/v1/usuario/search?termo=${busca}`
      );
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTodos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      buscarPorNome();
    }, 500);

    return () => clearTimeout(timer);
  }, [busca]);

  return (
    <div className="min-h-screen bg-slate-900 text-white relative pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-700/10 to-slate-900 pointer-events-none"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Usuários</h1>

        {/* 🔍 Pesquisa */}
        <div className="bg-indigo-300/50 border border-slate-700 shadow-xl rounded-2xl p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Pesquisar Usuários</h2>

          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou email..."
            className="w-full bg-indigo-900/50 border border-slate-600 rounded-xl px-4 py-2 text-white placeholder-slate-400 
            focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 🟣 Lista */}
        <div className="bg-indigo-300/50 border border-slate-700 rounded-2xl shadow-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Lista de Usuários</h2>

          {loading && <p className="text-slate-400">Carregando usuários...</p>}

          {!loading && usuarios.length === 0 && (
            <p className="text-slate-400">Nenhum usuário encontrado.</p>
          )}

          <div className="flex flex-col gap-3">
            {usuarios.map((u) => (
              <div
                key={u.id}
                onClick={() => router.push(`/usuario/${u.id}`)}
                className="bg-indigo-900/50 border border-slate-600 rounded-xl p-3 flex justify-between 
                items-center shadow-md hover:bg-indigo-800/70 transition cursor-pointer"
              >
                <div className="text-white font-semibold">{u.nome}</div>
                <div className="text-slate-300 text-sm">{u.tipo}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}