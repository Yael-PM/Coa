import React, { useEffect, useState } from 'react';

function Result() {
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState('');

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

  useEffect(() => {
    const respuestas = JSON.parse(localStorage.getItem('respuestas') || '{}');
    const valores = Object.values(respuestas);

    // Sumar el total
    const suma = valores.reduce((acc, val) => acc + val, 0);
    setTotal(suma);

    // Contar cuántas veces se repite cada valor
    const conteo = {};
    for (let val of valores) {
      conteo[val] = (conteo[val] || 0) + 1;
    }

    // Obtener el valor más frecuente
    const valorMayor = Object.entries(conteo).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    // Mostrar mensaje dependiendo del valor más repetido
    let resultado = '';
    switch (parseInt(valorMayor)) {
      case 1:
        resultado = 'Mayoría A → Mousse Tequila con Jamaica\nSabores florales y atrevidos para personas divertidas y expresivas.';
        break;
      case 2:
        resultado = 'Mayoría B → Mousse Tequila con Frutos Rojos\nPerfecto para almas sensibles y románticas.';
        break;
      case 3:
        resultado = 'Mayoría C → Mousse Tequila con Toronja\nIdeal para gente energética que ama lo vibrante.';
        break;
      case 4:
        resultado = 'Mayoría D → Mousse Tequila con Naranja\nRefrescante y equilibrado, como tú.';
        break;
      case 5:
        resultado = 'Mayoría E → Mousse edición limitada “La Coa”\nUna experiencia inesperada, para quienes buscan algo único.';
        break;
      default:
        resultado = 'No hay suficientes respuestas para determinar tu mousse ideal.';
    }

    setMensaje(resultado);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">¡Resultados!</h2>
      <p className="text-lg mb-4">Puntos obtenidos: <strong>{total}</strong></p>
      <div className="text-left whitespace-pre-line">{mensaje}</div>
    </div>
  );
}

export default Result;
