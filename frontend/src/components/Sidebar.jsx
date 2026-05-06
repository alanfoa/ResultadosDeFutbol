import { useState, useEffect } from 'react';
import { partidosService } from '../services/partidosService';
import './Sidebar.css';

function Sidebar({ onSelectLiga }) {
  const [ligas, setLigas] = useState([]);

  useEffect(() => {
    const fetchLigas = async () => {
      try {
        const response = await partidosService.getLigas();
        setLigas(response.data);
      } catch (error) {
        console.error('Error fetching ligas:', error);
      }
    };
    fetchLigas();
  }, []);

  return (
    <aside className="sidebar">
      <h2>Ligas</h2>
      <ul className="ligas-list">
        {ligas.map(liga => (
          <li key={liga.id} onClick={() => onSelectLiga(liga.id)}>
            {liga.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
