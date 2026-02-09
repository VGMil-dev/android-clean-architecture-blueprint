
import React from 'react';
import BaseArchitectureDiagram, { type DiagramStep } from '../common/BaseArchitectureDiagram';
import { Database, Key, Send, Cloud, Smartphone, Zap } from 'lucide-react';

/**
 * 0401 - Notifications Architecture Diagram
 * Standards compliant (BaseArchitectureDiagram engine)
 */

const notificationSteps: DiagramStep[] = [
    {
        title: "1. El Disparador",
        description: "Supabase detecta un evento (Postgres Trigger) e inicia el flujo Push.",
        icon: <Database size={20} />
    },
    {
        title: "2. Firma y Auth",
        description: "Expo usa credenciales (.p8 / Service Account) para firmar hacia Apple/Google.",
        icon: <Key size={20} />
    },
    {
        title: "3. Gateway Expo",
        description: "Expo Push Service procesa y enruta el mensaje a los servicios nativos.",
        icon: <Send size={20} />
    },
    {
        title: "4. Entrega Nativa",
        description: "APNs (iOS) y FCM (Android) entregan la notificación al dispositivo.",
        icon: <Cloud size={20} />
    },
    {
        title: "5. Config Nivel App",
        description: "EAS Build y google-services.json vinculan el mensaje con tu código.",
        icon: <Zap size={20} />
    },
    {
        title: "6. Recepción Final",
        description: "La App recibe el dato y muestra el feedback visual al usuario.",
        icon: <Smartphone size={20} />
    },
];

export default function ArchitectureDiagram() {
    return (
        <BaseArchitectureDiagram
            steps={notificationSteps}
            mobileHeight="950px"
            desktopHeight="600px"
        />
    );
}
