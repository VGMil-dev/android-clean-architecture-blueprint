
import React from 'react';
import BaseArchitectureDiagram, { type DiagramStep } from '../common/BaseArchitectureDiagram';
import { Camera, Radio, Share2, Rocket } from 'lucide-react';

/**
 * 0402 - Observer Pattern Diagram for Camera Scanner
 */
const ObserverPatternDiagram: React.FC = () => {
    const steps: DiagramStep[] = [
        {
            title: 'Detección',
            description: 'El hardware procesa los frames buscando patrones (QR/Barras).',
            icon: <Camera className="w-6 h-6" />,
        },
        {
            title: 'Emisión Nativa',
            description: 'Expo emite el evento onBarcodeScanned con el valor del código.',
            icon: <Radio className="w-6 h-6" />,
        },
        {
            title: 'Filtro / Puente',
            description: 'CameraScanner recibe el dato y lo propaga mediante onDataDetected.',
            icon: <Share2 className="w-6 h-6" />,
        },
        {
            title: 'Acción Final',
            description: 'El Screen (Observador) recibe el dato y dispara la lógica (Pagos).',
            icon: <Rocket className="w-6 h-6" />,
        }
    ];

    return (
        <BaseArchitectureDiagram
            steps={steps}
            intervalDelay={4000}
        />
    );
};

export default ObserverPatternDiagram;
