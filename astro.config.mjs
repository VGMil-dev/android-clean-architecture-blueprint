// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		starlight({
			title: 'RepoMovil',
			logo: {
				src: './src/assets/logo.png',
			},
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
				// Fonts
				'@fontsource/jetbrains-mono/400.css',
				'@fontsource/jetbrains-mono/600.css',
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Expo Notifications',
					items: [
						{ slug: '0401-expo-notifications/01-introduccion' },
						{ slug: '0401-expo-notifications/02-setup' },
						{ slug: '0401-expo-notifications/03-arquitectura' },
						{
							label: 'Gestión de Autenticación',
							items: [
								{
									label: 'Conceptos',
									slug: '0401-expo-notifications/04-gestion-autenticacion'
								},
								{ slug: '0401-expo-notifications/04a-el-adaptador' },
								{ slug: '0401-expo-notifications/04b-el-hook' },
								{ slug: '0401-expo-notifications/04c-implementacion-global' },
								{ slug: '0401-expo-notifications/04d-enviar-notificacion' },
							],
						},
						{
							label: 'Despliegue',
							items: [
								{ slug: '0401-expo-notifications/05-credenciales-android' },
								{ slug: '0401-expo-notifications/06-eas-build' },
							],
						},
						{ slug: '0401-expo-notifications/07-troubleshooting' },
					],
				},
				{
					label: 'QR & Pagos',
					items: [
						{
							label: 'Lectura de Códigos',
							items: [
								{ slug: '0402-qr-payments/01-intro-conceptos' },
								{ slug: '0402-qr-payments/02-expo-camera-setup' },
								{ slug: '0402-qr-payments/03-lector-qr' },
								{ slug: '0402-qr-payments/04-lector-barras' },
								{ slug: '0402-qr-payments/05-feedback-escaneo' },
								{ slug: '0402-qr-payments/05b-integracion-datos' },
							],
						},
						{
							label: 'Conceptos de Pago',
							items: [
								{ slug: '0402-qr-payments/06-pasarelas-intro' },
								{ slug: '0402-qr-payments/07-arquitectura-pagos' },
								{ slug: '0402-qr-payments/08-diseno-checkout' },
								{ slug: '0402-qr-payments/09-diseno-confirmacion' },
							],
						},
						{
							label: 'Mapas OSM',
							items: [
								{ slug: '0403-maps-osm/01-introduccion' },
								{ slug: '0403-maps-osm/02-por-que-leaflet' },
								{ slug: '0403-maps-osm/03-setup' },
								{ slug: '0403-maps-osm/04-arquitectura' },
								{ slug: '0403-maps-osm/05-mapa-basico' },
								{ slug: '0403-maps-osm/06-marcadores-y-pines' },
								{ slug: '0403-maps-osm/07-mi-ubicacion' },
								{ slug: '0403-maps-osm/08-geocodificacion' },
								{ slug: '0403-maps-osm/09-routing-tracking' },
								{ slug: '0403-maps-osm/10-evaluacion-proyecto' },
							],
						},
					],
				},
			],
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});