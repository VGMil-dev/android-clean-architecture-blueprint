
import React from 'react';
import BaseArchitectureDiagram, { type DiagramStep } from '../common/BaseArchitectureDiagram';
import { Camera, Activity, Cpu, Code, CheckCircle } from 'lucide-react';

const qrFlowSteps: DiagramStep[] = [
    {
        title: "Inicio: Cámara",
        description: "Activación del sensor y stream de video en tiempo real.",
        icon: <Camera size={20} />
    },
    {
        title: "Análisis de Buffer",
        description: "El motor de IA busca patrones (cuadrados/líneas) en cada frame.",
        icon: <Activity size={20} />
    },
    {
        title: "Decodificación",
        description: "Transformación de bits visuales en un String legible (URL, ID, JSON).",
        icon: <Cpu size={20} />
    },
    {
        title: "Lógica de App",
        description: "hook onBarCodeScanned recibe el dato y ejecuta la acción.",
        icon: <Code size={20} />
    },
    {
        title: "Feedback UI",
        description: "Confirmación visual/háptica para cerrar el ciclo del usuario.",
        icon: <CheckCircle size={20} />
    },
];

export default function QRArchitectureDiagram() {
    return (
        <BaseArchitectureDiagram
            steps={qrFlowSteps}
            mobileHeight="850px"
            desktopHeight="500px"
        />
    );
}
