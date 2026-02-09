
import React from 'react';
import EvaluationRubric from '../common/EvaluationRubric';

const QRPaymentsRubric = () => {
    const data = [
        {
            criterio: "Integración QR",
            description: "Puerta de entrada al flujo",
            icon: "zap",
            da: "Escaneo instantáneo, haptic feedback y flujo automático perfecto.",
            aa: "Escanea bien pero sin feedback visual/háptico o demora.",
            pa: "Escanea pero tira errores o no navega al terminar.",
            na: "No reconoce códigos o la cámara no levanta."
        },
        {
            criterio: "Payment Flow",
            description: "Gestión de la transacción",
            icon: "shield",
            da: "Ciclo completo (Token/Intent) con estados de carga pro.",
            aa: "Funcional pero sin estados de carga o validación clara.",
            pa: "Solo pantalla de pago, no simula transacción real.",
            na: "El botón de pago no hace nada o crashea la App."
        },
        {
            criterio: "Arquitectura",
            description: "Orden y escalabilidad",
            icon: "boxes",
            da: "Feature-Based perfecta. Lib y App bien separadas.",
            aa: "Modular pero con lógica mezclada en la UI.",
            pa: "Estructura básica, casi todo en un solo archivo.",
            na: "No hay orden, archivos sueltos y sin estructura clara."
        },
        {
            criterio: "UI & UX Feedback",
            description: "Estética y respuesta",
            icon: "layout",
            da: "Uso pro de colores de tema, placeholders y feedback visual pro.",
            aa: "UI funcional básica, sin placeholders claros.",
            pa: "UI desprolija o no adaptada a modo oscuro.",
            na: "UI rota, textos ilegibles o componentes solapados."
        }
    ];

    return (
        <EvaluationRubric
            data={data as any}
            footerText="Módulo 0402 - QR & Pagos"
        />
    );
};

export default QRPaymentsRubric;
