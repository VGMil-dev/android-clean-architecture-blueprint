
import React from 'react';
import BaseArchitectureDiagram, { type DiagramStep } from '../common/BaseArchitectureDiagram';
import { Smartphone, Layout, Globe, Server, Satellite, Zap } from 'lucide-react';

/**
 * 0403 - OSM Maps Architecture Diagram
 * Standards compliant (BaseArchitectureDiagram engine)
 */

const osmMapSteps: DiagramStep[] = [
    {
        title: "1. Pantalla React Native",
        description: "Envía props (centro, zoom) al wrapper del mapa.",
        icon: <Smartphone size={20} />
    },
    {
        title: "2. Wrapper (MapaLeaflet)",
        description: "Genera el HTML con Leaflet.js y lo inyecta al WebView.",
        icon: <Layout size={20} />
    },
    {
        title: "3. El Puente (Bridge)",
        description: "Comunica eventos del WebView (clics) hacia React Native via postMessage.",
        icon: <Zap size={20} />
    },
    {
        title: "4. Motor Leaflet.js",
        description: "Ejecuta en el WebView. Calcula qué áreas del mapa mostrar.",
        icon: <Globe size={20} />
    },
    {
        title: "5. Servidor de Tiles",
        description: "OpenStreetMap entrega los mosaicos de imagen {z}/{x}/{y}.",
        icon: <Server size={20} />
    },
    {
        title: "6. Sensores (GPS)",
        description: "expo-location obtiene coordenadas de satélites para el tracking.",
        icon: <Satellite size={20} />
    },
];

export default function MapArchitectureDiagram() {
    return (
        <BaseArchitectureDiagram
            steps={osmMapSteps}
            mobileHeight="950px"
            desktopHeight="600px"
        />
    );
}
