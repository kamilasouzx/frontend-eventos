"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const API_URL = "http://localhost:8080/api/v1/auth/login";

  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post(API_URL, form);
      const { token, id, nome } = response.data;

      // 🔥 SALVA NO LOCALSTORAGE
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("nome", nome);

      // Redirecionar
      window.location.href = "/";  // Pode alterar pra onde quiser

    } catch (error) {
      if (error.response?.status === 401) {
        setErro("Email ou senha inválidos.");
      } else {
        setErro("Erro ao realizar login. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-300/50 backdrop-blur-md p-6 rounded-xl shadow-xl border border-slate-700/40 w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {erro && <p className="text-red-400 text-center mb-3">{erro}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digite seu email"
          required
          className="w-full p-2 rounded bg-indigo-900/50 border mt-1"
        />

        <label className="mt-3 block">Senha</label>
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          placeholder="Digite sua senha"
          required
          className="w-full p-2 rounded bg-indigo-900/50 border mt-1"
        />

        <button
          type="submit"
          className="mt-5 w-full bg-purple-700 hover:bg-purple-800 p-3 rounded-xl font-bold transition"
        >
          Entrar
        </button>

        <p className="text-center mt-4 text-sm">
          Não tem conta? <a href="/usuario/create" className="underline text-purple-300">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}
