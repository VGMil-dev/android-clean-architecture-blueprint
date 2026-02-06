
import React from 'react';
import * as Icons from 'lucide-react';

interface LucideItemProps {
    name: keyof typeof Icons;
    color?: string;
    size?: number;
    children: React.ReactNode;
}

/**
 * A wrapper for Lucide icons and text to ensure perfect vertical alignment in MDX.
 */
export const LucideItem = ({ name, color, size = 18, children }: LucideItemProps) => {
    const Icon = Icons[name] as React.ElementType;

    if (!Icon) return <span>{children}</span>;

    return (
        <span className="inline-flex items-center gap-2 align-middle">
            <Icon
                size={size}
                color={color || 'currentColor'}
                className="shrink-0 transition-all duration-300"
                strokeWidth={2.5}
            />
            <span className="leading-none">{children}</span>
        </span>
    );
};
