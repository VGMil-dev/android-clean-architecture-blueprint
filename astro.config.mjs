// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [
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
			],
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});