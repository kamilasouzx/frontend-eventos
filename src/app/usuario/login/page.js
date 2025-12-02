"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", form);

      if (response.status === 200) {
        router.push("/evento"); // redireciona para eventos
      }
    } catch (err) {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-900 text-white">
      {/* Fundo gradiente semelhante ao HomePage */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900 pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm bg-indigo-300/50 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/30"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Login</h1>

        {erro && <p className="text-red-400 mb-3">{erro}</p>}

        {/* EMAIL */}
        <label className="block mt-2">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digite seu email"
          className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* SENHA */}
        <label className="block mt-2">Senha</label>
        <input
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          placeholder="Digite sua senha"
          className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 p-3 rounded-xl font-bold transition shadow-md text-white"
        >
          Entrar
        </button>

        <p className="mt-4 text-sm text-center text-slate-300">
          Não tem conta?{" "}
          <a href="/usuario/create" className="underline text-purple-300 font-semibold hover:text-purple-400 transition-colors duration-200"
          >
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
