import { useState, useEffect } from 'react';
import { partidosService } from './services/partidosService';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await partidosService.getPartidosHoy();
        setPartidos(response.data);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
    const interval = setInterval(fetchPartidos, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectLiga = (ligaId) => {
    setLigaSeleccionada(ligaId);
  };

  const handleOpenPartido = (partidoId) => {
    window.open(`/partido/${partidoId}`, '_blank');
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="app">
      <Sidebar onSelectLiga={handleSelectLiga} />
      <main className="content">
        <h1>{ligaSeleccionada ? `Liga ${ligaSeleccionada}` : 'Partidos de Hoy'}</h1>
        <div className="partidos-list">
          {partidos.map(partido => (
            <div key={partido.id} className="partido-card" onClick={() => handleOpenPartido(partido.id)}>
              <div className="equipos">
                <span>{partido.equipoLocal?.nombre}</span>
                <span className="vs">vs</span>
                <span>{partido.equipoVisitante?.nombre}</span>
              </div>
              <div className="resultado">
                {partido.golesLocal} - {partido.golesVisitante}
              </div>
              <div className="estado">{partido.estado}</div>
              {partido.goles?.length > 0 && (
                <div className="goles-franja">
                  {partido.goles.map(gol => (
                    <div key={gol.id} className="gol-item">
                      {gol.jugador?.nombre} {gol.minuto}'
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
