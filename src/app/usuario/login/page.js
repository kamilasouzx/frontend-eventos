"use client";

import { useState } from "react";
import axios from "axios";
// Removendo o useRouter para usar window.location.href, que garante o refresh após salvar no localStorage.

export default function LoginPage() {
  // A URL da API com o endpoint de login/autenticação
  const API_URL = "http://localhost:8080/api/v1/auth/login";

  const [form, setForm] = useState({
    email: "",
    senha: "", // Mantendo o nome 'senha' como no código original
  });

  const [erro, setErro] = useState(""); // Mantendo o nome 'erro' para manter a UI original

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(""); // Limpa a mensagem de erro anterior

    try {
      const response = await axios.post(API_URL, form);

      // Desestrutura os dados de autenticação recebidos
      const { token, id, nome } = response.data;

      // 🔥 SALVAR TUDO NO LOCALSTORAGE (Funcionalidade do segundo código)
      // O uso de localStorage requer um full refresh, por isso usaremos window.location.href
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("nome", nome);

      // Redireciona para /evento (mantendo o destino do primeiro código) com um refresh completo
      window.location.href = "/evento";
      
    } catch (error) {
      // Tratamento de erros mais específico (baseado no segundo código)
      if (error.response?.status === 401) {
        setErro("Email ou senha inválidos.");
      } else {
        setErro("Erro ao realizar login. Tente novamente mais tarde.");
      }
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

        {/* Exibe a mensagem de erro ou sucesso */}
        {erro && <p className="text-red-400 mb-3 text-center">{erro}</p>}

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

        <p className="mt-4 text-sm text-center text-white">
          Não tem conta?{" "}
          <a
            href="/usuario/create"
            className="text-violet-00 hover:brightness-150 underline font-semibold"
          >
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}