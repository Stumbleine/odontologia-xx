import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

export default function MapView() {
	const position = [-17.393862599382608, -66.14674424552783];

	return (
		<MapContainer
			style={{
				height: '100%',
				width: '100%',
				borderRadius: 15,
			}}
			center={position}
			zoom={13}
			scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker
				position={position}
				icon={
					new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })
				}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
}
