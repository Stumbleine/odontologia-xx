export const publicNavlinks = [
	{
		path: '/direccion-de-carrera',
		text: 'Dirección de carrera',
		icon: '',
		dropdown: false,
	},
	{
		path: '/centro-estudiantes',
		text: 'Centro de estudiantes',
		icon: '',
		dropdown: false,
	},
	{
		path: '/uegc',
		text: 'Unidad de evaluación y gestión de calidad',
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
				href: '/jefaturas/academica',
				text: 'Jefatura académica',
			},
			{
				href: '/jefaturas/extension',
				text: 'Jefatura de extensión',
			},
			{
				href: '/jefaturas/clinica',
				text: 'Jefatura de clínicas',
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
		path: '/sociedad-cientifica',
		text: 'Sociedad cientifica',
		icon: '',
		dropdown: false,
	},
	{
		path: '/recursos',
		text: 'Recursos virtuales',
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
 	{ path: '/panel/archivos', text: 'Archivos', icon: '' },
	{ path: '/panel/noticias', text: 'Noticias', icon: '' },
	{ path: '/panel/usuarios', text: 'Usuarios', icon: '' },
	{ path: '/panel/logs', text: 'Logs', icon: '' },
];
export const panelADM = [
	{ path: '/panel/archivos', text: 'Archivos', icon: '' },
	{ path: '/panel/noticias', text: 'Noticias', icon: '' },
	{ path: '/panel/mi-unidad', text: 'Mi Unidad', icon: '' },

	// { path: '/panel/usuarios', text: 'Usuarios', icon: '' },
];

export const getNavlinks = (rol = 'guest') => {
	if (rol === 'guest') return publicNavlinks;
	if (rol === 'ADM') return panelADM;
	if(rol === "SCRE") return panelADM;
	if (rol === 'SUPER') return panelSUPER;
};
