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

  // Controle dos 6 cards navegáveis
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
  const miniaturas = eventos.slice(1);

  // ----------------------------
  // EVENTOS FILTRADOS PELO MINI CALENDÁRIO
  // ----------------------------
  const eventosFiltrados = selectedDate
    ? eventos.filter((ev) => {
        if (!ev.dataInicio) return false;
        const [dia, mes, anoHora] = ev.dataInicio.split("/");
        const [ano] = anoHora.split(" ");
        const dataEv = new Date(`${ano}-${mes}-${dia}`);

        return (
          dataEv.getDate() === selectedDate.getDate() &&
          dataEv.getMonth() === selectedDate.getMonth() &&
          dataEv.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  // ----------------------------
  // GERAR 6 DIAS A PARTIR DA DATA SELECIONADA OU HOJE
  // ----------------------------

  const baseDate = selectedDate || new Date();

  function getDatePlus(days) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + days);
    return d;
  }

  const diasExibidos = Array.from({ length: 6 }, (_, i) =>
    getDatePlus(i + offset)
  );

  // Busca eventos exatamente no dia da card
  function eventosDoDia(dataAlvo) {
    return eventos.filter((ev) => {
      if (!ev.dataInicio) return false;
      const [dia, mes, anoHora] = ev.dataInicio.split("/");
      const [ano] = anoHora.split(" ");
      const dataEv = new Date(`${ano}-${mes}-${dia}`);

      return (
        dataEv.getDate() === dataAlvo.getDate() &&
        dataEv.getMonth() === dataAlvo.getMonth() &&
        dataEv.getFullYear() === dataAlvo.getFullYear()
      );
    });
  }

  // Navegação
  function prevSet() {
    setOffset((o) => o - 1);
  }
  function nextSet() {
    setOffset((o) => o + 1);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-900 text-white text-xl">
        Carregando eventos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-900 text-white p-6 relative">
      <TopBar />

      <div className="absolute inset-0 bg-gradient-to-b from-cyan-700/30 to-transparent blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="h-20" />

        {/* ===================== EVENTO EM DESTAQUE ===================== */}
        {destaque && (
          <div className="bg-cyan-800/40 shadow-2xl rounded-2xl p-6 mb-10 backdrop-blur-md border border-cyan-600/30">
            <img
              src={destaque.linkImagem || "/fallback.jpg"}
              alt={destaque.nome}
              className="w-full h-72 object-cover rounded-xl shadow-lg"
            />

            <h1 className="text-3xl font-bold mt-4">{destaque.nome}</h1>
            <p className="text-cyan-200 mt-2">{destaque.descricao}</p>

            <div className="flex items-center gap-4 mt-4 text-cyan-300">
              <div>{destaque.dataInicio} → {destaque.dataFinal}</div>
              <div>{destaque.local}</div>
            </div>

            {destaque.linkEvento && (
              <a
                href={destaque.linkEvento}
                target="_blank"
                className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-200 transition px-4 py-2 rounded-xl shadow-lg"
              >
                Acessar Evento
              </a>
            )}
          </div>
        )}

        {/* ===================== AGENDA ===================== */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CalendarDays size={24} /> Agenda de Eventos
          </h2>

          <MiniCalendar onSelect={(d) => {
            setSelectedDate(d);
            setOffset(0); // resetar os cards quando escolher dia
          }} />
        </div>

        {/* ===================== 6 CARDS NAVEGÁVEIS ===================== */}

        <div className="flex items-center gap-3 mb-10">
          {/* ESQUERDA */}
          <button
            onClick={prevSet}
            className="p-2 rounded-full bg-cyan-700 hover:bg-cyan-600 transition"
          >
            <ChevronLeft />
          </button>

          {/* CARDS */}
          <div className="grid grid-cols-6 gap-3 flex-1">
            {diasExibidos.map((dia, idx) => {
              const lista = eventosDoDia(dia);

              return (
                <div
                  key={idx}
                  className="bg-cyan-800/40 rounded-xl p-3 border border-cyan-600/20 shadow-lg backdrop-blur-sm"
                >
                  <div className="text-lg font-semibold text-cyan-200">
                    {dia.getDate()}/{dia.getMonth() + 1}
                  </div>

                  {lista.length > 0 ? (
                    lista.map((ev) => (
                      <div key={ev.id} className="mt-2 text-xs">
                        <div className="font-bold">{ev.nome}</div>
                        <div>{ev.local}</div>
                        <div className="text-cyan-300">{ev.dataInicio}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-cyan-300 mt-2">Sem eventos</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* DIREITA */}
          <button
            onClick={nextSet}
            className="p-2 rounded-full bg-cyan-700 hover:bg-cyan-600 transition"
          >
            <ChevronRight />
          </button>
        </div> 

      </div> 
    </div>   
  );
}
