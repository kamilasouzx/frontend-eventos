"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function UsuarioViewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id) return;

    async function carregar() {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/usuario/${id}`);
        setUsuario(res.data);
      } catch (e) {
        console.error(e);
        setErro("Usuário não encontrado.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);   // <-- CORRIGIDO (agora é array)

  if (loading) return <p className="text-white p-6">Carregando...</p>;
  if (erro) return <p className="text-red-500 p-6">{erro}</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-500"
      >
        Voltar
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">{usuario.nome}</h1>

        <p className="text-lg mb-2">
          <span className="font-semibold">Email:</span> {usuario.email}
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Data de nascimento:</span> {usuario.dataNascimento}
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Tipo:</span> {usuario.tipo}
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Criado em:</span> {usuario.createdAt}
        </p>
      </div>
    </div>
  );
}
