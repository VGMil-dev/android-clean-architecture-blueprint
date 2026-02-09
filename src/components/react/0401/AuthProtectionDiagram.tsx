
import React from 'react';
import BaseArchitectureDiagram, { type DiagramStep } from '../common/BaseArchitectureDiagram';
import { MousePointer2, Shield, Fingerprint, Search, Repeat, LayoutTemplate } from 'lucide-react';

/**
 * 0401 - Auth Protection Flow Diagram
 * Replaces the static napkin image in 04c-implementacion-global.mdx
 */

const authSteps: DiagramStep[] = [
    {
        title: "1. Intento de Ruta",
        description: "El usuario intenta navegar a una pantalla (p. ej. /profile).",
        icon: <MousePointer2 size={20} />
    },
    {
        title: "2. Root Layout",
        description: "El portero global intercepta el cambio de segmentos de ruta.",
        icon: <LayoutTemplate size={20} />
    },
    {
        title: "3. Obtener Sesión",
        description: "useAuth recupera el estado actual del AuthProvider (Supabase).",
        icon: <Fingerprint size={20} />
    },
    {
        title: "4. Validación",
        description: "¿Es una ruta protegida? ¿Existe una sesión de usuario activa?",
        icon: <Search size={20} />
    },
    {
        title: "5. Redirección",
        description: "Se ejecuta router.replace() hacia Login o Home según el caso.",
        icon: <Repeat size={20} />
    },
    {
        title: "6. Acceso Seguro",
        description: "Se libera el flujo y se renderiza la vista final permitida.",
        icon: <Shield size={20} />
    },
];

export default function AuthProtectionDiagram() {
    return (
        <BaseArchitectureDiagram
            steps={authSteps}
            mobileHeight="950px"
            desktopHeight="600px"
        />
    );
}
