export const publicNavlinks = [
	{ path: '/', text: 'Inicio', icon: '' },
	{
		path: '/acerca-de-la-carrera',
		text: 'Acerca de la carrera',
		icon: '',
		dropdown: false,
	},

	{
		path: '/direccion-de-carrera',
		text: 'Direccion de carrera',
		icon: '',
		dropdown: false,
	},
	{
		path: '/jefaturas',
		text: 'Jefaturas',
		icon: '',
		dropdown: true,
		ddItems: [
			{
				href: '/jefaturas',
				text: 'Jefaturas',
			},
			{
				href: '/jefaturas/academica',
				text: 'Jefatura académica',
			},
			{
				href: '/jefaturas/extension',
				text: 'Jefatura de extensión',
			},
			{
				href: '/jefaturas/clinica',
				text: 'Jefatura clínica',
			},
			{
				href: '/jefaturas/internado-rotatorio',
				text: 'Jefatura de internado rotatorio',
			},
			{
				href: '/jefaturas/investigacion',
				text: 'Jefatura de investigación',
			},
		],
	},
	{
		path: '/contacto',
		text: 'Contacto',
		icon: '',
		dropdown: false,
	},
	{
		path: '/noticias',
		text: 'Noticias',
		icon: '',
		dropdown: false,
	},
];

export const panelNavlinks = [
	{ path: '/', text: 'Inicio', icon: '' },
	{ path: '/panel/archivos', text: 'Archivos', icon: '' },
	{ path: '/panel/noticias', text: 'Noticias', icon: '' },
	{ path: '/panel/usuarios', text: 'Usuarios', icon: '' },
	{ path: '/panel/resumen', text: 'Resumen', icon: '' },
];
