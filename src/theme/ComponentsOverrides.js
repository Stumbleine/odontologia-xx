import { merge } from 'lodash';
// ----------------------------------------------------------------------
export default function ComponentsOverrides(theme) {
	return merge(Button(theme));
}

function Button(theme) {
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 10,
					color: theme.palette.text.white,
					fontWeight: 'bold',
				},
				sizeLarge: {
					height: 48,
				},
				// containedInherit: {
				// 	// color: theme.palette.grey[800],
				// 	borderRadius: 10,
				// },

				// outlinedInherit: {
				// 	border: `1px solid ${theme.palette.grey[500_32]}`,
				// 	'&:hover': {
				// 		backgroundColor: theme.palette.action.hover,
				// 	},
				// },
				// textInherit: {
				// 	'&:hover': {
				// 		backgroundColor: theme.palette.action.hover,
				// 	},
				// },
			},
		},
	};
}
