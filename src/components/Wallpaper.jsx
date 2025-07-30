import React from 'react';
import '@google/model-viewer';

const colores = [
  '#DA2727', // Rojo
  '#FC626E', // Toronja
  '#E1B104', // Amarillo
  '#FF6745', // Naranja
  '#007B3E', // Verde
];

const modelos3d = [
  'rueda3d.glb',
  'sombrero3d.glb',
  'corazon.glb',
  'coa3d.glb',
  'planta3d.glb',
];

const posiciones = [
  'top-5 left-10',
  'top-25 right-5',
  'bottom-10 left-10',
  'bottom-25 right-10',
  'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
];

const Wallpaper = ({ pagina, children }) => {
  const color = colores[(pagina - 1) % colores.length];

  const modeloActual = modelos3d[(pagina - 1) % modelos3d.length];
  const modelosParaPagina = Array(5).fill(modeloActual);

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Modelos 3D repetidos */}
      {modelosParaPagina.map((modelo, index) => (
        <model-viewer
          key={index}
          src={`/Coa/models/${modelo}`}
          auto-rotate
          interaction-prompt="none"
          camera-controls
          disable-zoom
          alt={`Modelo ${index}`}
          className={`absolute w-28 h-28 ${posiciones[index % posiciones.length]} z-0 pointer-events-none`}
        ></model-viewer>
      ))}

      {/* Contenido principal encima */}
      <div className="relative z-10 p-8 my-20">
        {children}
      </div>
    </div>
  );
};

export default Wallpaper;
