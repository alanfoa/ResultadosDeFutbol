import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { partidosService } from '../services/partidosService';
import './Sidebar.css';

function Sidebar() {
  const [ligas, setLigas] = useState([]);
  const navigate = useNavigate();

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

  const handleSelectLiga = (ligaId) => {
    navigate(`/liga/${ligaId}`);
  };

  return (
    <aside className="sidebar">
      <h2>Ligas</h2>
      <ul className="ligas-list">
        {ligas.map(liga => (
          <li key={liga.id} onClick={() => handleSelectLiga(liga.id)}>
            {liga.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
