
import React from 'react';
import BaseArchitectureDiagram, { type DiagramStep } from '../common/BaseArchitectureDiagram';
import { Layout, QrCode, CreditCard, ShieldCheck, Zap, Rocket } from 'lucide-react';

/**
 * 0402 - Final Project Checklist Diagram
 * Visualizes the key milestones to graduate from the module.
 */

const checklistSteps: DiagramStep[] = [
    {
        title: "1. UI Flow",
        description: "Layout limpio con navegación fluida usando expo-router.",
        icon: <Layout size={20} />
    },
    {
        title: "2. QR Scanner",
        description: "Integración de Cámara para leer códigos y extraer IDs.",
        icon: <QrCode size={20} />
    },
    {
        title: "3. Checkout",
        description: "Lógica de pago (mock) simulando el ciclo token-intent.",
        icon: <CreditCard size={20} />
    },
    {
        title: "4. Seguridad",
        description: "Manejo de errores y validaciones (3DS mock / fondos).",
        icon: <ShieldCheck size={20} />
    },
    {
        title: "5. Notificación",
        description: "Feedback visual inmediato tras el éxito de la transacción.",
        icon: <Zap size={20} />
    },
    {
        title: "6. Deploy",
        description: "Proyecto modular, limpio y listo para el portafolio real.",
        icon: <Rocket size={20} />
    },
];

export default function FinalProjectDiagram() {
    return (
        <BaseArchitectureDiagram
            steps={checklistSteps}
            mobileHeight="900px"
            desktopHeight="650px"
        />
    );
}
