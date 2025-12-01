"use client";
import { useState } from "react";
import axios from "axios";

export default function CriarEvento() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    local: "",
    dataInicio: "",
    dataFinal: "",
    linkEvento: "",
    linkImagem: ""
  });

  const [apiErrors, setApiErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiErrors({});
    setSuccess("");

    function formatDate(dt) {
      if (!dt) return null;
      const d = new Date(dt);
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}`;
    }

    const payload = {
      ...form,
      dataInicio: formatDate(form.dataInicio),
      dataFinal: formatDate(form.dataFinal)
    };

    try {
      await axios.post("http://localhost:8080/api/v1/evento", payload);
      setSuccess("Evento criado com sucesso!");
      setForm({
        nome: "",
        descricao: "",
        tipo: "",
        local: "",
        dataInicio: "",
        dataFinal: "",
        linkEvento: "",
        linkImagem: ""
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setApiErrors(err.response.data.errors);
      } else {
        alert("Erro ao criar evento");
      }
    }
  }

  return (
    <div className="min-h-screen relative flex justify-center items-start p-10 bg-slate-900 text-white">
      
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm bg-indigo-300/50 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/30">
        <h1 className="text-3xl font-bold mb-6 text-white">Criar Novo Evento</h1>

        {success && (
          <p className="bg-green-700 text-white p-2 rounded mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label className="text-white">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
            {apiErrors.nome && <p className="text-red-500 text-sm">{apiErrors.nome}</p>}
          </div>

          {/* Descrição */}
          <div>
            <label className="text-white">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
            {apiErrors.descricao && <p className="text-red-500 text-sm">{apiErrors.descricao}</p>}
          </div>

          {/* Tipo */}
          <div>
            <label className="text-white">Tipo do Evento</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione...</option>
              <option value="CONGRESSO">Congresso</option>
              <option value="TREINAMENTO">Treinamento</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="IMERSÃO">Imersão</option>
              <option value="REUNIÃO">Reunião</option>
              <option value="HACKATON">Hackaton</option>
              <option value="STARTUP">Startup</option>

            </select>
            {apiErrors.tipo && <p className="text-red-500 text-sm">{apiErrors.tipo}</p>}
          </div>

          {/* Local */}
          <div>
            <label className="text-white">Local</label>
            <input
              type="text"
              name="local"
              value={form.local}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
            {apiErrors.local && <p className="text-red-500 text-sm">{apiErrors.local}</p>}
          </div>

          {/* Datas */}
          <div>
            <label className="text-white">Data de Início</label>
            <input
              type="datetime-local"
              name="dataInicio"
              value={form.dataInicio}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
            {apiErrors.dataInicio && <p className="text-red-500 text-sm">{apiErrors.dataInicio}</p>}
          </div>

          <div>
            <label className="text-white">Data Final</label>
            <input
              type="datetime-local"
              name="dataFinal"
              value={form.dataFinal}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
            {apiErrors.dataFinal && <p className="text-red-500 text-sm">{apiErrors.dataFinal}</p>}
          </div>

          {/* Links */}
          <div>
            <label className="text-white">Link do Evento (opcional)</label>
            <input
              type="text"
              name="linkEvento"
              value={form.linkEvento}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-white">Link da Imagem (opcional)</label>
            <input
              type="text"
              name="linkImagem"
              value={form.linkImagem}
              onChange={handleChange}
              className="w-full p-2 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full mt-4 p-3 rounded-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 text-white shadow-md transition"
          >
            Criar Evento
          </button>
        </form>
      </div>
    </div>
  );
}
