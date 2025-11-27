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
      const payload = {
        ...form,
        dataNascimento: form.dataNascimento // já vem yyyy-mm-dd
      };

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
    <div className="min-h-screen flex items-center justify-center bg-cyan-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-cyan-800 p-6 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Cadastro</h1>

        {erro && <p className="text-red-400 mb-3">{erro}</p>}
        {sucesso && <p className="text-green-400 mb-3">{sucesso}</p>}

        {/* EMAIL */}
        <label className="block mt-2">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        {/* SENHA */}
        <label className="block mt-2">Senha</label>
        <input
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        {/* NOME */}
        <label className="block mt-2">Nome</label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        {/* CPF */}
        <label className="block mt-2">CPF</label>
        <input
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        {/* TELEFONE */}
        <label className="block mt-2">Telefone</label>
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        {/* TIPO */}
        <label className="block mt-2">Tipo de Usuário</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        >
          <option value="">Selecione</option>
          <option value="ADMIN">Admin</option>
          <option value="ALUNO">Aluno</option>
          <option value="PROFESSOR">Professor</option>
        </select>

        {/* NASCIMENTO */}
        <label className="block mt-2">Data de Nascimento</label>
        <input
          name="dataNascimento"
          type="date"
          value={form.dataNascimento}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        <button className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 p-2 rounded font-bold transition">
          Criar Conta
        </button>

        <p className="mt-4 text-sm text-center">
          Já possui conta?{" "}
          <a href="/auth/login" className="text-cyan-300 underline">
            Fazer login
          </a>
        </p>
      </form>
    </div>
  );
}
