
import React, { useState, useCallback, useEffect } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Background,
    Handle,
    Position,
    MarkerType,
    useReactFlow,
    ReactFlowProvider,
    type Edge,
    type Node,
} from '@xyflow/react';
import {
    Database,
    Send,
    Smartphone,
    Key,
    ShieldCheck,
    Settings,
    FileJson,
    Zap,
    Cloud
} from 'lucide-react';
import '@xyflow/react/dist/style.css';

// --- Custom Nodes ---

const StepNode = ({ data }: { data: { label: string; active: boolean; description?: string; icon: React.ReactNode } }) => {
    return (
        <div
            className={`px-4 py-3 rounded-lg shadow-md border-2 transition-all duration-500 w-48 md:w-56 backdrop-blur-sm flex flex-col items-center text-center z-10 ${data.active
                ? 'border-[var(--sl-color-accent)] bg-[var(--sl-color-accent-low)]/10 text-[var(--sl-color-white)] scale-110 shadow-[0_0_20px_rgba(207,163,75,0.3)]'
                : 'bg-[var(--sl-color-bg-nav)] border-[var(--sl-color-hairline)] text-[var(--sl-color-gray-3)] opacity-60 grayscale'
                }`}
        >
            {/* Target Handles */}
            <Handle type="target" position={Position.Top} id="t-top" className="!bg-transparent !border-0" />
            <Handle type="target" position={Position.Left} id="t-left" className="!bg-transparent !border-0" />
            <Handle type="target" position={Position.Right} id="t-right" className="!bg-transparent !border-0" />
            <Handle type="target" position={Position.Bottom} id="t-bottom" className="!bg-transparent !border-0" />

            <div className={`mb-2 p-2 rounded-full transition-colors duration-500 ${data.active ? 'bg-[var(--sl-color-accent)] text-[var(--sl-color-black)]' : 'bg-[var(--sl-color-gray-6)] text-[var(--sl-color-gray-4)]'}`}>
                {data.icon}
            </div>

            <div className="font-bold text-base md:text-lg mb-1 leading-tight" style={{ color: data.active ? 'var(--sl-color-text-accent)' : 'inherit' }}>{data.label}</div>

            {data.active && data.description && (
                <div className="text-[10px] md:text-xs leading-tight mt-1 opacity-90 font-mono" style={{ color: 'var(--sl-color-text-gray)' }}>
                    {data.description}
                </div>
            )}

            {/* Source Handles */}
            <Handle type="source" position={Position.Right} id="s-right" className="!bg-transparent !border-0" />
            <Handle type="source" position={Position.Bottom} id="s-bottom" className="!bg-transparent !border-0" />
            <Handle type="source" position={Position.Top} id="s-top" className="!bg-transparent !border-0" />
            <Handle type="source" position={Position.Left} id="s-left" className="!bg-transparent !border-0" />
        </div>
    );
};

const ConfigNode = ({ data }: { data: { label: string; active: boolean; icon: React.ReactNode } }) => {
    return (
        <div
            className={`px-2 py-1.5 rounded-md border transition-all duration-500 flex items-center gap-2 backdrop-blur-sm ${data.active
                ? 'border-[var(--sl-color-accent-high)] bg-[var(--sl-color-accent-low)]/20 text-[var(--sl-color-text)] shadow-lg scale-105'
                : 'bg-[var(--sl-color-bg-nav)] border-[var(--sl-color-hairline)] text-[var(--sl-color-gray-4)] opacity-40 scale-90'
                }`}
        >
            <Handle type="source" position={Position.Top} id="s-top" className="!opacity-0" />
            <Handle type="source" position={Position.Left} id="s-left" className="!opacity-0" />
            <Handle type="source" position={Position.Right} id="s-right" className="!opacity-0" />
            <Handle type="source" position={Position.Bottom} id="s-bottom" className="!opacity-0" />

            <span className={data.active ? 'text-[var(--sl-color-accent)]' : 'text-inherit'}>
                {data.icon}
            </span>
            <span className="text-[10px] md:text-xs font-mono font-bold whitespace-nowrap">{data.label}</span>
        </div>
    );
};

const nodeTypes = {
    step: StepNode,
    config: ConfigNode,
};

// --- Data ---

const steps = [
    { title: "Vista General", description: "El ecosistema completo de notificaciones." },
    { title: "1. El Disparador", description: "Supabase detecta un evento y ejecuta un Trigger para iniciar el flujo." },
    { title: "2. Autenticación", description: "Expo usa credenciales de Apple y Google para validar y firmar el envío." },
    { title: "3. Gateway de Envío", description: "Expo Push Service despacha la petición a los servicios nativos de Apple y Google." },
    { title: "4. Entrega Nativa", description: "APNs (Apple) y FCM (Google) entregan la notificación al dispositivo del usuario." },
    { title: "5. Configuración App", description: "La App recibe el mensaje vinculada mediante eas.json y google-services.json." },
];

