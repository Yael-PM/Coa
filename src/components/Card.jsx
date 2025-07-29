import React, { useState } from 'react';
import Wallpaper from './Wallpaper';

function Card({ preguntas, respuestas }) {
    const [paginaActual, setPaginaActual] = useState(1);
    const [seleccionadas, setSeleccionadas] = useState(() => {
        const guardadas = localStorage.getItem('respuestas');
        return guardadas ? JSON.parse(guardadas) : {};
    });

    const totalPaginas = preguntas.length;
    const preguntaActual = preguntas[paginaActual - 1];
    const respuestasActuales = respuestas.filter(r => r.preguntaId === preguntaActual.id);

    const handleSeleccion = (respuesta) => {
        const nuevas = {
            ...seleccionadas,
            [preguntaActual.id]: respuesta.puntos
        };
        setSeleccionadas(nuevas);
        localStorage.setItem('respuestas', JSON.stringify(nuevas));
    };

    const handleSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(p => p + 1);
        } else {
            window.location.href = '/resultado';
        }
    };

    const handleAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(p => p - 1);
        }
    };

    const progreso = (paginaActual / totalPaginas) * 100;

    return (
        <Wallpaper pagina={paginaActual}>
            <div className="max-w-md mx-auto p-6 relative">

                {/* Barra de progreso */}
                <div className="w-full h-4 bg-white/10 backdrop-blur-md rounded-full overflow-hidden mb-4 shadow-inner border border-white/20">
                    <div
                        className="h-full bg-gradient-to-r from-white/40 to-white/70 transition-all duration-300"
                        style={{ width: `${progreso}%` }}
                    ></div>
                </div>

                {/* Card con efecto Glassmorphism */}
                <div className="p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <h2 className="text-xl font-bold text-white mb-4">{preguntaActual.pregunta}</h2>

                    <div className="space-y-2 text-white">
                        {respuestasActuales.map(respuesta => (
                            <div key={respuesta.id}>
                                <input
                                    type="radio"
                                    id={`respuesta-${respuesta.id}`}
                                    name="respuesta"
                                    value={respuesta.puntos}
                                    checked={seleccionadas[preguntaActual.id] === respuesta.puntos}
                                    onChange={() => handleSeleccion(respuesta)}
                                    className="to-blue-400"
                                />
                                <label htmlFor={`respuesta-${respuesta.id}`} className="ml-2 text-sm">
                                    {respuesta.texto}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-between mt-6">
                    {paginaActual > 1 && (
                        <button onClick={handleAnterior} className="px-4 py-2 bg-white/20 text-white rounded-xl backdrop-blur-sm border border-white/30 cursor-pointer">
                            Anterior
                        </button>
                    )}
                    <button
                        onClick={handleSiguiente}
                        className="px-4 py-2 bg-blue-500/80 text-white rounded-xl backdrop-blur-sm border border-white/30 cursor-pointer"
                    >
                        {paginaActual === totalPaginas ? 'Finalizar' : 'Siguiente'}
                    </button>
                </div>
            </div>
        </Wallpaper>
    );
}

export default Card;
