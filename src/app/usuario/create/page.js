"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    cpf: "",
    telefone: "",
    tipo: "",
    dataNascimento: ""
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const payload = { ...form };
      const response = await axios.post(
        "http://localhost:8080/api/v1/usuario",
        payload
      );

      if (response.status === 201 || response.status === 200) {
        setSucesso("Conta criada com sucesso!");
        setTimeout(() => router.push("/auth/login"), 1500);
      }
    } catch (err) {
      setErro("Erro ao cadastrar. Verifique os campos.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-900 text-white">
      {/* Fundo gradiente HomePage */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900 pointer-events-none"></div>

      <form
        className="relative z-10 w-full max-w-md bg-indigo-300/50 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/30"
      
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Cadastro</h1>

        {erro && <p className="text-red-400 mb-3">{erro}</p>}
        {sucesso && <p className="text-green-400 mb-3">{sucesso}</p>}

        {/* INPUTS */}
        {["email","senha","nome","CPF","telefone","dataNascimento"].map((field) => (
          <div key={field} className="mt-3">
            <label className="block mb-1 capitalize">{field === "dataNascimento" ? "Data de Nascimento" : field}</label>
            <input
              name={field}
              type={field === "senha" ? "password" : field === "dataNascimento" ? "date" : "text"}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        ))}

        {/* TIPO */}
        <div className="mt-3">
          <label className="block mb-1">Tipo de Usuário</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Selecione...</option>
            <option value="ADMIN">Cliente</option>
            <option value="ALUNO">Organizador</option>
            <option value="ALUNO">Administrador</option>
          </select>
        </div>

        {/* BOTÃO */}
        <button className="mt-6 w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 p-3 rounded-xl font-bold transition shadow-md text-white">
          Criar Conta
        </button>

        <p className="mt-4 text-sm text-center text-slate-300">
          Já possui conta?{" "}
          <a href="/auth/login" className="underline text-purple-400 font-semibold">
            Fazer login
          </a>
        </p>
      </form>
    </div>
  );
}