// --- Layout Logic ---

const getLayout = (isMobile: boolean) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // 1. Supabase (Start)
    nodes.push({
        id: 'supabase',
        type: 'step',
        position: isMobile ? { x: 20, y: 20 } : { x: 20, y: 150 },
        data: {
            label: 'Supabase DB',
            active: false,
            description: 'Postgres Triggers / Edge Functions',
            icon: <Database size={18} />
        },
    });

    // 2. Expo Service (Middle)
    nodes.push({
        id: 'expo',
        type: 'step',
        position: isMobile ? { x: 20, y: 200 } : { x: 300, y: 150 },
        data: {
            label: 'Expo Push Service',
            active: false,
            description: 'API Gateway / Validador',
            icon: <Send size={18} />
        },
    });

    // 2.5 APNs / FCM (New Intermediary)
    nodes.push({
        id: 'native',
        type: 'step',
        position: isMobile ? { x: 20, y: 400 } : { x: 580, y: 150 },
        data: {
            label: 'APNs / FCM',
            active: false,
            description: 'Apple & Google Infrastructure',
            icon: <Cloud size={18} />
        },
    });

    // 3. User App (End)
    nodes.push({
        id: 'app',
        type: 'step',
        position: isMobile ? { x: 20, y: 550 } : { x: 860, y: 150 },
        data: {
            label: 'User App',
            active: false,
            description: 'React Native / Expo Go',
            icon: <Smartphone size={18} />
        },
    });

    // 4. Apple Creds
    nodes.push({
        id: 'apple',
        type: 'config',
        position: isMobile ? { x: 250, y: 170 } : { x: 280, y: 50 },
        data: { label: 'Apple Key (.p8)', active: false, icon: <Key size={14} /> },
    });

    // 5. Google Creds
    nodes.push({
        id: 'google',
        type: 'config',
        position: isMobile ? { x: 250, y: 280 } : { x: 280, y: 320 },
        data: { label: 'Google Service Account', active: false, icon: <ShieldCheck size={14} /> },
    });

    // 6. eas.json
    nodes.push({
        id: 'eas',
        type: 'config',
        position: isMobile ? { x: 250, y: 540 } : { x: 840, y: 50 },
        data: { label: 'eas.json', active: false, icon: <Zap size={14} /> },
    });

    // 7. google-services
    nodes.push({
        id: 'googleSvc',
        type: 'config',
        position: isMobile ? { x: 250, y: 600 } : { x: 840, y: 320 },
        data: { label: 'google-services.json', active: false, icon: <FileJson size={14} /> },
    });

    // --- Edges ---

    // Flow: Supabase -> Expo -> Native -> App
    if (isMobile) {
        edges.push({ id: 'e1', source: 'supabase', target: 'expo', sourceHandle: 's-bottom', targetHandle: 't-top', animated: true, type: 'smoothstep', style: { strokeWidth: 2 } });
        edges.push({ id: 'e2', source: 'expo', target: 'native', sourceHandle: 's-bottom', targetHandle: 't-top', animated: true, type: 'smoothstep', style: { strokeWidth: 2 } });
        edges.push({ id: 'e3', source: 'native', target: 'app', sourceHandle: 's-bottom', targetHandle: 't-top', animated: true, type: 'smoothstep', style: { strokeWidth: 2 } });
    } else {
        edges.push({ id: 'e1', source: 'supabase', target: 'expo', sourceHandle: 's-right', targetHandle: 't-left', animated: true, type: 'smoothstep', style: { strokeWidth: 2 } });
        edges.push({ id: 'e2', source: 'expo', target: 'native', sourceHandle: 's-right', targetHandle: 't-left', animated: true, type: 'smoothstep', style: { strokeWidth: 2 } });
        edges.push({ id: 'e3', source: 'native', target: 'app', sourceHandle: 's-right', targetHandle: 't-left', animated: true, type: 'smoothstep', style: { strokeWidth: 2 } });
    }

    // Config Edges
    if (isMobile) {
        edges.push({ id: 'c1', source: 'apple', target: 'expo', sourceHandle: 's-left', targetHandle: 't-right', type: 'default', animated: true, style: { strokeDasharray: '5,5' } });
        edges.push({ id: 'c2', source: 'google', target: 'expo', sourceHandle: 's-left', targetHandle: 't-right', type: 'default', animated: true, style: { strokeDasharray: '5,5' } });
        edges.push({ id: 'c3', source: 'eas', target: 'app', sourceHandle: 's-left', targetHandle: 't-right', type: 'default', animated: true, style: { strokeDasharray: '5,5' } });
        edges.push({ id: 'c4', source: 'googleSvc', target: 'app', sourceHandle: 's-left', targetHandle: 't-right', type: 'default', animated: true, style: { strokeDasharray: '5,5' } });
    } else {
        edges.push({ id: 'c1', source: 'apple', target: 'expo', sourceHandle: 's-bottom', targetHandle: 't-top', type: 'default', animated: true, style: { strokeDasharray: '5,5' } });
        edges.push({ id: 'c2', source: 'google', target: 'expo', sourceHandle: 's-top', targetHandle: 't-bottom', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5' } });
        edges.push({ id: 'c3', source: 'eas', target: 'app', sourceHandle: 's-bottom', targetHandle: 't-top', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5' } });
        edges.push({ id: 'c4', source: 'googleSvc', target: 'app', sourceHandle: 's-top', targetHandle: 't-bottom', type: 'smoothstep', animated: true, style: { strokeDasharray: '5,5' } });
    }

    return { nodes, edges };
};


const ArchitectureDiagramContent = () => {
    const { fitView } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const layout = getLayout(isMobile);
        setNodes(layout.nodes);
        setEdges(layout.edges);
        setTimeout(() => fitView({ padding: 0.2 }), 100);
    }, [isMobile, fitView, setNodes, setEdges]);

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev >= steps.length - 1 ? 0 : prev + 1));
        }, 3500);
        return () => clearInterval(timer);
    }, [isPlaying]);

    useEffect(() => {
        setNodes((nds) => nds.map((n) => {
            let active = false;
            // Step mapping
            if (currentStep >= 1 && n.id === 'supabase') active = true;
            if (currentStep >= 2 && ['expo', 'apple', 'google'].includes(n.id)) active = true;
            if (currentStep >= 3 && n.id === 'expo') active = true;
            if (currentStep >= 4 && n.id === 'native') active = true;
            if (currentStep >= 5 && ['app', 'eas', 'googleSvc'].includes(n.id)) active = true;

            return { ...n, data: { ...n.data, active } };
        }));

        setEdges((eds) => eds.map((e) => {
            let active = false;
            let stroke = 'var(--sl-color-gray-5)';

            if (currentStep >= 1 && e.id === 'e1') { active = true; stroke = 'var(--sl-color-accent)'; }
            if (currentStep >= 2 && ['c1', 'c2'].includes(e.id)) { active = true; stroke = 'var(--sl-color-accent-high)'; }
            if (currentStep >= 3 && e.id === 'e2') { active = true; stroke = 'var(--sl-color-accent)'; }
            if (currentStep >= 4 && e.id === 'e3') { active = true; stroke = 'var(--sl-color-accent)'; }
            if (currentStep >= 5 && ['c3', 'c4'].includes(e.id)) { active = true; stroke = 'var(--sl-color-accent-high)'; }

            return {
                ...e,
                animated: active,
                style: {
                    ...e.style,
                    stroke,
                    opacity: active ? 1 : 0.2,
                    strokeWidth: active ? 2 : 1,
                }
            };
        }));
    }, [currentStep, setNodes, setEdges]);


    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                zoomOnScroll={false}
                panOnDrag={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                panOnScroll={false}
                preventScrolling={false}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="var(--sl-color-hairline)" gap={20} />
            </ReactFlow>

            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-center z-50">
                <div className="bg-[var(--sl-color-bg-nav)]/95 backdrop-blur shadow-lg rounded-2xl p-4 border border-[var(--sl-color-hairline)] pointer-events-auto max-w-xl w-full text-center transition-all duration-500">
                    <div className="flex justify-center items-center gap-1.5 mb-2">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-500 ${idx === currentStep ? 'w-8 bg-[var(--sl-color-accent)]' : 'w-2 bg-[var(--sl-color-gray-5)]'}`}
                            />
                        ))}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[var(--sl-color-white)] leading-tight">{steps[currentStep].title}</h3>
                    <p className="text-xs md:text-sm text-[var(--sl-color-gray-3)] mt-1">{steps[currentStep].description}</p>
                </div>
            </div>
        </>
    );
};

export default function ArchitectureDiagram() {
    return (
        <div className="border border-[var(--sl-color-gray-5)] rounded-xl overflow-hidden shadow-sm bg-[var(--sl-color-bg-canvas)] relative h-[750px] md:h-[500px] w-full">
            <ReactFlowProvider>
                <ArchitectureDiagramContent />
            </ReactFlowProvider>
        </div>
    );
}
