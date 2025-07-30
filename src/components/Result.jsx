import React, { useEffect, useState } from 'react';
import '@google/model-viewer';

function Result() {
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [personalidad, setPersonalidad] = useState('');
  const [color, setColor] = useState('');
  const [modelo, setModelo] = useState(0); // Usamos este índice para fondo y modelo principal

  useEffect(() => {
    const respuestas = JSON.parse(localStorage.getItem('respuestas') || '{}');
    const valores = Object.values(respuestas);

    const suma = valores.reduce((acc, val) => acc + val, 0);
    setTotal(suma);

    const conteo = {};
    for (let val of valores) {
      conteo[val] = (conteo[val] || 0) + 1;
    }

    const valorMayor = Object.entries(conteo).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    const valor = parseInt(valorMayor);
    setModelo(valor - 1); // Valores van del 1 al 5, índices del 0 al 4

    let resultado = '';
    let personalidad = '';
    let color = '';
    switch (valor) {
      case 1:
        personalidad = 'Mousse de Tequila con Jamaica - La Alma Tropical'
        resultado = '🌺 Personalidad: Alegre, expresiva, cálida. Esta persona irradia energía positiva. Le encanta bailar, hablar con todos en la fiesta y siempre tiene un comentario gracioso o alentador. Es el alma del grupo, alguien que se adapta a cualquier ambiente y que combina la tradición con un toque atrevido. Como la flor de jamaica: suave, pero inolvidable';
        color = '#DA2727'
        break;
      case 2:
        personalidad = 'Mousse de Tequila con Frutos Rojos - La Romántica Intensa'
        resultado = '🍓 Personalidad: Dulce, emocional, sensible. Es alguien con mucha profundidad emocional. Romántica empedernida, observadora y cariñosa. Disfruta los pequeños detalles, las charlas largas y las conexiones reales. Puede parecer tranquila, pero tiene una intensidad encantadora. Como los frutos rojos: dulce con un toquecito ácido.';
        color = '#007B3E'
        break;
      case 3:
        personalidad = 'Mousse de Tequila con Toronja – La Intensa Energética'
        resultado = '🍊 Personalidad: Apasionada, audaz, valiente. Nada la detiene. Siempre va directo al grano, no le teme al riesgo y contagia con su impulso. Es el tipo de persona que prueba lo que nadie se atreve, que se ríe fuerte y que inspira movimiento. Como la toronja: un golpe de sabor que despierta todos los sentidos.';
        color = '#FC626E'
        break;
      case 4:
        personalidad = 'Mousse de Tequila con Naranja – La Relajada con Estilo'
        resultado = '🍊 Personalidad: Fresca, práctica, sociable. Tiene una vibra ligera y agradable. Sabe disfrutar sin complicarse. Siempre tiene una solución, un plan o una sonrisa lista. Es equilibrada, confiable y contagia calma con solo estar. Como la naranja: jugosa, brillante y buena compañía.';
        color = '#FF6745'
        break;
      case 5:
        personalidad = 'Mousse “La Coa” – La Misteriosa y Atrevida (edición especial)'
        resultado = '🐍 Personalidad: Enigmática, creativa, fuera de lo común. No se define fácilmente. Tiene un aire intrigante, ideas raras pero brillantes, y siempre sorprende. Es esa persona que no sigue la receta, que crea sus propios caminos y que todos quieren conocer mejor. Como el mousse edición limitada: una mezcla inesperada que encanta.';
        color = '#E1B104'
        break;
      default:
        resultado = 'No hay suficientes respuestas para determinar tu mousse ideal.';
    }

    setMensaje(resultado);
    setPersonalidad(personalidad);
    setColor(color)
  }, []);

  return (
    <div className='min-h-screen w-full relative overflow-hidden p-5'
      style={{ backgroundColor: color }}
    >
      <div className="max-w-md mx-auto p-6 backdrop-blur-md bg-white/30 shadow-xl rounded-xl text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-white">¡Resultados!</h2>
        <h2 className="text-xl font-bold mb-4 text-white">Felicidades eres:</h2>

        {/* Modelo 3D principal */}
        <model-viewer
          src={`/models/${['rueda3d.glb', 'planta3d.glb', 'sombrero3d.glb', 'corazon.glb', 'coa3d.glb'][modelo]}`}
          alt="Resultado"
          auto-rotate
          camera-controls
          interaction-prompt="none"
          disable-zoom
          className="w-full h-64 mx-auto"
        ></model-viewer>
        
        <h2 className='text-white font-semibold text-xl'>{personalidad}</h2>
        {/* Resultado textual */}
        <p className="text-white mt-4 whitespace-pre-line text-justify">{mensaje}</p>
      </div>
    </div>
  );
}

export default Result;
