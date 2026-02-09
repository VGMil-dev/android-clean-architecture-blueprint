
import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Scan, Volume2, Fingerprint } from 'lucide-react';

const ScannerFeedbackDiagram = () => {
    const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');

    // Auto-cycle through states for demonstration
    useEffect(() => {
        const timer = setInterval(() => {
            setState((prev) => {
                if (prev === 'idle') return 'success';
                if (prev === 'success') return 'error';
                return 'idle';
            });
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const getStyles = () => {
        switch (state) {
            case 'success':
                return {
                    color: '#22c55e',
                    shadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                    label: 'ÉXITO: Código Válido',
                    icon: <CheckCircle2 className="w-8 h-8 text-white" />,
                    bgColor: 'rgba(34, 197, 94, 0.2)'
                };
            case 'error':
                return {
                    color: '#ef4444',
                    shadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                    label: 'ERROR: No Autorizado',
                    icon: <AlertCircle className="w-8 h-8 text-white" />,
                    bgColor: 'rgba(239, 68, 68, 0.2)'
                };
            default:
                return {
                    color: '#ffffff',
                    shadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                    label: 'IDLE: Buscando QR...',
                    icon: <Scan className="w-8 h-8 text-white opacity-50" />,
                    bgColor: 'transparent'
                };
        }
    };

    const styles = getStyles();

    return (
        <div className="flex flex-col items-center gap-6 p-8 bg-[var(--sl-color-bg-nav)] rounded-2xl border border-[var(--sl-color-hairline)] shadow-2xl">
            <div className="relative w-64 h-80 rounded-xl overflow-hidden border-2 transition-colors duration-500" style={{ borderColor: styles.color }}>
                {/* Background Simulation (Store Shelf) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--sl-color-gray-6)] to-[var(--sl-color-bg-canvas)] opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-dashed border-[var(--sl-color-gray-5)] rounded-lg opacity-20" />
                </div>

                {/* Dynamic Overlay (The Mira) */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500" style={{ backgroundColor: styles.bgColor }}>
                    <div className="relative w-48 h-48">
                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 transition-colors duration-500" style={{ borderColor: styles.color }} />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 transition-colors duration-500" style={{ borderColor: styles.color }} />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 transition-colors duration-500" style={{ borderColor: styles.color }} />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 transition-colors duration-500" style={{ borderColor: styles.color }} />

                        {/* Center Feedback */}
                        <div className="absolute inset-0 flex items-center justify-center scale-110">
                            <div className="transition-all duration-500 transform" style={{
                                opacity: state === 'idle' ? 0.3 : 1,
                                transform: state === 'idle' ? 'scale(0.8)' : 'scale(1.2)'
                            }}>
                                {styles.icon}
                            </div>
                        </div>

                        {/* Scanning Line (only in idle) */}
                        {state === 'idle' && (
                            <div className="absolute left-2 right-2 h-1 bg-[var(--sl-color-white)]/30 animate-[scan_2s_infinite] shadow-[0_0_10px_var(--sl-color-white)]" />
                        )}
                    </div>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="px-3 py-1 bg-[var(--sl-color-black)]/60 rounded-full text-xs font-mono tracking-widest text-[var(--sl-color-white)] transition-opacity duration-500" style={{ color: styles.color }}>
                        {styles.label}
                    </span>
                </div>
            </div>

            {/* Comparison Stats/Features Cards */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-md">
                <div className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${state === 'idle' ? 'bg-[var(--sl-color-accent-low)]/20 border-[var(--sl-color-accent)] text-[var(--sl-color-text-accent)]' : 'bg-[var(--sl-color-bg-canvas)] border-[var(--sl-color-hairline)] text-[var(--sl-color-gray-4)]'}`}>
                    <Scan size={16} />
                    <span className="text-[10px] font-bold">LOW-POWER</span>
                </div>
                <div className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${state === 'success' ? 'bg-green-900/40 border-green-500 text-green-400' : 'bg-[var(--sl-color-bg-canvas)] border-[var(--sl-color-hairline)] text-[var(--sl-color-gray-4)]'}`}>
                    <Volume2 size={16} />
                    <span className="text-[10px] font-bold">BEEP/HAPTIC</span>
                </div>
                <div className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${state === 'error' ? 'bg-red-900/40 border-red-500 text-red-400' : 'bg-[var(--sl-color-bg-canvas)] border-[var(--sl-color-hairline)] text-[var(--sl-color-gray-4)]'}`}>
                    <Fingerprint size={16} />
                    <span className="text-[10px] font-bold">VIBRATE</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}} />
        </div>
    );
};

export default ScannerFeedbackDiagram;
