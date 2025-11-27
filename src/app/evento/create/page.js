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
    <div className="min-h-screen bg-white p-10 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-400 via-blue-300 to-yellow-300 bg-opacity-80 p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-white/30">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Criar Novo Evento</h1>

        {success && (
          <p className="bg-green-200 text-green-800 p-2 rounded mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label className="text-gray-900">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            {apiErrors.nome && <p className="text-red-500 text-sm">{apiErrors.nome}</p>}
          </div>

          {/* Descrição */}
          <div>
            <label className="text-gray-900">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            {apiErrors.descricao && (
              <p className="text-red-500 text-sm">{apiErrors.descricao}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="text-gray-900">Tipo do Evento</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Selecione...</option>
              <option value="PALESTRA">Palestra</option>
              <option value="REUNIAO">Reunião</option>
              <option value="AULA">Aula</option>
              <option value="OFICINA">Oficina</option>
              <option value="OUTRO">Outro</option>
            </select>
            {apiErrors.tipo && <p className="text-red-500 text-sm">{apiErrors.tipo}</p>}
          </div>

          {/* Local */}
          <div>
            <label className="text-gray-900">Local</label>
            <input
              type="text"
              name="local"
              value={form.local}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            {apiErrors.local && <p className="text-red-500 text-sm">{apiErrors.local}</p>}
          </div>

          {/* Datas */}
          <div>
            <label className="text-gray-900">Data de Início</label>
            <input
              type="datetime-local"
              name="dataInicio"
              value={form.dataInicio}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            {apiErrors.dataInicio && (
              <p className="text-red-500 text-sm">{apiErrors.dataInicio}</p>
            )}
          </div>

          <div>
            <label className="text-gray-900">Data Final</label>
            <input
              type="datetime-local"
              name="dataFinal"
              value={form.dataFinal}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            {apiErrors.dataFinal && (
              <p className="text-red-500 text-sm">{apiErrors.dataFinal}</p>
            )}
          </div>

          {/* Links */}
          <div>
            <label className="text-gray-900">Link do Evento (opcional)</label>
            <input
              type="text"
              name="linkEvento"
              value={form.linkEvento}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-gray-900">Link da Imagem (opcional)</label>
            <input
              type="text"
              name="linkImagem"
              value={form.linkImagem}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white bg-opacity-70 text-gray-900 mt-1 border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-blue-300 hover:bg-blue-200 transition p-3 rounded-xl font-bold mt-4 text-gray-900 shadow-md"
          >
            Criar Evento
          </button>
        </form>
      </div>
    </div>
  );
}
