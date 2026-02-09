
import React from 'react';
import BaseArchitectureDiagram, { type DiagramStep } from '../common/BaseArchitectureDiagram';
import { CreditCard, Lock, ShieldCheck, Webhook, CheckCircle2 } from 'lucide-react';

const paymentFlowSteps: DiagramStep[] = [
    {
        title: "1. Tokenización",
        description: "Datos de tarjeta ⮕ Token seguro (PCI Compliance).",
        icon: <CreditCard size={20} />
    },
    {
        title: "2. Payment Intent",
        description: "App ⮕ Backend: Solicitud de secreto de pago único.",
        icon: <Lock size={20} />
    },
    {
        title: "3. Confirmación",
        description: "App ⮕ Pasarela: Validación bancaria (3D Secure).",
        icon: <ShieldCheck size={20} />
    },
    {
        title: "4. Webhook",
        description: "Pasarela ⮕ Backend: Notificación asíncrona de éxito.",
        icon: <Webhook size={20} />
    },
    {
        title: "5. Éxito UI",
        description: "Actualización de estado final en la interfaz móvil.",
        icon: <CheckCircle2 size={20} />
    },
];

export default function PaymentArchitectureDiagram() {
    return (
        <BaseArchitectureDiagram
            steps={paymentFlowSteps}
            mobileHeight="900px"
            desktopHeight="650px"
        />
    );
}
