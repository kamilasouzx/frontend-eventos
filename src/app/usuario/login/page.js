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
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-purple-200 via-blue-200 to-yellow-200
        text-gray-900
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm 
          bg-white/60 backdrop-blur-xl 
          p-6 rounded-2xl shadow-2xl border border-white/40
        "
      >
        <h1 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
          Login
        </h1>

        {erro && <p className="text-red-500 mb-3">{erro}</p>}

        <label className="block mb-2 font-semibold">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl text-gray-900 mb-4 
            border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400
          "
          required
        />

        <label className="block mb-2 font-semibold">Senha</label>
        <input
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl text-gray-900 mb-6 
            border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400
          "
          required
        />

        <button
          className="
            w-full bg-gradient-to-r from-purple-500 via-blue-500 to-yellow-400
            hover:opacity-90
            text-white font-bold p-3 rounded-xl transition
            shadow-md
          "
        >
          Entrar
        </button>

        <p className="mt-4 text-sm text-center text-gray-700">
          Não tem conta?{" "}
          <a href="/usuario/create" className="text-purple-600 font-semibold underline">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
