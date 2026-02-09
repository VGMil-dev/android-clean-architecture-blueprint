
import React from 'react';
import { Trophy, Star, Target, XCircle, Zap, ShieldCheck, Layout, Boxes } from 'lucide-react';

interface RubricRow {
    criterio: string;
    description?: string;
    da: string;
    aa: string;
    pa: string;
    na: string;
    icon?: 'zap' | 'shield' | 'layout' | 'boxes' | 'target';
}

interface EvaluationRubricProps {
    data: RubricRow[];
    title?: string;
    footerText?: string;
}

const IconMap = {
    zap: <Zap size={18} />,
    shield: <ShieldCheck size={18} />,
    layout: <Layout size={18} />,
    boxes: <Boxes size={18} />,
    target: <Target size={18} />
};

const EvaluationRubric: React.FC<EvaluationRubricProps> = ({
    data,
    title = "Rúbrica de Evaluación",
    footerText = "Evaluación de Proyecto"
}) => {
    return (
        <div className="w-full my-8 overflow-hidden rounded-2xl border border-[var(--sl-color-hairline)] bg-[var(--sl-color-bg-nav)] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-[var(--sl-color-hairline)] bg-[var(--sl-color-bg-canvas)]">
                            <th className="px-6 py-5 font-bold text-[var(--sl-color-white)] w-[20%]">Criterio</th>
                            <th className="px-6 py-5 font-bold text-indigo-400 w-[20%]">
                                <div className="flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Trophy size={16} /> Destacado (DA)
                                </div>
                            </th>
                            <th className="px-6 py-5 font-bold text-emerald-400 w-[20%]">
                                <div className="flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Star size={16} /> Alcanzado (AA)
                                </div>
                            </th>
                            <th className="px-6 py-5 font-bold text-amber-500 w-[20%]">
                                <div className="flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Target size={16} /> En Proceso (PA)
                                </div>
                            </th>
                            <th className="px-6 py-5 font-bold text-red-500 w-[20%]">
                                <div className="flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <XCircle size={16} /> No Alcanzado (NA)
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--sl-color-hairline)]">
                        {data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-[var(--sl-color-accent-low)]/5 transition-colors group">
                                <td className="px-6 py-6 align-top">
                                    <div className="flex flex-col gap-3">
                                        <div className="w-10 h-10 flex items-center justify-center bg-[var(--sl-color-accent-low)]/10 rounded-xl text-[var(--sl-color-accent)] group-hover:scale-110 transition-transform">
                                            {item.icon ? IconMap[item.icon] : <Target size={18} />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[var(--sl-color-white)] text-base leading-tight">{item.criterio}</span>
                                            {item.description && <span className="text-[10px] text-[var(--sl-color-gray-4)] mt-1 uppercase tracking-tighter">{item.description}</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6 bg-indigo-500/5 align-top">
                                    <p className="text-white leading-relaxed m-0 text-sm font-medium">
                                        {item.da}
                                    </p>
                                </td>
                                <td className="px-6 py-6 bg-emerald-500/5 align-top">
                                    <p className="text-white leading-relaxed m-0 text-sm">
                                        {item.aa}
                                    </p>
                                </td>
                                <td className="px-6 py-6 bg-amber-500/5 align-top">
                                    <p className="text-white leading-relaxed m-0 text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                                        {item.pa}
                                    </p>
                                </td>
                                <td className="px-6 py-6 bg-red-500/5 align-top">
                                    <p className="text-white leading-relaxed m-0 text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                                        {item.na}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-[var(--sl-color-bg-canvas)] border-t border-[var(--sl-color-hairline)] flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[var(--sl-color-gray-4)]">
                <span>{footerText}</span>
                <span className="flex items-center gap-2">
                    <Zap size={10} className="text-[var(--sl-color-accent)] animate-pulse" /> Requisito Académico
                </span>
            </div>
        </div>
    );
};

export default EvaluationRubric;
