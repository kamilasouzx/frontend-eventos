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
  const [erro, setErro] = useState({}); // validação visual

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErro({ ...erro, [name]: false }); // remove erro quando usuário digita
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiErrors({});
    setSuccess("");

    // Validação front-end
    let novoErro = {};
    if (!form.nome) novoErro.nome = true;
    if (!form.tipo) novoErro.tipo = true;
    if (!form.descricao) novoErro.descricao = true;
    if (!form.local) novoErro.local = true;
    if (!form.dataInicio) novoErro.dataInicio = true;
    if (!form.dataFinal) novoErro.dataFinal = true;

    if (Object.keys(novoErro).length > 0) {
      setErro(novoErro);
      return; // impede envio
    }

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
      setErro({});
    } catch (err) {
      if (err.response?.data?.errors) {
        setApiErrors(err.response.data.errors);
      } else {
        alert("Erro ao criar evento");
      }
    }
  }

  return (
    <div className="min-h-screen relative flex justify-center items-start pt-21 px-10 bg-slate-900 text-white">
      <div className="w-full max-w-2xl bg-indigo-300/50 p-6 rounded-xl shadow-xl backdrop-blur-md border border-slate-700/30">
        <h1 className="text-2xl font-bold mb-5 text-white text-center">Criar Novo Evento</h1>

        {success && (
          <p className="bg-green-700 text-white p-2 rounded mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">

          {/* --- Linha: Nome | Tipo --- */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-white">
                Nome {erro.nome && <span className="text-red-500 text-xl">*</span>}
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Digite o nome do evento"
                className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
              />
            </div>

            <div>
              <label className="text-white">
                Tipo do Evento {erro.tipo && <span className="text-red-500 text-xl">*</span>}
              </label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
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
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="text-white">
              Descrição {erro.descricao && <span className="text-red-500 text-xl">*</span>}
            </label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Digite a descrição"
              className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
            />
          </div>

          {/* --- Linha: Local | Link Evento --- */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-white">
                Local {erro.local && <span className="text-red-500 text-xl">*</span>}
              </label>
              <input
                type="text"
                name="local"
                value={form.local}
                onChange={handleChange}
                placeholder="Digite o local"
                className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
              />
            </div>

            <div>
              <label className="text-white">Link do Evento (Opcional)</label>
              <input
                type="text"
                name="linkEvento"
                value={form.linkEvento}
                onChange={handleChange}
                className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
              />
            </div>
          </div>

          {/* --- Linha: Data Início | Data Final --- */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-white">
                Data de Início {erro.dataInicio && <span className="text-red-500 text-xl">*</span>}
              </label>
              <input
                type="datetime-local"
                name="dataInicio"
                value={form.dataInicio}
                onChange={handleChange}
                placeholder="Escolha a data e hora de início"
                className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
              />
            </div>

            <div>
              <label className="text-white">
                Data Final {erro.dataFinal && <span className="text-red-500 text-xl">*</span>}
              </label>
              <input
                type="datetime-local"
                name="dataFinal"
                value={form.dataFinal}
                onChange={handleChange}
                placeholder="Escolha a data e hora de término"
                className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
              />
            </div>
          </div>

          {/* Link da Imagem */}
          <div>
            <label className="text-white">Link da Imagem (Opcional)</label>
            <input
              type="text"
              name="linkImagem"
              value={form.linkImagem}
              onChange={handleChange}
              className="w-full p-3 rounded bg-indigo-900/50 text-white mt-1 border border-slate-700"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full mt-4 p-4 rounded-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 text-white shadow-md transition"
          >
            Criar Evento
          </button>
        </form>
      </div>
    </div>
  );
}
