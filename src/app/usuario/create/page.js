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

  const [mensagem, setMensagem] = useState("");
  const [success, setSuccess] = useState(false);

  const API_URL = "http://localhost:8080/api/v1/usuario";

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (name === "telefone") {
      value = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }

    setForm({ ...form, [name]: value });
  };

  const validarDados = () => {
    if (!form.email) return "O email deve ser preenchido";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "O email deve ser válido";

    if (!form.senha) return "A senha deve ser preenchida";

    if (!form.nome || form.nome.length < 3)
      return "O nome deve ter ao menos 3 caracteres";

    if (!form.cpf) return "O CPF deve ser preenchido";
    if (!form.telefone) return "O telefone deve ser preenchido";

    if (!form.tipo) return "O tipo deve ser selecionado";
    if (!form.dataNascimento) return "A data de nascimento deve ser preenchida";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setSuccess(false);

    const erro = validarDados();
    if (erro) return setMensagem(erro);

    try {
      await axios.post(API_URL, form);

      setMensagem("Cadastro realizado com sucesso!");
      setSuccess(true);

      setTimeout(() => router.push("/usuario/login"), 1500);

      setForm({
        email: "",
        senha: "",
        nome: "",
        cpf: "",
        telefone: "",
        tipo: "",
        dataNascimento: ""
      });
    } catch (error) {
      setMensagem(
        error.response?.data?.errors
          ? Object.values(error.response.data.errors)[0]
          : "Erro ao cadastrar usuário."
      );
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900"></div>

      <form
        className="relative z-10 w-full max-w-md bg-indigo-300/50 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/30"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Cadastro</h1>

        {mensagem && (
          <p className={`mb-3 text-center font-semibold ${success ? "text-green-400" : "text-red-400"}`}>
            {mensagem}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 mt-1"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label>Tipo</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 mt-1"
            >
              <option value="">Selecione</option>
              <option value="CLIENTE">Cliente</option>
              <option value="ORGANIZADOR">Organizador</option>
              <option value="ADMINISTRADOR">Administrador</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 mt-1"
            placeholder="Digite seu email"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 mt-1"
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 mt-1"
            />
          </div>
        </div>

        <div className="mt-3">
          <label>Telefone</label>
          <input
            type="text"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 mt-1"
          />
        </div>

        <div className="mt-3">
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 mt-1"
            placeholder="********"
          />
        </div>

        <button className="mt-6 w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 p-3 rounded-xl font-bold shadow-md">
          Criar Conta
        </button>

        <p className="mt-4 text-sm text-center text-slate-300">
          Já possui conta?{" "}
          <a href="/usuario/login" className="underline text-purple-300 font-semibold hover:text-purple-400">
            Fazer login
          </a>
        </p>
      </form>
    </div>
  );
}
