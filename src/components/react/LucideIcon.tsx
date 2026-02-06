
import React from 'react';
import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
    name: keyof typeof Icons;
}

export const LucideIcon = ({ name, size = 16, className = '', ...props }: IconProps) => {
    const Icon = Icons[name] as React.ElementType;
    if (!Icon) return null;
    return (
        <span className={`inline-flex items-center justify-center mr-2 ${className}`} style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
            <Icon size={size} {...props} />
        </span>
    );
};
