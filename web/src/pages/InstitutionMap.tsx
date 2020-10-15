import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import api from '../services/api';
import mapIcon from '../utils/mapIcon';
import '../styles/pages/institution-map.css';

interface Institution {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  useEffect(() => {
    api.get('institution').then(res => {
      setInstitutions(res.data);
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha uma instituição no mapa</h2>
          <p>Muitas pessoas estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Bernardo do Campo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.749716, -46.5837066]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {institutions.map(institution => {
          return (
            <Marker
              key={institution.id}
              icon={mapIcon}
              position={[institution.latitude, institution.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {institution.name}
                <Link to={`/institutions/${institution.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/institutions/create" className="create-institution">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap