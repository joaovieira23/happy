import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import '../styles/pages/institution.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Institution {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  // images: {
  //   url: string
  // }[];
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface InstitutionParams {
  id: string;
}

export default function Institution() {
  const params = useParams<InstitutionParams>();
  const [institution, setInstitution] = useState<Institution>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`institution/${params.id}`).then(res => {
      setInstitution(res.data);
    })
  }, [params.id])

  if (!institution) {
    return <p>Carregando</p>
  }
  return (
    <div id="page-institution">
      <Sidebar />

      <main>
        <div className="institution-details">
          <img src={institution.images[activeImageIndex].url} alt={institution.name} />

          <div className="images">
            {institution.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={institution.name} />
                </button>
              )
            })}
          </div>

          <div className="institution-details-content">
            <h1>{institution.name}</h1>
            <p>{institution.about}</p>

            <div className="map-container">
              <Map
                center={[institution.latitude, institution.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[institution.latitude, institution.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${institution.latitude},${institution.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{institution.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {institution.opening_hours}
              </div>
              {institution.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
                  </div>
                )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}