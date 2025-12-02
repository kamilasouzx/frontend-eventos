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

<<<<<<< HEAD
  const [mensagem, setMensagem] = useState("");
  const [success, setSuccess] = useState(false);

  const API_URL = "http://localhost:8080/api/v1/usuario";

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Máscara para CPF
    if (name === "cpf") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    // Máscara para telefone (Brasil)
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
    if (form.email.length > 150) return "O email deve ter no máximo 150 caracteres";

    if (!form.senha) return "A senha deve ser preenchida";

    if (!form.nome) return "O nome deve ser preenchido";
    if (form.nome.length < 3 || form.nome.length > 150)
      return "O nome deve ter entre 3 e 150 caracteres";

    if (!form.cpf) return "O CPF deve ser preenchido";

    if (!form.telefone) return "O telefone deve ser preenchido";
    if (form.telefone.length > 15) return "O telefone deve ter no máximo 15 caracteres";

    if (!form.tipo) return "O tipo do usuário deve ser preenchido";

    if (!form.dataNascimento) return "A data de nascimento deve ser preenchida";

    return null;
=======
  const [erro, setErro] = useState({});
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErro({ ...erro, [name]: false }); // remove erro visual ao digitar
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setMensagem("");
    setSuccess(false);

    const erro = validarDados();
    if (erro) {
      setMensagem(erro);
      return;
    }
=======
    setErro({});
    setSucesso("");
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd

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
      await axios.post(API_URL, payload);

<<<<<<< HEAD
      setMensagem("Cadastro concluído com sucesso!");
      setSuccess(true);

      setTimeout(() => router.push("/auth/login"), 1500);

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
      if (error.response?.data?.errors) {
        const erros = error.response.data.errors;
        const campo = Object.keys(erros)[0];
        const msg = erros[campo];
        setMensagem(msg);
      } else {
        setMensagem("Erro ao cadastrar usuário.");
      }
=======
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
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen relative flex items-center justify-center bg-slate-900 text-white p-4">
=======
    <div className="min-h-screen relative flex items-center pt-21 justify-center bg-slate-900 text-white">
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900 pointer-events-none"></div>

      <form
        className="relative z-10 w-full max-w-md bg-indigo-300/50 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/30"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Cadastro</h1>

<<<<<<< HEAD
        {mensagem && (
          <p className={`mb-3 text-center font-semibold ${success ? "text-green-400" : "text-red-400"}`}>
            {mensagem}
          </p>
        )}

        {/* Nome + Tipo */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white mb-1 block">Nome</label>
=======
        {erro.geral && <p className="text-red-500 mb-3">{erro.geral}</p>}
        {sucesso && <p className="text-green-500 mb-3">{sucesso}</p>}

        {/* GRID para Nome e Tipo */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white">
              Nome {erro.nome && <span className="text-red-500 text-xl">*</span>}
            </label>
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
<<<<<<< HEAD
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 mt-1"
            />
          </div>
          <div>
            <label className="text-white mb-1 block">Tipo</label>
=======
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-white">
              Tipo {erro.tipo && <span className="text-red-500 text-xl">*</span>}
            </label>
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
<<<<<<< HEAD
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 mt-1"
=======
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
            >
              <option value="">Selecione</option>
              <option value="CLIENTE">Cliente</option>
              <option value="ORGANIZADOR">Organizador</option>
<<<<<<< HEAD
              <option value="ADMINISTRADOR">Administrador</option>
            </select>
          </div>
=======
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
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
        </div>

        {/* Email */}
        <div className="mt-3">
          <label className="text-white mb-1 block">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 mt-1"
          />
        </div>

        {/* CPF + Data de Nascimento */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="text-white mb-1 block">CPF</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 mt-1"
            />
          </div>
          <div>
            <label className="text-white mb-1 block">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 mt-1"
            />
          </div>
        </div>

        {/* Telefone */}
        <div className="mt-3">
          <label className="text-white mb-1 block">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 mt-1"
          />
        </div>

        {/* Senha */}
        <div className="mt-3">
          <label className="text-white mb-1 block">Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            className="w-full p-2 rounded bg-indigo-900/50 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 mt-1"
          />
        </div>

        {/* Botão */}
        <button className="mt-6 w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 p-3 rounded-xl font-bold transition shadow-md text-white">
          Criar Conta
        </button>
<<<<<<< HEAD
=======

        <p className="mt-4 text-sm text-center text-slate-300">
          Já possui conta?{" "}
          <a href="/usuario/login" className="underline text-purple-300 font-semibold hover:text-purple-400 transition-colors duration-200">
            Fazer login
          </a>
        </p>
>>>>>>> 5f35536340c27d3678e9b3b9fe8630572e9623cd
      </form>
    </div>
  );
}
