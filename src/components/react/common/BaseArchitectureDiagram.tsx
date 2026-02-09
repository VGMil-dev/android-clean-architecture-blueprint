
import React, { useState, useEffect, useMemo } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Background,
    Handle,
    Position,
    useReactFlow,
    ReactFlowProvider,
    type Edge,
    type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/**
 * BaseArchitectureDiagram
 * A highly standardized, theme-aware, and responsive engine for "Illustration Mode" diagrams.
 * Centralizes synchronization, auto-zoom, and visual identity.
 */

// --- 1. Internal Types ---

export interface DiagramStep {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface BaseArchitectureDiagramProps {
    steps: DiagramStep[];
    intervalDelay?: number;
    mobileHeight?: string;
    desktopHeight?: string;
    mobilePadding?: number;
    desktopPadding?: number;
}

// --- 2. Custom Node (StepNode Pattern) ---

const StepNode = ({ data }: { data: { label: string; active: boolean; description?: string; icon: React.ReactNode } }) => {
    return (
        <div
            className={`px-4 py-3 rounded-xl shadow-lg border-2 transition-all duration-500 w-52 md:w-60 backdrop-blur-md flex flex-col items-center text-center z-10 ${data.active
                ? 'border-[var(--sl-color-accent)] bg-[var(--sl-color-accent-low)]/20 text-[var(--sl-color-white)] scale-110 shadow-[0_0_20px_rgba(var(--sl-color-as-rgb-accent),0.3)]'
                : 'bg-[var(--sl-color-bg-nav)] border-[var(--sl-color-hairline)] text-[var(--sl-color-gray-3)] opacity-40 grayscale-[0.5]'
                }`}
        >
            <Handle type="target" position={Position.Top} id="t-top" className="!bg-transparent !border-0" />
            <Handle type="target" position={Position.Left} id="t-left" className="!bg-transparent !border-0" />

            <div className={`mb-3 p-3 rounded-full transition-all duration-700 ${data.active ? 'bg-[var(--sl-color-accent)] text-[var(--sl-color-black)] rotate-[360deg] scale-110' : 'bg-[var(--sl-color-gray-6)] text-[var(--sl-color-gray-4)]'}`}>
                {data.icon}
            </div>

            <div className="font-bold text-base md:text-lg mb-1 tracking-tight" style={{ color: data.active ? 'var(--sl-color-text-accent)' : 'inherit' }}>
                {data.label}
            </div>

            <Handle type="source" position={Position.Bottom} id="s-bottom" className="!bg-transparent !border-0" />
            <Handle type="source" position={Position.Right} id="s-right" className="!bg-transparent !border-0" />
        </div>
    );
};

const nodeTypes = {
    stepNode: StepNode,
};

// --- 3. Internal Engine ---

const DiagramEngine = ({ steps, intervalDelay = 4500, mobilePadding = 4.5, desktopPadding = 3.5 }: BaseArchitectureDiagramProps) => {
    const { fitView } = useReactFlow();
    const [isMobile, setIsMobile] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Responsive Detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Layout Calculation
    const { initialNodes, initialEdges } = useMemo(() => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        const pos = isMobile
            ? steps.map((_, i) => ({ x: 30, y: 30 + i * 250 }))
            : steps.map((_, i) => ({ x: 30 + i * 350, y: 150 }));

        steps.forEach((step, idx) => {
            nodes.push({
                id: `step${idx + 1}`,
                type: 'stepNode',
                position: pos[idx],
                data: { ...step, label: step.title, active: false }
            });

            if (idx < steps.length - 1) {
                edges.push({
                    id: `e${idx}`,
                    source: `step${idx + 1}`,
                    target: `step${idx + 2}`,
                    sourceHandle: isMobile ? 's-bottom' : 's-right',
                    targetHandle: isMobile ? 't-top' : 't-left',
                    animated: false,
                    style: { strokeWidth: 3, stroke: 'var(--sl-color-gray-5)', opacity: 0.2 }
                });
            }
        });
        return { initialNodes: nodes, initialEdges: edges };
    }, [isMobile, steps]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);

    // Initial Layout Sync
    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialNodes, initialEdges, setNodes, setEdges]);

    // Review Loop Interval
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, intervalDelay);
        return () => clearInterval(timer);
    }, [steps.length, intervalDelay]);

    // Animation & State Sync
    useEffect(() => {
        setNodes((nds) => nds.map((n, idx) => ({
            ...n,
            data: { ...n.data, active: idx === currentStep }
        })));

        setEdges((eds) => eds.map((e, idx) => ({
            ...e,
            animated: idx === currentStep - 1,
            style: {
                ...e.style,
                stroke: idx < currentStep ? 'var(--sl-color-accent)' : 'var(--sl-color-gray-5)',
                opacity: idx === currentStep - 1 ? 1 : 0.2,
            }
        })));

        // Focused View (Review Transition)
        const nodeId = `step${currentStep + 1}`;
        setTimeout(() => {
            fitView({
                nodes: [{ id: nodeId }],
                duration: 1400,
                padding: isMobile ? mobilePadding : desktopPadding
            });
        }, 50);
    }, [currentStep, setNodes, setEdges, fitView, isMobile, mobilePadding, desktopPadding]);

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                zoomOnPinch={false}
                zoomOnScroll={false}
                panOnDrag={false}
                panOnScroll={false}
                selectionOnDrag={false}
                zoomOnDoubleClick={false}
                preventScrolling={false}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="var(--sl-color-hairline)" gap={20} />
            </ReactFlow>

            {/* Step Metadata Overlay */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none flex justify-center z-50">
                <div className="bg-[var(--sl-color-bg-nav)]/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-[var(--sl-color-hairline)] pointer-events-auto max-w-2xl w-full text-center">
                    <div className="flex justify-center gap-3 mb-4">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all duration-700 ${idx === currentStep
                                    ? 'w-12 bg-[var(--sl-color-accent)] shadow-[0_0_15px_var(--sl-color-accent)]'
                                    : 'w-3 bg-[var(--sl-color-gray-5)] opacity-30'
                                    }`}
                            />
                        ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[var(--sl-color-white)] mb-2 uppercase tracking-tighter">
                        {steps[currentStep].title}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--sl-color-gray-3)] font-medium leading-tight">
                        {steps[currentStep].description}
                    </p>
                </div>
            </div>
        </>
    );
};

// --- 4. Main Export ---

export default function BaseArchitectureDiagram(props: BaseArchitectureDiagramProps) {
    const { mobileHeight = '900px', desktopHeight = '650px' } = props;

    return (
        <div
            className="border border-[var(--sl-color-gray-5)] rounded-2xl overflow-hidden bg-[var(--sl-color-bg-canvas)] relative w-full shadow-2xl my-10 group"
            style={{ height: isMobileWindow() ? mobileHeight : desktopHeight }}
        >
            <ReactFlowProvider>
                <DiagramEngine {...props} />
            </ReactFlowProvider>
        </div>
    );
}

// Helper to determine initial height (simplified check)
function isMobileWindow() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
}
