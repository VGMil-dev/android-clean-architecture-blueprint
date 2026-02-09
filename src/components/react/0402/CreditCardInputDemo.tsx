
import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, User, ShieldCheck } from 'lucide-react';

const CreditCardInputDemo = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [holder, setHolder] = useState('');

    // Handle Card Formatting (4 by 4)
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length > 0) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    // Detect Card Type (Simple Logic)
    const getCardType = () => {
        if (cardNumber.startsWith('4')) return 'Visa';
        if (cardNumber.startsWith('5')) return 'MasterCard';
        return 'Generic';
    };

    const cardType = getCardType();

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 p-6 md:p-10 bg-[var(--sl-color-bg-nav)] rounded-3xl border border-[var(--sl-color-hairline)] shadow-2xl w-full max-w-lg lg:max-w-5xl mx-auto transition-all duration-500">

            {/* 3D Card Preview - Sticky on desktop */}
            <div className="w-full max-w-sm lg:sticky lg:top-8 shrink-0">
                <div className="relative w-full h-56 bg-gradient-to-br from-[var(--sl-color-accent)] to-[var(--sl-color-accent-low)] rounded-2xl shadow-2xl p-8 flex flex-col justify-between text-[var(--sl-color-white)] overflow-hidden group transition-transform duration-500 hover:scale-[1.02]">
                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/20 rounded-full blur-3xl" />

                    <div className="flex justify-between items-start relative z-10 transition-all duration-300">
                        <div className="flex flex-col gap-1">
                            <div className="w-12 h-10 bg-yellow-500/80 rounded-lg border border-yellow-200/50 shadow-inner" /> {/* Chip */}
                            <span className="text-[10px] font-mono opacity-60 tracking-widest mt-1">EMV CHIP</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xl font-black italic tracking-tighter">
                                {cardType === 'Visa' ? 'VISA' : cardType === 'MasterCard' ? 'MasterCard' : 'PAY'}
                            </span>
                            <span className="text-[8px] opacity-70 uppercase">Premium Credit</span>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-lg md:text-xl font-mono tracking-[0.15em] shadow-sm">
                            {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                    </div>

                    <div className="flex justify-between items-end relative z-10 text-[var(--sl-color-white)]">
                        <div className="flex flex-col">
                            <span className="text-[8px] opacity-60 uppercase tracking-widest">Card Holder</span>
                            <span className="text-sm font-bold tracking-tight truncate w-32 md:w-40 uppercase">{holder || 'NAME ON CARD'}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] opacity-60 uppercase tracking-widest">Expires</span>
                            <span className="text-sm font-bold tracking-tight">{expiry || 'MM/YY'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styled Inputs Form & Button Container */}
            <div className="flex flex-col gap-8 w-full">
                <div className="grid grid-cols-2 gap-4 w-full text-[var(--sl-color-gray-2)]">

                    <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-[var(--sl-color-gray-3)] flex items-center gap-2">
                            <CreditCard size={14} /> NÚMERO DE TARJETA
                        </label>
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            value={cardNumber}
                            onChange={handleCardChange}
                            className="bg-[var(--sl-color-bg-canvas)] border border-[var(--sl-color-hairline)] rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--sl-color-accent)] focus:border-transparent transition-all font-mono tracking-widest placeholder:opacity-20 text-[var(--sl-color-white)]"
                        />
                    </div>

                    <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-[var(--sl-color-gray-3)] flex items-center gap-2">
                            <User size={14} /> TITULAR
                        </label>
                        <input
                            type="text"
                            placeholder="NOMBRE COMO APARECE"
                            value={holder}
                            onChange={(e) => setHolder(e.target.value.toUpperCase())}
                            className="bg-[var(--sl-color-bg-canvas)] border border-[var(--sl-color-hairline)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--sl-color-accent)] focus:border-transparent transition-all uppercase placeholder:opacity-20 text-[var(--sl-color-white)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[var(--sl-color-gray-3)] flex items-center gap-2">
                            <Calendar size={14} /> EXPIRACIÓN
                        </label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="bg-[var(--sl-color-bg-canvas)] border border-[var(--sl-color-hairline)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--sl-color-accent)] focus:border-transparent transition-all font-mono placeholder:opacity-20 text-[var(--sl-color-white)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[var(--sl-color-gray-3)] flex items-center gap-2">
                            <Lock size={14} /> CVV
                        </label>
                        <input
                            type="password"
                            placeholder="123"
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="bg-[var(--sl-color-bg-canvas)] border border-[var(--sl-color-hairline)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--sl-color-accent)] focus:border-transparent transition-all font-mono placeholder:opacity-20 text-[var(--sl-color-white)]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button className="w-full bg-[var(--sl-color-accent)] hover:opacity-90 text-[var(--sl-color-black)] font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-3 group">
                        <ShieldCheck className="group-hover:animate-pulse" />
                        COMPLETAR PAGO
                    </button>

                    <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] text-[var(--sl-color-gray-4)] font-mono tracking-tighter opacity-50 uppercase">
                        <Lock size={10} /> PCI DSS COMPLIANT • ENCRYPTED
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreditCardInputDemo;
