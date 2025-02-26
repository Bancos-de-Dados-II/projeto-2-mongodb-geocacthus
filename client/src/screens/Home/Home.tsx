import { useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "./home.css"

import touristServices, { ITouristLocationBase } from "../../service/touristPlaceService"
import Header from "../../components/Header/Header";
import { useFetchOnce } from "../../hooks/useFetchOnce";
import ReviewList from "../../components/Review/ReviewList";

function Home() {
    const [touristLocations, setTouristLocations] = useState<ITouristLocationBase[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<ITouristLocationBase | null>(null);

    useFetchOnce(async () => {
        try {
            const locations = await touristServices.fetchTouristLocations();
            if (locations) setTouristLocations(locations);
        } catch (error) {
            console.log("Erro ao buscar locais turisticos" + (error as Error).message);
        }
    })

    return (
        <div className="home-container">
            <Header />
            <div className="content-main">
                <div className="box-info">
                    {selectedLocation ? (
                        <div className="info-card">
                            <h2 className="location-title">{selectedLocation.name}</h2>

                            <div className="image-container">
                                <img src={selectedLocation.image} alt={selectedLocation.name} />
                            </div>
                            
                            <p className="location-description">{selectedLocation.description}</p>

                            <div className="extra-details">
                                <p><strong>Telefone:</strong> {selectedLocation.phone}</p>
                            </div>

                            <div className="camp-reviews">
                                <h3>Reviews</h3>
                                <ReviewList locationId={selectedLocation.id} />
                            </div>
                        </div>
                    ) : (
                        <h2>Seja bem-vindo ao nosso site de turismo!</h2>
                    )}
                </div>

                <div className="box-map">
                    <MapContainer
                        center={[-7.135, -34.876]}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {touristLocations.map((location) => (
                            <Marker
                                key={location.id}
                                position={location.position}
                                eventHandlers={{
                                    click: () => {
                                        setSelectedLocation(location);
                                    }
                                }}
                            >
                                <Popup>
                                    <strong>{location.name}</strong>
                                    <br />
                                    {location.description}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default Home