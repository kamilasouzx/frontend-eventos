"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "./components/TopBar";
import MiniCalendar from "./components/MiniCalendar";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [eventos, setEventos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [mensagem, setMensagem] = useState(""); // só mensagem de sucesso

  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/evento");
        setEventos(res.data || []);
      } catch (err) {
        console.error("Erro ao buscar eventos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEventos();
  }, []);

  const handleInscrever = async (evento) => {
    const usuarioId = localStorage.getItem("id");

    if (!usuarioId) {
      alert(`Inscrição realizada no evento: ${evento.nome}`);
      return;
    }

  };

  const destaque = eventos.length > 0 ? eventos[0] : null;
  const eventosSemDestaque = destaque ? eventos.slice(1) : eventos;

  const eventosDoDia = (data) => {
    return eventos.filter((ev) => {
      if (!ev.dataInicio) return false;

      const [dataStr, horaStr] = ev.dataInicio.split(" ");
      const [dia, mes, ano] = dataStr.split("/");

      const dataEv = new Date(`${ano}-${mes}-${dia}T${horaStr || "00:00"}:00`);

      return (
        dataEv.getDate() === data.getDate() &&
        dataEv.getMonth() === data.getMonth() &&
        dataEv.getFullYear() === data.getFullYear()
      );
    });
  };

  const baseDate = selectedDate || new Date();
  const dias = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i + offset);
    return d;
  });

  const grupos4 = [];
  for (let i = 0; i < eventosSemDestaque.length; i += 4) {
    grupos4.push(eventosSemDestaque.slice(i, i + 4));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xl">
        Carregando eventos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white relative pb-20">
      <TopBar />

      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto p-6">
        <div className="h-20" />

        {/* Mensagem de sucesso */}
        {mensagem && (
          <p className="bg-green-600 text-white p-2 mb-4 rounded text-center font-bold animate-pulse">
            {mensagem}
          </p>
        )}

        {destaque && (
          <div className="bg-slate-800 rounded-2xl p-6 mb-10 shadow-xl border border-slate-700 relative">
            <img
              src={destaque.linkImagem || "/fallback.jpg"}
              alt={destaque.nome}
              className="w-full h-72 object-cover rounded-xl shadow-lg"
            />

            <h1 className="text-3xl font-bold mt-4 text-white">
              {destaque.nome}
            </h1>

            <p className="text-slate-300 mt-2">{destaque.descricao}</p>

            <div className="flex items-center gap-4 mt-4 text-white">
              <div>{destaque.dataInicio} → {destaque.dataFinal}</div>
              <div>{destaque.local}</div>
            </div>

            {/* Botão destaque no canto inferior direito */}
            <button
              onClick={() => handleInscrever(destaque)}
              className="w-1/6 absolute bottom-6 right-6 gap-2 bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 p-3 rounded-xl font-bold transition shadow-md text-white"
            >
              Inscreva-se
            </button>
          </div>
        )}

        <h2 className="text-xl font-semibold mt-10 mb-4">Todos os eventos</h2>

        { grupos4.map((grupo, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6">
            {grupo.map((ev) => (
              <div key={ev.id} className="bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700">
                <img
                  src={ev.linkImagem || "/fallback.jpg"}
                  alt={ev.nome}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h3 className="font-bold text-lg text-white">{ev.nome}</h3>
                <p className="text-slate-300 text-sm">{ev.local}</p>
                <p className="text-slate-400 text-sm">{ev.dataInicio}</p>

                <button
                  onClick={() => handleInscrever(ev)}
                  className="mt-1 w-full gap-2 bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 p-2 rounded-xl font-bold transition shadow-md text-white"
                >
                  Inscreva-se
                </button>
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CalendarDays size={24} className="text-white" />
            Agenda de Eventos
          </h2>

          <MiniCalendar
            onSelect={(d) => {
              setSelectedDate(d);
              setOffset(0);
            }}
          />
        </div>

        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => setOffset((o) => o - 1)}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600"
          >
            <ChevronLeft className="text-white" />
          </button>

          <div className="grid grid-cols-6 gap-3 flex-1">
            {dias.map((dia, idx) => {
              const lista = eventosDoDia(dia);

              return (
                <div key={idx} className="bg-slate-800 rounded-xl p-3 border border-slate-700 shadow-lg">
                  <div className="text-lg font-semibold text-white">
                    {dia.getDate()}/{dia.getMonth() + 1}
                  </div>

                  {lista.length > 0 ? (
                    lista.map((ev) => (
                      <div key={ev.id} className="mt-2 text-sm">
                        <div className="font-bold text-white">{ev.nome}</div>
                        <div className="text-slate-300">{ev.local}</div>
                        <div className="text-slate-400">{ev.dataInicio}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 mt-2">Sem eventos</p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setOffset((o) => o + 1)}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
