export const publicNavlinks = [
	{ path: '/', text: 'Inicio', icon: '' },

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
		path: '/recursos',
		text: 'Recursos virtuales',
		icon: '',
		dropdown: false,
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

export const panelSUPER = [
	{ path: '/', text: 'Inicio', icon: '' },
	{ path: '/panel/archivos', text: 'Archivos', icon: '' },
	{ path: '/panel/noticias', text: 'Noticias', icon: '' },
	{ path: '/panel/usuarios', text: 'Usuarios', icon: '' },
	{ path: '/panel/logs', text: 'Logs', icon: '' },
];
export const panelADM = [
	{ path: '/', text: 'Inicio', icon: '' },
	{ path: '/panel/archivos', text: 'Archivos', icon: '' },
	{ path: '/panel/noticias', text: 'Noticias', icon: '' },
	// { path: '/panel/usuarios', text: 'Usuarios', icon: '' },
	// { path: '/panel/resumen', text: 'Resumen', icon: '' },
];
export const panelSCRE = [
	{ path: '/', text: 'Inicio', icon: '' },
	{ path: '/panel/archivos', text: 'Archivos', icon: '' },
	{ path: '/panel/noticias', text: 'Noticias', icon: '' },
	// { path: '/panel/usuarios', text: 'Usuarios', icon: '' },
	// { path: '/panel/resumen', text: 'Resumen', icon: '' },
];

export const getNavlinks = (rol = 'guest') => {
	if (rol === 'guest') return publicNavlinks;
	if (rol === 'ADM') return panelADM;
	if (rol === 'SCRE') return panelSCRE;
	if (rol === 'SUPER') return panelSUPER;
};
