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

  const destaque = eventos.length > 0 ? eventos[0] : null;

  const eventosDoDia = (data) => {
    return eventos.filter((ev) => {
      if (!ev.dataInicio) return false;

      const [dia, mes, anoHora] = ev.dataInicio.split("/");
      const [ano] = anoHora.split(" ");
      const dataEv = new Date(`${ano}-${mes}-${dia}`);

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

      {/* FUNDO LEVEMENTE ROXO */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/10 to-slate-900 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto p-6">
        <div className="h-20" />

        {/* EVENTO EM DESTAQUE */}
        {destaque && (
          <div className="bg-slate-800 rounded-2xl p-6 mb-10 shadow-xl border border-slate-700">
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
              <div>
                {destaque.dataInicio} → {destaque.dataFinal}
              </div>
              <div>{destaque.local}</div>
            </div>

            {destaque.linkEvento && (
              <a
                href={destaque.linkEvento}
                target="_blank"
                className="inline-block mt-4 bg-white hover:bg-slate-200 transition px-4 py-2 rounded-xl shadow-lg text-black font-semibold"
              >
                Acessar Evento
              </a>
            )}
          </div>
        )}

        {/* AGENDA */}
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

        {/* CARDS DE DIAS */}
        <div className="flex items-center gap-3 mb-10">
          {/* ESQUERDA */}
          <button
            onClick={() => setOffset((o) => o - 1)}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600"
          >
            <ChevronLeft className="text-white" />
          </button>

          {/* CARDS */}
          <div className="grid grid-cols-6 gap-3 flex-1">
            {dias.map((dia, idx) => {
              const lista = eventosDoDia(dia);

              return (
                <div
                  key={idx}
                  className="bg-slate-800 rounded-xl p-3 border border-slate-700 shadow-lg"
                >
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

          {/* DIREITA */}
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
