
import React from 'react';

// 01 - Introducción
export const LogrosCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
            { emoji: '🗺️', titulo: 'Mapa Interactivo', desc: 'Ecuador completo con tiles de OSM' },
            { emoji: '📍', titulo: 'Marcadores y Pines', desc: 'Ciudades con info al tocarlas' },
            { emoji: '📡', titulo: 'GPS en Tiempo Real', desc: 'Tu ubicación sobre el mapa' },
            { emoji: '🛣️', titulo: 'Routing y Tracking', desc: 'Rutas de A→B y seguimiento' },
        ].map(item => (
            <div key={item.titulo} className="bg-[var(--sl-color-bg-nav)] border border-[var(--sl-color-hairline)] rounded-xl p-5 shadow-sm">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <strong className="block text-lg text-[var(--sl-color-white)]">{item.titulo}</strong>
                <p className="mt-1 text-sm opacity-70">{item.desc}</p>
            </div>
        ))}
    </div>
);

// 02 - Por qué Leaflet
export const DetectiveBug = () => (
    <div className="bg-[var(--sl-color-bg-nav)] rounded-2xl p-8 my-8 border border-[var(--sl-color-accent)]">
        <h3 className="m-0 mb-6 text-[var(--sl-color-accent)] flex items-center gap-2">
            <span>🔍</span> Anatomía del Bug
        </h3>
        {[
            { paso: '1', icono: '📦', titulo: 'react-native-maps se instala', desc: 'La librería estándar parece ser la opción correcta.' },
            { paso: '2', icono: '⚙️', titulo: 'Expo Go carga la app', desc: 'Expo Go ya tiene Google Maps precompilado.' },
            { paso: '3', icono: '💥', titulo: 'Conflicto silencioso', desc: 'Sin API key, Google Maps bloquea el renderizado por seguridad.' },
            { paso: '4', icono: '⬛', titulo: 'Mapa negro', desc: 'Tus tiles de OSM quedan ocultos detrás de una capa de error.' },
        ].map((item, idx) => (
            <div key={item.paso} className={`flex gap-5 items-start ${idx === 3 ? '' : 'mb-6'}`}>
                <div className="bg-[var(--sl-color-accent-low)] text-[var(--sl-color-accent)] w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {item.icono}
                </div>
                <div>
                    <strong className="text-[var(--sl-color-white)] text-lg">{item.titulo}</strong>
                    <p className="m-0 mt-1 opacity-80 text-sm leading-relaxed">{item.desc}</p>
                </div>
            </div>
        ))}
    </div>
);

export const TileVisualizacion = () => (
    <div className="my-8">
        <div className="grid grid-cols-3 gap-1 bg-[var(--sl-color-hairline)] p-1 rounded-lg max-w-[300px] mx-auto shadow-sm">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-square bg-[var(--sl-color-bg-nav)] flex flex-col items-center justify-center text-[0.7rem] opacity-80 overflow-hidden hover:bg-[var(--sl-color-accent-low)] transition-colors">
                    <span className="text-[0.5rem] opacity-50">z6/x18/y35</span>
                    <span className="font-bold">TILE</span>
                </div>
            ))}
        </div>
        <p className="text-center text-xs mt-3 text-[var(--sl-color-gray-3)]">
            Mosaico de 256x256 píxeles que forman la imagen global.
        </p>
    </div>
);

// 03 - Setup
export const AntesDespues = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
            <strong className="text-red-400 block mb-2">❌ Antes del reset</strong>
            <pre className="text-xs m-0 text-[var(--sl-color-gray-3)] overflow-x-auto">
                {`app/
├── (tabs)/
│   ├── index.tsx
│   ├── explore.tsx
│   └── _layout.tsx
├── +not-found.tsx
└── _layout.tsx`}
            </pre>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
            <strong className="text-green-400 block mb-2">✅ Después del reset</strong>
            <pre className="text-xs m-0 text-[var(--sl-color-gray-2)] overflow-x-auto">
                {`app/
└── index.tsx (Limpio)

app-example/
└── (Respaldo del código demo)`}
            </pre>
        </div>
    </div>
);

