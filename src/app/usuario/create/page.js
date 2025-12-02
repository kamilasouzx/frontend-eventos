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

  const [erro, setErro] = useState({});
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErro({ ...erro, [name]: false }); // remove erro visual ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro({});
    setSucesso("");

    // Validação front-end
    let novoErro = {};
    if (!form.email) novoErro.email = true;
    if (!form.senha) novoErro.senha = true;
    if (!form.nome) novoErro.nome = true;
    if (!form.cpf) novoErro.cpf = true;
    if (!form.telefone) novoErro.telefone = true;
    if (!form.tipo) novoErro.tipo = true;
    if (!form.dataNascimento) novoErro.dataNascimento = true;

    if (Object.keys(novoErro).length > 0) {
      setErro(novoErro);
      return;
    }

    try {
      const payload = { ...form };
      const response = await axios.post(
        "http://localhost:8080/api/v1/usuario",
        payload
      );

      if (response.status === 201 || response.status === 200) {
        setSucesso("Conta criada com sucesso!");
        setForm({
          email: "",
          senha: "",
          nome: "",
          cpf: "",
          telefone: "",
          tipo: "",
          dataNascimento: ""
        });
        setErro({});
        setTimeout(() => router.push("/auth/login"), 1500);
      }
    } catch (err) {
      setErro({ geral: "Erro ao cadastrar. Verifique os campos." });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center pt-21 justify-center bg-slate-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900 pointer-events-none"></div>

      <form
        className="relative z-10 w-full max-w-md bg-indigo-300/50 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/30"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Cadastro</h1>

        {erro.geral && <p className="text-red-500 mb-3">{erro.geral}</p>}
        {sucesso && <p className="text-green-500 mb-3">{sucesso}</p>}

        {/* GRID para Nome e Tipo */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white">
              Nome {erro.nome && <span className="text-red-500 text-xl">*</span>}
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-white">
              Tipo {erro.tipo && <span className="text-red-500 text-xl">*</span>}
            </label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione</option>
              <option value="CLIENTE">Cliente</option>
              <option value="ORGANIZADOR">Organizador</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
        </div>

        {/* Email */}
        <div className="mt-3">
          <label className="text-white">
            Email {erro.email && <span className="text-red-500 text-xl">*</span>}
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Senha */}
        <div className="mt-3">
          <label className="text-white">
            Senha {erro.senha && <span className="text-red-500 text-xl">*</span>}
          </label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* CPF e Telefone */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="text-white">
              CPF {erro.cpf && <span className="text-red-500 text-xl">*</span>}
            </label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-white">
              Telefone {erro.telefone && <span className="text-red-500 text-xl">*</span>}
            </label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Digite seu telefone"
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Data de Nascimento */}
        <div className="mt-3">
          <label className="text-white">
            Data de Nascimento {erro.dataNascimento && <span className="text-red-500 text-xl">*</span>}
          </label>
          <input
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
            className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* BOTÃO */}
        <button className="mt-6 w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 p-3 rounded-xl font-bold transition shadow-md text-white">
          Criar Conta
        </button>

        <p className="mt-4 text-sm text-center text-slate-300">
          Já possui conta?{" "}
          <a href="/usuario/login" className="underline text-purple-300 font-semibold hover:text-purple-400 transition-colors duration-200">
            Fazer login
          </a>
        </p>
      </form>
    </div>
  );
}
