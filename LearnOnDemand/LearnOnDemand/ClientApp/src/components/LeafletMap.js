
import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from "leaflet"
import '../styles/map.css'

const LeafletMap = ({location}) => {
    const position = location.latitude ? [location.latitude, location.longitude] : [0,0]
    const marker = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        iconSize: [15, 20],
        iconAnchor: [8, 18]
    })

    return (
        <Map style={{height:"100%"}} center={position} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                icon={marker}
                position={position}>
                <Popup>
                    <div>
                        <div>Your Location:</div>
                        <div>{location.city}, {location.region_name}</div>
                    </div>
                </Popup>
            </Marker>
        </Map>
    )
}

export default LeafletMap;