// 04 - Arquitectura
export const PuenteWebView = () => (
    <div className="flex items-center justify-center gap-4 my-8 p-6 bg-[var(--sl-color-bg-nav)] rounded-2xl border border-dashed border-[var(--sl-color-hairline)] uppercase tracking-tight">
        <div className="text-center p-4 bg-green-500/10 rounded-lg border border-[#39FF14]">
            <strong className="text-[#39FF14]">React Native</strong>
        </div>
        <div className="text-2xl flex flex-col items-center">
            <span className="text-[0.6rem] opacity-60">postMessage</span>
            <span>⇄</span>
        </div>
        <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-[#00FFFF]">
            <strong className="text-[#00FFFF]">WebView</strong>
        </div>
    </div>
);

// 06 - Marcadores
export const InterfazExplicada = () => (
    <div className="my-8 bg-[var(--sl-color-bg-nav)] rounded-xl overflow-hidden border border-[var(--sl-color-hairline)] shadow-sm">
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-[rgba(var(--sl-color-as-rgb-accent),0.1)]">
                    <th className="p-3 text-left text-[var(--sl-color-accent)] border-r border-[var(--sl-color-hairline)]">Propiedad</th>
                    <th className="p-3 text-left border-r border-[var(--sl-color-hairline)]">Tipo</th>
                    <th className="p-3 text-left">Uso</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {[
                    { p: 'id', t: 'string', u: 'Identificador único (para clics)' },
                    { p: 'nombre', t: 'string', u: 'Lo que el usuario leerá' },
                    { p: 'lat / lng', t: 'number', u: 'Ubicación exacta' },
                    { p: 'emoji', t: 'string', u: 'El ícono que se verá en el pin' },
                ].map(row => (
                    <tr key={row.p} className="border-t border-[var(--sl-color-hairline)]">
                        <td className="p-3 border-r border-[var(--sl-color-hairline)] font-mono text-[var(--sl-color-accent-high)]">{row.p}</td>
                        <td className="p-3 border-r border-[var(--sl-color-hairline)] opacity-70 italic">{row.t}</td>
                        <td className="p-3">{row.u}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const GaleriaMarcadores = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        {[
            { emoji: '📍', t: 'Simple', d: 'Solo indica posición' },
            { emoji: '🗯️', t: 'Con Popup', d: 'Muestra texto al tocar' },
            { emoji: '⭐', t: 'Destacado', d: 'Estilo visual único' },
        ].map(m => (
            <div key={m.t} className="text-center p-5 bg-[var(--sl-color-bg-nav)] rounded-xl border border-[var(--sl-color-hairline)] hover:border-[var(--sl-color-accent)] transition-all">
                <div className="text-4xl mb-2">{m.emoji}</div>
                <strong className="block mb-1">{m.t}</strong>
                <p className="text-xs opacity-60 m-0">{m.d}</p>
            </div>
        ))}
    </div>
);

// 07 - Ubicación
export const MaquinaEstados = () => (
    <div className="flex flex-col gap-3 my-8">
        {[
            { s: 'idle', i: '⚪', c: 'rgba(255,255,255,0.2)', d: 'Esperando acción del usuario' },
            { s: 'cargando', i: '🟡', c: 'var(--sl-color-accent)', d: 'Solicitando satélites y permisos' },
            { s: 'obtenida', i: '🟢', c: '#39FF14', d: 'Coordenadas listas para el mapa' },
            { s: 'permisoDenegado', i: '🔴', c: '#FF2D78', d: 'Acceso bloqueado por el usuario' },
        ].map(item => (
            <div key={item.s} className="flex items-center gap-4 bg-[var(--sl-color-bg-nav)] p-4 rounded-xl border border-[var(--sl-color-hairline)]" style={{ borderLeft: `4px solid ${item.c}` }}>
                <span className="text-2xl">{item.i}</span>
                <div className="flex-1">
                    <strong className="uppercase tracking-widest text-xs" style={{ color: item.c }}>{item.s}</strong>
                    <p className="m-0 text-sm opacity-70">{item.d}</p>
                </div>
            </div>
        ))}
    </div>
);

export const TablaPermisos = () => (
    <div className="my-8 bg-[var(--sl-color-bg-nav)] rounded-xl overflow-hidden border border-[var(--sl-color-hairline)] shadow-sm">
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-[rgba(var(--sl-color-as-rgb-accent),0.1)] text-left">
                    <th className="p-4 border-r border-[var(--sl-color-hairline)]">Acción</th>
                    <th className="p-4">Resultado en la App</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                <tr className="border-t border-[var(--sl-color-hairline)]">
                    <td className="p-4 border-r border-[var(--sl-color-hairline)] font-bold text-green-400">✅ Permite</td>
                    <td className="p-4 opacity-80">GPS activo, marcador centrado en el mapa.</td>
                </tr>
                <tr className="border-t border-[var(--sl-color-hairline)]">
                    <td className="p-4 border-r border-[var(--sl-color-hairline)] font-bold text-red-400">❌ Niega</td>
                    <td className="p-4 opacity-80">Muestra tarjeta de error y botón para reintentar.</td>
                </tr>
            </tbody>
        </table>
    </div>
);

// 08 - Geocodificación
export const DireccionesGeo = () => (
    <div className="flex items-center justify-center gap-8 my-8 p-6 bg-[var(--sl-color-bg-nav)] rounded-2xl border border-[var(--sl-color-hairline)] shadow-inner">
        <div className="text-center">
            <div className="text-3xl mb-1">🏠</div>
            <span className="text-[0.6rem] opacity-50 block uppercase">Dirección</span>
        </div>
        <div className="text-3xl text-[var(--sl-color-accent)] animate-pulse">⇄</div>
        <div className="text-center">
            <div className="text-3xl mb-1">📍</div>
            <span className="text-[0.6rem] opacity-50 block uppercase">Coordenadas</span>
        </div>
    </div>
);

// 09 - Routing
export const CasosReales = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
            { emoji: '🛵', app: 'Rappi', uso: 'Seguimiento' },
            { emoji: '🚌', app: 'Moovit', uso: 'Rutas' },
            { emoji: '🏃', app: 'Strava', uso: 'Deporte' },
            { emoji: '🚗', app: 'Waze', uso: 'Navegación' },
        ].map(item => (
            <div key={item.app} className="bg-[var(--sl-color-bg-nav)] border border-[var(--sl-color-hairline)] rounded-xl p-4 text-center group hover:border-[var(--sl-color-accent)] transition-colors shadow-sm">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</div>
                <strong className="block text-sm text-[var(--sl-color-white)] uppercase tracking-tighter">{item.app}</strong>
                <span className="text-[0.6rem] opacity-50">{item.uso}</span>
            </div>
        ))}
    </div>
);

// 10 - Evaluación
export const MisionCard = () => (
    <div className="bg-[var(--sl-color-bg-nav)] border-2 border-[var(--sl-color-accent)] rounded-[2rem] p-10 my-10 shadow-[0_0_40px_rgba(var(--sl-color-as-rgb-accent),0.15)] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--sl-color-accent)] opacity-5 blur-[50px]"></div>
        <div className="text-6xl mb-4 animate-bounce">🗺️</div>
        <h2 className="text-[var(--sl-color-white)] text-3xl font-black mb-4 tracking-tighter uppercase">¡Misión Final!</h2>
        <p className="text-lg opacity-90 leading-relaxed max-w-xl mx-auto m-0">
            Vas a construir una app de <strong className="text-[var(--sl-color-accent-high)]">Guía Turística del Ecuador</strong> completa. Trazarás rutas, seguirás al usuario y explorarás volcanes.
        </p>
    </div>
);

export const Rubrica = () => (
    <div className="my-10 bg-[var(--sl-color-bg-nav)] rounded-2xl p-8 border border-[var(--sl-color-hairline)] shadow-xl">
        <h3 className="m-0 mb-8 text-2xl font-bold tracking-tight">Rúbrica de Calificación</h3>
        {[
            { t: 'Mapa OSM y Tiles', p: 25, c: '#00FFFF', e: '🌐' },
            { t: 'Marcadores por Categoría', p: 25, c: '#39FF14', e: '📍' },
            { t: 'Routing con OSRM', p: 25, c: '#FFE600', e: '🛣️' },
            { t: 'GPS y Tracking Real', p: 25, c: '#FF2D78', e: '📡' },
        ].map(item => (
            <div key={item.t} className="mb-6 last:mb-0">
                <div className="flex justify-between text-sm mb-2 items-center">
                    <span className="font-medium flex items-center gap-2">
                        <span>{item.e}</span> {item.t}
                    </span>
                    <strong className="font-mono" style={{ color: item.c }}>{item.p} pts</strong>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${item.p}%`, background: item.c, boxShadow: `0 0 10px ${item.c}aa` }}
                    ></div>
                </div>
            </div>
        ))}
    </div>
);
