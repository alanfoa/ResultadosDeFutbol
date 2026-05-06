import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { partidosService } from '../services/partidosService';
import './LigaDetail.css';

function LigaDetail() {
  const { id } = useParams();
  const [liga, setLiga] = useState(null);
  const [tabla, setTabla] = useState([]);
  const [goleadores, setGoleadores] = useState([]);
  const [asistidores, setAsistidores] = useState([]);
  const [amarillas, setAmarillas] = useState([]);
  const [activeTab, setActiveTab] = useState('tabla');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ligaRes, tablaRes, golesRes, asistRes, amarillasRes] = await Promise.all([
          partidosService.getLigas(),
          partidosService.getTablaPosicion(id),
          partidosService.getGoleadores(id),
          partidosService.getAsistidores(id),
          partidosService.getAmarillas(id)
        ]);
        const ligaData = ligaRes.data.find(l => l.id === parseInt(id));
        setLiga(ligaData);
        setTabla(tablaRes.data);
        setGoleadores(golesRes.data);
        setAsistidores(asistRes.data);
        setAmarillas(amarillasRes.data);
      } catch (error) {
        console.error('Error fetching liga data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="liga-detail">
      <h1>{liga?.nombre}</h1>
      <div className="tabs">
        <button className={activeTab === 'tabla' ? 'active' : ''} onClick={() => setActiveTab('tabla')}>Tabla</button>
        <button className={activeTab === 'fixture' ? 'active' : ''} onClick={() => setActiveTab('fixture')}>Fixture</button>
        <button className={activeTab === 'goleadores' ? 'active' : ''} onClick={() => setActiveTab('goleadores')}>Goleadores</button>
        <button className={activeTab === 'asistidores' ? 'active' : ''} onClick={() => setActiveTab('asistidores')}>Asistidores</button>
        <button className={activeTab === 'amarillas' ? 'active' : ''} onClick={() => setActiveTab('amarillas')}>Amarillas</button>
      </div>

      {activeTab === 'tabla' && (
        <section className="tabla-posicion">
          <h2>Tabla de Posiciones</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>G</th>
                <th>E</th>
                <th>P</th>
                <th>GF</th>
                <th>GC</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {tabla.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.equipo?.nombre}</td>
                  <td>{item.pj}</td>
                  <td>{item.g}</td>
                  <td>{item.e}</td>
                  <td>{item.p}</td>
                  <td>{item.gf}</td>
                  <td>{item.gc}</td>
                  <td><strong>{item.puntos}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === 'goleadores' && (
        <section className="goleadores">
          <h2>Goleadores</h2>
          <table>
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>Goles</th>
              </tr>
            </thead>
            <tbody>
              {goleadores.map(jugador => (
                <tr key={jugador.id}>
                  <td>{jugador.jugador?.nombre}</td>
                  <td>{jugador.equipo?.nombre}</td>
                  <td>{jugador.goles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === 'asistidores' && (
        <section className="asistidores">
          <h2>Asistidores</h2>
          <table>
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>Asistencias</th>
              </tr>
            </thead>
            <tbody>
              {asistidores.map(jugador => (
                <tr key={jugador.id}>
                  <td>{jugador.jugador?.nombre}</td>
                  <td>{jugador.equipo?.nombre}</td>
                  <td>{jugador.asistencias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === 'amarillas' && (
        <section className="amarillas">
          <h2>Amonestados</h2>
          <table>
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>Tarjetas</th>
              </tr>
            </thead>
            <tbody>
              {amarillas.map(jugador => (
                <tr key={jugador.id}>
                  <td>{jugador.jugador?.nombre}</td>
                  <td>{jugador.equipo?.nombre}</td>
                  <td>{jugador.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === 'fixture' && (
        <section className="fixture">
          <h2>Fixture</h2>
          <p>Próximamente...</p>
        </section>
      )}
    </div>
  );
}

export default LigaDetail;
