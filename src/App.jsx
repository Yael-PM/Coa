import './index.css'
import preguntas from './question.json'
import respuestas from './answers.json'
import Card from './components/Card'

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center relative">
      {/* Título con Glassmorphism */}
      <div className="absolute top-6 left-38 backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-xl px-6 py-3 text-white text-4xl font-bold z-10">
        COA
      </div>

        <Card preguntas={preguntas} respuestas={respuestas} />
      </div>
  );
}

export default App;
